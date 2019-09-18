import { ICity } from './city';

/**
 * Model definition for state
 */
export interface IState {
    id: string;
    code?: string;
    name?: string;
    cities?: ICity[];
    canonicalUrl?: string;
}
