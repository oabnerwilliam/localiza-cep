import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // Definindo a porta do servidor, você pode alterar se necessário
  },
  base: '/', // Caso você queira servir seu projeto em uma subpasta, altere isso
});
