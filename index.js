const express = require("express");
const bodyParser = require("body-parser");
const { purchaseTicket } = require("./controllers/ticketController");
const validationMiddleware = require("./middlewares/validationMiddleware");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/tickets", validationMiddleware, purchaseTicket);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
