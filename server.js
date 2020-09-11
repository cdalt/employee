const inquirer = require("inquirer");
const mysql = require("mysql");
const { listenerCount } = require("process");
const { create } = require("domain");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employee_db",
});

connection.connect();
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "operation",
      choices: ["Add Employee", "View Employee", "Update Employee"],
    })
    .then(function (response) {
      response.name;
      if (response.name === "Add Employee") {
        inquirer
          .prompt(
            {
              type: input,
              name: "firstname",
              message: "What's your first name?",
            },
            {
              type: input,
              name: "lastname",
              message: "Whats your last name?",
            },
            {
              type: list,
              name: "employeerole",
              choices: ["Sales Lead", "Lead Engineer", "Accountant"],
            },
            {
              type: list,
              name: "departments",
              choices: ["Sales", "Engineering", "Finance"],
            }
          )
          .then(function (response) {
            connection.query(
              "INSERT INTO employee (firstname, lastname, employeerole, departments) VALUES (?, ?, ?, ?)",
              [
                response.firstname,
                response.lastname,
                response.employeerole,
                response.departments,
              ],
              function (err, res) {
                init();
              }
            );
          });
      } else if (response.name === "View Employee") {
        connection.query("SELECT * FROM employee", function (err, res) {
          for (i = 0; i < res.length; i++) {
            console.log(
              res[i].firstname,
              res[i].lastname,
              res[i].employeerole,
              res[i].departments
            );
          }
          init();
        });
      }
    });
}
init();
