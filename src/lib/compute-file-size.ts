/**
 * the function takes file size as a number in bytes and returns a string representation of the file size
 * to the nearest KB, MB, GB, TB, PB, EB, ZB, YB
 */
export function computeFileSize(file: any): string {
    const fileSizeInBytes: number = file.size;
    if (Math.floor(fileSizeInBytes / 1000) < 1) {
        return `${fileSizeInBytes} bytes`;
    }
    else if (Math.floor(fileSizeInBytes / (1000 * 1000)) < 1) {
        return `${Math.floor(fileSizeInBytes / 1000)} KB`;
    }
    else if (Math.floor(fileSizeInBytes / (1000 * 1000 * 1000)) < 1) {
        return `${Math.floor(fileSizeInBytes / 1000000)} MB`;
    }
    else if (Math.floor(fileSizeInBytes / (1000 * 1000 * 1000 * 1000)) < 1) {
        return `${Math.floor(fileSizeInBytes / 1000000000)} GB`;
    }
    else if (Math.floor(fileSizeInBytes / (1000 * 1000 * 1000 * 1000 * 1000)) < 1) {
        return `${Math.floor(fileSizeInBytes / 1000000000000)} TB`;
    }
    return file.size;
}

console.log(computeFileSize({ size: 30481287766 }));
