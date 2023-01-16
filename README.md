# CRUD API

## PREVIEW

_The Used Stack:_ `nodeJS`, `TS`,

_Development Environment Deployment Tools:_ `nodemon`, `ts-node`

_Project Building Tools:_ `Webpack`, `WebpackCli`, `ts-loader (Webpack loader)`

_Testing Tools:_ `Mocha`, `Chai (Chai-http)`

### PORT AND LOCALHOST

You can change their in `.env` file

### BALANCER

Clusters are created for each processor, and they listen on each individual port

Clusters listen next ports: `[your_port + cluster_id]`

 The balancer distributes the load across all available clusters.

## START

### Single
- build bundle using webpack
```bash
npm run build
```

- development environment (start server and auto reboot)
```bash
npm run start:dev
```
- build bundle and run it (start server)
```bash
npm run start:prod
``` 

### Multi
- development environment for each CPU (start multi CPU server and auto reboot)
```bash
npm run start:dev:multi
```
- build bundle for each CPU and run it (start multi CPU server)
```bash
npm run start:prod:multi
```

## TESTING

USE TEST AFTER SERVER STARTING

Command starts all 5 scenarios.
```bash
npm run test
```

## API

#### GET

`api/users/` - get all users

USER:
- id: `string` - **required**
- username: `string` - **required**
- age: `number` - **required**
- hobbies: `Array<string>` or empty `Array` - **required**

_Return values:_ `Array<USER>` or empty `ARRAY`

#### POST
`api/users/` - add new user

- _Return values:_ **USER**

_Request body fields_

- username: `string` - **required**
- age: `number` - **required**
- hobbies: `Array<string>` or empty `Array` - **required**

#### PUT

`api/users/[number]` - update user

_Request body fields_

- `username: string` - **required**
- `age: number` - **required**
- `hobbies: Array<string>` or empty `Array` - **required**

_Return values:_ **USER**

#### DELETE

- `api/users/[number]` - delete user
