import * as crypto from 'crypto';
import { createClient } from 'redis';
export const client = createClient();
await client.connect();
export class Node {
    path;
    pathHash;
    constructor(path) {
        this.path = path;
        this.pathHash = crypto.createHash('md5').update(path).digest('hex');
    }
    async exists(subPath) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.exists(`${this.pathHash}/${subPathHash}`);
        if (response === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    async store(subPath, value) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.set(`${this.pathHash}/${subPathHash}`, JSON.stringify(value));
        if (response !== 'OK') {
            throw new Error(`Could not store "${value}" at "${this.path}/${subPath}"`);
        }
    }
    async load(subPath) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.get(`${this.pathHash}/${subPathHash}`);
        if (response === null) {
            throw new Error(`Could not load "${this.path}/${subPath}"`);
        }
        else {
            return JSON.parse(response);
        }
    }
    async delete(subPath) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await client.del(`${this.pathHash}/${subPathHash}`);
        if (response === 0) {
            throw new Error(`Could not delete "${this.path}/${subPath}"`);
        }
    }
    async update(subPath, callback) {
        const oldValue = await this.load(subPath);
        const newValue = callback(oldValue);
        await this.store(subPath, newValue);
    }
}
//# sourceMappingURL=node.js.map