import { IGrid } from './grid';

/**
 * Model definition for griditem
 */
export interface IGriditem {
    id: string;
    header?: string;
    blurb?: string;
    link?: string;
    order?: number;
    locationId?: number;
    image?: Blob;
    grids?: IGrid[];
}
