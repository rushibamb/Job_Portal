import Job from "../models/job.model.js";
export const postJob= async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,position,companyId}=req.body;
        const userId= req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        const job=await Job.create({
            title,
            description,
            requirements,
            salary:Number(salary),
            location,
            jobType,
            position,
            company:companyId,
            createdBy:userId
        });
        return res.status(200).json({
            message:"Job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllJobs= async(req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{ $regex:keyword, $options:"i" }},
                {description:{ $regex:keyword, $options:"i" }},


            ]
        }
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(400).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs fetched successfully",
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }


}
export const getJobById= async(req,res)=>{
    try {
        const jobId= req.params.id;
        const job = await Job.findById(jobId)
            .populate({
                path: 'applications',
                populate: {
                    path: 'applicant',
                    select: '_id fullname email'
                }
            })
            .populate({
                path: 'company',
                select: 'name location'
            });
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Job fetched successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
}

export const getAdminJobs= async(req,res)=>{
    try {
        const adminId= req.id;
        const jobs = await Job.find({createdBy:adminId}).populate({
            path:"company",
              
            
        });
        if(!jobs){
            return res.status(400).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Jobs fetched successfully",
            jobs,
            success:true
        })
    } catch (error) {
       console.log(error);
    }
}
