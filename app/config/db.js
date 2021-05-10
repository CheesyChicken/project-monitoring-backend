var mysql = require('mysql');

var connection = mysql.createConnection({
  //socketPath: '34.93.103.215/sound-micron-290407:asia-south1:newdatabase',
  /* socketPath     : '/cloudsql/sound-micron-290407:asia-south1:newdatabase', */
  host: '35.239.58.214',
  user: 'Jinesh',
  password: '',
  database: 'newdatabase2'
});

module.exports=connection;  