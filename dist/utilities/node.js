"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const crypto = require("crypto");
class Node {
    path;
    pathHash;
    client;
    constructor(path, client) {
        this.path = path;
        this.pathHash = crypto.createHash('md5').update(path).digest('hex');
        this.client = client;
    }
    async exists(subPath) {
        const response = await this.client.exists(`${this.path}/${subPath}`);
        if (response === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    async store(subPath, value) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await this.client.set(`${this.pathHash}/${subPathHash}`, JSON.stringify(value));
        if (response !== 'OK') {
            throw new Error(`Could not store "${value}" at "${this.path}/${subPath}"`);
        }
    }
    async load(subPath) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await this.client.get(`${this.pathHash}/${subPathHash}`);
        if (response === null) {
            throw new Error(`Could not load "${this.path}/${subPath}"`);
        }
        else {
            return JSON.parse(response);
        }
    }
    async delete(subPath) {
        const subPathHash = crypto.createHash('md5').update(subPath).digest('hex');
        const response = await this.client.del(`${this.pathHash}/${subPathHash}`);
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
exports.Node = Node;
//# sourceMappingURL=node.js.map