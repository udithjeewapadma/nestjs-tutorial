import { SetMetadata } from '@nestjs/common';

export enum Role {
    Admin = 'admin',
    User = 'user',
    Editor = 'editor'
}
export const ROLE_DEC_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_DEC_KEY, roles);
