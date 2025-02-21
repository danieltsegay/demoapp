// Import express and path modules using ES modules import syntax
import express from 'express';
import path from 'path';

// Get the directory name from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Create an express app.
const app = express();

// Serve the static files from the dist directory.
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect every request to index.html.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Listen to the default port 80.
app.listen(80, () => {
  console.log('Server is running on port 80');
});
