import { IFootermenu } from './footermenu';
import { IFootersubmenuitem } from './footersubmenuitem';

/**
 * Model definition for footersubmenu
 */
export interface IFootersubmenu {
    id: string;
    title?: string;
    footersubmenuitems?: IFootersubmenuitem[];
    order?: number;
    footermenu?: IFootermenu;
}
