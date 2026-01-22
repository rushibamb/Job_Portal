import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setAuthUser } from '@/redux/authSlice';

function UpdateProfileDialog({ open, setOpen }) {
    const [loading, setLoading] = useState(false);
    const {user}= useSelector(store => store.auth);
    const[input,setInput]=useState({
        fullname:user?.fullname || '',
        email:user?.email || '',
        phoneNumber:user?.phoneNumber || '',
        bio:user?.profile?.bio || '',
        skills:user?.profile?.skills.map(skill => skill) || [],
        file:user?.profile?.resume || ''
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
      }

      const fileChangeHandler = (e)=>{
        setInput({...input, file:e.target.files?.[0]});
      }

    const submitHandler =async (e)=>{
        e.preventDefault();
        setLoading(true);

        //submit logic here
        const formData = new FormData();
        formData.append('fullname',input.fullname);
        formData.append('email',input.email);
        formData.append('phoneNumber',input.phoneNumber);
        formData.append('bio',input.bio);
        formData.append('skills',input.skills);
        if(input.file){
          formData.append("file",input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`,formData,{
              headers:{
                "Content-Type":"multipart/form-data"
              },
                withCredentials:true
            });
            if(res.data.success){
              dispatch(setAuthUser(res.data.user));
              toast.success(res.data.message);
              setOpen(false);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }

    }


    return (
        <div>
            <Dialog open={open} >
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className='font-bold text-xl'>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 item-center gap-4'>
                                <Label htmlFor="name" className="text-right">Full Name</Label>
                                <Input value={input.fullname} onChange={(e) => setInput({...input, fullname: e.target.value})} id="name" name="name" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 item-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input type="email" value={input.email} onChange={(e) => setInput({...input, email: e.target.value})} id="email" name="email" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 item-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input value={input.phoneNumber} onChange={(e) => setInput({...input, phoneNumber: e.target.value})} id="number" name="number" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 item-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input value={input.bio} onChange={(e) => setInput({...input, bio: e.target.value})} id="bio" name="bio" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 item-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input value={input.skills} onChange={(e) => setInput({...input, skills: e.target.value})} id="skills" name="skills" className="col-span-3" />
                            </div>
                            <div className='grid grid-cols-4 item-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input onChange={fileChangeHandler} id="file" type="file" accept="application/pdf" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter >
                             { 
            loading ? (
              <Button  type='button' disabled className='w-full bg-[#6A38C2] hover:bg-[#6A38C2]/90 text-white'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type='submit' className='w-full bg-[#6A38C2] hover:bg-[#6A38C2]/90 text-white'>Update</Button>
            )
          }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UpdateProfileDialog