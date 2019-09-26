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
