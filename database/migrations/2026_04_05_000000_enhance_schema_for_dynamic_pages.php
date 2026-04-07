<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // ─── ALTER EXISTING TABLES ───────────────────────────────

        // Users: add avatar, bio, role for author display & admin roles
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('name');
            $table->text('bio')->nullable()->after('avatar');
            $table->string('role')->default('admin')->after('bio');
        });

        // Articles: add published_at for scheduling, views for analytics
        Schema::table('articles', function (Blueprint $table) {
            $table->timestamp('published_at')->nullable()->after('is_featured');
            $table->unsignedBigInteger('views')->default(0)->after('published_at');
        });

        // Projects: add missing category_id FK, image thumbnail, client_name, publish state, views
        Schema::table('projects', function (Blueprint $table) {
            $table->string('image')->nullable()->after('slug');
            $table->string('client_name')->nullable()->after('year');
            $table->unsignedBigInteger('category_id')->nullable()->after('is_featured');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->boolean('is_published')->default(false)->after('category_id');
            $table->unsignedBigInteger('views')->default(0)->after('is_published');
        });

        // Categories: add type to scope categories, add image
        Schema::table('categories', function (Blueprint $table) {
            $table->string('type')->default('general')->after('slug');
            $table->string('image')->nullable()->after('description');
        });

        // Services: add long description, sub-services, process steps for detail view
        Schema::table('services', function (Blueprint $table) {
            $table->longText('long_description')->nullable()->after('description');
            $table->json('sub_services')->nullable()->after('features');
            $table->json('process_steps')->nullable()->after('sub_services');
        });

        // Testimonials: add company, rating, link to project
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('company')->nullable()->after('role');
            $table->unsignedTinyInteger('rating')->default(5)->after('image');
            $table->unsignedBigInteger('project_id')->nullable()->after('rating');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('set null');
        });

        // Team members: add more social/contact fields
        Schema::table('team_members', function (Blueprint $table) {
            $table->string('email')->nullable()->after('linkedin');
            $table->string('twitter')->nullable()->after('email');
        });

        // ─── CREATE NEW TABLES ──────────────────────────────────

        // Hero slides / page cover images
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('page');
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('cta_text')->nullable();
            $table->string('cta_link')->nullable();
            $table->string('cta_secondary_text')->nullable();
            $table->string('cta_secondary_link')->nullable();
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('overlay_opacity')->default(60);
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Reusable dynamic page content sections
        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page');
            $table->string('section_key');
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->longText('content')->nullable();
            $table->string('image')->nullable();
            $table->json('extra')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->unique(['page', 'section_key']);
        });

        // Company offices / regional locations
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city');
            $table->string('country');
            $table->text('address');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_headquarters')->default(false);
            $table->decimal('map_lat', 10, 7)->nullable();
            $table->decimal('map_lng', 10, 7)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Social media links (footer, contact)
        Schema::create('social_links', function (Blueprint $table) {
            $table->id();
            $table->string('platform');
            $table->string('url');
            $table->string('icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Company core values (About page)
        Schema::create('values', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Certifications & professional affiliations (About page)
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->nullable();
            $table->text('description')->nullable();
            $table->string('type')->default('certification');
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Job listings (Careers page)
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('department')->nullable();
            $table->string('location')->nullable();
            $table->string('contract_type')->default('CDI');
            $table->text('description');
            $table->json('requirements')->nullable();
            $table->json('responsibilities')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        // Job applications (submitted by visitors)
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_listing_id')->nullable();
            $table->foreign('job_listing_id')->references('id')->on('job_listings')->onDelete('set null');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('position')->nullable();
            $table->string('resume_path')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('status')->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });

        // Contact form submissions (persisted, admin-manageable)
        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('project_type')->nullable();
            $table->string('project_location')->nullable();
            $table->text('message');
            $table->string('status')->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
        });

        // Newsletter subscribers
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('subscribed_at')->useCurrent();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->timestamps();
        });

        // Partnership requests (submitted by visitors)
        Schema::create('partnership_requests', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('partnership_type')->nullable();
            $table->text('message');
            $table->string('status')->default('new');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partnership_requests');
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('contact_submissions');
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('job_listings');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('values');
        Schema::dropIfExists('social_links');
        Schema::dropIfExists('offices');
        Schema::dropIfExists('page_sections');
        Schema::dropIfExists('hero_slides');

        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn(['email', 'twitter']);
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropForeign(['project_id']);
            $table->dropColumn(['company', 'rating', 'project_id']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['long_description', 'sub_services', 'process_steps']);
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['type', 'image']);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn(['category_id', 'image', 'client_name', 'is_published', 'views']);
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['published_at', 'views']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['avatar', 'bio', 'role']);
        });
    }
};
