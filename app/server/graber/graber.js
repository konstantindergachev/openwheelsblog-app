const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { catchErrors } = require('../handlers/errorHandlers');

const goForTheNews = async (url) => {
  const getData = await axios.get(url);
  if (getData.status === 200) {
    const html = getData.data;
    const $ = cheerio.load(html);
    const news = [];
    $('.ms-item-widget_items').each(function(i, elem) {
      news[i] = {
        img: $(this)
          .children('.ms-item--art')
          .children('.ms-item_thumb')
          .children('.ms-item_link')
          .children('.lazy-img')
          .attr('data-src'),
        title: $(this)
          .children('.ms-item--art')
          .children('.ms-item_info')
          .children('.ms-item_title')
          .children('.ms-item_link')
          .attr('title'),
        url: $(this)
          .children('.ms-item--art')
          .children('.ms-item_info')
          .children('.ms-item_title')
          .children('.ms-item_link')
          .attr('href'),
        tag: $(this)
          .children('.ms-item--art')
          .children('.ms-item_info')
          .children('.ms-item_info-top')
          .children('.ms-item_series')
          .children('.ms-item_link')
          .attr('title'),
      };
    });
    const updatedNews = news.filter((n) => n.img !== undefined && n).map(
      (n) =>
        n.url
          ? {
              img: n.img,
              title: n.title,
              url: `https://ru.motorsport.com${n.url}`,
              tag: n.tag,
            }
          : n
    );
    fs.writeFile(
      'app/data/motorsport.json',
      JSON.stringify(updatedNews, null, 2),
      (err) => console.log('File successfully written! Errors: ', err)
    );
  }
};

const wrappedFunction = catchErrors(goForTheNews);
wrappedFunction('https://ru.motorsport.com/');
