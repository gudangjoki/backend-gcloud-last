import tfjs from "@tensorflow/tfjs-node";
const { Storage } = require("@google-cloud/storage");

export const loadModel = () => {
    const model = "./models/model.json";
    return tfjs.loadLayersModel(model);
};

export const predictImage = (model, image) => {
    const preprocessedImg = tfjs.node.decodeImage(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    console.log(model.predict(preprocessedImg).data());
};