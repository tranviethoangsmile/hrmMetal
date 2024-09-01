import { Server, Socket } from 'socket.io';
import moment from 'moment';
import { handleMessage } from '../utils/handleMessageChatAi';
import { create_new_message } from '../interfaces';
import { create_message_controller } from '../controllers';
let io: Server;

const init = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
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

        socket.on('joinConversation', (conversationId: string) => {
            socket.join(conversationId);
        });
        socket.on('send-message', async (data: create_new_message) => {
            const new_messge = await create_message_controller(data);
            if (new_messge?.success) {
                io.to(data.conversation_id).emit(
                    `${data.conversation_id}`,
                    new_messge,
                );
            }
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

export { init, io };
