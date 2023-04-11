import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// connectDB();
const scheduleSchema= mongoose.Schema({
    schedule:[{
   
        date:{
            type:String
        },
        day:{
            type:String
        },
        schedule:{
            type:String
        },
        time:{
            type:String
        },
}]
})

const Schedule=mongoose.model("Schedule",scheduleSchema);
scheduleSchema.plugin(Schedule)
const user={
    schedule:[
    {
        date:"11/04/2023",
        day:"Tuesday",
        schedule:"Science lab",
        time:"09:00AM-11:00AM",
    },
    { 
        date:"11/04/2023",
        day:"Tuesday",
        schedule:"Computer lab",
        time:"11:00AM-01:00PM",
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
        res.json({message:"unable to create"});
    }
});

// specificData

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    Schedule.findById(req.params.id)

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
           schedule:req.body.schedule,
        }
        console.log(details);
        const user=new Schedule(details);
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
    Schedule.findOneAndUpdate({_id:req.params.id},{
        $set:{
            schedule:req.body.schedule,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_schedule:result
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
    Schedule.findByIdAndRemove({_id:req.params.id},{
        $set:{
            schedule:req.body.schedule,
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_schedule:result
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