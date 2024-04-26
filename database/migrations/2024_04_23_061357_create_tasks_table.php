<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable;
            $table->string('image_path')->nullable;
            $table->string('priority')->nullable;
            $table->timestamp('due_date')->nullable;
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constraned('users');
            $table->foreignId('assigned_user_id')->constrained('users');
            $table->foreignId('project_id')->constrained('projects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
