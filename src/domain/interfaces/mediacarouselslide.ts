import { IMediacarousel } from './mediacarousel';

/**
 * Model definition for mediacarouselslide
 */
export interface IMediacarouselslide {
    id: string;
    image?: Blob;
    videoUrl?: string;
    mediacarousel?: IMediacarousel;
}
