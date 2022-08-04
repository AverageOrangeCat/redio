# Redio

![Redio Logo](./img/redio-logo.png)

## Exists

``` typescript
import { Node } from 'redio';
import { createClient } from 'redis';

interface User {
    name: string;
    password: string;
}

const main = async () => {
    const client = createClient();
    await client.connect();

    const users = new Node<User>('users', client);
    const exists = await users.exists('user@01');
    console.log(exists);
}

main();
```

## Store

``` typescript
import { Node } from 'redio';
import { createClient } from 'redis';

interface User {
    name: string;
    password: string;
}

const main = async () => {
    const client = createClient();
    await client.connect();

    const users = new Node<User>('users', client);
    await users.store('user@01', {
        name: 'Bob',
        password: '12345' 
    });
}

main();
```

## Load

``` typescript
import { Node } from 'redio';
import { createClient } from 'redis';

interface User {
    name: string;
    password: string;
}

const main = async () => {
    const client = createClient();
    await client.connect();

    const users = new Node<User>('users', client);
    const user = await users.load('user@01');
    console.log(user);
}

main();
```

## Delete

``` typescript
import { Node } from 'redio';
import { createClient } from 'redis';

interface User {
    name: string;
    password: string;
}

const main = async () => {
    const client = createClient();
    await client.connect();

    const users = new Node<User>('users', client);
    await users.delete('user@01');
}

main();
```

## Update

``` typescript
import { Node } from 'redio';
import { createClient } from 'redis';

interface User {
    name: string;
    password: string;
}

const main = async () => {
    const client = createClient();
    await client.connect();

    const users = new Node<User>('users', client);
    await users.update('user@01', (user) => {
        user.name = 'James';
        return user;
    });
}

main();
```
