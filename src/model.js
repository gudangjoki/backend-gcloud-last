import tfjs from "@tensorflow/tfjs-node";

export const loadModel = async () => {
    // const modelPath = "file:///home/ujus/Desktop/dev-dicoding/backend-gcloud-last/src/models/model.json";
    // const model = await tfjs.node.loadSavedModel(modelPath);
    return model;
}

// saya ingin agar loadModel ini bisa dipakai, kemudian saya ingin model ini bisa dipakai juga di path ./hanler/services/predictController.js
// export const getModel = () => model;