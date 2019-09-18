import { IBlog } from './blog';
import { ILocationdata } from './locationdata';
import { IMediacarouselslide } from './mediacarouselslide';

/**
 * Model definition for mediacarousel
 */
export interface IMediacarousel {
    id: string;
    mediacarouselslides?: IMediacarouselslide[];
    title: string;
    subtitle?: string;
    label?: string;
    locationId?: number;
    blogs?: IBlog[];
    locationdatum?: ILocationdata;
}
