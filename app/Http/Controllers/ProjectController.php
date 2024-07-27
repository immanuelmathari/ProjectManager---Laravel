<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowcaseProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sortFields = request("sort_field", "created_at");
        $sortDirection = request("sort_direction","desc");
        if (request("name")) {
            $query->where('name','like','%'.request('name').'%');
        }
        if (request('status')){
            $query->where('status',request('status'));
        }
        $projects = $query->orderBy($sortFields,$sortDirection)->paginate(10)->onEachSide(1);
        return Inertia('Projects/Index', [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        // $data['image_path'] = "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw1ERlOVBvPy-JheiFHPZAt4&ust=1715155111793000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiF7_KI-4UDFQAAAAAdAAAAABAE";
        $image = $data['image_path'] ?? null;
        if($image) {
            $data['image_path'] = $image->store('project/'. Str::random() , 'public');
        }
        Project::create($data);
        return to_route('project.index')->with('success', 'Project created successfully');
    }

    public function showcase(ShowcaseProjectRequest $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        dd($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
        if(request('name')){
            $query->where('name' , 'like' , '%' . request('name') . '%');
        }
        if (request('status')){
            $query->where('status', request('status'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia("Projects/Show", [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams'  => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia('Projects/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image_path'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image){
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/'.Str::random(),'public');
        }
        $project->update($data);
        return to_route('project.index')->with('success', "project updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        $project->delete();
        return to_route('project.index')->with('success', "project \"$name\"  deleted successfully");
    }
}
