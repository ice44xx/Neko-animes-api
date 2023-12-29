import { createRoles } from './roles.seed';
import { createAdmin } from './admin.seed';
import { createBackgrounds } from './backgrounds.seed';
import { createCategories } from './categories.seed';
import { createClassifications } from './classifications.seed';
import { createAnimes } from './animes.seed';

export async function generateSeeds() {
  await createRoles();
  await createAdmin();
  await createClassifications();
  await createCategories();
  await createBackgrounds();
  await createAnimes();
}
