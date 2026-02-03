import { createApp, h } from 'vue'
import { NConfigProvider } from 'naive-ui';
import { themeOverrides } from './theme';
import App from './App.vue'

// createApp(App).mount('#app').$nextTick(() => {
//   // Use contextBridge
//   window.ipcRenderer.on('main-process-message', (_event, message) => {
//     console.log(message)
//   })
// })

/**
 * Root application wrapper with Naive UI config.
 */
const app = createApp({
  render() {
    return h(
        NConfigProvider,
        { themeOverrides },
        { default: () => h(App) },
    );
  },
});

app.mount('#app');