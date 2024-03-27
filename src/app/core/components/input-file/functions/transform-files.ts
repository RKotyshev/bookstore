import { IDetailedItemSize, IInputItem } from '../interfaces/input-item';


const DEFAULT_BLOB_MAX_BYTES_SIZE = 4E6;
const DEFAULT_BLOB_ACCEPT_TYPES = ['image/jpeg', 'image/png'];

interface IBlobDisplayOptions {
  acceptTypes?: string[],
  maxSize?: IDetailedItemSize,
}

export function transformSize(sizeOptions: IDetailedItemSize | undefined): number | null{
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
): IInputItem[] {

  return Array.from(inputFiles).map((file: File) => {
    const acceptBlobTypes = blobDisplayOptions?.acceptTypes ?? DEFAULT_BLOB_ACCEPT_TYPES;
    const acceptBlobSizeBytes = transformSize(blobDisplayOptions?.maxSize) ??
    DEFAULT_BLOB_MAX_BYTES_SIZE;

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
