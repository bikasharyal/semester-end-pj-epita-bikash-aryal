// const express = require('express');
// const app = express();

// // Middlewares
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require("dotenv").config();
const startApp = require("./boot/setup").startApp;

(async () => {
  try {
    await startApp();
  } catch (error) {
    console.log("Error in index.js => startApp");
    console.log(`Error: ${JSON.stringify(error, undefined, 2)}`);
    throw error;
  }
})();

