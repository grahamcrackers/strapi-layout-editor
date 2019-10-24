/* eslint-disable @typescript-eslint/no-explicit-any */
export type RelationType = 'oneWay' | 'oneToOne' | 'manyToOne' | 'manyWay' | 'oneToMany' | 'manyToMany';

export interface StrapiGetParams {
    /* Maximum number of results possible */
    limit?: number;

    /* Sort according to a specific field. */
    sort?: string;

    /* Skip a specific number of entries (especially useful for pagination) */
    start?: number;

    /* Get records that are not equals to something */
    ne?: string;

    /* Get record that are lower than a value */
    lt?: string;

    /* Get records that are lower than or equal to a value */
    lte?: string;

    /* Get records that are greater than a value */
    gt?: string;

    /* Get records that are greater than or equal a value */
    gte?: string;

    /* Get records that contains a value */
    contains?: string;

    /* Get records that contains (case sensitive) a value */
    containss?: string;

    /* search for anything */
    q?: string;

    /* Get records that matches any value in the array of values */
    in?: any[];

    /* Get records that doesn't match any value in the array of values */
    nin?: any[];
}
