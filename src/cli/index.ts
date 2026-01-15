#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { runGenerate, clearCache } from "../core";

yargs(hideBin(process.argv))
  .scriptName("hono-docs")
  .command(
    "generate",
    "Generate OpenAPI JSON",
    (y) =>
      y.option("config", {
        alias: "c",
        type: "string",
        describe: "Path to config file",
        demandOption: true,
        default: "./hono-docs.ts",
      }),
    async (argv) => {
      try {
        await runGenerate(argv.config);
      } catch (e) {
        console.error("❌", e);
        process.exit(1);
      }
    }
  )
  .command(
    "clean",
    "Clear the generation cache",
    () => {},
    async () => {
      try {
        clearCache();
      } catch (e) {
        console.error("❌ Failed to clear cache:", e);
        process.exit(1);
      }
    }
  )
  .demandCommand(1)
  .help()
  .parse();
