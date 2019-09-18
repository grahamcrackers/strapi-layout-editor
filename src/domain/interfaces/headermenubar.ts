import { IHeadermenu } from './headermenu';

/**
 * Model definition for headermenubar
 */
export interface IHeadermenubar {
    id: string;
    title?: string;
    link?: string;
    order?: integer;
    headermenu?: IHeadermenu;
}
