import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import {BeakerIcon, ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/16/solid'
import Heading from "@/Components/Heading";

function index({ auth, users , queryParams = null , success }) {
  
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
    router.get(route("user.index"), queryParams);
  }

  const searchFieldChanged = (name,value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure about this my nigga?")) {return;}
    router.delete(route('user.destroy', user.id))
  }


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
          Users
        </h2>
        <Link href={route('user.create')} className="bg-emerald-500 shadow py-1 px-3 text-white rounded transition-all hover:bg-emerald-600">
        Add New
        </Link>
        </div>
        
      }
    >
      <Head title="Users" />

      

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded">
        {success}
      </div>)}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(users,undefined,2)}</pre> */}
              <div className="overflow-auto">
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-59 dark:bg-gray-100 dark:text-dark-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap'>
                    

                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="id" sortChanged={sortChanged}>ID</Heading>
                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="name" sortChanged={sortChanged}>Name</Heading>

                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="email" sortChanged={sortChanged}>Email</Heading>

                    <Heading sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} name="created_date" sortChanged={sortChanged}>Created Date</Heading>


                    <th className='px-3 py-2 text-right'>Actions</th>

                  </tr>
                </thead>
                <thead className='text-xs text-grey-700 uppercase bg-gray-59 dark:bg-gray-700 dark:text-dark-400 border-b-2 border-grey-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'><TextInput placeholder="Enter name to search" onBlur = {(e) => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)} defaultValue={queryParams.name} /></th>
                    <th className='px-3 py-2'><TextInput placeholder="Enter Email to search" onBlur = {(e) => searchFieldChanged('email', e.target.value)} onKeyPress={e => onKeyPress('email', e)} defaultValue={queryParams.name} /></th>

                    <th className='px-3 py-2'></th>
                    <th className='px-3 py-2'></th>

                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={user.id}>
                    <td className="p-3">{user.id}</td>
                    <th className="p-3 hover:underline text-white text-nowrap">
                      <Link href={route('user.show', user.id)}>
                        {user.name}
                      </Link>
                    </th>
                    <th className="p-3 hover:underline text-white text-nowrap">
                        {user.name}
                    </th>
                    <td className="p-3">{user.created_at}</td>
                    <td className="p-3 text-nowrap">
                      <Link href={route('user.edit', user.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>Edit</Link>
                      <button className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1" onClick={e => {deleteUser(user)}}>Delete</button>

                    </td>

                  </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default index;
