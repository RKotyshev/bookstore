import { IInputFileItem } from '../interfaces/input-file-item';


export function getHash(fileOrItem: File | IInputFileItem): string {
  return fileOrItem.name + fileOrItem.size;
}

export function filterByHash<T extends File | IInputFileItem>(
  filesOrItems: T[],
  compareWithHash: string[],
  filterType: 'pick' | 'omit',
): T[] {
  return filesOrItems.filter((fileOrItem: File | IInputFileItem) => {
    const hash = getHash(fileOrItem);

    return filterType === 'pick' ? compareWithHash.includes(hash) : !compareWithHash.includes(hash);
  });
}
