import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' giúp các file JS/CSS tìm thấy nhau đúng đường dẫn khi chạy trên web Cloudflare
  base: './',
  server: {
    host: true, 
    port: 5173,
    strictPort: true, 
    allowedHosts: 'all', 
    
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        // PHẢI MỞ DÒNG NÀY: Để nó xóa bớt chữ /api thừa khi gọi từ Frontend
        // Giữ nguyên logic rewrite của mày để khớp với Backend
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
    hmr: {
      clientPort: 443, 
    },
  },
  build: {
    // Thư mục đầu ra khi build xong
    outDir: 'dist',
    // Tăng giới hạn cảnh báo dung lượng file để tránh báo lỗi vàng khi build
    chunkSizeWarningLimit: 2000,
  }
})