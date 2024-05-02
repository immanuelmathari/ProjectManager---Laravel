<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->project->created_at))->format('Y-m-d'),
            'image_path' => $this->image_path,
            'priority' => $this->priority,
            'due_date' => $this->due_date,
            'created By' => new UserResource($this->createdBy), // we need to create a userresource 4 this
            'updated By' => new UserResource($this->updatedBy), // we need to create a userresource 4 this
            'assigned User' => $this->assigned_user_id ? new UserResource($this->assigneduser) : null, // we need to create a userresource 4 this
            // question will we fetch it from the table or from the relation in the model and if we fetch it from the relation is there any need for the relationship in the table
            'project' => $this->project_id,
            // 'project' => new ProjectResource($this->project),

        ];
    }
}
