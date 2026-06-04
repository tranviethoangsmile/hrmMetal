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
            ] = await Promise.all ([
                paidLeadRequestRepository.GET_ALL_PAID_LEAVE_APPROVED_FOR_ADMIN(position),
                checkinRepository.GET_ALL_CHECKINS_OF_POSITION_IN_DATE_FOR_ADMIN(position, date),
            ])
            if(!pending_paid_leave.success){
                return {
                    success: false,
                    message: pending_paid_leave?.message
                }
            }
            return {
                success: true,
                data: pending_paid_leave
            }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message
        }
    }
}

export { adminDashboardSummaryUseCase };