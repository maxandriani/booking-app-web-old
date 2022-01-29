import { IPermission } from '../interfaces/IPermission';

export function assertPermissionKey(permission: string | IPermission): string {
  return typeof permission === 'string'
    ? permission
    : permission.name;
}
