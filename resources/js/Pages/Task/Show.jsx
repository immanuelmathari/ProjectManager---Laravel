import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react';
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constraints';
import Heading from '@/Components/Heading';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';


export default function Show({auth, task}) {



  return (
    <AuthenticatedLayout
     user={auth.user}
     header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
            {`task "${task.name}"`}
        </h2>
     }
    >
        <Head title={`Task "${task.name}"`} />
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div>
                  <img src={task.image_path} alt="task image" className="w-full h-64 object-cover"/>
                </div>
                <div className="grid gep-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label className="font-bold text-lg">task ID</label>
                      <p >{task.id}</p>
                    </div>
                    <div>
                      <label className="font-bold text-lg mt-4">task Name</label>
                      <p >{task.name}</p>
                    </div>
                    <div>
                      <label className="font-bold text-lg mt-4">Project Name</label>
                      <p >{task.project_name}</p>
                    </div>
                    <div>
                      <label className="font-bold text-lg mt-4">task Status</label>
                      <p className="mt-1">
                        <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status] }>
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label  className="font-bold text-lg mt-4">task priority</label>
                      <p className="mt-1">
                        <span className={'px-2 py-1 rounded text-white ' + TASK_PRIORITY_CLASS_MAP[task.priority] }>
                          {TASK_PRIORITY_TEXT_MAP[task.priority]}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                  <div className='mt-4'>
                      <label className='font-bold text-lg'>Task assigned user name</label>
                      <p className="mt-1">{task.assigned_user.name}</p>
                    </div>
                  <div className='mt-4'>
                      <label className='font-bold text-lg'>Created By</label>
                      <p className="mt-1">{task.created_by.name}</p>
                    </div>
                    <div className='mt-4'>
                      <label className='font-bold text-lg'>Updated By</label>
                      <p className="mt-1">{task.updated_by.name}</p>
                    </div>
                    <div className='mt-4'>
                      <label className='font-bold text-lg'>Due Date</label>
                      <p className="mt-1">{task.due_date}</p>
                    </div>
                    <div className='mt-4'>
                      <label className='font-bold text-lg'>Created Date</label>
                      <p className="mt-1">{task.created_at}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                      <label className='font-bold text-lg'>task Description</label>
                      <p className="mt-1">{task.description}</p>
                    </div>
            </div>
            </div>
            </div>
            </div>

           

    </AuthenticatedLayout>
  )
}
