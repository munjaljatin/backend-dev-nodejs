require("dotenv").config();
const app = require("./app");
require("./config/db");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Book Management System API");
});

app.listen(PORT, () => {
  console.log(`Book Management Server is running on PORT ${PORT}`);
});
