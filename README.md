# mafuyu-web

web frontend for mafuyu

## Requirements

```
$ yarn global add @angular/cli firebase-tools
```

## Install

```
$ yarn install
```

## Development

```
# development with angular
$ yarn start

# development with cloud functions
$ yarn build
$ firebase serve --only hosting,functions
```

## Deploy

```
$ yarn build
$ firebase deploy
```
