import { fileURLToPath, URL } from 'url'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/svgBuilder';


// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    base: VITE_APP_ENV === 'production' ? '/BlackJack/' : '/',
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
      svgBuilder('./src/assets/icons/svg/')
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
          // 给导入的路径最后加上 ; 
          additionalData: '@import "./src/components/Game/variables.scss";'
        }
      }
    }
  }
})
