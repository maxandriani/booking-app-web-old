import { mergeParams } from '../../api/helpers/mergeParams';
import httpClient from '../../api/services/httpClient';
import configService from '../../config/services/configService';
import { bindValues } from '../../core/helpers/bindValues';
import { flatApiPermissions } from '../helpers/flatApiPermissions';
import { IApiPermissions } from '../interfaces/IApiPermissions';
import { IPermission } from '../interfaces/IPermission';

export const API_PERMISSIONS_BASE_URL = ':apiPermissionsBase/permission-management';
export const API_PERMISSIONS_LOAD_URL = API_PERMISSIONS_BASE_URL + '/permissions';

export function loadPermissions(userId: string, abort?: AbortSignal): Promise<Map<string, IPermission>> {
  const params = new URLSearchParams({
    providerName: 'U',
    providerKey: `${userId}`
  });

  const request = (abort)
    ? httpClient.withAbort(abort)
    : httpClient;

  return request
    .fetch(mergeParams(`${bindValues(API_PERMISSIONS_LOAD_URL, configService.getConfig())}`, params))
    .then(response => response.json())
    .then((permissions: IApiPermissions) => new Map(flatApiPermissions(permissions.groups)));
}

const permissionsService = {
  load: loadPermissions
};

export default permissionsService;