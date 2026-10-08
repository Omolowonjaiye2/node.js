const router = require('express').Router();
const { get } = require('http');
const path = require('path');
const data = {};
data.employees = require(path.join(__dirname, 
    '../../model/data/employees.json'));
const { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } = require('../../controllers/employeesController');

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
