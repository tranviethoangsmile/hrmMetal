import { DeleteMessage } from '../../../models';

export interface IDeleteMessage {
    create(field: any): Promise<{
        success: boolean;
        data?: DeleteMessage;
        message?: string;
    }>;
}
