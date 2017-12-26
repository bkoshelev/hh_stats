import { isCyrillic } from "./utils";

export default (wordsList = {}, limit = 10, isLanguageFilter = false) => {
  const wordsArr = [];

  for (let item in wordsList) {
    wordsArr.push([item, wordsList[item]]);
  }

  const result = (isLanguageFilter
    ? wordsArr.filter(item => {
        return !isCyrillic(item[0]);
      })
    : wordsArr
  )
    .sort(function(a, b) {
      return b[1] - a[1];
    })
    .slice(0, limit);

  return result;
};
