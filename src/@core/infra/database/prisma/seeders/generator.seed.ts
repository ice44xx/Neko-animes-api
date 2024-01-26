import { createRoles } from './roles.seed';
import { createAdmin } from './admin.seed';
import { createBackgrounds } from './backgrounds.seed';
import { createClassifications } from './classifications.seed';
import { createAnimes } from './animes.seed';
import { createBackgroundsAuth } from './backgrounds-auth.seed';
import { createSeasons } from './seasons.seed';

export async function generateSeeds() {
  await createRoles();
  await createAdmin();
  await createClassifications();
  await createBackgrounds();
  await createBackgroundsAuth();
  await createAnimes();
  await createSeasons();
  
}
