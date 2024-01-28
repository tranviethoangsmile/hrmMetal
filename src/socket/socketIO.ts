import { Server, Socket } from 'socket.io';
import { handleMessage } from '../utils/handleMessage';
let io: Server;

const init = (server: any) => {
    io = new Server(server);

    io.on('connection', (socket: Socket) => {
        console.log('New client connected');
        // Xử lý các sự kiện và gửi thông điệp đến client
        socket.on('sendMessage', async (data: string) => {
            const respon = await handleMessage(data);
            if (respon?.success) {
                // for (let i = 0; i < respon?.message.length; i++) {
                // setTimeout(() => {
                io.emit('messgpt', respon.message);
                //         }, 5 * i);
                //     }
            }
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

export { init, io };
