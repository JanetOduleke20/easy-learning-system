const {Cart} = require('../models/addToCart.model');
const {Courses} = require('../models/courses.model')


const addToCart = (req, res)=>{
    const {_id, signedInUser, courseName, coverImage} = req.body;
    console.log(req.body);
    Cart.create({courseId: _id, userId: signedInUser, courseName, coverImage}, (err, response)=> {
        if(err) {
            console.log(err);
            res.json({status: false, message: "Error occurred"})
        }else {
            console.log({status: true, message: "Added"});
        }
    })
}

const getItemsFromCart =(req, res)=> {
    const {signedInUser} = req.body;
    Cart.find({"userId": signedInUser}, (err, cart)=> {
        if(err) {
            res.json({status: false, message: 'Error occurred while fetching your courses. Please try again'})
        }else {
            if(cart <0) {
                res.json({status: true, message: "Cart is empty"})
            }else {
                let courseArray = cart.forEach(item => {
                    Courses.findOne({_id: item.courseId}, (err, response) => {
                        const newArr = [];
                        newArr.push(response)
                        return newArr;
                    })
                });
                res.json({status: true, cart, courseArray})
            }
        }
    })
}

const deleteFromCart = (req, res) => {
    const {_id} = req.body;
    console.log(_id)
    Cart.findByIdAndDelete({"_id" : _id}, (err, updatedCart) => {
        if(err) {
            console.log(err);
            res.json({status: false, message: "Could not delete from cart. Please try again"})
        }else {
            console.log(updatedCart);
            res.json({status: true, updatedCart})
        }
    })
}

module.exports = {addToCart, getItemsFromCart, deleteFromCart}