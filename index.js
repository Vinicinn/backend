var express = require("express");
const fs = require("fs");
const cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send(reader());
});

app.post("/", (req, res) => {
  const { id, name } = req.body;
  let data = reader();
  let array = JSON.parse(data);
  if ((id, name)) {
    array.push({ id, name });
  }
  writer(array);
  return res.json("Item assinado!");
});

app.delete("/", (req, res) => {
  const { id } = req.query;
  let data = reader();
  let array = JSON.parse(data);
  array.forEach((element) => {
    if (element.id == id) {
      let index = array.indexOf(element);
      array.splice(index, 1);
      writer(array);
    }
  });
  res.json("Assinaruta removida!");
});

app.listen(process.env.PORT || 3000);

function reader() {
  return fs.readFileSync("data.json", "utf-8");
}

function writer(array) {
  fs.writeFileSync("data.json", JSON.stringify(array));
}
