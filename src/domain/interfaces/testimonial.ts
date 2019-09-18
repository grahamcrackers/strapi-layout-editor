import { IBlog } from './blog';
import { ILocationdata } from './locationdata';

/**
 * Model definition for testimonial
 */
export interface ITestimonial {
    id: string;
    title?: string;
    description?: string;
    name?: string;
    order?: number;
    locationId?: number;
    blogs?: IBlog[];
    locationdatum?: ILocationdata;
}
