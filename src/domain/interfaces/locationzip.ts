import { ILocationdata } from './locationdata';

/**
 * Model definition for locationzip
 */
export interface ILocationzip {
    id: string;
    zipCode?: string;
    location?: { [key: string]: any };
    locationdatum?: ILocationdata;
}
