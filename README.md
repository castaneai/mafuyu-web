# mafuyu-web

web frontend for mafuyu

## Requirements

```bash
yarn global add @angular/cli firebase-tools
```

## Install

```bash
yarn install
```

## Development

```bash
# development with angular
yarn start

# development with cloud functions
yarn build
firebase serve --only hosting,functions
```

## Deploy

```bash
yarn build
firebase deploy
```
