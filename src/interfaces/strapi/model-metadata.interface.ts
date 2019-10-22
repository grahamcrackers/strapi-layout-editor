import { ModelSchema } from './model-schema.interface';
import { ModelSettings } from './model-settings.interface';
import { AttributeMetaDatas } from './attribute-metadatas.interface';
import { ModelLayouts } from './model-layouts.interface';

export interface ModelMetadata {
    uid: string;
    schema: ModelSchema;
    settings: ModelSettings;
    metadatas: AttributeMetaDatas;
    layouts: ModelLayouts;
}
