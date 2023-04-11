import express from "express";
import mongoose from "mongoose";
import multer from "multer";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const attendanceSchema= mongoose.Schema({
    attendance:[{
        
        image:{
            data:String,
            contentType:String
        },
    
   name:{
    type:String,
   },

   rollNo:{
    type:String,
   },

   standard:{
    type:String,
   },

   section:{
    type:String,
   },

   date:{
    type:String,
   },

   attendance:{
    type:String,
   },

   total:{
    type:String,
   },
}]
    },
 )
 

const Attendance=mongoose.model("Attendance",attendanceSchema);
attendanceSchema.plugin(Attendance)

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
    attendance:[{
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        name:"Harish",
        rollNo:"0001",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        name:"Shalini",
        rollNo:"0002",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
       
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        name:"Hem",
        rollNo:"0003",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Absent",
        total:"30",
    },
    {
        
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        name:"Devi",
        rollNo:"0004",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
         image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        name:"Hari",
        rollNo:"0005",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
         
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        name:"Megha",
        rollNo:"0006",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Absent",
        total:"30",
    },
    {
         
        image:{
            data:"https://e7.pngegg.com/pngimages/1008/662/png-clipart-student-girl-school-girl-thinking-s-child-reading-thumbnail.png",
            contentType:"image/png"
        },
        name:"Aswini",
        rollNo:"0007",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
    {
        image:{
            data:"https://w7.pngwing.com/pngs/241/840/png-transparent-computer-icons-student-school-student-angle-people-logo-thumbnail.png",
            contentType:"image/png"
        },
        name:"Gowri",
        rollNo:"0008",
        standard:"10'th",
        section:"B",
        date:"16/03/2023",
        attendance:"Present",
        total:"30",
    },
   
]}

// const app=express();
// app.use(express.json());

// get

router.get('/',(req,res)=>{
    try{
        res.status(200).send(user);
    }
    catch(error){
        res.json({message:"unable to create"});
    }
});

// specificData

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Attendance.findById(req.params.id)

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
            attendance:req.body.attendance 
        }
        console.log(details);
        const user=new Attendance(details);
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
    Attendance.findOneAndUpdate({_id:req.params.id},{
        $set:{
            attendance:req.body.attendance,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_attendance:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Attendance.findByIdAndRemove({_id:req.params.id},{
        $set:{
            attendance:req.body.attendance,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_attendance:result
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