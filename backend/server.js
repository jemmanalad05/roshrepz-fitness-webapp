const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
const userRouter = require("./routes/users");
app.use("/users", userRouter);

// Serve the compiled React application
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

// React Router handles /, /signup, and other frontend pages
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});