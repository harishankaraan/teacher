import express from "express";
import mongoose from "mongoose";
import multer from "multer";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const assignmentSchema= mongoose.Schema({

     assignment:[{

        image:{
            data:String,
            contentType:String
        },

    enrollNo:{
        type:String,
        // required:true,
    },
    name:{
        type:String,
        required:true,
    },
}]
})

const Assignment=mongoose.model("Assignment",assignmentSchema);
assignmentSchema.plugin(Assignment)

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')


const user={
    assignment:[
    {
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0001",
        name:"Harish",
    },
    {
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0002",
        name:"Shalini",
    },
    {
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0003",
        name:"Devipriya",
    },
    {
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0004",
        name:"Hem",
    },
    {
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0005",
        name:"Hari",
    },
    {
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0006",
        name:"Megha",
    },
    {
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0007",
        name:"Aswini",
    },
    {
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        enrollNo:"0008",
        name:"Naveen",
    },
]
}

// const app=express();
// app.use(express.json());

// get 

router.get('/',(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"not available"});
    }
});

// specificData

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Assignment.findById(req.params.id)

    .then(result=>{
        res.status(200).json({
            user:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(505).json({
            error:err
        })
    })
})

// post

router.post('/', async(req,res)=>{
    try{
        const details={
            assignment:req.body.assignment,
        }
        console.log(details);
        const user=new Assignment(details);
        const userCreated=await user.save();

        if(userCreated){
            console.log("created");
            res.status(201).json({message:"successfully created"});
        }
        else{
            res.status(401);
            throw new error("not found");
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
});

// put

router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Assignment.findOneAndUpdate({_id:req.params.id},{
        $set:{
            assignment:req.body.assignment,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_assignment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

// delete

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Assignment.findByIdAndRemove({_id:req.params.id},{
        $set:{
            assignment:req.body.assignment,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_assignment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
        
    })
})

export default router;

// const port=9532;
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// });