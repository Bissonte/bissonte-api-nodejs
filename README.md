# bissonte-api-nodejs

Node.js Bissonte API SDK(Client)

## Installation

Using npm:

`npm i @bissonte/api-nodejs`

Using yarn:

`yarn add @bissonte/api-nodejs`

## Getting started

Go to [bissonte.com](https://docs.bissonte.com/bissonte/getting-started) and create account, if you do not have one yet, and generate API key token.

You are ready to start using `@bissonte/api-nodejs` library.

## Usage

```js
import { Client } from '@bissonte/api-nodejs';

const client = new Client('TOKEN');

const queues = await client.queueService.getAllQueues();
```
