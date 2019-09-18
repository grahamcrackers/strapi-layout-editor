import { IAccordion } from './accordion';

/**
 * Model definition for accordionitem
 */
export interface IAccordionitem {
    id: string;
    title: string;
    content?: string;
    order?: number;
    accordion?: IAccordion;
}
