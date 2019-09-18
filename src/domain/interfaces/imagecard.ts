import { IBlog } from './blog';

/**
 * Model definition for imagecard
 */
export interface IImagecard {
    id: string;
    image?: Blob;
    header?: string;
    content?: string;
    link?: string;
    imageOrientation?: enumeration;
    buttonContent?: string;
    cardColor?: enumeration;
    localizeLink?: boolean;
    localizedButtonContent?: string;
    blogs?: IBlog[];
}
