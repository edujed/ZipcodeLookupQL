import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  /*
    resolve: {
      alias: [
        {
          find: 'common',
          replacement: path.resolve(__dirname, 'src/common'),
        },
      ],
    },
  */
  plugins: [react()],
});