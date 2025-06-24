const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const iconSet = [
  { name: "Icon-App-20x20@2x.png", size: 40 },
  { name: "Icon-App-20x20@3x.png", size: 60 },
  { name: "Icon-App-29x29@2x.png", size: 58 },
  { name: "Icon-App-29x29@3x.png", size: 87 },
  { name: "Icon-App-40x40@2x.png", size: 80 },
  { name: "Icon-App-40x40@3x.png", size: 120 },
  { name: "Icon-App-60x60@2x.png", size: 120 },
  { name: "Icon-App-60x60@3x.png", size: 180 },
  { name: "Icon-App-76x76@1x.png", size: 76 },
  { name: "Icon-App-76x76@2x.png", size: 152 },
  { name: "Icon-App-83.5x83.5@2x.png", size: 167 },
  { name: "Icon-App-1024x1024@1x.png", size: 1024 },
];

function findAppIconSetDir() {
  const iosDir = fs.readdirSync("./ios");
  const projectName = iosDir.find((d) =>
    fs.existsSync(`./ios/${d}/Images.xcassets/AppIcon.appiconset`)
  );
  if (!projectName)
    throw new Error("Not found in direction AppIcon.appiconset di ./ios/");
  return `./ios/${projectName}/Images.xcassets/AppIcon.appiconset`;
}

async function ios(iconPath) {
  const appIconDir = findAppIconSetDir();
  for (const icon of iconSet) {
    const outPath = path.join(appIconDir, icon.name);
    await sharp(iconPath).resize(icon.size, icon.size).png().toFile(outPath);
    console.log(`→ ${outPath}`);
  }
  console.log("✅ Success! iOS icon set successfully.");
}

module.exports = ios;
