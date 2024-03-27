import { IFileSize, IInputFileItem } from '../interfaces/input-file-item';


interface IBlobDisplayOptions {
  acceptTypes?: string[],
  maxSize?: IFileSize,
}

export function transformSize(sizeOptions: IFileSize | undefined): number | null{
  if (!sizeOptions) {
    return null;
  }

  const bytesPerKb = 1e3;
  const bytesPerMb = 1e6;
  let calculatedBytes;

  switch (sizeOptions.unit) {
    case ('KB'):
      calculatedBytes = sizeOptions.size * bytesPerKb;
      break;
    case ('MB'):
      calculatedBytes = sizeOptions.size * bytesPerMb;
      break;
    default:
      calculatedBytes = sizeOptions.size;
      break;
  }

  return calculatedBytes;
}

export function transformFiles(
  inputFiles: File[],
  blobDisplayOptions?: IBlobDisplayOptions,
): IInputFileItem[] {

  return Array.from(inputFiles).map((file: File) => {
    const acceptBlobTypes = blobDisplayOptions?.acceptTypes ?? ['image/jpeg', 'image/png'];
    const acceptBlobSizeBytes = transformSize(blobDisplayOptions?.maxSize) ?? 4e6;
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
