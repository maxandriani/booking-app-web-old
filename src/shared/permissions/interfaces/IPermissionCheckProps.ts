import { ReactNode } from 'react';
import { IPermissionCheck } from './IPermissionCheck';

export interface IPermissionCheckProps extends Partial<IPermissionCheck> {
  render(isGranted: boolean): ReactNode;
}
