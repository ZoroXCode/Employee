const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const Employee = require("./models/employee"); // Import the Employee model

const app = express(); // Initialize express app

// Database connection
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/give-it-a-try";
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Dummy employees array
const employees = [
  { name: "John Doe", company: "Google", position: "Software Engineer" },
  { name: "Jane Doe", company: "Microsoft", position: "Product Manager" },
  { name: "Bob Smith", company: "Apple", position: "Designer" },
];

// Routes
app.get("/", (req, res) => {
  const randomEmployee =
    employees[Math.floor(Math.random() * employees.length)];
  res.render("index", { employee: randomEmployee });
});

app.post("/submit", async (req, res) => {
  try {
    const randomEmployee =
      employees[Math.floor(Math.random() * employees.length)];
    const employee = new Employee({
      name: randomEmployee.name,
      company: randomEmployee.company,
      position: randomEmployee.position,
    });
    await employee.save(); // Use async/await to avoid callbacks
    res.redirect("/");
  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
