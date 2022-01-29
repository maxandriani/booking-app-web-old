import { IPermission } from "./IPermission";

export interface IApiPermissions {
  entityDisplayName: string;
  groups: Array<IPermission>;
}
