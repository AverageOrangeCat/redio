# Redio

<center>

![Redio Logo](./img/redio-logo.png)

</center>

## Store

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', /** optional redis://alice:foobared@awesome.redis.server:6380**/);

await users.store('user@01', {
    name: 'Bob',
    password: '12345' 
});
```

## Load

``` typescript
import { stdout } from 'process';
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', /** optional redis://alice:foobared@awesome.redis.server:6380**/);

const user = await users.load('user@01');
stdout.write(`${user}\n`);
```

## Update

``` typescript
import { Node } from 'redio';

interface User {
    name: string;
    password: string;
}

const users = new Node<User>('users', /** optional redis://alice:foobared@awesome.redis.server:6380**/);

await users.update('user@01', (user) => {
    user.name = 'James';
    return user;
});
```
