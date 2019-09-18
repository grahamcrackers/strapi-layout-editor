import { IFootersubmenu } from './footersubmenu';

/**
 * Model definition for footersubmenuitem
 */
export interface IFootersubmenuitem {
    id: string;
    title?: string;
    link?: string;
    footersubmenu?: IFootersubmenu;
    order?: integer;
}
