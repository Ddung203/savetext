import compression from "compression";
import express from "express";
import morgan from "morgan";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import AppConfig from "./configs/app.config.js";
import connectMongoDb from "./configs/mongoose.config.js";
import Note from "./models/note.js";
import { removeSpacesAndSpecialChars } from "./utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/ping", async (req, res) => {
  return res.status(200).json({ message: "pong" });
});

app.get("/", async (req, res) => {
  return res.render("intro.ejs");
});

app.get("/error", async (req, res) => {
  return res.render("error.ejs");
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({ param: removeSpacesAndSpecialChars(id) });
  if (!note) {
    return res.render("index.ejs", { id, dataOfId: { content: "" } });
  }

  return res.render("index.ejs", {
    id,
    dataOfId: {
      param: note.param,
      content: note.content,
    },
  });
});

app.post("/save", async (req, res) => {
  let { password, param, content } = req.body;

  param = removeSpacesAndSpecialChars(param);

  try {
    const isExist = await Note.findOne({ param });

    if (isExist) {
      if (isExist.password.length === 0) {
        await Note.updateOne({ param }, { content, password });
        return res.redirect(`/${param}`);
      }

      const isMatch = await isExist.comparePassword(password);

      if (!isMatch) {
        return res.redirect(`/${param}`);
      }

      await Note.updateOne({ param }, { content });
      return res.redirect(`/${param}`);
    }

    await Note.insertMany([{ param, content, password }], { ordered: false });

    return res.redirect(`/${param}`);
  } catch (error) {
    return res.redirect(`/error`);
  }
});

app.listen(AppConfig.PORT, async () => {
  await connectMongoDb();

  console.log(`Server is running at http://localhost:${AppConfig.PORT}`);
});
