import { ILocationdata } from './locationdata';

/**
 * Model definition for locationlicensetypes
 */
export interface ILocationlicensetypes {
    id: string;
    LicenseTypeId?: number;
    Name?: string;
    locationdata?: ILocationdata[];
}
