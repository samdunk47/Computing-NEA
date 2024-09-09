const { Client } = require("pg");
const express = require("express");
const app = express();

const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "main",
});

app.get("users", async (req, res) => {
    const rows = await readUsers();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

// class UsersController {
//     constructor() {
        