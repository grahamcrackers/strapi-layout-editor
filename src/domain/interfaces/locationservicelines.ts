import { ILocationdata } from './locationdata';

/**
 * Model definition for locationservicelines
 */
export interface ILocationservicelines {
    id: string;
    key?: string;
    value?: string;
    locationdata?: ILocationdata[];
}
