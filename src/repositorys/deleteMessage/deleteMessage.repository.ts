import { DeleteMessage } from '../../models';
import { IDeleteMessage } from '../interfaces';

class DeleteMessageRepository implements IDeleteMessage {
    async create(field: any) {
        try {
            const dlMessage: DeleteMessage | null = await DeleteMessage.create(
                field,
            );
            if (dlMessage === null) {
                throw new Error(`create delete message faild`);
            }
            return {
                success: true,
                data: dlMessage,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

export default DeleteMessageRepository;
