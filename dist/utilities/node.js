"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const redis_1 = require("redis");
class Node {
    path;
    client;
    constructor(path, url) {
        this.path = path;
        this.client = (0, redis_1.createClient)({ url: url });
        this.client.connect();
    }
    async exists(subPath) {
        const response = await this.client.exists(`${this.path}/${subPath}`);
        if (response == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    async store(subPath, value) {
        const response = await this.client.set(`${this.path}/${subPath}`, JSON.stringify(value));
        if (response != 'OK') {
            throw new Error(`Could not store "${value}" at "${this.path}/${subPath}"`);
        }
    }
    async load(subPath) {
        const response = await this.client.get(`${this.path}/${subPath}`);
        if (response == null) {
            throw new Error(`Could not load "${this.path}/${subPath}"`);
        }
        else {
            return JSON.parse(response);
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