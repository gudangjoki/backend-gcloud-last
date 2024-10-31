import express from "express";
import predictController from "./handler/predictController.js";
import historyController from "./handler/historyController.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
// import { loadModel } from "./model.js";
import tfjs from "@tensorflow/tfjs-node";

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
  const modelPath = "file:///home/ujus/Desktop/dev-dicoding/backend-gcloud-last/src/models/model.json";
  const model = await tfjs.loadGraphModel(modelPath);
  if (!model) {
    res.status(500).send("Model is not loaded");
    return;
  }
  await predictController(req, res, model);
});

app.get('/predict/history', historyController);

app.listen(port, async () => {
  console.log("Model loaded successfully.");
  console.log(`Server listening on port ${port}`);
});
