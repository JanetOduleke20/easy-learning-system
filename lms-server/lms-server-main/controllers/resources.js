const { Resources } = require("../models/resources.model");
const {Courses} = require('../models/courses.model')


const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

const stageTwoOfAddResources = async(req, res)=>{
    const {resourcesName, resourcesFile, signedInUser} = req.body;
    // console.log(resourcesFile);

    Resources.findOne({"resourceName": resourcesName},(err, foundResources)=>{
        if (err) {
            res.json({status: false, message: "Error occurred While adding resources. Please try again", errorOccurred: true})

        }else{
            if(!foundResources){
               
    
                cloudinary.v2.uploader.upload(resourcesFile,{timeout: 120000,resource_type:"auto",folder:"Easy Learning"},(err,result)=>{
                    if(err){
                        console.log(err);
                        res.json({status: false, message: "Error occurred while adding resources. Please try again", errorOccurred: true})

                    }else{
                        Courses.find({"authorId": signedInUser}, (err, courses)=> {
                            const courseId = courses[courses.length - 1]._id;
                            Resources.create( {resourceName: resourcesName, file: result.secure_url, courseId, courseDuration: result.duration, resourceType: result.resource_type}, (err, response)=>{
                                if (err) {
                                    console.log(err);
                                    res.json({status: false, message: "Error occurred while adding resources. Please try again", errorOccurred: true})
                                    
                                }else {
                                    console.log('Success');
                                    res.json({status: true, message: "Successful"})
                                }
                            })
                            })
                    }
                    
                })
                // cloudinary.v2.uploader.upload(resourcesFile, {timeout: 120000}, {resource_type: "auto"}),(result=> 
                //     console.log(result)
                // //     {
                // //     Courses.find({"authorId": signedInUser}, (err, courses)=> {
                // //         const courseId = courses[courses.length - 1]._id;
                // //         Resources.create( {resourceName: resourcesName, file: result.secure_url, courseId}, (err, response)=>{
                // //             if (err) {
                // //                 console.log(err);
                // //                 res.json({status: false, message: "Error occurred while adding resources. Please try again", errorOccurred: true})
                        
                // //             }else {
                // //                 console.log('Success');
                // //                 res.json({status: true, message: "Successful"})
                // //             }
                // //             })
                // //         })
                // // }
                // ).catch(err=> {
                //     console.log(err);
                //     res.json({status: false, message: "Error occurred while adding file. Please try again", errorOccurred: true});
                // })
            }
            else {
                console.log('Resource exists');
                res.json({status: false, message: "You already have a resource with the same name. Go back and edit", isExists: true})
            }
        }
    })

}
module.exports = { stageTwoOfAddResources}


