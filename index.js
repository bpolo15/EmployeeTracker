const inquirer = require("inquirer");
const connection = require("./connections");
const mysql = require("mysql");

 async function start(){ 
    await inquirer
        .prompt([
    
                {
                    type: 'list',
                    message: "What would you like to do?",
                    choices: ["Add Department", "Add Role", "Add Employee", "View All Departments", "View All Roles", "View All Employees", "Update Employee Roles", "Exit Program"],
                    // choices: ["View All Employees", "View All Departments", "View all Roles", "View All Employees by Department", "View All Employees By Manager", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Update Employee Manager", "Remove Employee","Delete Department", "Delete Role", "Exit Program"],
                    name: "choice"
                }
                ])
                .then(choice => {
                    var decision = choice.choice;
                  console.log(decision);
                  if(decision === "Exit Program"){
                  exitprogram();
                  }
                  else if(decision === "Add Department"){
                  addDepartment();
                  }
                  else if(decision === "Add Role"){
                    addRole();
                  } 
                  else if(decision === "Add Employee"){
                    addEmployee();
                  }
                  else if(decision === "View All Departments"){
                    viewDepartments();
                  }
                  else if(decision === "View All Employees"){
                    viewEmployees();
                  }
                  else if(decision === "View All Roles"){
                    viewRoles();
                  }
                  else if(decision === "Update Employee Roles")
                  {
                    updateEmpRole();
                  }
                })
        }
      function exitprogram(){
      return;
      }
    async function addDepartment(){
     await inquirer
        .prompt([
            {
                type: "input",
                message: "Enter New Department:",
                name: "department"
            },
            {
                type: "input",
                message: "Enter Department Id:",
                name: "id"
            }
           
        ])
        .then(result =>{
            console.log(result);
            var newDept = result.department;
            var newId = result.id;
            console.log("ID: ", newId, "DEPT: ", newDept)
            connection.query("INSERT INTO department (id, name) VALUES (?,?)", [newId, newDept])
        })
        
      start();
    }
    async function addRole(){
      await inquirer
         .prompt([
             {
                 type: "input",
                 message: "Enter New Role:",
                 name: "role"
             },
             {
                 type: "input",
                 message: "Enter Role Id:",
                 name: "id"
             },
             {
               type: "input",
               message: "Enter Salary:",
               name: "salary"
             },
             {
               type: "input",
               message: "Enter Department Id:",
               name: "departmentID"
             }
            
         ])
         .then(result =>{
             console.log(result);
             var newRole = result.role;
             var newId = result.id;
             var newSalary = result.salary;
             var newDeptID = result.departmentID;
             connection.query("INSERT INTO role (id, title, salary, department_id) VALUES (?,?,?,?)", [newId, newRole, newSalary, newDeptID])
         })
         
       start();
     }
     async function addEmployee(){
      await inquirer
         .prompt([
             {
                 type: "input",
                 message: "Enter Employee's First Name:",
                 name: "first"
             },
             {
                 type: "input",
                 message: "Enter Employee's Last Name:",
                 name: "last"
             },
             {
               type: "input",
               message: "Enter Employee ID:",
               name: "id"
             },
             {
               type: "input",
               message: "Enter role ID:",
               name: "roleID"
             }
            
         ])
         .then(result =>{
             console.log(result);
             var firstName = result.first;
             var lastName = result.last;
             var newId = result.id;
             var newRoleID = result.roleID;
             connection.query("INSERT INTO employee (id, first_name, last_name, role_id) VALUES (?,?,?,?)", [newId, firstName, lastName, newRoleID])
         })
         
       start();
     }
  async function updateEmpRole(){
    await inquirer
    .prompt([
      {
        type: "input",
        message: "Enter First Name of Employee:",
        name: "first"
      },
      {
        type: "input",
        message: "Enter Last Name of Employee",
        name: "last"
      },
      {
        type: "input",
        message: "Enter new Role ID",
        name: "newID"
      }
    ])
    .then(result =>{
      var firstName = result.first;
      var lastName = result.last;
      var newRole = result.newID;
      console.log(result);
      connection.query('UPDATE employee SET role_id = ? WHERE first_name = ? and last_name = ?', [newRole, firstName, lastName])
    })
    start();
  }

 async function viewDepartments(){
    await connection.query("SELECT * FROM department")
    .then(result =>
     console.table(result))
     start();
  }
 async function viewEmployees(){
   await connection.query("SELECT e.first_name, e.last_name, r.title FROM role AS r RIGHT JOIN employee As e ON r.id = e.role_id")
    .then(result =>
     console.table(result))
     start ();
  }
  async function viewRoles(){
    await connection.query("SELECT title, salary FROM role")
    .then(result =>
     console.table(result))
     start();
  }
  start();
    

  