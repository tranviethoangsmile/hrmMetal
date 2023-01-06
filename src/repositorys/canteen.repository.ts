import { Canteen } from '../models';

const create_canteen = async (data: any) => {
    try {
        const new_canteen = await Canteen.create({
            ...data,
        });
        if (new_canteen) {
            return new_canteen;
        } else {
            return {
                success: false,
                message: 'create canteen failed',
            };
        }
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

const find_canteen_by_id = async (id: string) => {
    try {
        const canteen = await Canteen.findOne ({
            where: {
                id: id
            }
        })
       if( canteen ) {
            return canteen
       }else {
            return {
                success: false,
                message: 'find canteen by id failed',
            };
        } 
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
} 



export { create_canteen, find_canteen_by_id };
