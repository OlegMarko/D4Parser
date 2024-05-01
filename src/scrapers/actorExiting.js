import { Actor } from 'apify';

export async function exitActor() {
  try {
    await Actor.exit();
  } catch (error) {
    console.error('Error exiting actor:', error);
    process.exit(1); // Force exit on error
  }
}
