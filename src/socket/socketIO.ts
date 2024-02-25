import { Server, Socket } from 'socket.io';
import moment from 'moment';
import { handleMessage } from '../utils/handleMessageChatAi';
let io: Server;

const init = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT'],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log('New client connected');
        // Xử lý các sự kiện và gửi thông điệp đến client
        socket.on('sendMessage', async (data: string) => {
            const respon = await handleMessage(data);
            if (respon?.success) {
                socket.emit('messgpt', respon.message);
            }
        });
        let lastTime = moment().format('HH:mm');
        setInterval(() => {
            const currentTime = moment().format('HH:mm');
            if (currentTime !== lastTime) {
                lastTime = currentTime;
                socket.emit('qrReset', currentTime);
            }
        }, 1000);
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

export { init, io };
