import { createRoles } from './roles.seed';
import { createAdmin } from './admin.seed';
import { createBackgrounds } from './backgrounds.seed';
import { createCategories } from './categories.seed';
import { createClassifications } from './classifications.seed';
import { createAnimes } from './animes.seed';
import { createTypesAnimes } from './types.seed';
import { createBackgroundsAuth } from './backgrounds-auth.seed';

export async function generateSeeds() {
  await createRoles();
  await createAdmin();
  await createTypesAnimes();
  await createClassifications();
  await createCategories();
  await createBackgrounds();
  await createBackgroundsAuth();
  await createAnimes();
}
