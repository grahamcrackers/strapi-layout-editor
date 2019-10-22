export interface AttributeMetaDatas {
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
