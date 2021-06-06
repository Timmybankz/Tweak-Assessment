
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

require('dotenv').config();


const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

var s3 = new aws.S3({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
})

const uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            console.log(file);
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString())
        }
    })
}).single('image');

exports.uploadFile = uploadFile;

