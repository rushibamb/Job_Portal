import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import {  Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Label } from '@radix-ui/react-label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'


const isResume=true;
// const skills = ['React', 'Node.js', 'MongoDB', 'Express.js'];
function Profile() {
    useGetAppliedJobs();
    const [open,setOpen]=useState(false);
    const {user}=useSelector((store)=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-geay-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex  items-center gap-4'>

                        <Avatar className='h-24 w-24'>
                            <AvatarImage className="w-15 h-15 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzTqf4PP114GWttWIg40iuC5fec3-4dA11w&s" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"> <Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 mt-4 my-3'>

                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 mt-4 my-3'>

                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>

                </div>
                <div>
                    <h1 className='font-medium text-xl'></h1>
                    <div className='flex items-center gap-3 mt-4 '>

                    {
                         user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <p>No skills added yet.</p>
                    }
                    </div>
                </div>
                <div className='w-full grid max-w-sm item-center gap-1.5'>
                    <Label className='font-bold text-md'>resume</Label>
                    {
                        isResume ? (
                            <a href={user?.profile?.resume} download className='text-blue-600 underline'>{user?.profile?.resumeOriginalName}</a>
                        ) : (
                            <p>No resume uploaded yet.</p>
                        )
                    }
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    <AppliedJobTable />

                </div>

            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile