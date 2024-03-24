import { db } from "./database.js";

export async function set_ticket_number() {
    const starting_number = await db.get("ticket_count");

    await db.set("ticket_count", starting_number + 1)
    return await db.get("ticket_count");
};

export async function checkblacklist(user) {
    const blacklisted = await db.get("ticket-blacklist") || [];

    if (blacklisted.includes(user.id)) {
        return true;
    }else{
        return false;
    };
};