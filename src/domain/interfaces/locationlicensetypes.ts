import { ILocationdata } from './locationdata';

/**
 * Model definition for locationlicensetypes
 */
export interface ILocationlicensetypes {
    id: string;
    LicenseTypeId?: integer;
    Name?: string;
    locationdata?: ILocationdata[];
}
