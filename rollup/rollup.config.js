import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import ts from "rollup-plugin-typescript";

import typescript from "typescript";

const env = process.env.mode || "development";

export default {
  input: "./src/index.tsx",
  output: {
    file: "./dist/bundle.js",
    format: "iife",
    name: "name",
    sourcemap: "inline"
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": `"${env}"`
    }),
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: "node_modules/**" // Default: undefined
    }),
    json(),
    ts({ typescript })
  ]
};
