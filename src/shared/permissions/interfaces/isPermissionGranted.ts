import { assertPermissionKey } from '../helpers/assertPermissionKey';
import { IPermission } from './IPermission';
import { IPermissionCheck } from './IPermissionCheck';

export function isPermissionGranted(permissions: Map<string, IPermission>, { required = [], passthrough = [] }: IPermissionCheck): boolean {
  let isGranted = false;

  // if has ANY of passthorugh permissions
  if (passthrough.length > 0) {
    for (const grant of passthrough) {
      if (permissions.has(assertPermissionKey(grant))) {
        isGranted = true;
        break;
      }
    }
  }

  // if has ALL required permissions
  if (required.length > 0 && !isGranted) {
    isGranted = true;
    for (const grant of required) {
      if (!permissions.has(assertPermissionKey(grant))) {
        isGranted = false;
        break;
      }
    }
  }

  return isGranted;
}
