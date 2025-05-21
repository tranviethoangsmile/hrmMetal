import { OvertimeRequest } from '../../models';
import { IOvertimeRequestRepo } from '../interfaces/overtimeRquest/IOvertimeRequest.interface';

class OvertimeRequestRepository implements IOvertimeRequestRepo {
    async CREATE(data: any) {
        try {
            const new_overtime_request: OvertimeRequest | null =
                await OvertimeRequest.create(data);
            if (!new_overtime_request) {
                throw new Error('CREATE OVERTIME REQUEST FAILED');
            }
            return {
                success: true,
                data: new_overtime_request,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repository error:${error?.message}`,
            };
        }
    }
}

export default OvertimeRequestRepository;
