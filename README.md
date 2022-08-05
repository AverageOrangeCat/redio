# Redio

![Redio Logo](./img/redio-logo.png)

## Exists

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', client);
const exists = await users.exists('user@01');
console.log(exists);

```

## Store

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', client);
await users.store('user@01', {
    name: 'Bob',
    password: '12345' 
});

```

## Load

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', client);
const user = await users.load('user@01');
console.log(user);

```

## Delete

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', client);
await users.delete('user@01');

```

## Update

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', client);
await users.update('user@01', (user) => {
    user.name = 'James';
    return user;
});

```
