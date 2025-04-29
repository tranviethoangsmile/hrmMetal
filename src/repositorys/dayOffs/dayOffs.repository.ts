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
            const dayOffs: DayOffs[] = await DayOffs.findAll({
                attributes: ['id', 'date', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['name', 'avatar'],
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
    /**
     * Get a day-off record by ID
     * @param id - ID of the day-off record
     * @returns Day-off record details
     */
    async GET_BY_ID(id: string) {
        try {
            const dayOff: DayOffs | null = await DayOffs.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'avatar'],
                        as: 'userDetail',
                    },
                ],
                attributes: ['id', 'user_id', 'date'],
            });

            if (!dayOff) {
                throw new Error(`Day-off record not found`);
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
     * Delete a day-off record by ID
     * @param id - ID of the day-off record to delete
     * @returns Success or failure response
     */
    async DELETE(id: string) {
        try {
            const dayOff: number = await DayOffs.destroy({
                where: {
                    id,
                },
            });
            if (dayOff === 0) {
                throw new Error(`Failed to delete day off`);
            }
            return {
                success: true,
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
