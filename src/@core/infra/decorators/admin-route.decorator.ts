import { SetMetadata } from '@nestjs/common';

export const ADMIN_KEY = 'Admin';
export const isAdmin = () => SetMetadata(ADMIN_KEY, true);
