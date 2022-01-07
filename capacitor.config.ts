import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rnecdelegados.app',
  appName: 'rnec-delegados-app',
  webDir: 'build',
  bundledWebRuntime: false,
  android: {
    flavor: "qa",
  },
};

export default config;
