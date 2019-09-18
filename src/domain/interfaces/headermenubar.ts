import { IHeadermenu } from './headermenu';

/**
 * Model definition for headermenubar
 */
export interface IHeadermenubar {
    id: string;
    title?: string;
    link?: string;
    order?: number;
    headermenu?: IHeadermenu;
}
