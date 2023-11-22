# shopy-server

## Description
- Auth operation
- CRUD operation
- Upload files to firebase

## Documentation
- swagger http://localhost:8000/docs#

## Configuration
_e.g. Configuration is via the following environment variables:_

| Env var      | Default                               | Example                      | Purpose                     |
| ------------ |---------------------------------------|------------------------------|-----------------------------|
| `PORT` | `8000`                                | `8000`                       | App port                    |
| `MONGODB` | `mongodb://localhost:27017/shopy_app` | `mongodb://localhost:27017/` | Mongo connection string     |
| `SALT` | `-`                                   | `2b$1...`                    | salt for hash functionality |
| `JWT_SECRET` | `-`                                   | `jwt`                        | jwt secret                  |
| `API_KEY` | `-`                                   | `Ana1sdf....`                | Firebase api key            |
| `PROJECT_ID` | `-`                                   | `project-id`                 | Firebase project id         |
| `STORAGE_BUCKET` | `-`                                   | `storage-name`               | Firebase storage bucket     |
| `APP_ID` | `-`                                   | `app-id`                     | Firebase app id             |
| `AUTH_DOMAIN` | `-`                                   | `domain`                     | Firebase auth domain        |
| `DEBUG` | `true`                                | `false`                      | Debug logger option         |
| `USE_JSON_LOGGER` | `false`                               | `true`                       | Json logger option          |

## Installation

```bash
$ npm install
```


## Populate the db with sample data

```bash
$ npm run populate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
