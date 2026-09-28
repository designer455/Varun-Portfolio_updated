import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const COVERS_DIR = path.join(rootDir, "public", "assets", "portfolio", "covers");
const MANIFEST_SRC = path.join(rootDir, "src", "data", "pdfCoversManifest.json");
const MANIFEST_PUB = path.join(rootDir, "public", "assets", "portfolio", "covers", "manifest.json");

if (!fs.existsSync(COVERS_DIR)) {
  fs.mkdirSync(COVERS_DIR, { recursive: true });
}

async function run() {
  console.log("=== PDF COVER EXTRACTION SCRIPT ===");
  console.log("Scanning src/data/projects.ts for PDF entries...");

  const projectsModule = await import(path.join(rootDir, "src", "data", "projects.ts"));
  const projects = projectsModule.projectsData;

  const pdfProjects = projects.filter((p) => p.pdf && p.pdf.toLowerCase().endsWith(".pdf"));
  console.log(`Discovered ${pdfProjects.length} PDF projects out of ${projects.length} total projects.`);

  if (pdfProjects.length !== 51) {
    console.warn(`WARNING: Expected 51 PDF projects, found ${pdfProjects.length}`);
  }

  const manifest = {};
  const failures = [];
  const sizes = [];

  for (let i = 0; i < pdfProjects.length; i++) {
    const project = pdfProjects[i];
    const pdfRelPath = project.pdf.startsWith("/") ? project.pdf.slice(1) : project.pdf;
    const pdfFullPath = path.join(rootDir, "public", pdfRelPath);

    if (!fs.existsSync(pdfFullPath)) {
      failures.push({
        id: project.id,
        pdf: project.pdf,
        error: `Source PDF does not exist at ${pdfFullPath}`,
      });
      console.error(`[FAIL] ${project.id}: Source PDF missing: ${pdfFullPath}`);
      continue;
    }

    const coverFileName = `${project.id}.webp`;
    const coverFullPath = path.join(COVERS_DIR, coverFileName);
    const coverPublicPath = `/assets/portfolio/covers/${coverFileName}`;
    const tempPngPath = `/tmp/pdf_cover_${project.id}_${Date.now()}.png`;

    try {
      // 1. Render first page of PDF using macOS sips
      try {
        execFileSync("sips", [
          "-s", "format", "png",
          pdfFullPath,
          "--resampleWidth", "1000",
          "--out", tempPngPath,
        ], { stdio: "pipe" });
      } catch {
        // Fallback without resampleWidth if orientation/size issues
        execFileSync("sips", [
          "-s", "format", "png",
          pdfFullPath,
          "--out", tempPngPath,
        ], { stdio: "pipe" });
      }

      if (!fs.existsSync(tempPngPath)) {
        throw new Error("Temporary PNG was not created by sips");
      }

      // 2. Compress to WebP with cwebp (quality 85 for retina fidelity)
      execFileSync("cwebp", [
        "-q", "85",
        tempPngPath,
        "-o", coverFullPath,
      ], { stdio: "pipe" });

      if (fs.existsSync(tempPngPath)) {
        fs.unlinkSync(tempPngPath);
      }

      const stat = fs.statSync(coverFullPath);
      if (stat.size === 0) {
        throw new Error("WebP cover output is 0 bytes");
      }

      // Read dimensions using sips
      let width = 0;
      let height = 0;
      try {
        const dimOut = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", coverFullPath], { encoding: "utf8" });
        const wMatch = dimOut.match(/pixelWidth:\s*(\d+)/);
        const hMatch = dimOut.match(/pixelHeight:\s*(\d+)/);
        if (wMatch) width = parseInt(wMatch[1], 10);
        if (hMatch) height = parseInt(hMatch[1], 10);
      } catch {}

      manifest[project.id] = {
        projectId: project.id,
        title: project.title,
        pdfPath: project.pdf,
        coverPath: coverPublicPath,
        sizeBytes: stat.size,
        sizeFormatted: `${(stat.size / 1024).toFixed(1)} KB`,
        width,
        height,
      };

      sizes.push(stat.size);
      console.log(`[${i + 1}/${pdfProjects.length}] OK: ${project.id} -> ${coverFileName} (${(stat.size / 1024).toFixed(1)} KB, ${width}x${height})`);
    } catch (err) {
      if (fs.existsSync(tempPngPath)) {
        try { fs.unlinkSync(tempPngPath); } catch {}
      }
      failures.push({
        id: project.id,
        pdf: project.pdf,
        error: err.message,
      });
      console.error(`[FAIL] ${project.id}: ${err.message}`);
    }
  }

  // Write manifests
  const manifestJson = JSON.stringify(manifest, null, 2);
  fs.writeFileSync(MANIFEST_SRC, manifestJson, "utf8");
  fs.writeFileSync(MANIFEST_PUB, manifestJson, "utf8");

  console.log("\n=== SUMMARY ===");
  console.log(`Total PDF projects discovered: ${pdfProjects.length}`);
  console.log(`Covers generated successfully: ${Object.keys(manifest).length}`);
  console.log(`Failed conversions: ${failures.length}`);

  if (sizes.length > 0) {
    const minSize = (Math.min(...sizes) / 1024).toFixed(1);
    const maxSize = (Math.max(...sizes) / 1024).toFixed(1);
    const avgSize = (sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024).toFixed(1);
    const totalSize = (sizes.reduce((a, b) => a + b, 0) / 1024 / 1024).toFixed(2);
    console.log(`File size stats: Min=${minSize} KB | Max=${maxSize} KB | Avg=${avgSize} KB | Total=${totalSize} MB`);
  }

  if (failures.length > 0) {
    console.error("FAILURES LIST:");
    failures.forEach((f) => console.error(`  - ${f.id} (${f.pdf}): ${f.error}`));
    process.exit(1);
  } else {
    console.log("ALL 51 PDF COVERS GENERATED AND VERIFIED SUCCESSFULLY.");
  }
}

run().catch((err) => {
  console.error("Script execution failed:", err);
  process.exit(1);
});
