var express = require('express')
var router = express()
const connection = require('../config/db')
router.get('/tabledir/:clg', (req, res, next) => {
    var cllg = req.params.clg;
    
    var sql = "select a.* ,b1.FullName, b2.FullName as guide2,c1.College_Name as clg,s1.Status_Name as Status ,dd1.Department_Name,d1.Domain_Name as dom1,d2.Domain_Name as dom2,d3.Domain_Name as dom3,d4.Domain_Name as dom4 from project_group a Join department dd1 on dd1.Department_id=a.Department_id  JOIN persons b1 on b1.Person_id=a.Instructor_id1 Join persons b2 on b2.Person_id =a.Instructor_id2 Join college c1 on c1.College_id=a.College_id Join project_domain d1 on d1.Domain_id=a.Domain_Pref_1 Join project_domain d2 on d2.Domain_id=a.Domain_Pref_2 Join project_domain d3 on d3.Domain_id=a.Domain_Pref_3 Join project_domain d4 on d4.Domain_id=a.final_domain Join status s1 on s1.Status_id=a.Status_id where a.College_id=?"
    connection.query(sql, [cllg], (err, director, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
              }  
        else{
            //console.log(director);
            res.send(director)
        }
    });
})
router.get('/hoddir/:dep', (req, res, next) => {
    var depa = req.params.dep;
    var sql = "select g.Group_id,(select count(Group_id)from project_group g1 where g1.Department_id=?)as clg,(select count(Group_id)from project_group g2 where g2.Status_id='1' and g2.Department_id=? ) as lag,(select count(Group_id)from project_group g3 where g3.Status_id=2 and g3.Department_id=?) as ont,(select count(Group_id)from project_group g4 where g4.Status_id=3  and g4.Department_id=?)as led,(select Department_Name from department where Department_id=?) as department  from project_group g where g.Department_id=?"
    connection.query(sql, [ depa, depa, depa, depa, depa, depa], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(task)
        }
    });
})
router.get('/hoddirgroups/:dep', (req, res, next) => {
    var dips = req.params.dep;
    var sql = "Select count(*) as total from persons where  department=? and roleId=1"
    connection.query(sql, [dips], (err, groups, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(groups)
        }

    });
})
router.get('/homedir/:clg', (req, res, next) => {
    var cllg = req.params.clg;
    var sql = "select g.Group_id,(select count(Group_id)from project_group g1 where g1.College_id=? )as clg,(select count(Group_id)from project_group g2 where g2.Status_id='1' and g2.College_id=? ) as lag,(select count(Group_id)from project_group g3 where g3.Status_id=2 and g3.College_id=? ) as ont,(select count(Group_id)from project_group g4 where g4.Status_id=3 and g4.College_id=?) as led,(select College_Name from college where College_id=? ) as collage from project_group g where g.College_id=?"
    connection.query(sql, [cllg,cllg, cllg, cllg,cllg,cllg], (err, director, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(director)
        }

    });
})
router.get('/hometabledir/:clg', (req, res, next) => {
    var cllg = req.params.clg;
    var datas=[];
    var errors=[];
    var h=0;
    var flag;
    var sql = "select Department_id as dep from department where College_id=?"
    connection.query(sql, [cllg], (err, director, fields) => {
        if (err) {
            
                errors[0]=err,
            console.log(err);
            flag=1;
            return
        }
        else {
          for(let i=0,j=1;i<director.length;i++){
            var sql = "select d.Department_id,d.Department_Name,(select count(*) from project_group g1 where g1.Status_id=1 and g1.Project_Type_id='1' and g1.Department_id=?)as lagind,(select count(*) from project_group g2 where g2.Status_id=1 and g2.Project_Type_id='2' and g2.Department_id=?)as laginh,(select count(*) from project_group g3 where g3.Status_id=2 and g3.Project_Type_id='1' and g3.Department_id=?)as ontind,(select count(*) from project_group g4 where g4.Status_id=2 and g4.Project_Type_id='2' and g4.Department_id=?)as ontinh,(select count(*) from project_group g5 where g5.Status_id=3 and g5.Project_Type_id='1' and g5.Department_id=?)as ledind,(select count(*) from project_group g6 where g6.Status_id=3 and g6.Project_Type_id='2' and g6.Department_id=?)as ledinh,(select count(*) from project_group g7 where g7.Department_id=?)as totaldep from department d where d.Department_id=? "
            connection.query(sql, [director[i].dep,director[i].dep,director[i].dep,director[i].dep,director[i].dep,director[i].dep,director[i].dep,director[i].dep], (err, table, fields) => {
                if (err) {
                   errors[j]=err
                    console.log(err);
                    flag=1;
                    return
                }
                else {
                    datas[h]=table;
                    h++;
                    while (Number(h) == Number(director.length)) {
                        if (flag == 1) {
                            res.send(errr);
                        }
                        else {
                            res.send(datas);
                        }
                        return;
                    }

                }
          });
        }
    }

    });
})

router.get('/alltabledir/:clg/:sts', (req, res, next) => {
    var cllg = req.params.clg;
    var status= req.params.sts;
    if(status==0){
        var sql = "select a.* ,b1.FullName, b2.FullName as guide2,c1.College_Name as clg,s1.Status_Name as Status ,dd1.Department_Name,d1.Domain_Name as dom1,d2.Domain_Name as dom2,d3.Domain_Name as dom3,d4.Domain_Name as dom4 from project_group a Join department dd1 on dd1.Department_id=a.Department_id  JOIN persons b1 on b1.Person_id=a.Instructor_id1 Join persons b2 on b2.Person_id =a.Instructor_id2 Join college c1 on c1.College_id=a.College_id Join project_domain d1 on d1.Domain_id=a.Domain_Pref_1 Join project_domain d2 on d2.Domain_id=a.Domain_Pref_2 Join project_domain d3 on d3.Domain_id=a.Domain_Pref_3 Join project_domain d4 on d4.Domain_id=a.final_domain Join status s1 on s1.Status_id=a.Status_id where a.College_id=?"
    }
    else{
        var sql = "select a.* ,b1.FullName, b2.FullName as guide2,c1.College_Name as clg,s1.Status_Name as Status ,dd1.Department_Name,d1.Domain_Name as dom1,d2.Domain_Name as dom2,d3.Domain_Name as dom3,d4.Domain_Name as dom4 from project_group a Join department dd1 on dd1.Department_id=a.Department_id  JOIN persons b1 on b1.Person_id=a.Instructor_id1 Join persons b2 on b2.Person_id =a.Instructor_id2 Join college c1 on c1.College_id=a.College_id Join project_domain d1 on d1.Domain_id=a.Domain_Pref_1 Join project_domain d2 on d2.Domain_id=a.Domain_Pref_2 Join project_domain d3 on d3.Domain_id=a.Domain_Pref_3 Join project_domain d4 on d4.Domain_id=a.final_domain Join status s1 on s1.Status_id=a.Status_id where a.College_id=? and a.Status_id=?"
    }
   
    connection.query(sql, [cllg,status], (err, director, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(director)
        }

    });
})
module.exports = router
