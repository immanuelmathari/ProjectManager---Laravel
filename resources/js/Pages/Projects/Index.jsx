import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constraints.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import {BeakerIcon, ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/16/solid'
import Heading from "@/Components/Heading";

function index({ auth, projects , queryParams = null }) {
  
  queryParams = queryParams || {};

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
    router.get(route("project.index"), queryParams);
  }

  const searchFieldChanged = (name,value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  };


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(projects,undefined,2)}</pre> */}
              <div className="overflow-auto">
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-59 dark:bg-gray-100 dark:text-dark-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap'>
                    

                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="id" sortChanged={sortChanged}>ID</Heading>
                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name" sortChanged={sortChanged}>Name</Heading>

                    <th className='px-3 py-2'>Image</th>

                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="status" sortChanged={sortChanged}>Status</Heading>

                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_date" sortChanged={sortChanged}>Created Date</Heading>

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
                    <th className='px-3 py-2'><SelectInput className="w-full" onChange= {e => searchFieldChanged('status', e.target.value)} defaultValue={queryParams.status} > 
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progresss</option>
                    <option value="completed">Completed</option>

                    </SelectInput></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2 text-nowrap'></th>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2 text-right'></th>

                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={project.id}>
                    <td className="p-3">{project.id}</td>
                    <th className="p-3 hover:underline text-white text-nowrap">
                      <Link href={route('project.show', project.id)}>
                        {project.name}
                      </Link>
                    </th>
                    <td className="p-3" style={{width: 100}}>
                      <img src={project.image_path} alt=""/>
                    </td>
                    <td className="p-3"><span className={ "px-2 py-1 rounded text-white " +  PROJECT_STATUS_CLASS_MAP[project.status] }>
                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span></td>
                    <td className="p-3">{project.created_at}</td>
                    <td className="p-3">{project.due_date}</td>
                    <td className="p-3">{project.createdBy.name}</td>
                    <td className="p-3">
                      <Link href={route('project.edit', project.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>Edit</Link>
                      <Link href={route('project.destroy', project.id)} className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</Link>

                    </td>

                  </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default index;
