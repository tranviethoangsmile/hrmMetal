import mongoose from 'mongoose';

const numConnection = (): number => {
    const connectCount = mongoose.connections.length;
    console.log(`connecting ${connectCount}`);
    return connectCount;
};

export { numConnection };
