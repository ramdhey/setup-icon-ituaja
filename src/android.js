const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const resPath = [
  { name: "mipmap-mdpi", size: 48 },
  { name: "mipmap-hdpi", size: 72 },
  { name: "mipmap-xhdpi", size: 96 },
  { name: "mipmap-xxhdpi", size: 144 },
  { name: "mipmap-xxxhdpi", size: 192 },
];

const androidDir = "android/app/src/main/res/";

async function generateIcon(iconPath, res) {
  const outDir = path.join(androidDir, res.name);
  const outPath = path.join(outDir, "ic_launcher.png");
  await fs.ensureDir(outDir);
  await sharp(iconPath).resize(res.size, res.size).png().toFile(outPath);
  console.log(`→ ${outPath}`);
}

async function android(iconPath) {
  if (!(await fs.pathExists(iconPath))) {
    throw new Error("Icon Not Found : " + iconPath);
  }
  for (const res of resPath) {
    await generateIcon(iconPath, res);
  }
}

module.exports = android;
