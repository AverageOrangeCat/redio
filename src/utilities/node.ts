import * as crypto from 'crypto';
import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export class Node<T> {
    private path: string;
    private pathHash: string;
    private client: RedisClientType;

    public constructor(path: string, url?: string) {
        this.path = path;
        this.pathHash = crypto.createHash('md5').update(path).digest('hex');
        this.client = createClient({ url: url });
        this.client.connect();
    }

    public async exists(subPath: string): Promise<boolean> {
        const response = await this.client.exists(`${this.path}/${subPath}`);

        if (response == 0) {
            return false;
        } else {
            return true
        }
    }

    public async store(subPath: string, value: T): Promise<void> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await this.client.set(`${this.pathHash}/${subPathHash}`, JSON.stringify(value));
        
        if (response != 'OK') {
            throw new Error(`Could not store "${value}" at "${this.path}/${subPath}"`);
        }
    }

    public async load(subPath: string): Promise<T> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await this.client.get(`${this.pathHash}/${subPathHash}`);

        if (response == null) {
            throw new Error(`Could not load "${this.path}/${subPath}"`);
        } else {
            return JSON.parse(response);
        }
    }

    public async delete(subPath: string): Promise<void> {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await this.client.del(`${this.pathHash}/${subPathHash}`);

        if (response == 0) {
            throw new Error(`Could not delete "${this.path}/${subPath}"`);
        }
    }

    public async update(subPath: string, callback: (oldValue: T) => T): Promise<void> {
        const oldValue = await this.load(subPath);
        const newValue = callback(oldValue);
        await this.store(subPath, newValue);
    }
}
