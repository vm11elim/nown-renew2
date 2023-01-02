const conn = require("./db.js");

// 생성자 
const Customer = function(customer){
    this.userid = customer.userid;
    this.name = customer.name;
    this.phone = customer.phone;
    this.tel = customer.tel;
    this.email = customer.email;    
};


Customer.Create_TABLE_if_not_exist = ()=>{

  var sql = `CREATE TABLE IF NOT EXISTS customers 
        (id INT AUTO_INCREMENT PRIMARY KEY, 
            userid VARCHAR(50) NOT NULL, 
            name VARCHAR(50) NOT NULL, 
            phone VARCHAR(50) NOT NULL, 
            tel VARCHAR(50) NOT NULL, 
            email VARCHAR(50) NOT NULL)`;
  conn.query(sql, function (err, result) {
  if (err) throw err;  
  console.log("Table created");
  });
}

// customer 튜플 추가 
Customer.create = (newCustomer, result)=>{


  Customer.Create_TABLE_if_not_exist();  
  // return;
  
  
  conn.query("INSERT INTO customers SET ?", newCustomer, (err, res)=>{
      if(err){
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("Created customer: ",{id:res.inseertId, ...newCustomer });
      // console.log(res);
      result(null, {id: res.inseertId, ...newCustomer});
      // result.status(200).json({msg:'done'});
  });
};

// customer id로 조회
Customer.findById = (customerId, result) => {
    conn.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

// customer 전체 조회
Customer.getAll = result =>{
    conn.query('SELECT * FROM customers', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("customer: ", res);
        result(null, res);
    });
};

// customer id로 수정
Customer.updateById = (id, customer, result) => {
    conn.query(
      "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
      [customer.email, customer.name, customer.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };

// customer id로 삭제
Customer.remove = (id, result)=>{
    conn.query('DELETE FROM customers WHERE id = ?',id, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

// customer 전체 삭제
Customer.removeAll = result =>{
    conn.query('DELETE FROM customers',(err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

module.exports = Customer;