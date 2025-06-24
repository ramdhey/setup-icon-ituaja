const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const iconSet = [
  {
    name: "Icon-App-20x20@2x.png",
    size: 40,
    idiom: "iphone",
    scale: "2x",
    sizeStr: "20x20",
  },
  {
    name: "Icon-App-20x20@3x.png",
    size: 60,
    idiom: "iphone",
    scale: "3x",
    sizeStr: "20x20",
  },
  {
    name: "Icon-App-29x29@2x.png",
    size: 58,
    idiom: "iphone",
    scale: "2x",
    sizeStr: "29x29",
  },
  {
    name: "Icon-App-29x29@3x.png",
    size: 87,
    idiom: "iphone",
    scale: "3x",
    sizeStr: "29x29",
  },
  {
    name: "Icon-App-40x40@2x.png",
    size: 80,
    idiom: "iphone",
    scale: "2x",
    sizeStr: "40x40",
  },
  {
    name: "Icon-App-40x40@3x.png",
    size: 120,
    idiom: "iphone",
    scale: "3x",
    sizeStr: "40x40",
  },
  {
    name: "Icon-App-60x60@2x.png",
    size: 120,
    idiom: "iphone",
    scale: "2x",
    sizeStr: "60x60",
  },
  {
    name: "Icon-App-60x60@3x.png",
    size: 180,
    idiom: "iphone",
    scale: "3x",
    sizeStr: "60x60",
  },
  {
    name: "Icon-App-76x76@1x.png",
    size: 76,
    idiom: "ipad",
    scale: "1x",
    sizeStr: "76x76",
  },
  {
    name: "Icon-App-76x76@2x.png",
    size: 152,
    idiom: "ipad",
    scale: "2x",
    sizeStr: "76x76",
  },
  {
    name: "Icon-App-83.5x83.5@2x.png",
    size: 167,
    idiom: "ipad",
    scale: "2x",
    sizeStr: "83.5x83.5",
  },
  {
    name: "Icon-App-1024x1024@1x.png",
    size: 1024,
    idiom: "ios-marketing",
    scale: "1x",
    sizeStr: "1024x1024",
  },
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

  // Hapus PNG lama
  const pngFiles = fs.readdirSync(appIconDir).filter((f) => f.endsWith(".png"));
  for (const f of pngFiles) {
    fs.unlinkSync(path.join(appIconDir, f));
  }

  // Generate icon baru
  for (const icon of iconSet) {
    const outPath = path.join(appIconDir, icon.name);
    await sharp(iconPath).resize(icon.size, icon.size).png().toFile(outPath);
    console.log(`→ ${outPath}`);
  }

  // Generate Contents.json baru
  const contents = {
    images: iconSet.map((icon) => ({
      size: icon.sizeStr,
      idiom: icon.idiom,
      filename: icon.name,
      scale: icon.scale,
    })),
    info: { version: 1, author: "xcode" },
  };
  fs.writeFileSync(
    path.join(appIconDir, "Contents.json"),
    JSON.stringify(contents, null, 2)
  );

  console.log("✅ Success! iOS icon set successfully.");
}

module.exports = ios;
