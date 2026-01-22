import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading,setAuthUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Login() {
  const [input,setInput]=useState({
    
    email:'',
    password:'',
    role:'',
   
  })
  const { loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }


 const submitHandler =async (e)=>{
    e.preventDefault();
    dispatch(setLoading(true));
    
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
     
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
      
    } finally{
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-300 rounded-md p-4 my-10'>
          <h1 className='text-2xl font-bold mb-5'>Login</h1>
         
          <div className='mb-2'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' value={input.email} onChange={changeEventHandler} type='text' id='email' placeholder='Email' />
          </div>
    
          <div className='mb-2'>
            <Label htmlFor='password'>Password</Label>
            <Input name='password' value={input.password} onChange={changeEventHandler} type='text' id='password' placeholder='' />
          </div>
          <div className='flex items-center justify-between'>

            <RadioGroup className='flex items-center gap-3 mb-2 '>
              <div className="flex items-center space-x-2">
               <Input type='radio' name='role' value='student' checked={input.role === 'student'} onChange={changeEventHandler} className='w-4 h-4 cursor-pointer' />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input type='radio' name='role' value='recruiter' checked={input.role === 'recruiter'} onChange={changeEventHandler} className='w-4 h-4 cursor-pointer' />
              <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

           
          </div>
          { 
            loading ? (
              <Button type='button' disabled className='w-full bg-[#6A38C2] hover:bg-[#6A38C2]/90 text-white'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type='submit' className='w-full bg-[#6A38C2] hover:bg-[#6A38C2]/90 text-white'>Login</Button>
            )
          }
          <span className='text-sm text-black'>Don't have an account? <Link to="/signup">Signup</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Login