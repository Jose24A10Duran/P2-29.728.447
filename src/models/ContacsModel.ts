import { connectDB } from "../config/db";

export class ContactsModel {
    static async saveContact(email: string, name: string, lastname: string, comment: string, ip: string, date: string) {
        const db = await connectDB();
        await db.run(
            `INSERT INTO contacts (email, name, lastname, comment, ip, date) VALUES(?, ?, ?, ?, ?, ?)`,
        );
    }

    static async getContacts() {
        const db = await connectDB();
        return db.all(`SELECT * FROM contacts`);
    }
}