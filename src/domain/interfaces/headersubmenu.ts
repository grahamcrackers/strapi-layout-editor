import { IHeadermenu } from './headermenu';
import { IHeadersubmenuitem } from './headersubmenuitem';

/**
 * Model definition for headersubmenu
 */
export interface IHeadersubmenu {
    id: string;
    title?: string;
    link?: string;
    order?: number;
    headermenu?: IHeadermenu;
    headersubmenuitems?: IHeadersubmenuitem[];
}
