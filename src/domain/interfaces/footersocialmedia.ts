import { IFootermenu } from './footermenu';
import { ILocationdata } from './locationdata';

/**
 * Model definition for footersocialmedia
 */
export interface IFootersocialmedia {
    id: string;
    socialMediaType?: enumeration;
    link?: string;
    order?: integer;
    footermenu?: IFootermenu;
    locationdatum?: ILocationdata;
}
