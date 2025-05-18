import admin, { ServiceAccount } from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
const serviceAccount: ServiceAccount = {
    // type: ENV.FB_TYPE,
    projectId: ENV.FB_PROJECT_ID,
    // private_key_id: ENV.FB_PRIVATE_KEY_ID,
    privateKey: ENV.FB_PRIVATE_KEY,
    clientEmail: ENV.FB_CLIENT_EMAIL,
    // client_id: ENV.FB_CLIENT_ID,
    // auth_uri: ENV.FB_AUTH_URI,
    // token_uri: ENV.FB_TOKEN_URI,
    // auth_provider_x509_cert_url: ENV.FB_AUTH_PROVIDER_X509_CERT_URL,
    // client_x509_cert_url: ENV.FB_CLIENT_X509_CERT_URL,
    // universe_domain: ENV.FB_UNIVERSE_DOMAIN,
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
