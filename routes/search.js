//The status code of 404 being sent if the
// item did not exist was added to the existing code

const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../data");
const ret = require("../lib/return");

function getSearchParams(queryParams, modelFields) {
    let searchParams = {};
    modelFields.forEach(function(p) {
        p = p.toLowerCase();
        if (queryParams[p]) {
            searchParams[p] = {
                [Op.like]: "%" + queryParams[p] + "%"
            };
        }
    });
    return searchParams;
}

//Changed to seperate functions for search book, author and user
//The reason for this was because I wanted different
//'allEntities =true' data for each.

//Added loan and author information about the book (include: [db.Author, db.Loan])
function findByBook(req, model, params, res){
    //Start of section added
    if (req.query.allEntities == "true") {
    model.findAll({include: [db.Author, db.Loan], where: params}).then(function(results){
        if(results){
            ret.json(results,res);
        }
        else{
            res.status(404).send();
            res.end();
        }
    });
}
//Finish of section added
    else{
        model.findAll({where: params}).then(function(results){
            if(results){
                ret.json(results,res);
            }
            else{
                res.status(404).send();
                res.end();
            }
        });
    }
}

//Added book information about the author. Additionally there is loan information about
//these books (include: [{model: db.Book, include:[db.Loan]}]) 
function findByAuthor(req, model, params, res){
    //Start of section added
    if (req.query.allEntities == "true") {
        model.findAll({include: [{model: db.Book, include:[db.Loan]}], where: params}).then(function(results){
            if(results){
                ret.json(results,res);
            }
            else{
                res.status(404).send();
                res.end();
            }
        });
    }
    //Finish of section added
        else{
            model.findAll({where: params}).then(function(results){
                if(results){
                    ret.json(results,res);
                }
                else{
                    res.status(404).send();
                    res.end();
                }
            });
        }
}

//Added loan information about the user (include:[{model: db.Loan, as: "Loans"}])
function findByUser(req, model, params, res){
    //Start of section added
    if (req.query.allEntities == "true") {
        model.findAll({include:[{model: db.Loan, as: "Loans"}], where: params}).then(function(results){
            if(results){
                ret.json(results,res);
            }
            else{
                res.status(404).send();
                res.end();
            }
        });
    }
    //Finish of section added
        else{
            model.findAll({where: params}).then(function(results){
                if(results){
                    ret.json(results,res);
                }
                else{
                    res.status(404).send();
                    res.end();
                }
            });
        }
}


router.get("/", function(req, res) {
    if (req.query.type.toLowerCase() === "book") {
        findByBook(req, db.Book,getSearchParams(req.query, ["title", "isbn"]), res);
    } else if (req.query.type.toLowerCase() === "author") {
        findByAuthor(req, db.Author, getSearchParams(req.query, ["name"]), res);
    } else if (req.query.type.toLowerCase() === "user") {
        findByUser(req, db.User, getSearchParams(req.query, ["name", "barcode", "memberType", "email", "password"]), res);
    } else {
        res.status(404).send();
        res.end();
    }
});

module.exports = router;
