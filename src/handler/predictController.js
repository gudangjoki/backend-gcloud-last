// import { loadModel } from "../model.js";
import { predictImage } from "../services/predictService.js";

const predictController = async (req, res, model) => {
    // terima form data image
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
    
        const image = req.file;
    
        const { mimetype, size } = image;
    
        if (size > 1000000) {
            res.status(413).send({
                "status": "fail",
                "message": "Payload content length greater than maximum allowed: 1000000"
            })
        }
    
        if (mimetype !== "image/jpeg" && mimetype !== "image/png" && mimetype !== "image/jpg") {
            res.status(400).send({
                "status": "fail",
                "message": "Terjadi kesalahan dalam melakukan prediksi"
            })
        }
    
        // res.json({ message: 'Image received', file: req.file });
    
        // save ke model bucket di gcp
        // const bucketName = "";
        // const filePath = "";
    
    
        const result = await predictImage(image, req.imageFileName, model);
        const prediction = result[0] > 0.5 ? "Cancer" : "Non-cancer";
        
        res.json({ result: prediction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process prediction" });
    }
}

export default predictController;
