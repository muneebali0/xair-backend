const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
    accessKeyId: "",
    secretAccessKey: '',
	region : 'us-east-2',
});

const uploadParams = {
         Bucket:process.env.AWS_BUCKET, 
         Key: '', // pass key
         Body: null, // pass file body
};

const getParams = {
    Bucket:process.env.AWS_BUCKET, 
    Key: '', // pass key
    //Body: null, // pass file body
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;
s3.getParams = getParams;

module.exports.s3 = s3;