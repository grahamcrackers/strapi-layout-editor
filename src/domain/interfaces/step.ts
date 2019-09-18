import { IBlog } from './blog';

/**
 * Model definition for step
 */
export interface IStep {
    id: string;
    instruction?: string;
    title?: string;
    image?: Blob;
    color?: enumeration;
    stepsPerLine?: number;
    blogs?: IBlog[];
}
