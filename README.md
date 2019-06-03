# services-json

> My services list

## Usage

```js
const SERVICES_JSON_URL = "https://vovanr.github.io/services-json/dist/services.json";

function fetchServicesJSON() {
  return fetch(SERVICES_JSON_URL).then(resp => resp.json());
}

fetchServicesJSON()
  .then(console.log)
  //=> [{id: '', name: '', desc: '', ...}, ...]
```

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)
