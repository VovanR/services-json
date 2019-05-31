const fs = require("fs");
const path = require("path");

const SRC_DIR = "./src/";
const SERVICES_DIR = path.resolve(SRC_DIR, "services");
const DIST_DIR = "./dist/";
const DIST_FILENAME = "services.json";

function getIdFromFileName(file) {
  return file.replace(/\.json$/, "");
}

function getServiceDateObject(service) {
  return service.getDateObject();
}

function sortByDate(serviceA, serviceB) {
  return getServiceDateObject(serviceA) - getServiceDateObject(serviceB);
}

function sortByDateDesc(serviceA, serviceB) {
  return sortByDate(serviceB, serviceA);
}

function sortServicesByDateDesc(services) {
  return services.sort(sortByDateDesc);
}

function servicesToJSON(services) {
  return services.map(service => service.toJSON());
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

function readJSONFile(path) {
  return readFile(path).then(JSON.parse);
}

class Service {
  constructor({ filename, basedir }) {
    this._path = path.resolve(basedir, filename);
    this._id = getIdFromFileName(filename);

    this._content = null;
  }

  _processFileContent(fileContent) {
    return {
      id: this._id,
      ...fileContent
    };
  }

  _getContent() {
    return this._content;
  }

  getDateObject() {
    return new Date(this._getContent().date);
  }

  read() {
    return readJSONFile(this._path)
      .then(json => this._processFileContent(json))
      .then(json => (this._content = json))
      .then(() => this);
  }

  toJSON() {
    return this._getContent();
  }
}

function createService(filename) {
  return new Service({
    basedir: SERVICES_DIR,
    filename
  });
}

function stringify(json) {
  return JSON.stringify(json, null, 2);
}

fs.readdir(SERVICES_DIR, (err, fileNames) => {
  const services = fileNames.map(createService);

  Promise.all(services.map(service => service.read()))
    .then(sortServicesByDateDesc)
    .then(servicesToJSON)
    .then(stringify)
    .then(servicesContent => {
      fs.writeFileSync(
        path.resolve(DIST_DIR, DIST_FILENAME),
        servicesContent,
        "utf-8"
      );
    });
});
