import moment from 'moment-timezone';
import {
    OrderRepository,
    PaidLeaveRequestRepository,
    CheckinRepository,
    UserRepository,
    UniformOrderRepository
} from '../../../repositorys';

const orderRepository = new OrderRepository();
const paidLeadRequestRepository = new PaidLeaveRequestRepository();
const checkinRepository = new CheckinRepository();
const userRepository = new UserRepository
const uniformRepository = new UniformOrderRepository()


const adminDashboardSummaryUseCase = async (position: string, date: string) => {
    try {
        const previousDay = moment.tz(date, 'Asia/Tokyo')
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
        const [
            pending_paid_leave,
            pending_checkins,
            pending_orders,
            users_by_position,
            paid_leaves,
            uniforms_pending,
        ] = await Promise.all([
            paidLeadRequestRepository.GET_ALL_PAID_LEAVE_APPROVED_FOR_ADMIN(
                position,
            ),
            checkinRepository.GET_ALL_CHECKINS_OF_POSITION_IN_DATE_FOR_ADMIN(
                previousDay,
                position,
            ),
            orderRepository.GET_ALL_ORDERS_OF_POSITION_IN_DATE_FOR_ADMIN(
                position,
                date,
            ),
            userRepository.GET_ALL_USERS_OF_POSITION_FOR_ADMIN(
                position
            ),
            checkinRepository.GET_ALL_PAID_LEAVE_OF_POSITION_IN_DATE_FOR_ADMIN(
                date,
                position,
            ),
            uniformRepository.GET_ALL_UNIFORM_ORDERS_OF_POSITION_FOR_ADMIN(position)
        ]);
        if (
            !pending_paid_leave.success &&
            !pending_checkins.success &&
            !pending_orders.success &&
            !users_by_position.success &&
            !paid_leaves.success &&
            !uniforms_pending.success
        ) {
            throw new Error(
                `pending_paid_leave: ${pending_paid_leave?.message},
                pending_checkins: ${pending_checkins?.message}, 
                pending_orders: ${pending_orders?.message}, 
                users_by_position: ${users_by_position?.message},
                uniforms_pending: ${uniforms_pending?.message}`
            );
        }
        return {
            success: true,
            data: {
                pending_paid_leave: pending_paid_leave?.data,
                pending_checkins: pending_checkins?.data,
                pending_orders: pending_orders?.data,
                users_by_position: users_by_position?.data,
                paid_leaves: paid_leaves?.data,
                uniforms_pending: uniforms_pending?.data
            },
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { adminDashboardSummaryUseCase };
