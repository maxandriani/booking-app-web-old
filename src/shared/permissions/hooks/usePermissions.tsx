import { useContext } from 'react';
import { IPermissionContext } from '../interfaces/IPermissionContext';
import { PermissionContext } from '../PermissionContext';

export function usePermissions(): Pick<IPermissionContext, 'isGrantedPermission'> {
  const context = useContext(PermissionContext);

  if (!context)
    throw new Error('Você deve usar usePermissions() dentro de um contexto <PermissionContextProvider />');

  return { isGrantedPermission: context.isGrantedPermission };
}
