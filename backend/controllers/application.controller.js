import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

export const applyJob = async (req,res)=>{
    try {
      const userId = req.id;
      const {id:jobId} = req.params;
      if(!userId || !jobId){
        return res.status(400).json({
            message:"User ID and Job ID are required",
            success:false
        })
      }
      //check if the user has already applied for job
      const existingApplication = await Application.findOne({applicant:userId,job:jobId});
      if(existingApplication){
        return res.status(400).json({
            message:"You have already applied for this job",
            success:false
        })
      }
      
      //check if the job exists
      const job = await Job.findById(jobId);
      if(!job){
        return res.status(400).json({
            message:"Job not found",
            success:false
        })
      }
     //create a new application
    const newApplication = await Application.create({applicant:userId,job:jobId});
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
        message:"Application submitted successfully",
        application:newApplication,
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


export const getAppliedJobs = async (req,res)=>{
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{ sort: { createdAt: -1 } },
            populate:{
                path:'company',
                options:{ sort: { createdAt: -1 } },

            }
        });
        if(!applications){
            return res.status(400).json({
                message:"No applications found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Applications fetched successfully",
            applications,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }

}


export const getApplicants = async (req, res) => {
    try {
      const { id: jobId } = req.params;
  
      const job = await Job.findById(jobId)
        .populate({
          path: "applications",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "applicant",
          },
        });
  
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        job,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message || "Internal server error",
        success: false
      });
    }
  };
  

export const updateStatus = async (req,res)=>{
    try {
        const {status} = req.body;
        const { id: applicationId } = req.params;

        if(!status ){
            return res.status(400).json({
                message:"Status ID  required",
                success:false
            })
        }

        //find application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({
                message:"Application not found",
                success:false
            })
        }
        
        //update status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated successfully",
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
