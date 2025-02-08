import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // 指定项目的根目录为 public 文件夹
  worker: {
    format: 'es', // 指定 worker 文件的格式为 ES 模块
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'], // 指定 worker 文件的依赖项
  },
  build: {
    outDir: '../dist', // 指定构建输出的目录为 dist 文件夹
    emptyOutDir: true, // 在构建前清空输出目录
  }
});