import { required } from '@hapi/joi';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { IServiceAccount } from '../../interfaces';
dotenv.config();
const ENV = process.env;
const serviceAccount = ENV.FIREBASE_CONFIG
    ? JSON.parse(ENV.FIREBASE_CONFIG)
    : {
          type: ENV.FB_TYPE,
          project_id: ENV.FB_PROJECT_ID,
          private_key_id: ENV.FB_PRIVATE_KEY_ID,
          private_key: ENV.FB_PRIVATE_KEY,
          client_email: ENV.FB_CLIENT_EMAIL,
          client_id: ENV.FB_CLIENT_ID,
          auth_uri: ENV.FB_AUTH_URI,
          token_uri: ENV.FB_TOKEN_URI,
          auth_provider_x509_cert_url: ENV.FB_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: ENV.FB_CLIENT_X509_CERT_URL,
          universe_domain: ENV.FB_UNIVERSE_DOMAIN,
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
