require("dotenv").config();
require("./db");
const express = require("express");
const hbs = require("hbs");
const app = express();
require("./config")(app);
const capitalize = require("./utils/capitalize");
const projectName = "Explore-Africa";
require("./config/session.config")(app);

const menuToggle = document.querySelector('.toggle');
      const showcase = document.querySelector('.showcase');

      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        showcase.classList.toggle('active');
      })

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});
// 👇 Start handling routes here
const index = require("./views/index");
app.use("/", index);

const authRouter = require("./routes/auth.routes");

app.use("/auth", authRouter);

const destinationsRoutes = require("./routes/destinations.routes");
app.use("/", destinationsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


module.exports = app;
