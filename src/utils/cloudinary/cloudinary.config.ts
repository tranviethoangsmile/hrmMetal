import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env;
cloudinary.v2.config({
    cloud_name: ENV.CLOUD_DINARY_NAME,
    api_key: ENV.API_KEY_CLOUD_DINARY,
    api_secret: ENV.API_SECRET_CLOUD_DINARY,
});

export default cloudinary;
