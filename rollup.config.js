import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  output: [
    { file: "./dist/index.js", format: "cjs" },
    { file: "./dist/index.es.js", format: "es" },
  ],
  plugins: [
    typescript(),
  ],
};