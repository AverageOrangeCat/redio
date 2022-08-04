import { RedisClientType } from '@redis/client';
export declare class Node<T> {
    private path;
    private pathHash;
    private client;
    constructor(path: string, client: RedisClientType);
    exists(subPath: string): Promise<boolean>;
    store(subPath: string, value: T): Promise<void>;
    load(subPath: string): Promise<T>;
    delete(subPath: string): Promise<void>;
    update(subPath: string, callback: (oldValue: T) => T): Promise<void>;
}
