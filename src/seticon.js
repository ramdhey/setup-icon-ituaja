const path = require("path");
const android = require("./android");
const ios = require("./ios");

async function setIcon(iconPath) {
  console.log("⏳ Starting to set app icon...");

  // Handle Android
  try {
    console.log("🔧 Setting Android icon...");
    await android(iconPath);
    console.log("✅ Android icon set successfully.");
  } catch (err) {
    console.error("❌ Failed to set ANDROID icon:", err.stack || err.message);
    return; 
  }

  // Handle iOS
  try {
    console.log("🔧 Setting iOS icon...");
    await ios(iconPath);
    console.log("✅ iOS icon set successfully.");
  } catch (err) {
    console.error("❌ Failed to set IOS icon:", err.stack || err.message);
    return; 
  }

  
  console.log("🎉 All icons have been set (Android & iOS)!");
}

module.exports = setIcon;
