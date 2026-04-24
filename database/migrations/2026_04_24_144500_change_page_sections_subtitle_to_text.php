<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::statement('ALTER TABLE `page_sections` MODIFY `subtitle` TEXT NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE `page_sections` MODIFY `subtitle` VARCHAR(255) NULL');
    }
};

