// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';
// // import fs from 'fs';
// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     https: {
// //       key: fs.readFileSync('./localhost-key.pem'),
// //       cert: fs.readFileSync('./localhost.pem'),
// //     },
// //     port: 5173,
// //   },
// // });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync('./localhost-key.pem'),
//       cert: fs.readFileSync('./localhost.pem'),
//     },
//     port: 5173,
//   },
// });

import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
    port: 5173,
  },
});
