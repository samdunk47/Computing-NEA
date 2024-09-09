const { Client } = require("pg");
const express = require("express");
const app = express();
// const takeReadUserInput = require("./take-user-inputs.js");

const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "main",
});

app.get("/users", async (req, res) => {
    const rows = await readUser();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
});


// app.use(express.static( __dirname + "/public"));

// app.get("/users", (req, res) => {
//     const sendData = "Hello guys x";
//     res.send(sendData);
// });

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

async function start() {
    await connect();

    // await createColunns();

    const values = await readUser();
    console.log(values);

    // const userName = await takeReadUserInput();
    // const successCreate = await createUser(userName);
    // console.log(userName, successCreate);

    // const successCreate = await writeUsers("value");
    // console.log(successCreate);

    // const successUpdate = await updateUsers("value", 1);
    // console.log(successUpdate);

    // const successDelete = await deleteUsers(1);
    // console.log(successDelete);

    // const successChange = await changeColumnName("name", "first_name");
    // console.log(successChange);
}

start();

async function connect() {
    try {
        await client.connect();
    } catch (err) {
        console.error(`Failed to connect ${err}`);
    }
}

async function readUser(user_id = -1) {
    try {
        const query = `SELECT * FROM users ${
            user_id != -1 ? `WHERE user_id = '${user_id}'` : ""
        } ORDER BY user_id ASC`;
        const results = await client.query(query);
        return results.rows;
    } catch (err) {
        console.error(`Failed to read ${err}`);
    }
}

async function createColunns() {
    try {
        const query = `
            ALTER TABLE users
            ADD COLUMN user_id SERIAL PRIMARY KEY,
            ADD COLUMN name VARCHAR(100),
            ADD COLUMN date_of_birth DATE;
        `;
        await client.query(query);
        return true;
    } catch (err) {
        console.error(`Failed to create table ${err}`);
        return false;
    }
}


async function createUser() {
    try {
        await client.query(`INSERT INTO users VALUES ()`);
        return true;
    } catch (err) {
        console.error(`Failed to write ${err}`);
        return false;
    }
}

async function updateUser(id, firstName, lastName) {
    try {
        const queryFirst = `UPDATE users SET first_name = ${firstName} WHERE user_id = ${id}`;
        const queryLast = `UPDATE users SET last_name = ${lastName} WHERE user_id = ${id}`;
        await client.query(queryFirst);
        await client.query(queryLast);
        return true;
    } catch (err) {
        console.error(`Failed to update ${err}`);
        return false;
    }
}

async function deleteUser() {
    try {
        await client.query("DELETE FROM users WHERE id = <insert id>");
        return true;
    } catch (err) {
        console.error(`Failed to delete ${err}`);
        return false;
    }
}

async function changeColumnName(oldName, newName) {
    try {
        const query = `ALTER TABLE users RENAME COLUMN ${oldName} TO ${newName}`;
        await client.query(query);
        return true;
    } catch (err) {
        console.error(`Failed to update ${err}`);
        return false;
    }
}

async function changeFirstName(id, newFirstName) {
    try {
        const query = `UPDATE users SET first_name = '${newFirstName}' WHERE id = ${id}`;
        await client.query(query);
        return true;
    } catch (err) {
        console.error(`Failed to update ${err}`);
        return false;
    }
}

async function changeLastName(id, newLastName) {
    try {
        const query = `UPDATE users SET last_name = '${newLastName}' WHERE id = ${id}`;
        await client.query(query);
        return true;
    } catch (err) {
        console.error(`Failed to update ${err}`);
        return false;
    }
}

async function deleteColumn(columnName) {
    try {
        const query = `ALTER TABLE users DROP COLUMN ${columnName}`;
        await client.query(query);
        return true;
    } catch (err) {
        console.error(`Failed to delete ${err}`);
        return false;
    }
}