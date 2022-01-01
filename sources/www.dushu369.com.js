const baseUrl = "http://www.dushu369.com";
/**
 * 搜索
 * @params {string} key
 * @returns {[{name, author, cover, detail}]}
 */
const search = (key) => {
  let response = GET(
    `${baseUrl}/book/search.asp?Keyword=${ENCODE(
      key,
      "gb2312"
    )}&select=Article&Submit=%EF%BF%BD%EF%BF%BD%EF%BF%BD%EF%BF%BD&Field=Title|char=gbk`
  );
 //此部分抄了某位大大的搜索地址
  let array = [];
  let data = HTML.parse(response);
  let $ = data("a.a0");
  $.forEach((child) => {
    let data = child.text().match("《(.*)》 (.*)");
    if (data !== null) {
      array.push({
        name: data[1],
        author: data[2],
        detail: baseUrl + child.attr("href"),
      });
    }
    console.log(array);
  });
  return JSON.stringify(array);
};

/**
 * 详情
 * @params {string} url
 * @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
 */
const detail = (url) => {
  let book = {
    catalog: url,
  };
  return JSON.stringify(book);
};

/**
 * 目录
 * @params {string} url
 * @returns {[{name, url, vip}]}
 */
const catalog = (url) => {
  let response = GET(url);
  let array = [];
  let $ = HTML.parse(response);
  $("td.content>table>tbody>tr>td>a").forEach((p) => {

      array.push({
        name: p.text(),
        url: baseUrl + p.attr("href"),
      });
  });
  return JSON.stringify(array);
};

/**
 * 章节
 * @params {string} url
 * @returns {string}
 */
const chapter = (url) => {
  let array = [];
  let response = GET(url);
  let $ = HTML.parse(response);
  $("td.content>p").forEach((p) => {
    if (p.text() !== "　") {
    array.push(p);
    }
  });
  let content = array.toLocaleString("\n")

  return content;
};

var bookSource = JSON.stringify({
  name: "369读书网",
  url: "dushu369.com",
  version: 106,
});
