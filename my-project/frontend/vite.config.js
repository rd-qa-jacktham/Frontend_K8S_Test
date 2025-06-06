import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('Building for mode:', mode)
  
  // 根據不同環境設置不同的代理目標
  const getProxyTarget = () => {
    switch (mode) {
      case 'production':
        return 'http://localhost:8000'  // 改為與 staging 相同
      case 'staging':
        return 'http://localhost:8000'
      default:
        return 'http://localhost:8000'
    }
  }

  return {
    plugins: [react()],
    define: {
      'process.env.VITE_ENV': JSON.stringify(mode)
    },
    server: {
      proxy: {
        '/api': {
          target: getProxyTarget(),
          changeOrigin: true,
          secure: false, // 關閉 SSL 驗證，因為使用 localhost
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
