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
app.use("/users",userRoutes);
app.use("/voters",voterRoutes);
app.use("/audit", auditRoutes);

// Server Gateway Response
if (require.main === module) {
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${process.env.PORT || port}`);
    });
}

module.exports = { app, mongoose };
