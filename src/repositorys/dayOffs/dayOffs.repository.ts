import { DayOffs, User } from '../../models';
import { IDayOffs } from '../interfaces';

class DayOffsRepository implements IDayOffs {
    /**
     * Create a new day-off record
     * @param field - Data for creating a day-off
     * @returns Success or failure response
     */
    async CREATE(field: any) {
        try {
            const dayOff: DayOffs | null = await DayOffs.create(field);
            if (dayOff === null) {
                throw new Error(`Failed to create day off`);
            }
            return {
                success: true,
                data: dayOff,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }

    /**
     * Get all day-off records
     * @returns List of day-off records with user details
     */
    async GET_ALL() {
        try {
            const dayOffs = await DayOffs.findAll({
                attributes: ['date', 'user_id', 'id'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'avatar'],
                        as: 'userDetail',
                    },
                ],
            });

            if (!dayOffs || dayOffs.length === 0) {
                throw new Error(`No day-off records found`);
            }
            return {
                success: true,
                data: dayOffs,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message}`,
            };
        }
    }
}

export default DayOffsRepository;
