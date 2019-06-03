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

## Schema

```json
[
  {
    "id": "string-cases",
    "name": "String Cases",
    "desc": "Конвертирует название переменной в различные регистры",
    "href": "https://vovanr.github.io/string-cases",
    "source": "https://github.com/VovanR/string-cases",
    "date": "2019-04-01",
    "icon": "/logo.svg",
    "tags": [
      "converter",
      "development",
      "text"
    ]
  },
  {
    "id": "ruler",
    "name": "Ruler",
    "desc": "Экранная линейка",
    "href": "https://vovanr.github.io/ruler",
    "source": "https://github.com/VovanR/ruler",
    "date": "2018-07-25",
    "icon": "/logo.svg",
    "tags": [],
    "disabled": true
  }
]
```

## Build

```shell
npm run build
```

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)
