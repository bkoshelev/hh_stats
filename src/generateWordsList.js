export default (vacancies = []) => {
  const wordsMap = {};

  vacancies.forEach(item => {
    const newWords =
      (item.snippet.requirement ? item.snippet.requirement : "") +
      " " +
      (item.snippet.responsibility ? item.snippet.responsibility : "") +
      " " +
      (item.description ? item.description : "");

    const words = newWords
      ? newWords.replace(/[.,\/#!$%\^&\*;:{}\<=\>_`~\(\)]/g, " ").split(" ")
      : [];

    words.forEach(word => {
      var str = word;
      var reg = />(.*)</g;
      const match = reg.exec(str);

      const key = (match ? match[1] : word).toLowerCase().trim();

      if (!["", "highlighttext", "<highlighttext", "-"].includes(key)) {
        let oldValue = wordsMap[key];
        const value = oldValue === undefined ? 1 : oldValue + 1;

        wordsMap[key] = value;
      }
    });
  });

  return wordsMap;
};
