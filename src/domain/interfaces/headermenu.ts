import { IHeadermenubar } from './headermenubar';
import { IHeadersubmenu } from './headersubmenu';

/**
 * Model definition for headermenu
 */
export interface IHeadermenu {
    id: string;
    logo?: Blob;
    buttonText?: string;
    phone?: string;
    headermenubars?: IHeadermenubar[];
    headersubmenus?: IHeadersubmenu[];
    localizedButtonText?: string;
    customText?: string;
    buttonLink: string;
}
