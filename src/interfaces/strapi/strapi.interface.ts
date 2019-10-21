export type RelationType = 'oneWay' | 'oneToOne' | 'manyToOne' | 'manyWay' | 'oneToMany' | 'manyToMany';

export interface Model {
    uid: string;
    schema: Schema;
    settings: Settings;
    metadatas: MetaData;
    layouts: Layouts;
}

export interface Schema {
    modelType: string;
    connection: string;
    collectionName: string;
    info: SchemaInfo;
    options: SchemaOptions;
    attributes: SchemaAttributes;
}

export interface SchemaInfo {
    name: string;
    description: string;
}

export interface SchemaOptions {
    timestamps: string[];
    comment?: string;
    increments?: boolean;
}

export interface SchemaAttributes {
    [prop: string]: AttributeProps;
}

export interface AttributeProps {
    type: string;
    maxLength?: number;
    collection?: string;
    via?: string;
    isVirtual?: boolean;
    targetModel?: string;
    relationType?: string;
    multiple?: boolean;
    required?: boolean;
}

export interface Settings {
    searchable: boolean;
    filterable: boolean;
    bulkable: boolean;
    pageSize: number;
    mainField: string;
    defaultSortBy: string;
    defaultSortOrder: string;
}

export interface MetaData {
    id: MetaDataViews;
    [prop: string]: MetaDataViews;
}

export interface MetaDataViews {
    edit: MetaDataEditFields;
    list: MetaDataListFields;
}

export interface MetaDataEditFields {
    label: string;
    description: string;
    placeholder: string;
    visible: boolean;
    editable: boolean;
    mainField?: string;
}

export interface MetaDataListFields {
    label: string;
    searchable: boolean;
    sortable: boolean;
}

export interface Layouts {
    list: string[];
    edit: EditLayout[][];
    editRelations: string[];
}

export interface EditLayout {
    name: string;
    size: number;
}

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
