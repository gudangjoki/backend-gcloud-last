import { loadModel, predictImage } from "../services/predictService.js";

const predictController = (req, res) => {
    // terima form data image
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // save ke model bucket di gcp
    // const bucketName = "";
    // const filePath = "";

    const image = req.file;

    const { path, originalname, mimetype } = image;

    // res.json({ message: 'Image received', file: req.file });

    const theModel = loadModel();

    predictImage(theModel, image);
}

export default predictController;