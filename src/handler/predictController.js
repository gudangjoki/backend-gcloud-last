import { predictImage } from "../services/predictService.js";
import { v4 as uuidv4 } from 'uuid';

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
    
        if (mimetype !== "image/png") {
            res.status(400).send({
                "status": "fail",
                "message": "Terjadi kesalahan dalam melakukan prediksi"
            })
        }
    
        // res.json({ message: 'Image received', file: req.file });
    
        // save ke model bucket di gcp
        // const bucketName = "";
        // const filePath = "";

        console.log('buffer: ', req.file);
    
        const result = await predictImage(image, req.imageFileName, model);
        const prediction = result[0] > 0.5 ? "Cancer" : "Non-cancer";
        const responseObj = {
            'status': 'success',
            'message': 'Model is predicted successfully',
            'data': {
                'id': uuidv4(),
                'result': prediction,
                'suggestion': prediction === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
                'createdAt': new Date().toISOString(),
            }
        }
        console.log({val: result[0]})
        res.status(201).json(responseObj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process prediction" });
    }
}

export default predictController;
