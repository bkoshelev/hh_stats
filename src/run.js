import getVacanciesList from "./getVacanciesList";
import generateWordsList from "./generateWordsList";
import generateStats from "./generateStats";

export default async (params, limit, isLanguageFilter) => {
  const vacancies = await getVacanciesList(params);
  const wordsList = generateWordsList(vacancies);
  const stats = generateStats(wordsList, limit, isLanguageFilter);

  stats.forEach((word, index) => {
    console.log(`${index + 1}. ${word[0]}: ${word[1]}`);
  });
};
