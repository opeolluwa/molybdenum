import ImageKit from 'imagekit';
import path from 'path';
const imagekit = new ImageKit({
    publicKey: "your_public_api_key",
    privateKey: "your_private_api_key",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/"
});

interface Options {
    fileName: string,
    filepath: string
}
export class FileServer {
    static async upload({ fileName, filepath }: Options): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const file = path.join(__dirname, "./../uploads", fileName)
            const response: any = await imagekit.upload({ file, fileName });
            resolve(response.url)
        })
    }
}
