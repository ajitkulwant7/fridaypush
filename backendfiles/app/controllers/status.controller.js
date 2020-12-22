const db = require("../models");
const status = db.status;
const Op = db.Sequelize.Op;

const { QueryTypes } = require('sequelize');
exports.findAll = (req, res) => {
    status.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.create = (req, res) => {
    
    const status1 = {
        quizid: req.body.quizid,
        userid: req.body.userid,
        score: req.body.score,
        QuestionsAttempted:req.body.QuestionsAttempted
    };

    // Save Tutorial in the database
    status.create(status1)
    
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findOne = async (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;
    
    status.findAll({ where: {
         quizid:quizid ,
         userid:userid
        //  $and :{userid:userid}
        }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with"
            });
        });


    
};

exports.delete = (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;

    status.destroy({
        where: { 
            quizid:quizid,
            userid:userid
         }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id"
            });
        });
};

exports.update = (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;
console.log("---------------------------");

    status.update(req.body, {
        where: { 
            quizid:quizid ,
            userid:userid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "staus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial  Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating status"
            });
        });
};

exports.deleteAll = (req, res) => {
    status.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};


/*exports.getQuizScore = (req,res)=>{

    //show quizscore using user id
    db.sequelize.query("select * from quizscores where userid = ? ",
    {
        replacements:[req.params.id], 
        type: db.sequelize.QueryTypes.SELECT})
        .then(data=>{
            res.send(data);
            console.log(data);
        });
}

exports.getQuizName = (req,res)=>{

    //show quizname using user id
    db.sequelize.query("select quizname from quizzes where id=(select quizid from quizscores where userid = ?",
    {
        replacements:[req.params.id], 
        type: db.sequelize.QueryTypes.SELECT})
        .then(data=>{
            res.send(data);
            console.log(data);
        });
}*/
