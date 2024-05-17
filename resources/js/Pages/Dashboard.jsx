import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constraints';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth , totalPendingTasks , myPendingTasks , totalInProgressTasks , myInProgressTasks , totalCompletedTasks , myCompletedTasks, activeTasks}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Project Manager</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* The cards */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in.</div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-2 grid grid-cols-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* The cards */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-amber-600 font-semibold text-xl'>Pending tasks</h3>
                            <p className='text-xlg mt-4'> <span className='mr-2'>{myPendingTasks}</span>/ <span className='ml-2'>{totalPendingTasks}</span> </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* The cards */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-blue-600 font-semibold text-xl'>In Progress Tasks</h3>
                            <p className='text-xlg mt-4'> <span className='mr-2'>{myInProgressTasks}</span>/ <span className='ml-2'>{totalInProgressTasks}</span> </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* The cards */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-600 font-semibold text-xl'>Completed Tasks</h3>
                            <p className='text-xlg mt-4'> <span className='mr-2'>{myCompletedTasks}</span>/ <span className='ml-2'>{totalCompletedTasks}</span> </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {/* The cards */}
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-600 font-semibold text-xl'>My Active tasks</h3>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr >
                                        <th>ID</th>
                                        <th>Project Name</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Created date</th>
                                        <th>Due date</th>
                                        <th>Created By</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody className='text-white'>
                                    {/* {activeTasks.data.map((task) => {
                                        <tr key={task.id}>
                                            {console.log(task)}
                                            <td className='px-3 py-2 text-white'>{task.id}</td>
                                            <td className='px-3 py-2 text-white'>{task.project.name}</td>
                                            <td className='px-3 py-2 text-white'>
                                                <p>{task.name}</p>
                                            </td>
                                            <td className='px-3 py-2 text-white'>{task.status}</td>
                                            <td className='px-3 py-2 text-white'>{task.due_date}</td>
                                        </tr>

                                    })} */}
                                    {activeTasks.data.map((task) => (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={task.id}>
                    <td className="p-3">{task.id}</td>
                    <th className="p-3 hover:underline hover:cursor-pointer">
                    {/* <Link href={route('project.show',task.project_id)}> */}
                    {task.project.name}
                      {/* </Link> */}
                      </th>
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
                    </div>
                </div>
                
                
            </div>
        </AuthenticatedLayout>
    );
}
