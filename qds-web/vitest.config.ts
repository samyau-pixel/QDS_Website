import type { Config } from "vitest/config";

export default {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
} satisfies Config;
