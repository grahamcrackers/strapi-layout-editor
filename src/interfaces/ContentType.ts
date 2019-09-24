export interface ContentType<T> {
    uid: string;
    name: string;
    label: string;
    isDisplayed: boolean;
    source: string | null;
    schema?: ContentTypeSchema<T>;
}

export interface ContentTypeSchema<T> {
    modelType: string; // 'contentType' |
    connection: string;
    collectionName: string;
    info: {
        name: string;
        description: string;
    };
    options: {
        increments: boolean;
        timestamps: ['created_at', 'updated_at'];
        comment: string;
    };
    attributes: T;
}
