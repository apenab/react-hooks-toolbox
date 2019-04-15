# react-hooks-toolbox

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

## API

- [Hooks](#hooks)
  - [Google-API](#google-api)
    - [`useGoogleApiInit()`](#usegoogleapiinit)
  - [DYMO-API](#dymo-api)
    - [`useDymoCheckService()`](#usedymocheckservice)
    - [`useDymoFetchPrinters()`](#usedymofetchprinters)
    - [`useDymoOpenLabel()`](#usedymoopenlabel)

## Hooks

## Google-API

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

## DYMO-API

### `useDymoCheckService()`

Return the status of DYMO Label Web Service

#### Arguments

`port: number`: The port of running DYMO Label Web Service.

#### Returns

Array containing:

- `message: string`: `""` The errors thrown.
- `status: string`: `"init"`: `"init" | "loading" | "success" | "error"` Status of DYMO Label Web Service.

### `useDymoFetchPrinters()`

Returns the available DYMO Labelwriter Printer

#### Arguments

`port: number`: The port of running DYMO Label Web Service.
`statusDymoService: string`: The status of DYMO Label Web Service.

#### Returns

Array containing:

- `printers: array`: `[]` The list of available DYMO Labelwriter Printer.
- `status: string`: `"init"`: `"init" | "loading" | "success" | "error"` Status of loading printers.

### `useDymoOpenLabel()`

Render Label

#### Arguments

`labelXML: xml file`: XML file.
`statusDymoService: string`: The status of DYMO Label Web Service.
`port: number`: The port of running DYMO Label Web Service.

#### Returns

Array containing:

- `label`:
- `status: string`: `"init"`: `"init" | "loading" | "success" | "error"` Status of render label.

#### Example

```js
import { useDymoOpenLabel, useDymoCheckService } from "react-hooks-toolbox";

const DymoLabelPreview = () => {
  const [msg, statusDymoService] = useDymoCheckService();
  const [label, status] = useDymoOpenLabel(statusDymoService, xmlFile);

  if (label) {
    return (
      <img src={"data:image/png;base64," + label} alt="dymo label preview" />
    );
  } else {
    return null;
  }
};
```
