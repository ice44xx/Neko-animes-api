import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'Public';
export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);
