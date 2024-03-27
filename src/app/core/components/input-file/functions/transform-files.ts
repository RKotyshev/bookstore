import { IInputFileItem } from '../interfaces/input-file-item';


export function transformFiles(inputFiles: File[]): IInputFileItem[] {

  return Array.from(inputFiles).map((file: File) => {
    const acceptBlobTypes = ['image/jpeg', 'image/png'];
    const acceptBlobSizeBytes = 4e6;
    let blobLink: string | null = null;

    if (acceptBlobTypes.includes(file.type) && file.size <= acceptBlobSizeBytes) {
      blobLink = URL.createObjectURL(file);
    }

    return {
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      blobLink: blobLink,
      storageLink: null,
    };
  });
}
