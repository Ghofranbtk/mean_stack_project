const express = require("express");
const router = express.Router();
const Feed = require("../models/feedback");
const path  =require("path");
const bodyParser = require('body-parser');

//------------------------------------------Add FeedBAck-------------------------------------------

router.post("/feed/add",(req,res) => {
    console.log('Here in add feedback ',req.body);
    const feed = new Feed({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message
    });
    feed.save().then(
        (result) => {
            if(result){
                res.status(200).json({
                    message: "Feedback added with succes !"
                })  
            }
            else {
                res.status(200).json({
                    message: "Operation failed ! "
                })  
            }
        }

    )     
});

//--------------------------- Get All Feedbacks --------------------------------------------
router.get('/feedbacks', (req,res) => {
    console.log('Here into get all feedbacks');
    Feed.find().then(
        (result) => {
            if (result) {
                Feed.count().then(
                    (data) =>{
                        // console.log(result);
                        res.status(200).json({
                            feedback: result , 
                            nbr : data
                        })
                    }
                )
               
            }
        }
    )
});

//------------------------------ Delete Feedback --------------------------
router.delete('/delete/:id', (req, res) => {
    console.log('Delete Feedback By ID', req.params.id);
    Feed.deleteOne({ _id: req.params.id }).then(
        (result) => {
            if (result) {
                res.status(200).json({
                    message: 'Deleted Feedback with success'
                })
            }
        }
    )
});

//----------------------------- Add Feedback to Home Page -----------------------
router.put("/home/add/:id", (req, res) => {
    console.log('Here in edit feedback', req.body);
    const feedback = new Feed({
        _id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message : req.body.message,
        visibility : req.body.visibility
    });
    console.log('new Feedback', feedback);
            Feed.updateOne({ _id: req.params.id }, feedback).then((result) => {
                console.log("updated ");
                res.status(200).json({
                    message: 'Update with success',
                    id: req.params.id
                });
            })
                .catch(err => {
                    console.log("error", err);
                    res.status(500).json({
                        error: err
                    });
                });
            })


//----------------------------- Delete Feedback from Home Page -----------------------
router.put("/home/delete/:id", (req, res) => {
    console.log('Here in edit feedback', req.body);
    const feedback = new Feed({
        _id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message : req.body.message,
        visibility : req.body.visibility
    });
    // console.log('new Feedback', feedback);
            Feed.updateOne({ _id: req.params.id }, feedback).then((result) => {
                console.log("updated ");
                res.status(200).json({
                    message: 'Update with success',
                    id: req.params.id
                });
            })
                .catch(err => {
                    console.log("error", err);
                    res.status(500).json({
                        error: err
                    });
                });
            })


//------------------------- Get Visibile Feedbacks in Home Page ----------------
router.get('/visible' , (req,res)=>{
    console.log('get all visible feedbacks' );
    Feed.find({visibility : true}).then(
        (data)=>{
            console.log('hahahahah',data)
            res.status(200).json({
                feedback : data
            })
        }
    )
})



module.exports = router;
