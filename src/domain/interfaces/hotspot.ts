import { IHotspotviewer } from './hotspotviewer';

/**
 * Model definition for hotspot
 */
export interface IHotspot {
    id: string;
    title?: string;
    content?: string;
    leftOffsetPercent?: number;
    topOffsetPercent?: number;
    hotspotviewers?: IHotspotviewer[];
}
