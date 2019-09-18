import { IBlog } from './blog';
import { ILocationdata } from './locationdata';

/**
 * Model definition for bio
 */
export interface IBio {
    id: string;
    title?: string;
    description?: string;
    name?: string;
    order?: integer;
    locationId?: integer;
    image?: Blob;
    blogs?: IBlog[];
    locationdatum?: ILocationdata;
}
