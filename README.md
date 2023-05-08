# GlamHeaven

## Install

```
git clone https://github.com/ViktoriaJk/GlamHeaven
cd your-project-name
```

```
cd client
npm install
npm run dev
```

```
cd server
npm install
npm run build
npm run build-database
npm start
```

## Setup, Env variables

Client environment variables:

```
VITE_SERVER_URL = http://localhost:8000
VITE_BACKEND_PORT = 8000
VITE_CLIENT_ID = GOOGLE OAUTH CLIENT ID
VITE_REDIRECT_URI = http://localhost:5173/finishlogin
```

Server environment variables:

```
PORT=8000
MONGO_URI=THE URL OF THE MONGODB DATABASE
CLIENT_ID=GOOGLE OAUTH CLIENT ID
CLIENT_SECRET=GOOGLE OAUTH SECRET KEY
REDIRECT_URI=http://localhost:5173/finishlogin
JWT_SECRET=THE JWT SECRET KEY
```
