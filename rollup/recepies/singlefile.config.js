import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import typescript from 'rollup-plugin-typescript'
export default {
  input: "./src/index.js",
  output: {
    file: "./dist/bundle.js",
    format: "iife",
    name: "name",
    sourcemap: "inline"
  },
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
