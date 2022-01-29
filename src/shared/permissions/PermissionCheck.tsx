import React, { VoidFunctionComponent } from 'react';
import { usePermissions } from './hooks/usePermissions';
import { IPermissionCheckProps } from './interfaces/IPermissionCheckProps';

export const PermissionCheck: VoidFunctionComponent<IPermissionCheckProps> = ({ render, passthrough, required }) => {
  const { isGrantedPermission } = usePermissions();
  const isGranted: boolean = (isGrantedPermission({ passthrough, required }));

  return (<>{render(isGranted)}</>);
};
