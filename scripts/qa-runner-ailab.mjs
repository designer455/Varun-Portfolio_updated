import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = "/Users/varunkairalimac/.gemini/antigravity-ide/brain/9c90d310-52ec-45ef-9b26-de3606578fad";

async function runQA() {
  console.log("=== STARTING AI LAB FINAL VISUAL REDESIGN QA SUITE ===");

  const versionRes = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await versionRes.json();
  const pageTarget = targets.find((t) => t.type === "page");

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
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
      console.error("NETWORK FAILED:", data.params.errorText);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = messageId++;
      pendingRequests.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Network.enable");

  const setViewport = async (width, height, isMobile = false) => {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile,
    });
  };

  const captureScreenshot = async (filename, clip = null) => {
    const params = { format: "png" };
    if (clip) params.clip = clip;
    const { data } = await send("Page.captureScreenshot", params);
    const buffer = Buffer.from(data, "base64");
    const filepath = path.join(ARTIFACTS_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
  };

  const evaluate = async (expression) => {
    const result = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return result.result?.value;
  };

  const scrollIntoView = async (selector) => {
    await evaluate(`
      (() => {
        const el = document.querySelector("${selector}");
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }
      })()
    `);
    await new Promise((r) => setTimeout(r, 600));
  };

  // Navigate to dev server
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await new Promise((r) => setTimeout(r, 2000));

  // 1. Desktop 1440x900 - Comprehensive Section & Subsection Captures
  console.log("\n--- Testing Desktop 1440x900 ---");
  await setViewport(1440, 900, false);
  await new Promise((r) => setTimeout(r, 800));

  // 1. Hero with ambient background
  await scrollIntoView("#home");
  await captureScreenshot("hero_ambient_background.png");

  // 2. Personal Visual Intro with ambient background
  await scrollIntoView("#personal-intro");
  await captureScreenshot("personal_intro_ambient_background.png");

  // 3. Work Vault with ambient background
  await scrollIntoView("#work");
  await captureScreenshot("work_vault_ambient_background.png");

  // 4. AI Lab Full Desktop & Ambient Background
  await scrollIntoView("#ailab");
  await captureScreenshot("ailab_full_desktop.png");
  await captureScreenshot("ailab_ambient_background.png");

  // 5. AI Tools
  await evaluate(`
    (() => {
      const el = document.querySelector("#ailab");
      const h3 = Array.from(el.querySelectorAll("h3")).find(h => h.textContent.includes("AI TOOLS"));
      if (h3) h3.scrollIntoView({ behavior: "instant", block: "start" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_ai_tools.png");

  // 6. Gmail MCP
  await evaluate(`
    (() => {
      const cards = document.querySelectorAll("#ailab .grid > div");
      const gmailCard = Array.from(cards).find(c => c.textContent.includes("Gmail MCP"));
      if (gmailCard) gmailCard.scrollIntoView({ behavior: "instant", block: "center" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_gmail_mcp.png");

  // 7. Google Drive MCP
  await evaluate(`
    (() => {
      const cards = document.querySelectorAll("#ailab .grid > div");
      const driveCard = Array.from(cards).find(c => c.textContent.includes("Google Drive MCP"));
      if (driveCard) driveCard.scrollIntoView({ behavior: "instant", block: "center" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_google_drive_mcp.png");

  // 8. Creative Tools
  await evaluate(`
    (() => {
      const el = document.querySelector("#ailab");
      const h3 = Array.from(el.querySelectorAll("h3")).find(h => h.textContent.includes("CREATIVE TOOLS"));
      if (h3) h3.scrollIntoView({ behavior: "instant", block: "start" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_creative_tools.png");

  // 9. Web & Development
  await evaluate(`
    (() => {
      const el = document.querySelector("#ailab");
      const h3 = Array.from(el.querySelectorAll("h3")).find(h => h.textContent.includes("WEB & DEVELOPMENT"));
      if (h3) h3.scrollIntoView({ behavior: "instant", block: "start" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_web_development.png");

  // 10. Deployment & Infrastructure
  await evaluate(`
    (() => {
      const el = document.querySelector("#ailab");
      const h3 = Array.from(el.querySelectorAll("h3")).find(h => h.textContent.includes("DEPLOYMENT & INFRASTRUCTURE"));
      if (h3) h3.scrollIntoView({ behavior: "instant", block: "start" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_deployment_infrastructure.png");

  // 11. Experience with ambient background
  await scrollIntoView("#about");
  await captureScreenshot("experience_ambient_background.png");

  // 12. Credentials with ambient background
  await scrollIntoView("#credentials");
  await captureScreenshot("credentials_ambient_background.png");

  // 13. Contact with ambient background
  await scrollIntoView("#contact");
  await captureScreenshot("contact_ambient_background.png");

  // Mobile 390x844
  console.log("\n--- Testing Mobile 390x844 ---");
  await setViewport(390, 844, true);
  await new Promise((r) => setTimeout(r, 800));

  await scrollIntoView("#ailab");
  await captureScreenshot("ailab_mobile.png");

  // MCP Mobile
  await evaluate(`
    (() => {
      const el = document.querySelector("#ailab");
      const h3 = Array.from(el.querySelectorAll("h3")).find(h => h.textContent.includes("MCP SYSTEMS"));
      if (h3) h3.scrollIntoView({ behavior: "instant", block: "start" });
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  await captureScreenshot("ailab_mcp_mobile.png");

  // Test all viewports for overflow
  const viewports = [
    { w: 1440, h: 900, m: false },
    { w: 1280, h: 800, m: false },
    { w: 1024, h: 768, m: false },
    { w: 768, h: 1024, m: false },
    { w: 390, h: 844, m: true },
    { w: 375, h: 812, m: true },
  ];

  console.log("\n--- Validating Viewports & Overflow ---");
  for (const vp of viewports) {
    await setViewport(vp.w, vp.h, vp.m);
    await new Promise((r) => setTimeout(r, 300));
    const hasOverflow = await evaluate(`document.documentElement.scrollWidth > window.innerWidth`);
    console.log(`Viewport ${vp.w}x${vp.h} Horizontal Overflow: ${hasOverflow ? "FAIL" : "PASS"}`);
  }

  // Count items
  const toolCounts = await evaluate(`
    (() => {
      const ailab = document.querySelector("#ailab");
      return {
        aiToolsCount: Array.from(ailab.querySelectorAll("img")).filter(img => img.src.includes("/assets/ai-tools/")).length,
        mcpCount: Array.from(ailab.querySelectorAll("img")).filter(img => img.src.includes("/assets/MCP/")).length,
        creativeCount: Array.from(ailab.querySelectorAll("img")).filter(img => img.src.includes("/assets/creative-tools/")).length,
        webCount: Array.from(ailab.querySelectorAll("img")).filter(img => img.src.includes("/assets/web-tech/")).length,
        deploymentCount: Array.from(ailab.querySelectorAll("img")).filter(img => img.src.includes("/assets/deployment/")).length,
      };
    })()
  `);
  console.log("Tool counts in DOM:", JSON.stringify(toolCounts));

  console.log("\n=== QA SUMMARY ===");
  console.log(`Console Errors: ${consoleMessages.filter((m) => m.type === "error").length}`);
  console.log(`Network Errors: ${networkErrors.length}`);
  console.log("=== AI LAB FINAL VISUAL REDESIGN QA COMPLETE ===");

  ws.close();
}

runQA().catch((err) => {
  console.error("QA RUNNER ERROR:", err);
  process.exit(1);
});
