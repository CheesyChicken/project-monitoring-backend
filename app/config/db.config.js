//var mysql = require('mysql');
module.exports = { 
    HOST: "35.239.58.214",
    USER: "Jinesh",
    PASSWORD: "",
    DB: "newdatabase2",
    dialect: "mysql",
    pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    
  };
/* 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'roots',
  password: 'roots',
  database: 'newdatabase'
});

module.exports=connection;  */