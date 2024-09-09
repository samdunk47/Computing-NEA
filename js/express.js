const { Client } = require("pg");
const express = require("express");
const app = express();

const client = new Client({
    "user": "postgres",
    "password": "postgres",
    "host": "localhost",
    "port": 5432,
    "database": "postgres"
});

app.get("/<insert table name>", async (req, res) => {
    const rows = await readX();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(rows));
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

async function start() {
    await connect();

    /*
    const values = await readX();
    console.log(values);

    const successCreate = await writeX("value");
    console.log(successCreate);

    const successUpdate = await updateX("value", 1);
    console.log(successUpdate);

    const successDelete = await deleteX(1);
    console.log(successDelete);
    */
}

start();

async function connect() {
    try {
        await client.connect();
    } catch (err) {
        console.error(`Failed to connect ${err}`);
    }
}

async function readX() {
    try {
        const results = await client.query("SELECT * FROM <insert table name>");
        return results.rows;
    } catch (err) {
        console.error(`Failed to read ${err}`);
    }
}

async function writeX() {
    try {
        await client.query("INSERT INTO <insert table name> (name) VALUES ('<insert value>')");
        return true;
    } catch (err) {
        console.error(`Failed to write ${err}`);
        return false;
    }
}

async function updateX() {
    try {
        await client.query("UPDATE <insert table name> SET name = '<insert value>' WHERE id = <insert id>");
        return true;
    } catch (err) {
        console.error(`Failed to update ${err}`);
        return false;
    }
}

async function deleteX() {
    try {
        await client.query("DELETE FROM <insert table name> WHERE id = <insert id>");
        return true;
    } catch (err) {
        console.error(`Failed to delete ${err}`);
        return false;
    }
}

