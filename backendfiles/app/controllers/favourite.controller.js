const db = require("../models");
const Favourite = db.favourite;
const Op = db.Sequelize.Op;

const { QueryTypes } = require('sequelize');
exports.findAll = (req, res) => {
    Favourite.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving favourites."
            });
        });
};

exports.create = (req, res) => {

    const favourite = {
        quizid: req.body.quizid,
        userid: req.body.userid,
        };

    // Save Favourite in the database
    Favourite.create(favourite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Favourite."
            });
        });

};

exports.findOne = async (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;
    
    Favourite.findAll({ where: {
         quizid:quizid ,
         userid:userid
        //  $and :{userid:userid}
        }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Favourite with id=" + quizid
            });
        });


    
};

exports.delete = (req, res) => {
    const quizid = req.params.id;

    Favourite.destroy({
        where: { quizid:quizid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Favourite was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Favourite with id=${quizid}. Maybe Favourite was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Favourite with id=" + quizid
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Favourite.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Favourite was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Favourite with id=${id}. Maybe Favourite was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Favourite with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Favourite.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Favourites were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all favourites."
            });
        });
};


exports.getFavourite = (req,res)=>{

    //show favourite using user id
    db.sequelize.query("select * from favourites where userid = ? ",
    {
        replacements:[req.params.id], 
        type: db.sequelize.QueryTypes.SELECT})
        .then(data=>{
            res.send(data);
            console.log(data);
        });
// }

// exports.getFavQuiz = (req,res)=>{

//     //show quizname using user id
//     db.sequelize.query("select quizid from favourites where userid= ?",
//     {
//         replacements:[req.params.id], 
//         type: db.sequelize.QueryTypes.SELECT})
//         .then(data=>{
//             res.send(data);
//             console.log(data);
//         });
}