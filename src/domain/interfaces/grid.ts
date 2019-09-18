import { IBlog } from './blog';
import { IGriditem } from './griditem';

/**
 * Model definition for grid
 */
export interface IGrid {
    id: string;
    title?: string;
    itemsPerRow?: number;
    griditems?: IGriditem[];
    blogs?: IBlog[];
}
