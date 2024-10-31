import tf from "@tensorflow/tfjs-node";
import fs from 'fs';
import __dirname from "../../path.mjs";
import path from "path";

export const predictImage = async (image, filename, model) => {

    console.log(__dirname);
    const imagePath = path.join(__dirname, `/uploads/${filename}`);

    const imageBuffer = fs.readFileSync(imagePath);
    console.log(imageBuffer)
    const preprocessedImg = tf.node.decodeImage(imageBuffer, 3)
    .resizeNearestNeighbor([224, 224])
    .expandDims(0)
    .toFloat()
    .div(tf.scalar(255.0));

    return model.predict(preprocessedImg).data();
};