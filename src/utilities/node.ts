import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export class Node<T> {
    private path: string;
    private client: RedisClientType;

    public constructor(path: string, url?: string) {
        this.path = path;
        this.client = createClient({ url: url });
        this.client.connect();
    }

    public async store(subPath: string, value: T): Promise<void> {
        const response = await this.client.set(`${this.path}/${subPath}`, JSON.stringify(value));
        
        if (response != 'OK') {
            throw new Error(`Could not store "${value}" at "${this.path}/${subPath}"`);
        }
    }

    public async load(subPath: string): Promise<T> {
        const response = await this.client.get(`${this.path}/${subPath}`);

        if (response == null) {
            throw new Error(`Could not load "${this.path}/${subPath}"`);
        } else {
            return JSON.parse(response);
        }
    }

    public async update(subPath: string, callback: (oldValue: T) => T): Promise<void> {
        const oldValue = await this.load(subPath);
        const newValue = callback(oldValue);
        await this.store(subPath, newValue);
    }
}
