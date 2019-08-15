const debug = require('debug')('app:goodreadsService');
const xml2js = require('xml2js');
const axios = require('axios');
var path = require('path');
var appDir = path.dirname(require.main.filename)
const { key } = require(`${appDir}/src/config/settings.json`)

const parser = xml2js.Parser({ explicitArray: false });
let id;

function goodreadService() {
  function getBookById(title) {

    return new Promise((resolve, reject) => {
      title = title.replace(/\ /g, '+');
      axios.get(`https://www.goodreads.com/book/title.xml?key=${key}&title=${title}`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              // I need to get the id out of this promise scope. TODO
              id = result.GoodreadsResponse.book.id;
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        })

      debug(`found id: ${id}`);
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=${key}`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          })
        })
        .catch((error) => {
          reject(error);
          debug(error);
        })
    })
  }
  return { getBookById }
}

module.exports = goodreadService();
