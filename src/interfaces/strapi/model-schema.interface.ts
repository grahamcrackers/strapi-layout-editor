export interface ModelSchema {
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
