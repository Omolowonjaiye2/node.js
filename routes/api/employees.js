const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
data.employees = require('../../Model/employees.json');
const { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../public/controllers/employeesController');

router.route('/')  
.get(getAllEmployees)
.post(createNewEmployee)
.put(updateEmployee)
.delete(deleteEmployee);

router.route('/:id')
.get(getEmployee);

module.exports = router;


// router.route('/')
// .get((req, res) => {
//     res.json(data.employees);
// })
// .post((req, res) => {
//     res.json({
//         "name": req.body.name,
//         "age": req.body.age,
//     })
// })
// .put((req, res) => {
//     res.json({
//         "name": req.body.name,
//         "age": req.body.age
//     });
// })
// .delete((req, res) => {
//     res.json({
//         "name": req.body.name,
//         "age": req.body.age
//     });
// });

// router.route('/:id')
// .get((req, res) => {
//     res.json({
//         "id": req.params.id,
//         "name": req.body.name,
//         "age": req.body.age
//     });
// });

// module.exports = router;
