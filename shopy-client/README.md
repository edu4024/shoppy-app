# shopy-client

## Description
Simple shop where you can buy goods or sell your own.


## Configuration
_e.g. Configuration is via the following environment variables:_

| Env var      | Default                               | Example                      | Purpose                    |
| ------------ |---------------------------------------|------------------------------|----------------------------|
| `PORT` | `3000`                                | `3000`                       | App port                   |
| `API_URL` | `http://localhost:8000` | `http://localhost:8000` | Shopy-server url           |
| `AUTH_SECRET` | `-`                                   | `2b$1...`                    | auth secret |


## Installation
```bash
$ npm install
```

```bash
# generate auth secret
$ openssl rand -base64 32
```


## Running the app

```bash
# development mode
npm run dev
```

```bash
# build app
npm run build
```

```bash
# run built app
npm run start
```
