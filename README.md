# hooks-toolbox

Collection of Hooks.


## Install

> Note: React 16.8+ is required for Hooks.

### With npm

```sh
npm i hooks-toolbox
```

### Or with yarn

```sh
yarn add hooks-toolbox
```

## API

- [Hooks](#hooks)
  - [`useGoogleApiInit()`](#usegoogleapiinit)

## Hooks

### `useGoogleApiInit()`

This Hook is designed for load https://apis.google.com/js/api.js, initialize Google API and handle sign status.

#### Arguments

`initConf: object`: object for Initialize the [gapi.client.init(args)](https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientinitargs).

#### Returns

Object containing:

- `gapiStatus: string`: `init` This status determines when is safe to use windows["gapi"] and gapi is initialized.
- `gapiError: object | string`: `null` The errors thrown.
- `signed: boolean`: `false` Sign status.
- `userProfile: object`: `null` User's basic profile information and token.



[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
