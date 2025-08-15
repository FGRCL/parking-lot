interface Config {
  enableMeets: boolean;
}

export default {
  enableMeets: import.meta.env.ENABLE_MEETS as boolean
} as Config;

