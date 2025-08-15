interface Config {
  enableMeets: boolean;
}

export default {
  enableMeets: (import.meta.env.VITE_ENABLE_MEETS.toLowerCase() === "true")
} as Config;

