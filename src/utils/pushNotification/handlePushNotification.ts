import { required } from '@hapi/joi';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
const serviceAccount = ENV.FIREBASE_CONFIG
    ? JSON.parse(ENV.FIREBASE_CONFIG)
    : {};

console.log(serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async ({ fcmToken, title, body }: any) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: fcmToken,
        data: {
            click_action: 'OPEN_ACTIVITY',
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export default sendPushNotification;
