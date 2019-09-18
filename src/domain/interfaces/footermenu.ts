import { IFootersocialmedia } from './footersocialmedia';
import { IFootersubmenu } from './footersubmenu';

/**
 * Model definition for footermenu
 */
export interface IFootermenu {
    id: string;
    title?: string;
    logo?: Blob;
    phone?: string;
    footersubmenus?: IFootersubmenu[];
    footersocialmedias?: IFootersocialmedia[];
    link?: string;
    partnerLogos?: I[];
    customText?: string;
}
