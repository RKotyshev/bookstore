export interface IInputItem {
  file: File,
  name: string,
  size: number,
  type: string,
  blobLink: string | null,
  storageLink: string | null,
}

export interface IDetailedItemSize {
  size: number,
  unit: 'Byte' | 'KB' | 'MB',
}
