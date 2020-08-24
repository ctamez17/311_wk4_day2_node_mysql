const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  const id = req.params.id
  let sql = `SELECT * FROM ?? WHERE ?? = ?` //"QUERY GOES HERE"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)` //"QUERY GOES HERE"
  let newUser = req.body;
  let first = newUser.first_name;
  let last = newUser.last_name;

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', `${first}`, `${last}`])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = `UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?`
  const id = req.params.id;
  const first = req.body.first_name;
  const last = req.body.last_name;

  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', first, 'last_name', last, 'id', id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  let first_name = req.params.first_name;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}