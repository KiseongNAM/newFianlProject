var express = require("express");
const path = require("path");
var app = express();

app.use(express.static("public"));

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Commnets = sequelize.define(
  "Commnets",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

(async () => {
  await Commnets.sync();
})();

// req.body 오는 값을 읽기 위해 적용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// <%= %> 또는 <% %> 같이 html에서 js를 쓰기위한 ejs 라이브러리
app.set("view engine", "ejs");

// index page
app.get("/", async function (req, res) {
  const comments = await Commnets.findAll();
  res.render("main", { comments: comments });
});

app.post("/create", async function (req, res) {
  console.log(req.body);
  const { content, nickname, datestamp, password } = req.body;
  await Commnets.create({
    content: content,
    nickname: nickname,
    datestamp: datestamp,
    password: password,
  });
  res.redirect("/");
});

app.post("/update/:id", async function (req, res) {
  const { content, datestamp, password } = req.body;
  const { id } = req.params;
  await Commnets.update(
    { content: content, datestamp: datestamp },
    {
      where: {
        id: id,
        password: password,
      },
    }
  );

  res.redirect("/");
});

app.post("/delete/:id", async function (req, res) {
  const { password } = req.body;
  const { id } = req.params;
  await Commnets.destroy({
    where: {
      id: id,
      password: password,
    },
  });
  res.redirect("/");
});

app.listen(3000);
console.log("Server is listening on port 3000");
