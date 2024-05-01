import { Actor } from 'apify';
import { fetchData } from './scrapers/mobalytics/dataFetching.js';
import { prepareData } from './scrapers/mobalytics/dataPreparation.js';
import { saveData } from './scrapers/dataSaving.js';
import { exitActor } from './scrapers/actorExiting.js';

(async () => {
  try {
    await Actor.init();
    const allData = await fetchData();
    const processedData = allData.map(prepareData);
    await saveData(processedData);
    await exitActor();
  } catch (error) {
    console.error('An error occurred:', error);
    await exitActor();
  }
})();
