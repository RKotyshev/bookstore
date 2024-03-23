export interface IItem {
  file: File,
  name: string,
  size: number,
  type: string,
  blobLink: string | null,
  storageLink: string | null,
  uploadStatus: 'waiting' | 'pending' | 'uploaded' | 'canceled',
}
