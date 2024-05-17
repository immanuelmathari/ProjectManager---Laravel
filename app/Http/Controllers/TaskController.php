<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();
        $sortFields = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        if (request('name')) {
            $query->where('name','like','%'.request('name').'%');
        }
        if (request('priority')) {
            $query->where('priority',request('priority'));
        }
        if (request('status')) {
            $query->where('status',request('status'));
        }
        $tasks = $query->orderBy($sortFields,$sortDirection)->paginate(10)->onEachSide(1);
        return Inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name','asc')->get();
        $users = User::query()->orderBy('name','asc')->get();
        return Inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random() , 'public');
        }
        Task::create($data);
        return to_route('task.index')->with('success', 'Task created successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia('Task/Show', [
            // remember that if we have this variable coming in $task, we dont need to create a variable like in edit below for project. you get?
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name','asc')->get();
        $users = User::query()->orderBy('name','asc')->get();

        
        return Inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/'. Str::random(), 'public');
        }
        $task->update($data);
        return to_route('task.index')->with('success', "Task updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();
        return to_route('task.index')->with('success', `task \"$name\"  deleted successfully`);
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);
        // we will need to pass a route for this
        // and we are returning the same index page but in a different way
        $sortFields = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        if (request('name')) {
            $query->where('name','like','%'.request('name').'%');
        }
        if (request('priority')) {
            $query->where('priority',request('priority'));
        }
        if (request('status')) {
            $query->where('status',request('status'));
        }
        $tasks = $query->orderBy($sortFields,$sortDirection)->paginate(10)->onEachSide(1);
        return Inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
