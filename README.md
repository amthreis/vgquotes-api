# VGQuotes - API

A simple videogame quotes API. It uses a JSON "repository" file with all the quotes and an in-memory database that retrieves random quotes from the repo from times to times, and removes quotes from its own data when they've been there for long enough.

## Tech

- Express
- CORS
- Express-Rate-Limit
- (dev) Nodemon

## Installation

Clone it and do an `npm install`. You're gonna need a .env file (root folder) containing the following:

```
debug=true/false #if true, will also serve a debug page so you can easily see its data at /api/debug

min=3 #min seconds before trying to retrieve from repo again (random)
max=5 #max seconds before trying to retrieve from repo again (random)

CORS_ORIGIN=["http://localhost:XXXX"...] #array containing all the origins that it will allow to be accessed from
PORT=XXXX #port to listen at
```

Run `npm run dev` to start the server. You can see its data at /api.

You can display the data using the [VGQuotes-Client](https://gitlab.com/vgquotes/vgquotes-client).