import { IAccordionitem } from './accordionitem';
import { IBlog } from './blog';

/**
 * Model definition for accordion
 */
export interface IAccordion {
    id: string;
    title?: string;
    accordionitems?: IAccordionitem[];
    blogs?: IBlog[];
}
