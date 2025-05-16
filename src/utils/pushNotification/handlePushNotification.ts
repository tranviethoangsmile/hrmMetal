import { required } from '@hapi/joi';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { IServiceAccount } from '../../interfaces';
dotenv.config();
const ENV = process.env;
const serviceAccount = ENV.FIREBASE_CONFIG;
admin.initializeApp({
    credential: admin.credential.cert(
        JSON.parse(JSON.stringify(serviceAccount)),
    ),
});

const sendPushNotification = async ({
    fcmToken,
    title,
    body,
    key,
}: {
    fcmToken: string;
    title: string;
    body: string;
    key: string;
}) => {
    if (!fcmToken || !title || !body) {
        return;
    }
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: fcmToken,
        data: {
            click_action: 'MESSAGE',
            key: key,
        },
    };
    try {
        return await admin.messaging().send(message);
    } catch (error: any) {
        console.error('Error sending message:', error?.message);
    }
};

export default sendPushNotification;
