<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->longText('details')->nullable();
            $table->string('location')->nullable();
            $table->string('year')->nullable();
            $table->json('metrics')->nullable(); // For dynamic metrics like "Surface", "Durée"
            $table->json('challenges')->nullable(); // Array of {title, desc, solution}
            $table->json('technical_details')->nullable(); // specifications, materials, standards
            $table->json('gallery')->nullable(); // Array of image URLs
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
