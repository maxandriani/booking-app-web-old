import { IPermission } from './IPermission';
import { IPermissionCheck } from './IPermissionCheck';

export interface IPermissionContext {
  grantedPermissions: Map<string, IPermission>;
  isGrantedPermission(permissions: IPermissionCheck): boolean;
}
