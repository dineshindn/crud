const query = require("../database.js");
const { validationResult } = require("express-validator");

module.exports = {
  create: async (req, res) => {
    
    try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const result = await query(
        "INSERT INTO Users (name, city, role) VALUES (? ,? ,?)",
        [req.body.name, req.body.city, req.body.role]
      );
      return res.status(200).send({
        status: 200,
        message: "Success",
        data: `${req.body.name} has been added to db`,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: 400,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const result = await query("UPDATE  Users SET name = ? WHERE id =?", [
        req.body.name,
        req.body.id,
      ]);
      return res.status(200).send({
        status: 200,
        message: "Success",
        data: ` ${req.body.name}`,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: 400,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },

  list: async (req, res) => {
    try {
    
      const id = req.body.id;
      if (id) {
        query1 = `SELECT * FROM Users WHERE id = ${id}`;
      } else {
        query1 = "SELECT * FROM Users ";
      }
      const result = await query(query1, (err, rows) => {
        if (err) {
          throw err;
        }
        if (rows.length === 0) {
          return res.status(400).send({
            status: 400,
            message: "no record found",
            data: rows,
          });
        }
        else {
          return res.status(200).send({
            status: 200,
            message: "Success",
            data: rows,
          });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: 400,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },

  //DELETE
  delete: async (req, res) => {
    try {
     
      const result = await query("DELETE from Users WHERE id=?", [
        req.body.id, 
      ]);
      return res.status(200).send({
        status: 200,
        message: "Success",
        data: `ID ${req.body.id} has been deleted from db`,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: 400,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },
};
