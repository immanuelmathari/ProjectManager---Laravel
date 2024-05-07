import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constraints';
import Heading from '@/Components/Heading';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';


export default function Show({auth, project, tasks, queryParams = null}) {

  queryParams = queryParams || {};

    const searchFieldChanged = (name,value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("project.show"), queryParams);
    }
    const onKeyPress = (name,e) => {
        if(e.key !== 'Enter') return;
        searchFieldChanged(name,e.target.value);
    }
    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
          if(queryParams.sort_direction === 'desc'){
            queryParams.sort_direction = 'asc';
          } else {
            queryParams.sort_direction = 'desc';
          }
        } else {
          queryParams.sort_field = name;
          queryParams.sort_direction = 'asc';
        }
        router.get(route("project.show"), queryParams);
      }


  return (
    <AuthenticatedLayout
     user={auth.user}
     header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
            {`Project "${project.name}"`}
        </h2>
     }
    >
        <Head title={`Project "${project.name}"`} />
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div>
                  <img src={project.image_path} alt="Project image" className="w-full h-64 object-cover"/>
                </div>
                <div className="grid gep-1 grid-cols-2 mt-2">
                  <div>
                    <div>
                      <label>Project ID</label>
                      <p className="font-bold text-lg">{project.id}</p>
                    </div>
                    <div>
                      <label>Project Name</label>
                      <p className="font-bold text-lg mt-4">{project.name}</p>
                    </div>
                    <div>
                      <label>Project Status</label>
                      <p className="mt-1">
                        <span className={'px-2 py-1 rounded text-white ' + PROJECT_STATUS_CLASS_MAP[project.status] }>
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                  <div className='mt-4'>
                      <label className='font-bold text-lg'>Created By</label>
                      <p className="mt-1">{project.createdBy.name}</p>
                    </div>
                    <div className='mt-4'>
                      <label className='font-bold text-lg'>Updated By</label>
                      <p className="mt-1">{project.updatedBy.name}</p>
                    </div>
                    <div className='mt-4'>
                      <label className='font-bold text-lg'>Due Date</label>
                      <p className="mt-1">{project.due_date}</p>
                    </div>
                    <div className='mt-4'>
                      <label className='font-bold text-lg'>Created Date</label>
                      <p className="mt-1">{project.created_at}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                      <label className='font-bold text-lg'>Project Description</label>
                      <p className="mt-1">{project.description}</p>
                    </div>
            </div>
            </div>
            </div>
            </div>

            <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className='p-6 text-gray-900 dark:text-gray-100'>
            <div className='overflow-auto'>
                                <table className='w-full text-sm text-left rtl:text-right text-grey-500 dark:text-gray-400'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-59 dark:bg-gray-100 dark:text-dark-400 border-b-2 border-gray-500'>
                                        <tr className='text-nowrap'>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="id" sortChanged={sortChanged}>ID</Heading>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name" sortChanged={sortChanged}>Name</Heading>
                                        <th className='px-3 py-2'>Image</th>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="priority" sortChanged={sortChanged}>Priority</Heading>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_date" sortChanged={sortChanged}>Created At</Heading>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="due_date" sortChanged={sortChanged}>Due Date</Heading>
                                        <th className='px-3 py-2'>Created By</th>
                                        <th className='px-3 py-2 text-right'>Actions</th>

                                        </tr>
                                    </thead>
                                    <thead className='text-xs text-grey-700 uppercase bg-gray-59 dark:bg-gray-700 dark:text-dark-400 border-b-2 border-grey-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'><TextInput placeholder="Enter name to search" onBlur = {(e) => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)} defaultValue={queryParams.name} /></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'><SelectInput className="w-full" onChange= {e => searchFieldChanged('priority', e.target.value)} defaultValue={queryParams.priority} > 
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>

                    </SelectInput></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2 text-nowrap'></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'></th>


                  </tr>
                </thead> 
                <tbody>
                  {tasks.data.map((task) => (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={task.id}>
                    <td className="p-3">{task.id}</td>
                    <td className="p-3">{task.name}</td>
                    <td className="p-3" style={{width: 100}}>
                      <img src={task.image_path} alt=""/>
                    </td>
                    <td className="p-3"><span className={ "px-2 py-1 rounded text-white " +  TASK_PRIORITY_CLASS_MAP[task.priority] }>
                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span></td>
                    <td className="p-3">{task.created_at}</td>
                    <td className="p-3">{task.due_date}</td>
                    <td className="p-3">{task.created_by}</td>
                    <td className="p-3">
                      <Link href={route('task.edit', task.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>Edit</Link>
                      <Link href={route('task.destroy', task.id)} className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</Link>

                    </td>

                  </tr>
                  ))}
                </tbody>
                                </table>
                            </div>
                            <Pagination links={tasks.meta.links} />
            </div>
            </div>
            </div>
            </div>

    </AuthenticatedLayout>
  )
}
