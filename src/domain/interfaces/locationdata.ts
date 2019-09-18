import { IBio } from './bio';
import { ICity } from './city';
import { IFootersocialmedia } from './footersocialmedia';
import { IImagecomparison } from './imagecomparison';
import { ILocationlicensetypes } from './locationlicensetypes';
import { ILocationservice } from './locationservice';
import { ILocationservicelines } from './locationservicelines';
import { ILocationzip } from './locationzip';
import { IMediacarousel } from './mediacarousel';
import { ITestimonial } from './testimonial';

/**
 * Model definition for locationdata
 */
export interface ILocationdata {
    id: string;
    brandId?: number;
    name?: string;
    tagLine?: string;
    businessStart?: Date;
    yearsInBusiness?: number;
    businessDescription?: string;
    footersocialmedias?: IFootersocialmedia[];
    locationservices?: ILocationservice[];
    locationId?: number;
    leadEmail?: string;
    enterpriseDBA?: string;
    enterpriseNumber?: number;
    licenseNumber?: number;
    phone?: string;
    address1?: string;
    address2?: string;
    cityRef?: ICity;
    country?: string;
    state?: string;
    zip?: string;
    city?: string;
    locationzips?: ILocationzip[];
    sampleReportUrl?: string;
    scheduleLinkUrl?: string;
    heroImageUrl?: string;
    bios?: IBio[];
    imagecomparison?: IImagecomparison;
    mediacarousel?: IMediacarousel;
    testimonials?: ITestimonial[];
    locationservicelines?: ILocationservicelines[];
    locationlicensetypes?: ILocationlicensetypes[];
    googlePlaceId?: string;
}
