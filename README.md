# react-hooks-toolbox

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

Collection of Hooks.

## Install

> Note: React 16.8+ is required for Hooks.

### With npm

```sh
npm i react-hooks-toolbox
```

### Or with yarn

```sh
yarn add react-hooks-toolbox
```

## Run samples

- Clone repository
- `yarn install` or `npm install`
- Install [json-server](https://www.npmjs.com/package/json-server) `npm i json-server` or `yarn add global json-server`(Get a full fake REST API with zero coding in less than 30 seconds (seriously))
- `yarn run run:server`
- `yarn run start`

## API

- [Hooks](#hooks)
  - [Axios-API](#axios-api)
    - [`useAxiosGet()`](#useaxiosget)
    - [`useAxiosPost()`](#useaxiospost)
  - [Google-API](#google-api)
    - [`useGoogleApiInit()`](#usegoogleapiinit)
  - [DYMO-API](#dymo-api)
    - [`useDymoCheckService()`](#usedymocheckservice)
    - [`useDymoFetchPrinters()`](#usedymofetchprinters)
    - [`useDymoOpenLabel()`](#usedymoopenlabel)

## Hooks

## [Axios-API](https://github.com/axios/axios)

### `useAxiosGet()`

`GET` request

#### Arguments

- `url: string`: The request URL.
- `axiosInsance: axios`: (OPTIONAL) The custom axios instance.
- `options: object`: (OPTIONAL) Config option of [axios](https://github.com/axios/axios).
- `delay: number`: (OPTIONAL) Request delay.
- `successCb: function`: (OPTIONAL) Callback triggered when the request was successfully executed.
- `failedCb: function`: (OPTIONAL) Callback triggered when the request returned an error.
- `onlyDispathcIf: bool`: (OPTIONAL) Only the request is dispatched when this property is `true`
- `controlledFetch: bool`: (OPTIONAL) This property causes the request to run only when the `dispatchFetch` function is called

#### Returns

Object containing:

- `status: string`: Request status.
- `response: object`:` Request response.
- `error: object`: Request error.
- `dispatchFetch: function`: Dispatched request if `controlledFetch` property is `true`.

#### Example

```js
import { useAxiosGet } from "react-hooks-toolbox";

const ListPosts = () => {
  const { status, response } = useAxiosGet({
    ....
  });

  ......
};
```

### `useAxiosPost()`

`POST` request

#### Arguments

- `url: string`: The request URL.
- `axiosInsance: axios`: (OPTIONAL) The custom axios instance.
- `options: object`: (OPTIONAL) Config option of [axios](https://github.com/axios/axios).
- `delay: number`: (OPTIONAL) Request delay.
- `successCb: function`: (OPTIONAL) Callback triggered when the request was successfully executed.
- `failedCb: function`: (OPTIONAL) Callback triggered when the request returned an error.
- `onlyDispathcIf: bool`: (OPTIONAL) Only the request is dispatched when this property is `true`
- `controlledFetch: bool`: (OPTIONAL) This property causes the request to run only when the `dispatchFetch` function is called

#### Returns

Object containing:

- `status: string`: Request status.
- `response: object`:` Request response.
- `error: object`: Request error.
- `dispatchFetch: function`: Dispatched request if `controlledFetch` property is `true`.

## Google-API

### `useGoogleApiInit()`

This Hook is designed for load https://apis.google.com/js/api.js, initialize Google API and handle sign status.

#### Arguments

- `initConf: object`: object for Initialize the [gapi.client.init(args)](https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientinitargs).

#### Returns

Object containing:

- `gapiStatus: string`: `init` This status determines when is safe to use windows["gapi"] and gapi is initialized.
- `gapiError: object | string`: `null` The errors thrown.
- `signed: boolean`: `false` Sign status.
- `userProfile: object`: `null` User's basic profile information and token.

## DYMO-API

### `useDymoCheckService()`

Return the status of DYMO Label Web Service

#### Arguments

- `port: number`:(OPTIONAL) The port of running DYMO Label Web Service.

#### Returns

- `status: string`: `"init"`: `"init" | "loading" | "success" | "error"` Status of DYMO Label Web Service.

### `useDymoFetchPrinters()`

Returns the available DYMO Labelwriter Printer

#### Arguments

- `statusDymoService: string`: The status of DYMO Label Web Service.
- `modelPrinter: string`: The model of label writer printer.
- `port: number`: The port of running DYMO Label Web Service.

#### Returns

Object containing:

- `statusDymoFetchPrinters: string`: `"init"`: `"init" | "loading" | "success" | "error"` Status of loading printers.
- `printers: array`: `[]` The list of available DYMO Printer.

### `useDymoOpenLabel()`

Render Label

#### Arguments

- `statusDymoService: string`: The status of DYMO Label Web Service.
- `labelXML: xml file`: XML file.
- `port: number`:(OPTIONAL) The port of running DYMO Label Web Service.

#### Returns

Object containing:

- `label`
- `statusOpenLabel: string`: `"init"`: `"init" | "loading" | "success" | "error"` Status of render label.
- `errorOpenLabel`

#### Example

```js
import { useDymoOpenLabel, useDymoCheckService } from "react-hooks-toolbox";

const DymoLabelPreview = () => {
  const statusDymoService = useDymoCheckService();
  const { label, statusOpenLabel, errorOpenLabel } = useDymoOpenLabel(
    statusDymoService,
    xmlFile
  );

  if (label) {
    return (
      <img src={"data:image/png;base64," + label} alt="dymo label preview" />
    );
  } else {
    return null;
  }
};
```
[npm-image]: https://img.shields.io/npm/v/react-hooks-toolbox.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-hooks-toolbox
[download-image]: https://img.shields.io/npm/dm/react-hooks-toolbox.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-hooks-toolbox