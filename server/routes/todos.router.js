const router = require('express').Router();
const pool = require('../modules/pool');

router.get("/", (req, res) => {
    console.log("made it to the todo get route!");

    let queryText =
    `
    SELECT * FROM "todos"
    ORDER BY "id";           
    `;

    pool.query(queryText)
    .then((queryResponse) => {
        console.log("queryResponse.rows:", queryResponse.rows);
        res.status(200).send(queryResponse.rows);
    })
    .catch((err) => {
        console.log("Whoops, there be an error in here.");
        console.error(err);
        res.sendStatus(500);
    })
});

router.post("/", (req, res) => {
    console.log("made it to the todo post route!");

    let queryText =
    `
    INSERT INTO "todos"
    ("text")
    VALUES
    ($1);           
    `;

    let queryParams = [req.body.text];

    pool.query(queryText, queryParams)
    .then((queryResponse) => {
        console.log("queryResponse.rows:", queryResponse.rows);
        res.status(200).send(queryResponse.rows);
    })
    .catch((err) => {
        console.log("Whoops, there be an error in here.");
        console.error(err);
        res.sendStatus(500);
    })
});

router.put("/toggleIsComplete/:id", (req, res) => {
    console.log("made it to the todo put route!");
    console.log("req.params.id", req.params.id);

    let queryText =
    `
    UPDATE "todos" SET "isComplete" = TRUE
    WHERE "id" = $1;
    `;

    let queryParams = [req.params.id];

    pool.query(queryText, queryParams)
    .then((queryResponse) => {
        console.log("queryResponse.rows:", queryResponse.rows);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log("Whoops, there be an error in here.");
        console.error(err);
        res.sendStatus(500);
    })
});

router.delete("/deleteById/:id", (req, res) => {
    console.log("made it to the todo delete route!");

    let queryText =
    `
    DELETE FROM "todos"
    WHERE "id" = $1;           
    `;

    let queryParams = [req.params.id];

    pool.query(queryText, queryParams)
    .then((queryResponse) => {
        console.log("queryResponse.rows:", queryResponse.rows);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log("Whoops, there be an error in here.");
        console.error(err);
        res.sendStatus(500);
    })
});


module.exports = router;
