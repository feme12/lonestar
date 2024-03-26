function Data(owner, reason, creationdate, users) {
    this.owner = owner;
    this.reason = reason;
    this.creationdate = creationdate;
    this.users = users;

    // Method to add users
    this.addUser = function(newUser) {
        this.users.push(newUser);
    };

    // Method to remove users
    this.removeUser = function(userToRemove) {
        const index = this.users.indexOf(userToRemove);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    };
}

// Create a new instance of Data
const newData = new Data("John", "Some reason", "2024-03-25", ["user1", "user2", "user3"]);

// Add a new user
newData.addUser("user4");

console.log(newData);

// Remove a user
newData.removeUser("user2");

console.log(newData);

import { db } from "./src/database.js";

db.set("test1h", newData);
console.log(await db.get("test1h"))