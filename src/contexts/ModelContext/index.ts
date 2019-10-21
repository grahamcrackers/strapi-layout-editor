import { Schema, Settings, Layouts, MetaDataViews } from 'interfaces/strapi/strapi.interface';

export { Context as ModelContext, Provider as ModelProvider, Consumer as ModelConsumer } from './ModelContext';

export interface ModelMetadata {
    uid: string;
    schema: Schema;
    settings: Settings;
    metadatas: AttributeMetaData;
    layouts: Layouts;
}

export interface AttributeMetaData {
    id: MetaDataViews;
    [prop: string]: MetaDataViews;
}
