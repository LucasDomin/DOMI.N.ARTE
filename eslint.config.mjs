import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  // Keep the starter on the flat config export that actually runs under the pinned ESLint/Next toolchain.
  ...nextCoreWebVitals,
  {
    rules: {
      // This React Compiler-oriented rule flags the standard "fetch on mount"
      // and "sync local state from a prop" patterns used throughout this
      // codebase (data fetching in admin panels, controlled-input editing).
      // These are correct and safe without a data-fetching library like
      // SWR/React Query. Downgraded to warn rather than disabled outright,
      // so the signal stays visible for a future refactor if one of these
      // components adopts a proper data layer.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
