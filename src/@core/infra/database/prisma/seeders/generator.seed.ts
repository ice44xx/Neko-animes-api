import { createRoles } from './roles.seed';
import { createAdmin } from './admin.seed';
import { createBackgrounds } from './backgrounds.seed';
import { createCategories } from './categories.seed';
import { createClassifications } from './classifications.seed';
import { createAnimes } from './animes.seed';
import { createTypesAnimes } from './types.seed';
import { createBackgroundsAuth } from './backgrounds-auth.seed';
import { createSeasons } from './seasons.seed';
import { createEpisodes } from './episodes.seed';
import { createDubbeds } from './dubbeds.seed';

export async function generateSeeds() {
  await createRoles();
  await createAdmin();
  await createDubbeds();
  await createTypesAnimes();
  await createClassifications();
  await createCategories();
  await createAnimes();
  await createBackgrounds();
  await createSeasons();
  await createBackgroundsAuth();
  await createEpisodes();
}
