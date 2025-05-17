import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
const serviceAccount = ENV.FIREBASE_CONFIG
    ? JSON.parse(ENV.FIREBASE_CONFIG)
    : {
          type: 'service_account',
          project_id: ENV.FIREBASE_PROJECT_ID,
          private_key_id: ENV.FIREBASE_PRIVATE_KEY_ID,
          private_key: ENV.FB_PRIVATE_KEY,
          client_email: ENV.FIREBASE_CLIENT_EMAIL,
          client_id: ENV.FIREBASE_CLIENT_ID,
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url:
              'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: ENV.FIREBASE_CLIENT_CERT_URL,
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
