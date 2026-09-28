import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = "/Users/varunkairalimac/.gemini/antigravity-ide/brain/9c90d310-52ec-45ef-9b26-de3606578fad";

async function runQA() {
  console.log("=== STARTING PERSONAL VISUAL INTRO QA SUITE ===");

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

  // --- 1. Test Desktop 1440x900 ---
  console.log("\n--- Testing 1440x900 Desktop ---");
  await setViewport(1440, 900, false);
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await sleep(2000);

  // Transition from Hero into Personal Visual Intro
  console.log("Scrolling into #personal-intro...");
  await evaluate(`document.getElementById("personal-intro")?.scrollIntoView({ behavior: "instant" });`);
  await sleep(1000);
  await captureScreenshot("personal_intro_desktop_1440x900.png");

  // Test pointer movement over floating images to verify parallax
  console.log("Testing pointer movement parallax on photos...");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 400, y: 350 });
  await sleep(400);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1000, y: 400 });
  await sleep(400);
  await captureScreenshot("personal_intro_parallax.png");

  // Test CTA button: "EXPLORE MY WORK"
  console.log("Testing CTA click: EXPLORE MY WORK -> scrolls to #work...");
  await evaluate(`
    const cta = Array.from(document.querySelectorAll("#personal-intro a")).find(a => a.textContent.includes("EXPLORE MY WORK"));
    if (cta) cta.click();
  `);
  await sleep(1200);

  const currentScrollY = await evaluate(`window.scrollY`);
  const workTop = await evaluate(`document.getElementById("work")?.offsetTop || 0`);
  console.log(`ScrollY after CTA: ${currentScrollY} (Work Section Top: ${workTop})`);
  await captureScreenshot("personal_intro_cta_transition_to_work.png");

  // --- 2. Test Desktop 1280x800 ---
  console.log("\n--- Testing 1280x800 Desktop ---");
  await setViewport(1280, 800, false);
  await evaluate(`document.getElementById("personal-intro")?.scrollIntoView({ behavior: "instant" });`);
  await sleep(800);
  await captureScreenshot("personal_intro_desktop_1280x800.png");

  // --- 3. Test Tablet 1024x768 & 768x1024 ---
  console.log("\n--- Testing Tablet Viewports ---");
  await setViewport(1024, 768, false);
  await evaluate(`document.getElementById("personal-intro")?.scrollIntoView({ behavior: "instant" });`);
  await sleep(800);
  await captureScreenshot("personal_intro_tablet_1024x768.png");

  await setViewport(768, 1024, true);
  await evaluate(`document.getElementById("personal-intro")?.scrollIntoView({ behavior: "instant" });`);
  await sleep(800);
  await captureScreenshot("personal_intro_tablet_768x1024.png");

  // --- 4. Test Mobile 390x844 & 375x812 ---
  console.log("\n--- Testing Mobile Viewports ---");
  await setViewport(390, 844, true);
  await evaluate(`document.getElementById("personal-intro")?.scrollIntoView({ behavior: "instant" });`);
  await sleep(800);
  await captureScreenshot("personal_intro_mobile_390x844.png");

  await setViewport(375, 812, true);
  await evaluate(`document.getElementById("personal-intro")?.scrollIntoView({ behavior: "instant" });`);
  await sleep(800);
  await captureScreenshot("personal_intro_mobile_375x812.png");

  // Overflow tests across all viewports
  for (const [w, h, m] of [
    [1440, 900, false],
    [1280, 800, false],
    [1024, 768, false],
    [768, 1024, true],
    [390, 844, true],
    [375, 812, true],
  ]) {
    await setViewport(w, h, m);
    await sleep(200);
    const overflow = await evaluate(`document.documentElement.scrollWidth > window.innerWidth`);
    console.log(`Viewport ${w}x${h} Horizontal Overflow: ${overflow ? "FAIL" : "PASS"}`);
  }

  console.log("\n=== QA SUMMARY ===");
  const errors = consoleMessages.filter((m) => m.type === "error");
  console.log("Console Errors:", errors.length);
  console.log("Network Errors:", networkErrors.length);

  ws.close();
  console.log("=== PERSONAL VISUAL INTRO QA COMPLETE ===");
}

runQA().catch((err) => {
  console.error("QA error:", err);
  process.exit(1);
});
