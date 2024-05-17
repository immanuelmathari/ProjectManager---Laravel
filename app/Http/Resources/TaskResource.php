<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = false;
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->project->created_at))->format('Y-m-d'),
            'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
            // 'image_path' => $this->image_path,
            'priority' => $this->priority,
            'status' => $this->status,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'created_by' => new UserResource($this->createdBy), // we need to create a userresource 4 this
            'updated_by' => new UserResource($this->updatedBy), // we need to create a userresource 4 this
            'assigned_user' => $this->assigned_user_id ? new UserResource($this->assigneduser) : null, // we need to create a userresource 4 this
            // question will we fetch it from the table or from the relation in the model and if we fetch it from the relation is there any need for the relationship in the table
            'project' => new ProjectResource($this->project),
            'project_id' => $this->project_id,
            'project_name' => $this->project->name,
            // 'project' => new ProjectResource($this->project),
            'assigned_user_id' => $this->assigned_user_id,

        ];
    }
}
