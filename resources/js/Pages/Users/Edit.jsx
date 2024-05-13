import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from '@/Components/SelectInput';


export default function Edit({auth,user}) {
    const {data, setData, post, errors, reset} = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        _method: 'PUT'
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.update', user.id));
    }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
          Edit User
        </h2>
        <Link href={route('user.index')} className="bg-emerald-500 shadow py-1 px-3 text-white rounded transition-all hover:bg-emerald-600">
        Go Back
        </Link>
        </div>
        
      }
    >

<div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
            <form className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" onSubmit={onSubmit}>
                   
                   <div className="mt-6">
                       <InputLabel htmlFor="User Name" value="User Name"/>
                       <TextInput id="user_name" type="text" isFocused={true} name="name" value={data.name} className="mt-6 block w-full" onChange={e => setData('name', e.target.value)}/>
                       <InputError message={errors.name} className="mt-2" />
                   </div>

                   <div className="mt-6">
                       <InputLabel htmlFor="User Email" value="User Email"/>
                       <TextInput id="user_email" type="text" name="email" value={data.email} className="mt-6 block w-full" onChange={e => setData('email', e.target.value)}/>
                       <InputError message={errors.email} className="mt-2" />
                   </div>

                   <div className="mt-6">
                       <InputLabel htmlFor="User Password" value="User Password"/>
                       <TextInput id="user_password" type="text" name="password" value={data.password} className="mt-6 block w-full" onChange={e => setData('password', e.target.value)}/>
                       <InputError message={errors.password} className="mt-2" />
                   </div>

                   <div className="mt-6">
                       <InputLabel htmlFor="User Password Confirmation" value="User Password Confirmation"/>
                       <TextInput id="user_password_confirm" type="text" name="password_confirmation" value={data.password_confirmation} className="mt-6 block w-full" onChange={e => setData('password_confirmation', e.target.value)}/>
                       <InputError message={errors.password_confirmation} className="mt-2" />
                   </div>

                
                   <div className="mt-4 text-right">
                           <Link className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mt-2" href={route('user.index')}>Cancel</Link>
                       <button className="bg-emerald-500 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Edit</button>
                   </div>
               </form>
                </div>
                </div>
                </div>
                </div>
    </AuthenticatedLayout>
  )
}
