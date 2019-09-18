import { IAccordion } from './accordion';
import { IBio } from './bio';
import { IBlog } from './blog';
import { IContactform } from './contactform';
import { IGrid } from './grid';
import { IHotspotviewer } from './hotspotviewer';
import { IImagecard } from './imagecard';
import { IImagecomparison } from './imagecomparison';
import { IImagecontent } from './imagecontent';
import { IMediacarousel } from './mediacarousel';
import { IStep } from './step';
import { ITestimonial } from './testimonial';

/**
 * Model definition for blog
 */
export interface IBlog {
    id: string;
    url?: string;
    title?: string;
    header?: string;
    image?: Blob;
    content?: string;
    accordions?: IAccordion[];
    bottomimagecard?: IImagecard;
    bottomImageCardImage?: Blob;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl?: string;
    hotspotviewers?: IHotspotviewer[];
    bios?: IBio[];
    imagecomparisons?: IImagecomparison[];
    mediacarousels?: IMediacarousel[];
    testimonials?: ITestimonial[];
    grids?: IGrid[];
    associatedToBlogs?: IBlog[];
    associatedFromBlogs?: IBlog[];
    displayRecentBlogs?: boolean;
    previewImage?: Blob;
    contactForm?: IContactform;
    imagecards?: IImagecard[];
    imagecontents?: IImagecontent[];
    steps?: IStep[];
    literalBlog?: boolean;
}
