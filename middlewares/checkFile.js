const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).send({message: "No file provided"});
    }
    const supportedFormats = ["JPEG", "PNG", "BMP", "GIF", "TIFF"]
    const fileType = req.file.mimetype.split('/').slice(-1)[0].toUpperCase();

    if (!supportedFormats.includes(fileType)){
        return res.status(400).send({ message: "Unsupported file format" });
    }

    next();
};

module.exports = validateFile;