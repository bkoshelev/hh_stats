import hhStatsData from "../hh_stats.json";
import axios from "axios";

// "experience": [
//     "id": "noExperience",
//     "id": "between1And3",
//     "id": "between3And6",
//     "id": "moreThan6",
//   }

export default async () => {
  try {
    const hh_instance = axios.create({
      baseURL: "https://api.hh.ru/",
      timeout: 1000,
      headers: { "X-Custom-Header": "MyApp/1.0 (my-app-feedback@example.com)" }
    });

    const params = hhStatsData.params;

    const test = await hh_instance.get("/vacancies", {
      params: params
    });

    let { pages, found } = await test.data;

    console.log(`${found} vacancies in ${pages} pages founded`);

    if (found > 1999) {
      pages = Math.floor(1999 / hhStatsData.params.per_page);
    }

    let vacanciesList = [];

    for (let page = 0; page < pages + 1; page++) {
      params.page = page;

      const response = await hh_instance.get("/vacancies", {
        params: params
      });

      const vacancies = response.data.items;

      vacanciesList = [...vacanciesList, ...vacancies];
    }

    const result = vacanciesList;
    return result;
  } catch (error) {
    console.warn("произошла ошибка во время обращения к HH");
    console.warn("error >>>", error);
  }
};
