import admin, { ServiceAccount } from 'firebase-admin';
import dotenv from 'dotenv';
import { IServiceAccount } from '../../interfaces/serviceAccount/IServiceAccount.interface';
dotenv.config();
const ENV = process.env;
const serviceAccount: ServiceAccount = {
    projectId: 'hrm-metal-745e1',
    privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLLZCCoK+aCE5O\ngMPDJP5+hLpa7tqZ+oukKQuVywxV+KeImvJteY22AAoAtWeShMVhLRgZJIaCkuBp\nW/+2CdZ+Qsuw6B54h0MSUckcj3iPIM1YPKR1MPKN2aX6anlBjld47o9KJ9TV8uoc\n00S1+y4jG3o3LRj1SLo77tMT89cv9OP+Px6E1ksyLePPgTkL8LZ//fsBGkGlHElF\naWHWGwknlJ0nIlVVJ+G5/4Hy5JBWbk1JgOjL9gOxJxySp3JE7GLiqVm9qxPa3Xdp\nKzV+wUUPpsyOcmoBkstINMt4SgahmxFmqyezmtKdit6miXeeGL8T6gW/mhpjn6yV\nXTd/PM8RAgMBAAECggEAMxN2rCmyJ/ISYsbokM4bw2yMQ2DSwp1q78TMZp2MmmRV\nf1F11G0+b2NWSGpKZz/oe8Ajzt5TqsmiJ6hGkJTNrapvvC2DOTJSj/+JsbyJPuWH\n1nDy3bsn2JzeR6cZdtB5E31hApLZjebGuetilPJoPSQRVvxq42FcTzBXMERVXViU\nXL3kCJ+r6vdnlaMo41F/EqR9YBB3lh7fhnbmKCYDCVRPfKWhXQd6yYQLinroy5Un\naagCvmdd2mG38LKnKiLJ44yc/Wfu8kAlYitMvZBZnc+lMrauHPmrNd83b3rfuWkR\nxpxitwqLlw2VxiOniSpMKIrZ+6tVvpI7lih9ukCCLQKBgQC5ApZ7bM4wJ9BLi+Zm\nN3BWANBNtXIeQtT0VF0LSPndMv46K23k3VaEBubhsQXVS3nXDYnhXOpX/QkwNnxd\nEOBk8ckh/ywO2Qoy0UspNuptX/cghpymHafSQ4H3Wcu4mZXECuUy8UTqCZSdJqb7\nEGaj+SwsU+yqp9j3H3/zCeIEHwKBgQDAlOtxB4lZvN+d2gzsEpr7nyWsI9xBVHqj\nz3YyemTuA5o946BzHz1fhQ/+Ol8w0xhzDb52WdokJ4C/9ZMby1IPu/LDvARVH3fM\nAOSKbLhKzMjFQ4ntnl85nH/Z2U3ECfMRI0tSkjt7twWFcYV2BRzyh/MNpTn533oB\nkmO5aEVGzwKBgQCUGAo1CkeSLIyDrJzlPYNilIwpaBDNQFoOqmlAW04HToZKMfFp\nvfM/A/dUucsdjakeB+xSxXmgrR/pw/OQ262DoDeMSyINUJblTruHZjoJC0RaeOZz\n4lEv8nHaebqlLevAXahSOucbIEgh84q+dcZzg0Vkxlkv0ePPDRvyg/qzqQKBgAaL\nSPDfU7CD9YlUponDHBce0lXmJg7mQwCcBSUz+YgJAU3HFWW0Ew7S47c83o03LyaB\nug4lgX8nBH4BZ01TfGdieJ5kHjWSSyzYfuuhRCXujYf+gopbjlrT0ZhihPz7ZZIY\ng++7XmAW2Q4uzF01UUWAjybQjYbLLEcvZUogm/ILAoGABSdLppfI9kkkEZ3pIl3+\nU3KziGg9dEhowHPOjJWMng1UW34nX67hiJUP3mCigPbMnVWuaChS6UsKdGTVEkl/\nCf7WwKCPQ8Un7lsHSHCLU8bvraQWQtoWMv7Q/h4VF2q6FXVSAYn8wxA0ORKsqMlI\nDVTvvHTAqHVb6jN2yhZB1+0=\n-----END PRIVATE KEY-----\n',
    clientEmail:
        'firebase-adminsdk-769h3@hrm-metal-745e1.iam.gserviceaccount.com',
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
