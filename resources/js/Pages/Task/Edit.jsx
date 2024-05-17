import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Edit({auth, task, projects, users, success}) {
    const {data,setData,post,errors,reset} = useForm({
        image : '',
        name : task.name || '',
        status : task.status || '',
        description : task.description  || '',
        priority : task.priority  || '',
        due_date : task.due_date   || '',
        // project_id : task.project_id   || '',
        assigned_user_id : task.assigned_user_id   || '',
        _method: 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('task.update', task.id));
    }

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-light">
          Edit Task
        </h2>
        <Link href={route('task.index')} className="bg-emerald-500 shadow py-1 px-3 text-white rounded transition-all hover:bg-emerald-600">
        Go Back
        </Link>
        </div>
        }
        >

<div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded">
        {success}
      </div>)}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <form className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" onSubmit={onSubmit}>
                    
                    {task.image_path && (
                        <div className="mb-4">
                            <img src={task.image_path} alt="task image" className="w-64"/>
                        </div>
                    )}
                    {/* <div>
                <InputLabel htmlFor="task_project_id" value="Project" />

                <SelectInput
                  name="project_id"
                  id="task_project_id"
                  defaultvalue={data.project_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("project_id", e.target.value)}
                >
                  <option value={task.project_id} selected>{task.project_name}</option>
                  {projects.data.map((project) => (
                    <option value={project.id} key={project.id}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.project_id} className="mt-2" />
              </div> */}
                    <div>
                        <InputLabel htmlFor="task Image Path" value="task Image"/>
                        <TextInput id="task_image_path" type="file" name="image" className="mt-6 block w-full" onChange={e => setData('image', e.target.files[0])}/>
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="task Name" value="task Name"/>
                        <TextInput id="task_name" type="text" isFocused={true} name="name" value={data.name} className="mt-6 block w-full" onChange={e => setData('name', e.target.value)}/>
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="task Description" value="task Description"/>
                        <TextAreaInput id="task_description" name="description" value={data.description} className="mt-6 block w-full" onChange={e => setData('description', e.target.value)}/>
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="task_due_date" value="task Deadline"/>
                        <TextInput id="task_due_date" type="date" name="due_date" value={data.due_date} className="mt-6 block w-full" onChange={e => setData('due_date', e.target.value)}/>
                        <InputError message={errors.due_date} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="task_status" value="Task Status"/>
                        <SelectInput id="task_status" name="status" value={data.status} className="mt-6 block w-full" onChange={e => setData('status', e.target.value)}>
                            <option value="" selected>{task.status}</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>

                        </SelectInput>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />

                <SelectInput
                  name="priority"
                  id="task_priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="" selected>{task.priority}</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>

                <InputError message={errors.priority} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="task_assigned_user"
                  value="Assigned User"
                />

                <SelectInput
                  name="assigned_user_id"
                  id="task_assigned_user"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
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