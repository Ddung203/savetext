import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path"; // Import the path module
import path from "path";
import fs from "fs";
import morgan from "morgan";

import pool from "./configs/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  return res.render("intro.ejs");
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const dataOfId = await pool.execute(
    `SELECT content FROM savet WHERE param = '${id}'`
  );
  if (!dataOfId[0][0]) {
    return res.render("index.ejs", { id, dataOfId: { content: "" } });
  }
  return res.render("index.ejs", { id, dataOfId: dataOfId[0][0] });
});

app.post("/save", async (req, res) => {
  console.log(">>>> check req", req.body);
  let { param, content } = req.body;

  const check = await pool.execute(
    `SELECT * FROM savet WHERE param = '${param}'`
  );

  if (check[0][0]?.param && param && check[0][0]?.param === param) {
    await pool.execute(
      `UPDATE savet SET content = '${content}' WHERE param = '${param}';`
    );
    return res.redirect(`/${param}`);
  }

  await pool.execute("INSERT INTO savet(param,content) VALUES ( ?, ?)", [
    param,
    content,
  ]);
  return res.redirect(`/${param}`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
