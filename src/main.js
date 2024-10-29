import express from "express";
import predictController from "./handler/predictController.js";
import multer from "multer";

const app = express();

const port = process.env.PORT || 3000; 

const upload = multer({ dest: 'uploads/' });

app.post('/predict', upload.single('image'), predictController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
