import { IBlog } from './blog';
import { IHotspot } from './hotspot';

/**
 * Model definition for hotspotviewer
 */
export interface IHotspotviewer {
    id: string;
    name?: string;
    image: Blob;
    hotspots?: IHotspot[];
    blogs?: IBlog[];
}
