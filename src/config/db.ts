import sqlite3 from 'sqlite3';
import { open } from 'sqilte';

export async function connectDB() {
    return open({
        filename: 'database.sqlite',
        driver: sqlite3.Database
    });
}

export async function inicialiceDB() {
    const db = await connectDB();
    await db.exec(`
        CREATE TABLA IF NOT EXISTS users (
        id INTERGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAP DEFAULT CURRENT_TIMESTAMP
        )
        `);
        await db.close(); 
}