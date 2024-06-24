import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from '@inertiajs/react';
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from '@/constraints';
import Heading from '@/Components/Heading';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

function index({auth , tasks , queryParams = null, success}) {

  queryParams = queryParams || {};

    const searchFieldChanged = (name,value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams);
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
        router.get(route("task.index"), queryParams);
      }

      const deleteTask = (task) => {
        if (!window.confirm("Are you sure about this my nigga?")) {return;}
        router.delete(route('task.destroy', task.id))
      }


    return (
        <AuthenticatedLayout
        user = {auth.user}
        header={
          <div  className="flex items-center justify-between">
            <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light'>
                Tasks
            </h2>
            <Link href={route('task.create')} className="bg-emerald-500 shadow py-1 px-3 text-white rounded transition-all hover:bg-emerald-600">
            Add New
            </Link>
            </div>
        }
        >
            <Head title='Tasks'/>



            <div className='py-12'>
              
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded">
        {success}
      </div>)}
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                        <div className='p-6 text-gray-900 dark:text-gray-100'>
                            {/* <pre>{JSON.stringify(tasks,undefined,2)}</pre> */}
                            <div className='overflow-auto'>
                                <table className='w-full text-sm text-left rtl:text-right text-grey-500 dark:text-gray-400'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-59 dark:bg-gray-100 dark:text-dark-400 border-b-2 border-gray-500'>
                                        <tr className='text-nowrap'>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="id" sortChanged={sortChanged}>ID</Heading>
                                        <th className='px-3 py-2'>Project Name</th>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name" sortChanged={sortChanged}>Name</Heading>
                                        <th className='px-3 py-2'>Image</th>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="priority" sortChanged={sortChanged}>Priority</Heading>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="status" sortChanged={sortChanged}>Status</Heading>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_date" sortChanged={sortChanged}>Created At</Heading>
                                        <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="due_date" sortChanged={sortChanged}>Due Date</Heading>
                                        <th className='px-3 py-2'>Created By</th>
                                        <th className='px-3 py-2 text-right'>Actions</th>

                                        </tr>
                                    </thead>
                                    <thead className='text-xs text-grey-700 uppercase bg-gray-59 dark:bg-gray-700 dark:text-dark-400 border-b-2 border-grey-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'><TextInput placeholder="Enter name to search" onBlur = {(e) => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)} defaultValue={queryParams.name} /></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'><SelectInput className="w-full" onChange= {e => searchFieldChanged('priority', e.target.value)} defaultValue={queryParams.priority} > 
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>

                    </SelectInput></th>
                    <th className='px-3 py-2'><SelectInput className="w-full" onChange= {e => searchFieldChanged('status', e.target.value)} defaultValue={queryParams.status} > 
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">in_progress</option>
                    <option value="completed">Completed</option>

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
                    <th className="p-3">{task.project_name}</th>
                    <th className="p-3 text-gray-100 hover:underline">
                      <Link href={route('task.show',task.id)}>
                      {task.name}
                      </Link>
                    </th>
                    <td className="p-3" style={{width: 100}}>
                      <img src={task.image_path} alt=""/>
                    </td>
                    <td className="p-3"><span className={ "px-2 py-1 rounded text-white " +  TASK_PRIORITY_CLASS_MAP[task.priority] }>
                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span></td>
                    <td className="p-3"><span className={ "px-2 py-1 rounded text-white " +  TASK_STATUS_CLASS_MAP[task.status] }>
                    {TASK_STATUS_TEXT_MAP[task.status]}
                    </span></td>
                    <td className="p-3">{task.created_at}</td>
                    <td className="p-3">{task.due_date}</td>
                    <td className="p-3">{task.created_by.name}</td>
                    <td className="p-3">
                      <Link href={route('task.edit', task.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>Edit</Link>
                      <button onClick={e => {deleteTask(task)}} className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</button>

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

export default index;