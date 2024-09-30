import { required } from '@hapi/joi';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
console.log(ENV.FB_PRIVATE_KEY!);
const serviceAccount = ENV.FIREBASE_CONFIG
    ? JSON.parse(ENV.FIREBASE_CONFIG)
    : {
          type: ENV.FB_TYPE!,
          project_id: ENV.FB_PROJECT_ID!,
          private_key_id: ENV.FB_PRIVATE_KEY_ID!,
          private_key: ENV.FB_PRIVATE_KEY!.replace(/\\n/g, '\n'),
          client_email: ENV.FB_CLIENT_MAIL!,
          client_id: ENV.FB_CLIENT_ID!,
          auth_uri: ENV.FB_AUTH_URI!,
          token_uri: ENV.FB_TOKEN_URI!,
          auth_provider_x509_cert_url: ENV.AUTH_PROVIDER_X509_CERT_URL!,
          client_x509_cert_url: ENV.FB_CLIENT_X509_CERT_URL!,
          universe_domain: ENV.FB_UNIVERSE_DOMAIN!,
      };
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
