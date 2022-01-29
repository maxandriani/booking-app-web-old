import { createContext, FC, useCallback } from 'react';
import { createSuspenser } from '../core/lazy';
import { followNestedKey } from './helpers/followNestedKey';
import { IConfigContext } from './interfaces/IConfigContext';
import configService from './services/configService';

export const ConfigContext = createContext<IConfigContext | undefined>(undefined);

const configLoader = createSuspenser(configService.load());

const ConfigContextProvider: FC = ({ children }) => {
  const config = configLoader.read();
  const getConfig = useCallback((key: string) => followNestedKey(key, config), [config]);

  return (
    <ConfigContext.Provider value={{ config, getConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigContextProvider;

