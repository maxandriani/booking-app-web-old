
export interface IPermissionCheck {
  /** Lista de permissões necessárias para autorizar o acesso (AND). */
  required?: Array<string>;
  /** Lista de permissões necessárias para sempre autorizar o acesso (OR). */
  passthrough?: Array<string>;
}
