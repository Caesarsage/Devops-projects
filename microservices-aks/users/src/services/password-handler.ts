import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordHandler {
    static async compare(passwordFromUser: string, hashedPassword: string): Promise<boolean> {
        const [hashedPasswordWithoutSalt, salt] = hashedPassword.split('.');

        const hashedPasswordWithoutSaltBuffer = Buffer.from(hashedPasswordWithoutSalt, 'hex');
        const hashedPasswordBuffer = (await scryptAsync(passwordFromUser, salt, 64)) as Buffer;

        return hashedPasswordBuffer.toString('hex') === hashedPasswordWithoutSaltBuffer.toString('hex');
    }

    static async hash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buffer.toString('hex')}.${salt}`;
    }
}