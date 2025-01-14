const cheerio = require('cheerio');
const getTitle = require('./getTitle');
const keywords = require('../../src/data/keywords');

function getDataFromCheerio(html) {
  if (!html) throw new Error('There is nothing to load here');

  // let title = '';
  // let url = '';

  // Make an empty list
  let returnedArticles = [];

  const $ = cheerio.load(html);
  keywords.forEach((keyword) => { // search for each given keyword from keyword file/array
    $("a:contains('" + keyword + "')", html).each(function () {
      title = getTitle(
        $(this)
          .text()
          .replace(/(\r\n|\n|\r)/gm, '')
          .trim()
      );

      url = $(this).attr('href');

      returnedArticles.push({"title": title, "url": url}) // add each page search results to list
    });
  });

  return returnedArticles; // return full list
}

module.exports = getDataFromCheerio;
