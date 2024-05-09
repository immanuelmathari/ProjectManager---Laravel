import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from '@/Components/SelectInput';


export default function Edit({auth,project}) {
    const {data, setData, post, errors, reset} = useForm({
        image_path: '',
        name: project.name || '',
        status: project.status || '',
        description: project.description || '',
        due_date: project.due_date || '',
        _method: 'PUT'
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('project.update', project.id));
    }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
          Edit Project
        </h2>
        <Link href={route('project.index')} className="bg-emerald-500 shadow py-1 px-3 text-white rounded transition-all hover:bg-emerald-600">
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
                    
                    {project.image_path && (
                        <div className="mb-4">
                            <img src={project.image_path} alt="project image" className="w-64"/>
                        </div>
                    )}
                    <div>
                        <InputLabel htmlFor="Project Image Path" value="Project Image"/>
                        <TextInput id="project_image_path" type="file" name="image_path" className="mt-6 block w-full" onChange={e => setData('image_path', e.target.files[0])}/>
                        <InputError message={errors.image_path} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="Project Name" value="Project Name"/>
                        <TextInput id="project_name" type="text" isFocused={true} name="name" value={data.name} className="mt-6 block w-full" onChange={e => setData('name', e.target.value)}/>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="Project Description" value="Project Description"/>
                        <TextAreaInput id="project_description" name="description" value={data.description} className="mt-6 block w-full" onChange={e => setData('description', e.target.value)}/>
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="Project_due_date" value="Project Deadline"/>
                        <TextInput id="project_due_date" type="date" name="due_date" value={data.due_date} className="mt-6 block w-full" onChange={e => setData('due_date', e.target.value)}/>
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="Project_status" value="Project Status"/>
                        <SelectInput id="project_status" isFocused={true} name="status" className="mt-6 block w-full" onChange={e => setData('status', e.target.value)}>
                            <option value="" selected>{project.status}</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>

                        </SelectInput>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div className="mt-4 text-right">
                            <Link className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mt-2" href={route('project.index')}>Cancel</Link>
                        <button className="bg-emerald-500 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Submit</button>
                    </div>
                </form>
                </div>
                </div>
                </div>
                </div>
    </AuthenticatedLayout>
  )
}
