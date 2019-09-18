import { IHotspotviewer } from './hotspotviewer';

/**
 * Model definition for hotspot
 */
export interface IHotspot {
    id: string;
    title?: string;
    content?: string;
    leftOffsetPercent?: integer;
    topOffsetPercent?: integer;
    hotspotviewers?: IHotspotviewer[];
}
