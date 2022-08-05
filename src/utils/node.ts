import * as crypto from 'crypto';
import { createClient } from 'redis';

export const client = createClient();
await client.connect();

export class Node<T> {
    private path: string;
    private pathHash: string;

    public constructor(path: string) {
        this.path = path;
        this.pathHash = crypto.createHash('md5').update(path).digest('hex');
    }

    public async exists(subPath: string): Promise<boolean> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.exists(`${this.pathHash}/${subPathHash}`);

        if (response === 0) {
            return false;
        } else {
            return true
        }
    }

    public async store(subPath: string, value: T): Promise<void> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.set(`${this.pathHash}/${subPathHash}`, JSON.stringify(value));
        
        if (response !== 'OK') {
            throw new Error(`Could not store "${value}" at "${this.path}/${subPath}"`);
        }
    }

    public async load(subPath: string): Promise<T> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.get(`${this.pathHash}/${subPathHash}`);

        if (response === null) {
            throw new Error(`Could not load "${this.path}/${subPath}"`);
        } else {
            return JSON.parse(response);
        }
    }

    public async delete(subPath: string): Promise<void> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.del(`${this.pathHash}/${subPathHash}`);

        if (response === 0) {
            throw new Error(`Could not delete "${this.path}/${subPath}"`);
        }
    }

    public async update(subPath: string, callback: (oldValue: T) => T): Promise<void> {
        const oldValue = await this.load(subPath);
        const newValue = callback(oldValue);
        await this.store(subPath, newValue);
    }
}
