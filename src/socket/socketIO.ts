import { Server, Socket } from 'socket.io';

let io: Server;

const init = (server: any) => {
    io = new Server(server);

    io.on('connection', (socket: Socket) => {
        console.log('New client connected');
        // Xử lý các sự kiện và gửi thông điệp đến client

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

export { init, io };
