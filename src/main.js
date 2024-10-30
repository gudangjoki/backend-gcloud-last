import express from "express";
import predictController from "./handler/predictController.js";
import historyController from "./handler/historyController.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { loadModel } from "./model.js";

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    const imageExtension = file.mimetype.split("/").slice(-1)[0];
    const imageFileName = `${Date.now()}.${imageExtension}`;
    req.imageFileName = imageFileName;
    callback(null, imageFileName);
  }
});

const upload = multer({ dest: "./uploads", storage });

let model;

app.post('/predict', upload.single('image'), async (req, res) => {
  if (!model) {
    res.status(500).send("Model is not loaded");
    return;
  }
  await predictController(req, res, model);
});

app.get('/predict/history', historyController);

app.listen(port, async () => {
  model = await loadModel();
  console.log("Model loaded successfully.");
  console.log(`Server listening on port ${port}`);
});
