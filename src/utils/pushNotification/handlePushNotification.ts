import { required } from '@hapi/joi';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
const serviceAccount = process.env.FIREBASE_CONFIG
    ? JSON.parse(process.env.FIREBASE_CONFIG)
    : {
          type: 'service_account',
          project_id: 'hrm-metal-745e1',
          private_key_id: 'b845c1f2103aa02c7093efc3e23b2e1316e91414',
          private_key:
              '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCL7mfBGwZZOUAc\n8gPSggz7GG5foO4negf4vxUeh6PCwFOFrm3Cvxu6PMVY2kSmP1K/AhaJ8aoWr/OA\nS55v50RGwQtGuD8kiVYhfzso8HePWNySFBuX/ec8hy6BAQ1QPrugv/dWaaZMndP0\ngOVdqMHxy2octr1xXQIJ2qsmXhWT38G7NDageI4sctD/cuJ6x9Ejo0ncV1xj1UvH\nGrlcUCgwbB1+GN1Uw5LLCU4ufPgGDpMfpI8HS6NyVhR09vuY+ViQOPiStZtORO/H\nTcujTtB3x2d+ifmWbQAznXF17pLdx+0Y+bBLRUeObmNR+K5pNNc+pFNTzccx+96c\nZn4yuq8pAgMBAAECggEAGW1wEyobBDmgCeJ8iVMykqpE3EG9JRVKv4vRhaO2QVx7\nkO46acoaesQyREwdb2xQV/9EIzrz4n2ErQqQttr6kDTiHK68YqJGMX4SPQU9ZKIM\nKstWnE76JwiVjcGoLq3HoJVhl6VJH+EKNAL8KwHQhGSnWqJmWGRDS5EdyrIMD7uz\nftosS8pRzxoOj+S7tvke8QB00Uloiupe9Olxawwe1jp5dC5+u4ONAPOWMXb5MXck\nJoBfzzOoBBpH58NNf/K5ci8wPucPa3b0fBTM4XMe441nbOrAb1bdXo+jr+w8zdsQ\n6fiv34h49U16lHTDQfHpfgZq9t6MBOMhJB8vGHop1QKBgQDENIPiUC8Qy9o7Lxq8\ni7xg0N5BOymOQK6Kz7pVBGmHPwodwzVKBZ83qzgiLmQSqe7mrKEW7BujPFl10rdz\nk2i0j3ZmugycQM2Nfn4sN2XOxTguerU3Dcj7BrEnUDqyXIMSNbV1Lry6xzQLmer2\nCG2uhTQ6vDpcfWAsCCX2qVCqwwKBgQC2k4d7rJnEBtoG/kERzEnjMnk90Szn8ozM\nt/8oKh+jtVu6lWwDvB9WD9UlRVrapS7ANkvtOjfdIk+ubsKLwbe76KulNmuuiZmF\nbh9gAH4vGtT6lSoBwKdbwOzX3FDT4nTtAiTT/R6reteMR2fGSt6aKXUP28BTON89\nDZ0LiBjnowKBgAYtHQWvvnuJ3znDttS+lVR63rQw95LpyFTISzZH6EaAnoHnVjMZ\nUDTBaAfza+UGgmWyg3OkRQ5zZOGHm4zA1Cfy6Cg9rQ3yIEZW+APOTp8eqDEWXcP4\n5B26zTLOnLpmnR2ioS6qJPjAMow28SWDiGhY+xbqO/ATZkacjw1fsRFfAoGBAKy8\nleFf4rdBWERnh77EDmADYAwpfJgStj32E1W3zOmBa8DzIBfEg81T+3Bg1t2ojLvU\nYy+V9kak8MhzCGNbq28Aam1MOMMQcox4LP0SWlBMzZYrTGwODwlTVYHBc0OUrNWU\nQq3CfKL2/To+UKOeME+gy51uZt8WHrfPynaflBiLAoGBAK5GldNCC61j2hyht1Qz\nintZpvkltI/eDfn0SwnQeDvQSsnqPOt4YPMpyZ5RxxkYJUMi8OdyFDsIhPC2/4/C\nl0Zsd7dWEhWuBnnrJayN8GlaReYy2l82lSk+41pA102Z14DK8zUSF+XLeMfSFYjX\n+3pqtSVTuNuTtLZbkXI2AaJx\n-----END PRIVATE KEY-----\n',
          client_email:
              'firebase-adminsdk-769h3@hrm-metal-745e1.iam.gserviceaccount.com',
          client_id: '111623153629374496704',
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url:
              'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url:
              'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-769h3%40hrm-metal-745e1.iam.gserviceaccount.com',
          universe_domain: 'googleapis.com',
      };

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
