import { ILocationdata } from './locationdata';

/**
 * Model definition for locationservice
 */
export interface ILocationservice {
    id: string;
    name?: string;
    description?: string;
    locationdata?: ILocationdata;
}
