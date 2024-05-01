import { Actor } from 'apify';

export async function saveData(data) {
  try {
    console.log(data);
    await Actor.pushData(data);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}
