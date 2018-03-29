import * as functions from 'firebase-functions';
import * as gStorage from '@google-cloud/storage';
import * as path from 'path';
import * as sharp from 'sharp';

const gcs = gStorage();

const THUMB_MAX_WIDTH = 430;
const THUMB_MAX_HEIGHT = 430;

export const thumbnail = functions.storage.object().onChange( event => {
    const object = event.data;
    const fileBucket = object.bucket;
    const contentType = object.contentType;
    const resourceState = object.resourceState;
    const metageneration = object.metageneration;
    const filePath = object.name;

    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }

    if (path.basename(filePath).startsWith('thumb')) {
        console.log('already a thumbnail');
        return null;
    }

    if (!path.basename(filePath).startsWith('toThumb_')) {
        console.log('not meant for thumbnail');
        return null;
    }

    if (resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return null;
    }

    if (resourceState === 'exists' && metageneration > 1) {
        console.log('This is a metadata change event.');
        return null;
    }

    const bucket = gcs.bucket(fileBucket);
    const filename = path.basename(filePath);
    const metadata = { contentType: contentType };
    const pipeline = sharp();

    const thumbFileName = `thumb`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

    pipeline
        .resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT)
        .max()
        .pipe(thumbnailUploadStream);

    bucket.file(filePath).createReadStream().pipe(pipeline);

    const streamAsPromise = new Promise((resolve, reject) =>
        thumbnailUploadStream.on('finish', resolve).on('error', reject));

    return streamAsPromise.then(() => {
        console.log('Thumbnail created successfully');
        return null;
    });

});
