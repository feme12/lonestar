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

export function addUser(user, table) {
    table.users.push(user);
}

export function removeUser(user, table) {
    const index = table.users.indexOf(user);
    if (index !== -1) {
      table.users.splice(index, 1);
    }
}

export function userExists(user, table) {
    return table.users.includes(user);
}

export function Data(owner, reason, creationdate, users, claimedby) {
    this.owner = owner;
    this.reason = reason;
    this.creationdate = creationdate;
    this.users = users;
    this.claimedby = claimedby;
}