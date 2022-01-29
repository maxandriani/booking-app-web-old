import React from 'react';
import { usePermissions } from './hooks/usePermissions';
import { IPermissionCheck } from './interfaces/IPermissionCheck';

export const PermissionGuard: React.FC<Partial<IPermissionCheck>> = ({ children, passthrough, required }) => {
  const { isGrantedPermission } = usePermissions();

  return (isGrantedPermission({ passthrough, required }))
    ? (<>{children}</>)
    : (null);
};