import { ILocationdata } from './locationdata';
import { IState } from './state';

/**
 * Model definition for city
 */
export interface ICity {
    id: string;
    name?: string;
    state?: IState;
    locationdata?: ILocationdata[];
}
