const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Server couldn't start. Error: ${err}`);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
