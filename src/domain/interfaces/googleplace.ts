import { IGooglereview } from './googlereview';

/**
 * Model definition for googleplace
 */
export interface IGoogleplace {
    id: string;
    rating?: decimal;
    formatted_address?: string;
    name?: string;
    place_id?: string;
    reviews?: IGooglereview[];
}
