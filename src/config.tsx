interface Config {
  enableMeets: string;
}

export default {
  enableMeets: process.env.ENABLE_MEETS
} as Config;

