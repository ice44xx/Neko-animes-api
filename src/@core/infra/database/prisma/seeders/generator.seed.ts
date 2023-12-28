import { createRoles } from './roles.seed';
import { createAdmin } from './admin.seed';
import { createBackgrounds } from './backgrounds.seed';
import { createCategories } from './categories.seed';
import { createClassifications } from './classifications.seed';

export async function generateSeeds() {
  await createRoles();
  await createAdmin();
  await createBackgrounds();
  await createClassifications();
  await createCategories();
}
