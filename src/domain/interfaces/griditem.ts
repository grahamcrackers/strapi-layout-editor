import { IGrid } from './grid';

/**
 * Model definition for griditem
 */
export interface IGriditem {
    id: string;
    header?: string;
    blurb?: string;
    link?: string;
    order?: integer;
    locationId?: integer;
    image?: Blob;
    grids?: IGrid[];
}
