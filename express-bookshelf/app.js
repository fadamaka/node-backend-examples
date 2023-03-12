//express
const express = require("express");
const app = express();
const port = 3000;
//bookshelf
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: "3307",
    user: "root",
    password: "root",
    database: "booking",
    charset: "utf8",
  },
});
const bookshelf = require("bookshelf")(knex);
// Defining models
const Hotel = bookshelf.model("Hotel", {
  tableName: "hotels",
});
//list all hotels
app.get("/hotels/", async (req, res) => {
  res.send(await Hotel.fetchAll());
});
//get hotel by id
app.get("/hotels/:id", async (req, res) => {
  res.send(
    await new Hotel({ id: req.params.id }).fetch().catch((error) => {
      return 404;
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
