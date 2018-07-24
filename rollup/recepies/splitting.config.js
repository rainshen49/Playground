import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";

export default {
  input: ["./src/index.js"], //and some other entry points
  output: {
    dir: "./lib",
    format: "es",
    sourcemap: "inline"
  },
  experimentalDynamicImport: true,
  experimentalCodeSplitting: true,
  plugins: [
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: "node_modules/**" // Default: undefined
    }),
    json()
  ]
};
