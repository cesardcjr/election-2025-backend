// Dependencies & Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Environment Setup
const port = 4000;

// Server Setup
const app = express();

//Routes
const userRoutes = require("./routes/user")
const voterRoutes = require("./routes/voter")
const auditRoutes = require("./routes/audit")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
mongoose.connect("mongodb+srv://engineercesardcjr:VMezuAsV9rPF6Uvr@election-database.uzlj5.mongodb.net/database2025")
  .then(() => console.log('Connected to MongoDB Atlas.'))
  .catch(err => console.error('Connection error', err));


//Back-end Routes
app.use("/users", userRoutes);
app.use("/voters", voterRoutes);
app.use("/audit", auditRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server Gateway Response
if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`API is now online on port ${port}`);
  });

}

module.exports = { app, mongoose };
