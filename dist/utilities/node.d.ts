export declare class Node<T> {
    private path;
    private client;
    constructor(path: string, url?: string);
    store(subPath: string, value: T): Promise<void>;
    load(subPath: string): Promise<T>;
    update(subPath: string, callback: (oldValue: T) => T): Promise<void>;
}
