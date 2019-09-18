import { IBlog } from './blog';
import { ILocationdata } from './locationdata';

/**
 * Model definition for imagecomparison
 */
export interface IImagecomparison {
    id: string;
    beforeImage: Blob;
    afterImage: Blob;
    title: string;
    subtitle?: string;
    locationId?: integer;
    blogs?: IBlog[];
    locationdatum?: ILocationdata;
}
