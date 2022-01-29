import { useContext } from 'react';
import { ConfigContext } from '../ConfigContext';

export function useConfigKey<T>(key: string): T | undefined;
export function useConfigKey<T>(key: string, fallback: T): T;
export function useConfigKey<T>(key: string, fallback?: T): T | undefined {
  const context = useContext(ConfigContext);

  if (!context)
    throw new Error('Certifique-se que useConfigKey() seja usando em um componente descendente de <ConfigContextProvider />');

  return context.getConfig(key) ?? fallback;
}
