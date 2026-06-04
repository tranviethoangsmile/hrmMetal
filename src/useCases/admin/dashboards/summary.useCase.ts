import { 
    UserRepository,
    OrderRepository, 
    PaidLeaveRequestRepository, 
    OvertimeRequestRepository, 
    CheckinRepository, 
    EventCheckRepository, 
    EventRepository 
} from "../../../repositorys";

const userRepository = new UserRepository();
const orderRepository = new OrderRepository();
const paidLeadRequestRepository = new PaidLeaveRequestRepository();
const overtimeRequestRepository = new OvertimeRequestRepository();
const checkinRepository = new CheckinRepository();
const eventCheckRepository = new EventCheckRepository();
const eventRepository = new EventRepository();

const adminDashboardSummaryUseCase = async (position: string, date: string) => {
    try {
        const [
            pending_paid_leave,
            pending_checkins,
            pending_orders,
            ] = await Promise.all ([
                paidLeadRequestRepository.GET_ALL_PAID_LEAVE_APPROVED_FOR_ADMIN(position),
                checkinRepository.GET_ALL_CHECKINS_OF_POSITION_IN_DATE_FOR_ADMIN(position, date),
                orderRepository.GET_ALL_ORDERS_OF_POSITION_IN_DATE_FOR_ADMIN(position, date),
            ])
            if(!pending_paid_leave.success && !pending_checkins.success && !pending_orders.success){
                throw new Error(`pending_paid_leave: ${pending_paid_leave?.message}, pending_checkins: ${pending_checkins?.message}, pending_orders: ${pending_orders?.message}`)
            }
            return {
                success: true,
                data: {
                    pending_paid_leave: pending_paid_leave?.data,
                    pending_checkins: pending_checkins?.data,
                    pending_orders: pending_orders?.data,
                }
            }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

export { adminDashboardSummaryUseCase };