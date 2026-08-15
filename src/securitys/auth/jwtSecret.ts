import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const MIN_SECRET_LENGTH = 32;

let loadedSecret: string | null = null;

export const assertStrongSecret = (): string => {
    if (loadedSecret) {
        return loadedSecret;
    }
    const secret = process.env.SECRET || '';
    if (!secret || secret.length < MIN_SECRET_LENGTH) {
        throw new Error(
            `SECRET environment variable is missing or too weak. ` +
                `It must be at least ${MIN_SECRET_LENGTH} characters. ` +
                `Generate one with: ` +
                `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`,
        );
    }
    loadedSecret = secret;
    return secret;
};

export const getJwtSecret = (): string =>
    crypto.createHash('sha256').update(assertStrongSecret()).digest('hex');