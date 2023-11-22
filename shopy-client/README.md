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

#Note
 If when you run the app and faced with 401 error and login page doesn't avaliable
go to auth.config.ts file and comment the next code:
```typescript
authorized({ auth, request: { nextUrl } }) {
  /* const isLoggedIn = !!auth;
  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
  if (isOnDashboard) {
  return isLoggedIn;
  // Redirect unauthenticated users to login page
  } else if (isLoggedIn) {
  return Response.redirect(new URL('/dashboard/marketplace', nextUrl));
  }*/
  return true;
}
```
After fill the form and login. But after you need to go back to auth.config.ts 
and uncomment code.

Hope I fix it earlyer than you find it.
 



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
