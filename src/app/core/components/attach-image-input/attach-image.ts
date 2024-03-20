export interface IImageState {
  filename: string,
  blobLink: string,
  storageLink?: string | null,
  uploadStatus: 'pending' | 'uploaded' | 'canceled',
}
