const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// The shared game rules live outside the app root so the server can use them too.
config.watchFolders = [path.resolve(__dirname, "../shared")];
// Files under ../shared still resolve dependencies (e.g. @babel/runtime)
// against the app's node_modules.
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

module.exports = config;
