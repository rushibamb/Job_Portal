import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
//import useGetSingleJob from '@/hooks/useGetSingleJob';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constant';
import { toast } from 'sonner';
function JobbDescription() {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  
  // Helper function to check if user has applied
  const checkIfApplied = (applications, userId) => {
    if (!applications || !userId || applications.length === 0) return false;
    return applications.some(application => {
      if (application && typeof application === 'object') {
        // Handle populated application object
        if (application.applicant && typeof application.applicant === 'object') {
          return application.applicant._id === userId || application.applicant._id?.toString() === userId?.toString();
        }
        // Handle if applicant is just an ID string
        if (typeof application.applicant === 'string') {
          return application.applicant === userId || application.applicant === userId?.toString();
        }
      }
      return false;
    });
  };

  const isInitiallyApplied = checkIfApplied(singleJob?.applications, user?._id);
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [applying, setApplying] = useState(false);



  const params = useParams();
  const jobId = params.id;
  //

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    if (!user?._id) {
      toast.error("Please login to apply");
      navigate("/login");
      return;
    }
    if (!jobId) {
      toast.error("Invalid job id");
      return;
    }
    if (applying) return;
    setApplying(true);
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });
      if (res.data?.success) {
        setIsApplied(true);
        toast.success(res.data.message || "Application submitted successfully");
        
        // Refetch the job to get updated applications with populated data
        try {
          const jobRes = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
          if (jobRes.data?.success) {
            dispatch(setSingleJob(jobRes.data.job));
            // Check if user has applied with proper handling of populated applications
            setIsApplied(checkIfApplied(jobRes.data.job.applications, user._id));
          }
        } catch (fetchError) {
          console.log("Error refetching job:", fetchError);
          // Still show success even if refetch fails
        }
      } else {
        toast.error(res.data?.message || "Failed to apply for job");
      }
    } catch (error) {
      console.log("Error applying job:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to apply");
        navigate("/login");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.message || "Failed to apply for job";
        toast.error(errorMessage);
        // If already applied, update state
        if (errorMessage.includes("already applied")) {
          setIsApplied(true);
        }
      } else {
        const errorMessage = error.response?.data?.message || error.message || "Failed to apply for job. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setApplying(false);
    }
  }
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(checkIfApplied(res.data.job.applications, user?._id));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    }
    fetchSingleJobs();

  }, [jobId, dispatch, user?._id])

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex item-center justify-between'>

        <div >
          <div>
            <h1 className="text-xl font-bold">{singleJob?.title}</h1>
            <Badge className={"font-bold text-blue-800"} variant={"ghost"} >{singleJob?.position} Position</Badge>
            <Badge className={"font-bold text-[#F83002]"} variant={"ghost"} >{singleJob?.jobType}</Badge>
            <Badge className={"font-bold text-[#7209b7]"} variant={"ghost"} >{singleJob?.salary}</Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? undefined : applyJobHandler}
          disabled={isApplied || applying}
          className={`rounded-lg ${isApplied || applying ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
          {isApplied ? 'Already Applied' : (applying ? 'Applying...' : 'Apply Now')}
        </Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experiance: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")?.[0]}</span></h1>
      </div>
    </div>
  )
}

export default JobbDescription