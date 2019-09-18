import { IGoogleplace } from './googleplace';

/**
 * Model definition for googlereview
 */
export interface IGooglereview {
    id: string;
    author_name?: string;
    author_url?: string;
    language?: string;
    text?: string;
    profile_photo_url?: string;
    relative_time_description?: string;
    place?: IGoogleplace;
    rating?: decimal;
}
