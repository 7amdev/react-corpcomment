# CorpComment App

## Run

1. Install dependencies

```sh
npm install
```

2. Run the application

```sh
npm run dev
```

## Features

- [x] List feedback
  - Loads data from a server
- [x] Create feedback
  - Saves data to a local server
  - Validates user feedback input
  - Signals user if registatin is successfully or unsuccessfully
  - Hide error messages after 2 seconds
- [x] Upvote feedback
  - Send PATCH request to a server
- [x] Filter feedback by company name

## Branches

- main
- version/only-props
- version/with-zustand

## Dependencies

- React
- Zustand
- json-server
