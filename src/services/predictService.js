import tfjs from "@tensorflow/tfjs-node";
import fs from 'fs';
import __dirname from "../../path.mjs";
import path from "path";

// export const loadModel = () => {
//     const model = "./models/model.json";
//     return tfjs.loadLayersModel(model);
// };

export const predictImage = async (image, filename) => {

    const modelPath = "file:///home/ujus/Desktop/dev-dicoding/backend-gcloud-last/src/models/model.json";
    const model = await tfjs.node.loadSavedModel(modelPath);

    console.log(__dirname);
    const imagePath = path.join(__dirname, `/uploads/${filename}`);

    const imageBuffer = fs.readFileSync(imagePath);
    const preprocessedImg = tfjs.node.decodeImage(imageBuffer).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    return model.predict(preprocessedImg).data()
};