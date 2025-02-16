import type { Options } from 'tsup';
export default <Options>{
  entry: ["src/ruleset.ts"],
  clean: true,
  dts: true,
  target: "ES2022",
  format: ["esm"],
  sourcemap: true,
  noExternal: ["@stoplight/types"],
  external: ["@stoplight/spectral-core"]
};
