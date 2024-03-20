export interface IImageState {
  filename: string,
  blobLink: string,
  storageLink?: string,
  uploadStatus: 'pending' | 'uploaded' | 'cancel',
}
