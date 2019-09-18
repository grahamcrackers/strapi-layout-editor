import { IBlog } from './blog';

/**
 * Model definition for imagecontent
 */
export interface IImagecontent {
    id: string;
    imageOrientation?: enumeration;
    image?: Blob;
    content?: string;
    parentPosition?: enumeration;
    blogs?: IBlog[];
}
