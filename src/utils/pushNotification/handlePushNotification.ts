import admin, { ServiceAccount } from 'firebase-admin';
import dotenv from 'dotenv';
// import serviceAccount from '../../../serviceAccount/serviceAccountKey.json';
dotenv.config();
const ENV = process.env;
const serviceAccount: ServiceAccount = {
    projectId: ENV.FB_PROJECT_ID || '',
    privateKey: ENV.FB_PRIVATE_KEY || '', // Handle escaped newlines
    clientEmail: ENV.FB_CLIENT_MAIL || '',
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
