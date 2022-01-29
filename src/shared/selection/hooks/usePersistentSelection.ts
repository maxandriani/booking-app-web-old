import { useState } from 'react';

export function idMapper<TType extends { id: any }>(): (item: TType) => any {
  return item => {
    if (!item.id) throw new Error('Você está usando um comparador na propriedade ID, certifique-se que seus objetos possuam essa propriedade.');
    return item?.id;
  }
}

export function compositeMapper<TType extends { [key: string]: any }>(keys: Array<keyof TType>): (item: TType) => any {
  return (item: TType) => keys.map(k => item[k]).join(',');
}

export interface IPersistentSelectionState<TType> {
  selectedItems: Map<any, TType>;
  selectItems: (...items: Array<TType>) => void;
  removeItems: (...items: Array<TType>) => void;
  clearItems: () => void;
  isSelected: (item: TType) => boolean;
  isAllSelected: (...items: Array<TType>) => boolean;
  toggleItem: (item: TType) => void;
}

export function usePersistentSelection<TType>(initialSelection?: Array<TType>, comparisonMapper: (item: TType) => any = idMapper<any>()): IPersistentSelectionState<TType> {
  const [selectedItems, setSelectedItems] = useState<Map<any, TType>>(new Map(initialSelection?.map(x => [comparisonMapper(x), x]) ?? []));

  function selectItems(...items: Array<TType>) {
    const toAdd: Array<[any, TType]> = items
      .filter(i => !selectedItems.has(comparisonMapper(i)))
      .map(i => [comparisonMapper(i), i]);

    if (toAdd.length > 0) {
      setSelectedItems(new Map(Array.from([...selectedItems, ...toAdd])));
    }
  }

  function removeItems(...items: Array<TType>) {
    for (const item of items) {
      selectedItems.delete(comparisonMapper(item));
    }

    setSelectedItems(new Map(selectedItems));
  }

  function clearItems() {
    setSelectedItems(new Map());
  }

  function isSelected(item: TType): boolean {
    return selectedItems.has(comparisonMapper(item));
  }

  function isAllSelected(...items: Array<TType>): boolean {
    let result = true;

    for (const item of items) {
      if (!(result = isSelected(item))) break;
    }

    return result;
  }

  function toggleItem(item: TType) {
    if (isSelected(item)) {
      removeItems(item);
    } else {
      selectItems(item);
    }
  }

  return {
    selectedItems,
    selectItems,
    removeItems,
    clearItems,
    isSelected,
    isAllSelected,
    toggleItem
  }
}