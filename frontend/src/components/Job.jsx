import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import React from 'react'
import { Button } from './ui/button'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

function Job({ job }) {
    const navigate = useNavigate();
    
const daysAgoFunction=(mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border borde-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'> {daysAgoFunction(job?.createdAt)==0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button className="rounded-full" size=""><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzTqf4PP114GWttWIg40iuC5fec3-4dA11w&s" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-bold text-lg">{job?.company?.name}</h1>
                    <p className="text-gray-500 text-sm">{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold my-2">{job?.title}</h1>
                <p className="text-gray-600 text-sm">{job?.description}</p>
            </div>

            <div className='flex gap-3 items-center mt-4'>
                <Badge className={"font-bold text-blue-800"} variant={"ghost"} >{job?.positions} Position</Badge>
                <Badge className={"font-bold text-[#F83002]"} variant={"ghost"} >{job?.jobType}</Badge>
                <Badge className={"font-bold text-[#7209b7]"} variant={"ghost"} >{job?.salary}LPA</Badge>
            </div>
            <div className='flex item-center gap-2 mt-4'>
                <Button onClick={() => navigate(`/Description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7] text-white">Save for later</Button>
            </div>        
        </div>
    )
}

export default Job