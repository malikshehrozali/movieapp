module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Use the automatic runtime for NativeWind v4
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
