import { IHeadermenu } from './headermenu';
import { IHeadersubmenuitem } from './headersubmenuitem';

/**
 * Model definition for headersubmenu
 */
export interface IHeadersubmenu {
    id: string;
    title?: string;
    link?: string;
    order?: integer;
    headermenu?: IHeadermenu;
    headersubmenuitems?: IHeadersubmenuitem[];
}
