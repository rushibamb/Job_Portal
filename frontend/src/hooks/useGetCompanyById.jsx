import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '../components/utils/constant.js'
import { setAllJobs,setSingleJob } from '../redux/jobSlice.js'
import { setSingleCompany } from '@/redux/companySlice.js'

function useGetCompanyById(companyId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async ()=>{
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log("Error fetching company:", error);
        }
    }
    fetchSingleCompany();
     
   }, [companyId,dispatch])
  
}

export default useGetCompanyById