import { useContext } from "react";
import { ConfigContext } from "../ConfigContext";
import { IConfigMap } from "../interfaces/IConfigMap";

export function useConfig(): IConfigMap {
  const context = useContext(ConfigContext);

  if (!context)
    throw new Error('Certifique-se que useConfig() seja usando em um componente descendente de <ConfigContextProvider />');

  const { config } = context;

  return config;
}
