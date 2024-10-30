import { Storage } from "@google-cloud/storage";

const storage = new Storage();

export const createNewBucket = async () => {
    const optStorageBucket = {
        location: 'ASIA-SOUTHEAST2',
        storageClass: 'STANDARD',
    };
    const [bucket] = await storage.createBucket(bucketName, optStorageBucket);

    console.log(`${bucket.name} created with ${storageClass} class in ${location}`);

    createNewBucket().catch(console.error);
}

export const uploadFile = async (bucketName, generationMatchPrecondition = 0) => {
    const uploadFileOpt = {
        destination: '',
        preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
    }

    await storage.bucket(bucketName).upload(filePath, uploadFileOpt);

    console.log(`${filePath} uploaded to ${bucketName} bucket`);

    uploadFile(bucketName).catch(console.error);
}