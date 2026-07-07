import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
    ],
    // Делаем пути относительными для корректной работы в Яндекс Облаке
    base: './',

    build: {
      // Папка сборки зависит от режима
      outDir: mode === 'love' ? 'dist-love' : 'dist',

      rollupOptions: {
        // Добавляем "as any", чтобы TypeScript не выдавал ошибку несовместимости типов
        input: (mode === 'love'
            ? { love: resolve(__dirname, 'love-index.html') }
            : { main: resolve(__dirname, 'index.html') }) as any,
      },
    },
  }
})