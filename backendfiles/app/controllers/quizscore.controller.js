const db = require("../models");
const nodemailer = require("nodemailer");
const QuizScore = db.quizscore;
const Op = db.Sequelize.Op;
require('dotenv').config();


const { QueryTypes } = require('sequelize');
exports.findAll = (req, res) => {
    QuizScore.findAll()
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

    const quizscore = {
        quizid: req.body.quizid,
        userid: req.body.userid,
        score: req.body.score
    };

    // Save Tutorial in the database
    QuizScore.create(quizscore)
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
    
    QuizScore.findAll({ where: {
         quizid:quizid ,
         userid:userid
        //  $and :{userid:userid}
        }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + quizid
            });
        });


    
};

exports.delete = (req, res) => {
    const quizid = req.params.id;

    QuizScore.destroy({
        where: { quizid:quizid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    QuizScore.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    QuizScore.destroy({
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


exports.getQuizScore = (req,res)=>{

    //show quizscore using user id
    db.sequelize.query("select (select quizname from quizzes where id in (select quizid from quizscores where userid = ?))as quizname, max(score) as score from quizscores where userid=?",
    {
        replacements:[req.params.id,req.params.id], 
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
}

exports.sendMail = (req, res) =>{
    console.log("request came");
    let data = req.body;
     console.log(data);
    // console.log(data[0]);
    // console.log(data[1]);
  
    let transporter =nodemailer.createTransport({
        host: "172.27.172.202",
        port: 25,
        secure: false,
        auth:{
          // user: process.env.EMAIL,
          // pass: process.env.PASSWORD
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      });
      
      let mailOptions ={
        from: "dadaramj@evolvingsols.com",
        to: data.email,
        subject: 'SMTP',
        html: `<h1>Hello ${data.username},</h1>
                <h3>Your score of ${data.quizname} is ${data.score}</h3>`
      };
      
      transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
      
      transporter.sendMail(mailOptions,function(err,data){
        if(err){
          console.log("Error occures",err);
        }else{
          console.log("Email send successfully....");
        }
      });
  };

  exports.getUsersWithHighQuizScore = (req, res) => {
    console.log("here-----------------------------")
    db.sequelize.query("select users.username, quizscores.score as maxscore from users, quizscores where users.id = quizscores.UserId order by quizscores.score desc"
        ,
        {

            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);
            console.log("here2222222-----------------------------")
            console.log(data);
        });
}

exports.getQuizUserCount = (req, res) => {
    console.log("here-----------------------------")
    db.sequelize.query("select quizzes.quizname,count(quizscores.userid) as usercount from quizzes,quizscores where quizzes.id=quizscores.quizid group by quizscores.quizid "
        ,
        {

            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);
            console.log("here2222222-----------------------------")
            console.log(data);
        });



    // Game.findAll({

    //   group: ['GameId'],
    //   include: [{
    //     model: GameScore,

    //   }]
    // }).then(data => {
    //   res.send(data);
    //   console.log("here2222222-----------------------------")
    //   console.log(data);
    // });

}
