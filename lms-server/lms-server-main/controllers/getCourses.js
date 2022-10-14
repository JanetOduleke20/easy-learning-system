const {Courses} = require('../models/courses.model')

const getCoursesByCategories = (req, res)=> {
    const {name} = req.body;
    Courses.find({"courseCategory": name}, (err, courses)=> {
        if(err) {
            console.log(err);
            res.json({status: false, message: 'Please reload this page'})
        }else{
            if(courses < 0) {
                console.log('Not found');
                res.json({status: false, message: 'No course found'})
            }else {
                console.log(courses)
                res.json({status: true, courses})
            }
        }
    })
}

const getAllCourses = (req, res) => {
    // console.log(req.body)
    Courses.find((err, allCourses)=> {
        if(err) {
            console.log(err);
            res.json({status: false, message: 'Please reload this page'})
        }else{
            if(allCourses < 0) {
                // console.log('Not found');
                res.json({status: false, message: 'No course found'})
            }else {
                // console.log(allCourses)
                res.json({status: true, allCourses})
            }
        }
    })
}

module.exports = {getCoursesByCategories, getAllCourses}