import { IHeadersubmenu } from './headersubmenu';
import { IHeadersubmenuitem } from './headersubmenuitem';

/**
 * Model definition for headersubmenuitem
 */
export interface IHeadersubmenuitem {
    id: string;
    title?: string;
    link?: string;
    order?: number;
    headersubmenu?: IHeadersubmenu;
    locationServiceName?: string;
    headersubmenuitems?: IHeadersubmenuitem[];
    headersubmenuitem?: IHeadersubmenuitem;
}
