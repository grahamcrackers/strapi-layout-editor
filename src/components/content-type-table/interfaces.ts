export interface Layouts {
    list: string[];
    edit: unknown[];
    editRelations: string[];
}

export interface ContentTypeMetaData {
    edit?: EditFields;
    list: ListFields;
}

export interface EditFields {
    label: string;
    description: string;
    placeholder: string;
    visible: boolean;
    editable: boolean;
    mainField?: string;
}

export interface ListFields {
    label: string;
    searchable: boolean;
    sortable: boolean;
}

export interface ContentTypeWithId {
    id: string;
    [prop: string]: string;
}
