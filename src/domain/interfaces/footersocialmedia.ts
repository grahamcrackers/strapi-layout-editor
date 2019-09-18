import { IFootermenu } from './footermenu';
import { ILocationdata } from './locationdata';

/**
 * Model definition for footersocialmedia
 */
export interface IFootersocialmedia {
    id: string;
    socialMediaType?: enumeration;
    link?: string;
    order?: number;
    footermenu?: IFootermenu;
    locationdatum?: ILocationdata;
}
