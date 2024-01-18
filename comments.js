// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Set port
const port = 3000;
// Set static folder
app.use(express.static('public'));
// Allow to parse JSON
app.use(bodyParser.json());

// Allow to parse urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));

// Read comments file
let comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')));

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add new comment
app.post('/comments', (req, res) => {
  // Get data from request body
  const data = req.body;
  // Add new comment
  comments.push(data);
  // Write comments to file
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
  // Send response
  res.json(comments);
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});