export interface IInputFileItem {
  file: File,
  name: string,
  size: number,
  type: string,
  blobLink: string | null,
  storageLink: string | null,
}

export interface IFileSize {
  size: number,
  unit: 'Byte' | 'KB' | 'MB',
}
