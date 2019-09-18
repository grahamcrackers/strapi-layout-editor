import { IBlog } from './blog';

/**
 * Model definition for contactform
 */
export interface IContactform {
    id: string;
    contactFormType?: enumeration;
    formHeader?: string;
    formJson: { [key: string]: any };
    formFooter?: string;
    blogs?: IBlog[];
}
