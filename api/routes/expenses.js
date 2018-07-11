const routes = require('express').Router();

routes.get('/expenses', (req, res) => {
    let query = "SELECT * FROM expenses";
    res.locals.connection.query(query, (err, results) => {
        if (err) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }))
        }
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }))
    })
})

routes.post('/expenses', (req, res) => {
    let expense = {
        transaction_date: req.body.transaction_date,
        amount: req.body.amount,
        reason: req.body.reason,
        VAT: req.body.VAT
    };
    res.locals.connection.query('INSERT INTO expenses SET ?', expense, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(JSON.stringify(results));
    })
})

module.exports = routes;