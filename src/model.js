import tfjs from "@tensorflow/tfjs-node";

export const loadModel = async () => {
    const modelPath = "file:///home/ujus/Desktop/dev-dicoding/backend-gcloud-last/src/models/model.json";
    const model = await tfjs.loadGraphModel(modelPath);
    return model;
}