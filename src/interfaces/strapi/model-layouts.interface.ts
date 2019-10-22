export interface ModelLayouts {
    list: string[];
    edit: EditLayouts[][];
    editRelations: string[];
}

export interface EditLayouts {
    name: string;
    size: number;
}
