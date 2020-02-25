import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({  
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,    
    region: "ap-northeast-2"
});

const upload = multer({ 
    storage: multerS3({
        s3,
        acl: 'public-read-write',
        bucket: "prismagram.tk", 
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }  
    }) 
});
export const uploadMiddleware = upload.single("file");
export const uploadsMiddleWare = upload.array("file",5);

export const uploadController = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const { file: { location } } = req;
    res.json({ location });
};

export const uploadsController = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const { files } = req;
    const location = files.map(file => file.location);
    res.json({ location });
};
