import { IInputItem } from '../interfaces/input-item';


export function getHash(fileOrItem: File | IInputItem): string {
  return fileOrItem.name + fileOrItem.size;
}

export function filterByHash<T extends File | IInputItem>(
  filesOrItems: T[],
  compareWithHash: string[],
  filterType: 'pick' | 'omit',
): T[] {
  return filesOrItems.filter((fileOrItem: File | IInputItem) => {
    const hash = getHash(fileOrItem);

    return filterType === 'pick' ? compareWithHash.includes(hash) : !compareWithHash.includes(hash);
  });
}
