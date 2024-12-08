const {Router} = require('express')
const controller = require('./controller')

const router = Router()

router.get("/report/", controller.getReport)
router.get("/employee/", controller.getEmployee)
/**
 * @openapi
 * /:
 *   get:
 *     description: Get info an employee by an SSN
 */ 
router.get("/employee/:ssn", controller.getEmployeeById)
/**
 * @openapi
 * /:
 *   get:
 *     description: Get UUID of a report / snapshot /  recording
 */ 
router.get("/report/:uuid", controller.getReportById)

module.exports=router
