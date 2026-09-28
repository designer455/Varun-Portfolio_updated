import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = "/Users/varunkairalimac/.gemini/antigravity-ide/brain/9c90d310-52ec-45ef-9b26-de3606578fad";

async function runQA() {
  console.log("=== STARTING PHASE 3.6 AUTOMATED QA SUITE ===");

  // 1. Get browser targets
  const versionRes = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await versionRes.json();
  let pageTarget = targets.find((t) => t.type === "page");

  if (!pageTarget) {
    const newTargetRes = await fetch("http://127.0.0.1:9222/json/new");
    pageTarget = await newTargetRes.json();
  }

  const wsUrl = pageTarget.webSocketDebuggerUrl;
  console.log("Connecting to WebSocket:", wsUrl);

  const ws = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let messageId = 1;
  const pendingRequests = new Map();
  const consoleMessages = [];
  const networkErrors = [];

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pendingRequests.has(data.id)) {
      const { resolve, reject } = pendingRequests.get(data.id);
      pendingRequests.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }

    if (data.method === "Runtime.consoleAPICalled") {
      const text = data.params.args.map((a) => a.value || JSON.stringify(a)).join(" ");
      consoleMessages.push({ type: data.params.type, text });
      if (data.params.type === "error") {
        console.error("PAGE CONSOLE ERROR:", text);
      }
    }

    if (data.method === "Log.entryAdded") {
      if (data.params.entry.level === "error") {
        console.error("BROWSER LOG ERROR:", data.params.entry.text);
      }
    }

    if (data.method === "Network.loadingFailed") {
      networkErrors.push(data.params);
      console.error("NETWORK FAILED:", data.params.errorText, data.params.canceled);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  // Enable domains
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Log.enable");

  const setViewport = async (width, height, mobile = false) => {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile,
    });
  };

  const captureScreenshot = async (filename) => {
    const res = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
    });
    const filePath = path.join(ARTIFACTS_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(res.data, "base64"));
    console.log(`Saved screenshot: ${filename} (${fs.statSync(filePath).size} bytes)`);
    return filePath;
  };

  const evaluate = async (expression) => {
    const res = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    return res.result?.value;
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // --- 1. Load Page at 1440x900 ---
  console.log("\n--- Testing 1440x900 Desktop ---");
  await setViewport(1440, 900, false);
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await sleep(2500);

  // Check character canvas mouse interaction (LEFT, CENTER, RIGHT)
  console.log("Testing CharacterCanvas desktop pointer moves...");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 200, y: 400 });
  await sleep(300);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 720, y: 400 });
  await sleep(300);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1200, y: 400 });
  await sleep(400);

  // Scroll to AI Lab
  console.log("Navigating to #ailab...");
  await evaluate(`document.getElementById("ailab")?.scrollIntoView({ behavior: 'instant' });`);
  await sleep(1000);
  await captureScreenshot("ai_lab_entry.png");

  // Test Workflow Node Selection: CREATIVE -> AI -> MCP -> BUILD -> SHIP
  console.log("Testing workflow node interactions...");
  // Click AI node
  await evaluate(`
    const buttons = Array.from(document.querySelectorAll("#ailab button"));
    const aiBtn = buttons.find(b => b.textContent && b.textContent.includes("ARTIFICIAL INTELLIGENCE"));
    if (aiBtn) aiBtn.click();
  `);
  await sleep(600);
  await captureScreenshot("ai_lab_ai.png");

  // Click MCP node
  await evaluate(`
    const buttons = Array.from(document.querySelectorAll("#ailab button"));
    const mcpBtn = buttons.find(b => b.textContent && b.textContent.includes("MODEL CONTEXT PROTOCOL"));
    if (mcpBtn) mcpBtn.click();
  `);
  await sleep(600);
  await captureScreenshot("ai_lab_mcp.png");

  // Click BUILD node
  await evaluate(`
    const buttons = Array.from(document.querySelectorAll("#ailab button"));
    const buildBtn = buttons.find(b => b.textContent && b.textContent.includes("ENGINEERING & CODE"));
    if (buildBtn) buildBtn.click();
  `);
  await sleep(600);
  await captureScreenshot("ai_lab_build_ship.png");

  // Tool Explorer Selection: Click a tool card
  console.log("Testing Tool Explorer selection...");
  await evaluate(`
    const toolCards = Array.from(document.querySelectorAll("#ailab button[data-cursor='inspect']"));
    if (toolCards.length > 1) toolCards[1].click();
  `);
  await sleep(500);
  await captureScreenshot("ai_lab_tool_explorer.png");

  // Scroll to MCP Systems Showcase
  console.log("Inspecting MCP Showcase...");
  await evaluate(`
    const mcpSection = Array.from(document.querySelectorAll("h3")).find(h => h.textContent.includes("Model Context Protocol"));
    if (mcpSection) mcpSection.scrollIntoView({ behavior: 'instant', block: 'center' });
  `);
  await sleep(800);
  await captureScreenshot("ai_lab_mcp_showcase.png");

  // Scroll to Featured AI / Engineering Projects
  console.log("Inspecting Featured Projects...");
  await evaluate(`
    const projHeading = Array.from(document.querySelectorAll("h3")).find(h => h.textContent.includes("Featured Engineering"));
    if (projHeading) projHeading.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await sleep(800);
  await captureScreenshot("ai_lab_projects.png");

  // --- 2. JARVIS ASSISTANT TESTS ---
  console.log("\n--- Testing JARVIS Assistant ---");
  await captureScreenshot("jarvis_closed.png");

  // Open Jarvis
  console.log("Opening JARVIS Panel...");
  await evaluate(`
    const jarvisBtn = document.querySelector("button[aria-label*='JARVIS Assistant']");
    if (jarvisBtn) jarvisBtn.click();
  `);
  await sleep(800);
  await captureScreenshot("jarvis_open.png");

  // Test Quick Command: SHOW BRANDING (Controls Work Vault)
  console.log("Testing Jarvis Command: SHOW BRANDING...");
  const initialFilter = await evaluate(`
    document.querySelector("#work button[aria-selected='true']")?.textContent || "none";
  `);
  console.log("Vault Filter Before Command:", initialFilter);

  await evaluate(`
    const cmdButtons = Array.from(document.querySelectorAll("button"));
    const brandCmd = cmdButtons.find(b => b.textContent && b.textContent.includes("SHOW BRANDING"));
    if (brandCmd) brandCmd.click();
  `);
  await sleep(1200);

  const newFilter = await evaluate(`
    document.querySelector("#work button[aria-selected='true']")?.textContent || "none";
  `);
  console.log("Vault Filter After SHOW BRANDING:", newFilter);

  await captureScreenshot("jarvis_command_executed.png");

  // Scroll up to view Work Vault after Jarvis filter
  await evaluate(`document.getElementById("work")?.scrollIntoView({ behavior: 'instant' });`);
  await sleep(800);
  await captureScreenshot("work_vault_after_jarvis_filter.png");

  // Test Additional Jarvis Commands
  console.log("Testing Jarvis Command: SHOW MY AI WORK...");
  await evaluate(`
    const cmdButtons = Array.from(document.querySelectorAll("button"));
    const aiCmd = cmdButtons.find(b => b.textContent && b.textContent.includes("SHOW MY AI WORK"));
    if (aiCmd) aiCmd.click();
  `);
  await sleep(1000);

  console.log("Testing Jarvis Command: SHOW CERTIFICATIONS...");
  await evaluate(`
    const cmdButtons = Array.from(document.querySelectorAll("button"));
    const certCmd = cmdButtons.find(b => b.textContent && b.textContent.includes("SHOW CERTIFICATIONS"));
    if (certCmd) certCmd.click();
  `);
  await sleep(1000);

  console.log("Testing Jarvis Command: CONTACT VARUN...");
  await evaluate(`
    const cmdButtons = Array.from(document.querySelectorAll("button"));
    const contactCmd = cmdButtons.find(b => b.textContent && b.textContent.includes("CONTACT VARUN"));
    if (contactCmd) contactCmd.click();
  `);
  await sleep(1000);

  // Close Jarvis
  await evaluate(`
    const closeBtn = document.querySelector("button[aria-label='Close Assistant Panel']");
    if (closeBtn) closeBtn.click();
  `);
  await sleep(500);

  // --- 3. Viewport 1280x800 ---
  console.log("\n--- Testing 1280x800 Desktop ---");
  await setViewport(1280, 800, false);
  await evaluate(`document.getElementById("ailab")?.scrollIntoView({ behavior: 'instant' });`);
  await sleep(800);
  await captureScreenshot("desktop_1280x800.png");

  // --- 4. Viewport 390x844 (Mobile) ---
  console.log("\n--- Testing 390x844 Mobile ---");
  await setViewport(390, 844, true);
  await evaluate(`document.getElementById("ailab")?.scrollIntoView({ behavior: 'instant' });`);
  await sleep(800);
  await captureScreenshot("ai_lab_mobile_390x844.png");

  // Open Jarvis on Mobile
  console.log("Opening Jarvis on Mobile...");
  await evaluate(`
    const jarvisBtn = document.querySelector("button[aria-label*='JARVIS Assistant']");
    if (jarvisBtn) jarvisBtn.click();
  `);
  await sleep(800);
  await captureScreenshot("jarvis_mobile_390x844.png");

  // Close Jarvis
  await evaluate(`
    const closeBtn = document.querySelector("button[aria-label='Close Assistant Panel']");
    if (closeBtn) closeBtn.click();
  `);
  await sleep(400);

  // --- 5. Verify other required viewports: 1024x768, 768x1024, 375x812 ---
  console.log("\n--- Testing remaining viewports ---");
  for (const [w, h, m] of [
    [1024, 768, false],
    [768, 1024, true],
    [375, 812, true],
  ]) {
    await setViewport(w, h, m);
    await evaluate(`window.scrollTo(0, 0);`);
    await sleep(400);
    const hasOverflow = await evaluate(`document.documentElement.scrollWidth > window.innerWidth`);
    console.log(`Viewport ${w}x${h} - Horizontal Overflow: ${hasOverflow ? "FAIL" : "PASS"}`);
  }

  console.log("\n=== QA SUMMARY ===");
  console.log("Total Console Messages:", consoleMessages.length);
  const errors = consoleMessages.filter((m) => m.type === "error");
  console.log("Console Errors:", errors.length);
  console.log("Network Errors:", networkErrors.length);

  ws.close();
  console.log("=== PHASE 3.6 QA COMPLETE ===");
}

runQA().catch((err) => {
  console.error("QA execution failed:", err);
  process.exit(1);
});
