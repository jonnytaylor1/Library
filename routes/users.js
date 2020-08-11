//Additionally an email and password was
//included for the user information 

//If I had more time I would have like to create
//a login for both staff and students and the email
//and password would have been useful for this.

//The status code of 404 being sent if the
// user did not exist was added to the existing code

const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    db.User.findAll().then(function(users) {
        ret.json(users, res);
    });
});

router.get("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            ret.json(user, res);
        } else {
            res.status(404).send();
            res.end();
        }
    });
});



router.get("/:userID/loans", function(req, res) {
    db.Loan.findAll({ where: { userId: req.params.userID } }).then(function(loans) {
        ret.json(loans, res);
    });
});

router.post("/:userID/loans/:bookID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            db.Book.findByPk(req.params.bookID).then(function(book) {
                if (book) {
                    db.Loan.findOrCreate({
                        where: { UserId: req.params.userID, BookId: req.params.bookID }
                    }).spread(function(loan, created) {
                        loan.dueDate = new Date(req.body.dueDate);
                        loan.save().then(function(loan) {
                            ret.json(loan, res);
                        });
                    });
                }
                else{
                    res.status(404).send();
                    res.end();
                }
            });
        } else {
            res.status(404).send();
            res.end();
        }
    });
});

router.post("/", function(req, res) {
    db.User.create({
        name: req.body.name,
        barcode: req.body.barcode,
        memberType: req.body.memberType,
        email: req.body.email,
        password: req.body.password
    }).then(function(user) {
        ret.json(user, res);
    });
});



router.put("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            (user.name = req.body.name),
            (user.barcode = req.body.barcode),
            (user.memberType = req.body.memberType),
            (user.email = req.body.email),
            user.save().then(function(user) {
                ret.json(user, res);
            });
        } else {
            res.status(404).send();
            res.end();
        }
    });
});

//Added patch request which was used for adding a barcode to a user and
//only having to input the users ID

router.patch("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            if (user.name !== req.body.name && req.body.name !== ""){
            (user.name = req.body.name);}
            if (user.barcode !== req.body.barcode && req.body.barcode !== ""){
                (user.barcode = req.body.barcode);}
            if (user.memberType !== req.body.memberType && req.body.memberType !== ""){
                (user.memberType = req.body.memberType);}
            if (user.email !== req.body.email && req.body.email !== ""){
                (user.email = req.body.email);}
            if (user.password !== req.body.password && req.body.password !== ""){
                (user.password = req.body.password);}
                user.save().then(function(user) {
                    ret.json(user, res);
                });
        } else {
            res.status(404).send();
            res.end();
        }
    });
});

router.delete("/:userID", function(req, res) {
    db.User.findByPk(req.params.userID)
        .then(function(user) {
            if (user) {
                return user.destroy();
            } else {
                res.status(404).send();
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});



module.exports = router;
