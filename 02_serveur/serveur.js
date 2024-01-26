const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Define any additional API routes or middleware as needed
app.get("/api/example", (req, res) => {
  res.json({ message: "Hello from the Express API!" });
});

// All remaining requests return the React app, so it can handle routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
