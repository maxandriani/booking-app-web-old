import { IPermission } from '../interfaces/IPermission';
import { IPermissionTuple } from '../interfaces/IPermissionTuple';
import { assertPermissionKey } from './assertPermissionKey';

export function flatApiPermissions(permissions: Array<IPermission>): Array<IPermissionTuple> {
  const flatted: Array<IPermissionTuple> = [];

  for (const permission of permissions) {
    let children: Array<IPermissionTuple> = [];

    if (permission.permissions) {
      children = flatApiPermissions(permission.permissions);
    }

    // Check if there is any child permissions (if true, the permission should be granted too).
    if (children.length > 0 || !!permission?.isGranted) {
      flatted.push([assertPermissionKey(permission), permission]);
      flatted.push(...children);
    }
  }

  return flatted;
}
