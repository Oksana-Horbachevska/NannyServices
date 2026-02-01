import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    host: true, // Дозволяє підключатися до сервера ззовні контейнера
    port: 5173, // Фіксуємо порт
    watch: {
      usePolling: true, // Вмикає режим опитування файлів (критично для Docker на Windows!)
    },
  },
});
