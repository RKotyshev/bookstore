import { IItem } from '../interfaces/item';


export function transformNewFiles(
  inputFiles: FileList, existFilesNames: string[] | undefined,
): IItem[] | null {
  const newFiles = Array.from(inputFiles).filter((file: File) => {
    return !existFilesNames?.includes(file.name);
  });

  if (!newFiles.length) {
    return null;
  }

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
      uploadStatus: 'waiting',
    };
  });
}
