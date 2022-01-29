import React, { createContext, useCallback } from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { createSuspenserScope } from '../core/lazy';
import { IPermission } from './interfaces/IPermission';
import { IPermissionCheck } from './interfaces/IPermissionCheck';
import { IPermissionContext } from './interfaces/IPermissionContext';
import { isPermissionGranted } from './interfaces/isPermissionGranted';
import permissionsService from './services/permissionsService';

export const PermissionContext = createContext<IPermissionContext | undefined>(undefined);

const permissionsScope = createSuspenserScope<Map<string, IPermission>>();

function loadPermissions(userId?: string): Map<string, IPermission> {
  if (!!userId) {
    return permissionsScope.getOrDefault(userId, () => permissionsService.load(userId)).read();
  } else {
    return permissionsScope.getOrDefault('empty', () => Promise.resolve(new Map<string, IPermission>([]))).read();
  }
}

const PermissionContextProvider: React.FC = ({ children }) => {
  /** TODO: Recatorar pra Config Context */
  const { user } = useAuth();
  const grantedPermissions = loadPermissions(user?.id);

  console.log('[PermissionContext] Permissions loaded');
  const isGrantedPermission = useCallback((constrains: IPermissionCheck) => isPermissionGranted(grantedPermissions, constrains), [grantedPermissions]);

  return (
    <PermissionContext.Provider value={{
      grantedPermissions,
      isGrantedPermission
    }}>
      {children}
    </PermissionContext.Provider>
  )
}

export default PermissionContextProvider;