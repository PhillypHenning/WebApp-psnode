const debug = require('debug')('app:goodreadsService');
const xml2js = require('xml2js');
const axios = require('axios');

const parser = xml2js.Parser({ explicitArray: false });
function goodreadService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.goodreads.com/book/show/50.xml?key=0V1ssJHuSAW8H4p74zhA')
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