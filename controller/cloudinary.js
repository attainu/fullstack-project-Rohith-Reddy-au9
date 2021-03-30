const cloudinary = require("cloudinary")

cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.upload = async (req, res) =>{
    let uploads = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: "auto"
    })
    res.json({
        url: uploads.secure_url,
        public_id: uploads.public_id
    })
}

exports.remove = (req, res) => {
    let image_id = req.body.public_id
    cloudinary.uploader.destroy(image_id, (err, result)=>{
        
        if (err) return res.json({ success: false, err });
        res.send("Successfully you deleted image");
    })
}

