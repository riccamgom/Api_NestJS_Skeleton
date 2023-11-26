import { SetMetadata } from '@nestjs/common';
//This sets the metadata for the routes that are public, so the JwtAuthGuard doesn't apply to them
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
