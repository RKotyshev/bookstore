export interface IItem {
  file: File,
  name: string,
  size: number,
  type: string,
  blobLink: string,
  storageLink?: string | null,
  uploadStatus: 'pending' | 'uploaded' | 'canceled',
}
