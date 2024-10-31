import express from "express";
import predictController from "./handler/predictController.js";
import historyController from "./handler/historyController.js";
import multer from "multer";
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

app.post('/predict', upload.single('image'), async (req, res) => {
  const model = await loadModel();
  await predictController(req, res, model);
});

app.get('/predict/history', historyController);

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
});
