import mongoose from 'mongoose';

const connection : { isConnected?: number } = {};

async function dbConnect() {
    // Проверяем, есть ли у нас уже установленное соединение
    if (connection.isConnected) {
        return;
    }

    // Используем новое соединение Mongoose
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;