import { IApiPermissionProvider } from './IApiPermissionProvider';

export interface IPermission {
  name: string;
  displayName: string;
  permissions?: Array<IPermission>;
  parentName?: string;
  isGranted?: boolean;
  allowedProviders?: Array<IApiPermissionProvider>;
  grantedProviders?: Array<IApiPermissionProvider>;
}
