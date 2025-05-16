import { required } from '@hapi/joi';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { IServiceAccount } from '../../interfaces';
dotenv.config();
const ENV = process.env;
const serviceAccount: IServiceAccount = {
    type: ENV.FB_TYPE || 'service_account',
    project_id: ENV.FB_PROJECT_ID || 'project_id',
    private_key_id: ENV.FB_PRIVATE_KEY_ID || 'private_key_id',
    private_key: ENV.FB_PRIVATE_KEY || 'private_key',
    client_email: ENV.FB_CLIENT_EMAIL || 'client_email',
    client_id: ENV.FB_CLIENT_ID || 'client_id',
    auth_uri: ENV.FB_AUTH_URI || 'auth_uri',
    token_uri: ENV.FB_TOKEN_URI || 'token_uri',
    auth_provider_x509_cert_url:
        ENV.FB_AUTH_PROVIDER_X509_CERT_URL || 'auth_provider_x509_cert_url',
    client_x509_cert_url: ENV.FB_CLIENT_X509_CERT_URL || 'client_x509_cert_url',
    universe_domain: ENV.FB_UNIVERSE_DOMAIN || 'universe_domain',
};
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
