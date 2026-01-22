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
import store from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

function Signup() {
const [input,setInput]=useState({
    fullname:'',
    email:'',
    phoneNumber:'',
    password:'',
    role:'',
    file:""
  })
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFileHandler = (e)=>{
    setInput({...input,file:e.target.files?.[0]});
  }

  const submitHandler =async (e)=>{
    e.preventDefault();
    //submit logic here
    const formData = new FormData();
    formData.append('fullname',input.fullname);
    formData.append('email',input.email);
    formData.append('phoneNumber',input.phoneNumber);
    formData.append('password',input.password);
    formData.append('role',input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate('/login');
        toast.success(res.data.message);
      }
     
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
      
    }finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-300 rounded-md p-4 my-10'>
          <h1 className='text-2xl font-bold mb-5'>Signup</h1>

          <div className='mb-2'>
            <Label htmlFor='fullname'>Full Name</Label>
            <Input name='fullname' value={input.fullname} onChange={changeEventHandler} type='text' id='fullname' placeholder='Enter your full name' />
          </div>

          <div className='mb-2'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' value={input.email} onChange={changeEventHandler} type='text' id='email' placeholder='Email' />
          </div>

          <div className='mb-2'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input name='phoneNumber' value={input.phoneNumber} onChange={changeEventHandler} type='text' id='phoneNumber' placeholder='' />
          </div>

          <div className='mb-2'>
            <Label htmlFor='fullname'>Password</Label>
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

            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input  accept='image/*' type='file' onChange={changeFileHandler} id='profilePicture' placeholder='' className='cursor-pointer'/>

            </div>
          </div>

           { 
            loading ? (
              <Button type='button' disabled className='w-full bg-[#6A38C2] hover:bg-[#6A38C2]/90 text-white'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type='submit' className='w-full bg-[#6A38C2] hover:bg-[#6A38C2]/90 text-white'>Signup</Button>
            )
          }
          <span className='text-sm text-black'>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Signup