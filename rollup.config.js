// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/directive.js",
  output: {
    file: "dist/vue-smart-placeholders.min.js",
    format: "umd",
    name: "VueSmartPlaceholders",
    globals: {
      vue: "Vue",
    },
  },
  external: ["vue"],
  plugins: [resolve(), terser()],
};
