const express = require('express');
const router = express.Router();

// router.use(cookieParser());

// const {
//     create,
//     findAll,
// } = require("../controllers/customer.controller.js");
const customers = require("../controllers/customer.controller.js");

router.post('/customers', customers.create);
router.get("/customers", customers.findAll);// 전체 조회 
router.get("/customers/:customerId", customers.findOne);// id로 조회
router.put("/customers/:customerId", customers.update);// id로 수정
router.delete("/customers/:customerId", customers.delete);// id로 삭제
router.delete("/customers", customers.deleteAll);// 전체 삭제

module.exports = router;


