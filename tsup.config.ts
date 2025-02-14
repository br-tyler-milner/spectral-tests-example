import type { Options } from 'tsup';
export default <Options>{
    entry: ["ruleset.ts"],
    clean: true,
    dts: true,
    format: ["esm"],
    sourcemap: true,
    noExternal: ["@stoplight/types"],
    external: ["@stoplight/spectral-core"],
};
