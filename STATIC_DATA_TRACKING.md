# Static Data Issues Tracking Report

**Generated:** April 24, 2026  
**Project:** MACWEB - Merveille d'Afrique Construction

## Overview

This document tracks public website pages that still use **hardcoded/static data** despite having admin dashboard management functionality already implemented.

---

## 🔴 CRITICAL ISSUES - Pages with Significant Static Data

### 1. **Home Page** ([resources/js/pages/Home.tsx](resources/js/pages/Home.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Slides - Loaded from `/api/cms/home` → `hero_slides`
- Features Section ("Pourquoi Choisir MAC") - Loaded from `/api/cms/home` → `home_features`

#### ❌ STATIC (Needs fixing)

**A. Services Section (Lines 139-162)**

```typescript
const services = [
    { icon: <HomeIcon />, title: "Construction Résidentielle", desc: "..." },
    { icon: <Building />, title: "Construction Commerciale", desc: "..." },
    { icon: <Factory />, title: "Construction Industrielle", desc: "..." },
    { icon: <Droplets />, title: "Services de Forage", desc: "..." },
];
```

- **Issue:** Hardcoded 4 services
- **Admin Dashboard:** Services managed in [admin/pages/Services.tsx](resources/js/admin/pages/Services.tsx)
- **API Available:** `GET /api/cms/home` should include `services`
- **Fix Required:** Backend controller needs to include services in home page response

**B. Featured Projects Section (Lines 162-220)**

```typescript
const projects = [
    { id: 1, title: "Résidence Les Palmiers", category: "...", location: "Dakar", image: "..." },
    { id: 2, title: "Centre d'Affaires Atlantique", ... },
    // ... 6 hardcoded projects
];
```

- **Issue:** 6 hardcoded project cards
- **Admin Dashboard:** Projects managed in [admin/pages/Projects.tsx](resources/js/admin/pages/Projects.tsx)
- **API Available:** `GET /api/projects` exists
- **Fix Required:** Load featured projects from API (filter by `is_featured`)

**C. Testimonials (Lines 31-57 - TestimonialsSlider component)**

```typescript
const testimonials = [
    { name: "Amadou Diallo", role: "PDG, Groupe Atlantique", text: "...", image: "..." },
    { name: "Fatou Kone", role: "Directrice, Hôtel Prestige", ... },
    // ... 4 hardcoded testimonials
];
```

- **Issue:** 4 hardcoded testimonials
- **Admin Dashboard:** Testimonials managed in [admin/pages/Testimonials.tsx](resources/js/admin/pages/Testimonials.tsx)
- **API Available:** `GET /api/admin/testimonials` (protected)
- **Fix Required:** Create public endpoint `GET /api/cms/home` to include testimonials

**D. Statistics Section (Lines 303-307)**

```typescript
const stats = [
    {
        value: "15+",
        label: "Années d'Expérience",
        sub: "Au service de l'excellence",
    },
    { value: "200+", label: "Projets Livrés", sub: "Réalisations de qualité" },
    { value: "98%", label: "Clients Satisfaits", sub: "Taux de satisfaction" },
];
```

- **Issue:** 3 hardcoded stats
- **Admin Dashboard:** Stats managed in [admin/pages/Stats.tsx](resources/js/admin/pages/Stats.tsx)
- **Database Model:** [Stat](app/Models/Stat.php) with grouping by page
- **Fix Required:** Load stats filtered by `page='home'` from API

**E. Blog Posts Section (Lines 309-328)**

```typescript
const blogPosts = [
    { id: 1, title: "Les Tendances de Construction Durable...", date: "12 Septembre 2024", ... },
    { id: 2, title: "Optimiser la Planification...", ... },
    { id: 3, title: "Innovations Technologiques...", ... },
];
```

- **Issue:** 3 hardcoded blog preview articles
- **Admin Dashboard:** Articles managed in [admin/pages/Articles.tsx](resources/js/admin/pages/Articles.tsx)
- **API Available:** `GET /api/articles` exists
- **Fix Required:** Load latest 3 published articles from API

---

### 2. **About Page** ([resources/js/pages/About.tsx](resources/js/pages/About.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/about` → `hero_slides[0]`
- Story Section - Loaded from `/api/cms/about` → `sections.story`
- Mission Section - Loaded from `/api/cms/about` → `sections.mission`
- Values Intro - Loaded from `/api/cms/about` → `sections.values_intro`
- Company Values - Loaded from `/api/cms/about` → `values[]`

#### ❌ STATIC (Needs fixing)

**A. Timeline/History Section (Lines 200-220)**

```typescript
const timeline = [
    { year: "2009", title: "Création de MAC", description: "...", icon: <Building2 /> },
    { year: "2013", title: "Expansion Régionale", ... },
    { year: "2024", title: "Leader Reconnu", ... },
];
```

- **Issue:** 3 hardcoded timeline milestones
- **Admin Dashboard:** Timeline managed in [admin/pages/Timeline.tsx](resources/js/admin/pages/Timeline.tsx)
- **Database Model:** [TimelineMilestone](app/Models/TimelineMilestone.php)
- **API Available:** `GET /api/admin/timeline` (protected)
- **Fix Required:** Backend needs to add timeline to `/api/cms/about` response

**B. Team Members Section (Lines 221-248)**

```typescript
const team = [
    { name: "Mamadou Diop", role: "Directeur Général", bio: "...", image: "..." },
    { name: "Aminata Kone", role: "Directrice Architecture", ... },
    { name: "Ibrahim Traoré", role: "Chef de Projets", ... },
    { name: "Fatoumata Sy", role: "Directrice Qualité", ... },
];
```

- **Issue:** 4 hardcoded team members
- **Admin Dashboard:** Team managed in [admin/pages/Team.tsx](resources/js/admin/pages/Team.tsx)
- **Database Model:** [TeamMember](app/Models/TeamMember.php)
- **API Available:** `GET /api/admin/team` (protected)
- **Fix Required:** Backend needs to add active team members to `/api/cms/about` response

**C. Statistics Section (Lines 248-256)**

```typescript
const stats = [
    {
        value: "15+",
        label: "Années d'Expérience",
        sub: "Au service de l'excellence",
    },
    { value: "200+", label: "Projets Livrés", sub: "Réalisations de qualité" },
    { value: "98%", label: "Clients Satisfaits", sub: "Taux de satisfaction" },
    { value: "150+", label: "Employés", sub: "Experts qualifiés" },
    { value: "8", label: "Pays d'Intervention", sub: "Présence régionale" },
    { value: "95%", label: "Respect des Délais", sub: "Livraison à temps" },
];
```

- **Issue:** 6 hardcoded statistics
- **Admin Dashboard:** Stats managed in [admin/pages/Stats.tsx](resources/js/admin/pages/Stats.tsx)
- **Database Model:** [Stat](app/Models/Stat.php) grouped by page
- **Fix Required:** Load stats filtered by `page='about'` from API

---

### 3. **Blog Page** ([resources/js/pages/Blog.tsx](resources/js/pages/Blog.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/blog` → `hero_slides[0]`

#### ❌ STATIC (Needs fixing)

**A. Categories Sidebar (Lines 46-56)**

```typescript
const categories = [
    { name: "Tous les articles", count: 42 },
    { name: "Conseils Construction", count: 12 },
    { name: "Innovations BTP", count: 8 },
    { name: "Actualités MAC", count: 10 },
    { name: "Réglementations", count: 5 },
    { name: "Études de Cas", count: 4 },
    { name: "Tendances du Secteur", count: 3 },
];
```

- **Issue:** 7 hardcoded categories with static counts
- **Admin Dashboard:** Categories managed in [admin/pages/Categories.tsx](resources/js/admin/pages/Categories.tsx)
- **Database Model:** [Category](app/Models/Category.php) with `type='article'`
- **API Available:** `GET /api/categories` exists
- **Fix Required:** Load article categories with article counts from API

**B. Recent Articles Sidebar (Lines 56-62)**

```typescript
const recentArticles = [
    {
        title: "Les Matériaux Innovants...",
        date: "10 Décembre 2024",
        image: "...",
    },
    {
        title: "Gestion de Projet Digital...",
        date: "10 Décembre 2024",
        image: "...",
    },
    { title: "Nouvelles Normes...", date: "10 Décembre 2024", image: "..." },
];
```

- **Issue:** 3 hardcoded recent articles
- **Admin Dashboard:** Articles managed in [admin/pages/Articles.tsx](resources/js/admin/pages/Articles.tsx)
- **API Available:** `GET /api/articles` exists
- **Fix Required:** Load latest 3-5 articles sorted by `published_at`

**C. Articles List (Lines 62-113)**

```typescript
const articles = [
    { id: 1, slug: "...", title: "L'Avenir de la Construction...", author: "Amadou Diallo", ... },
    { id: 2, slug: "...", title: "Optimiser la Planification...", ... },
    // ... 5 hardcoded articles
];
```

- **Issue:** 5 hardcoded articles with full details
- **Admin Dashboard:** Articles managed in [admin/pages/Articles.tsx](resources/js/admin/pages/Articles.tsx)
- **API Available:** `GET /api/articles` exists (paginated)
- **Fix Required:** Frontend already has `ArticlesController` - should be integrated properly

---

### 4. **Services Page** ([resources/js/pages/Services.tsx](resources/js/pages/Services.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/services` → `hero_slides[0]`
- Services Grid - Loaded from `/api/cms/services` → `services[]`
- Service Details with Features - Uses API data

#### ❌ STATIC (Partially - has fallback)

**A. Fallback Services (Lines 100-148)**

```typescript
const mainServices = [
    { icon: <Home />, title: "Construction Résidentielle", desc: "..." },
    // ... 4 fallback services
];

const serviceDetails = [
    { key: "residential", title: "Construction Résidentielle", desc: "...", features: [...], ... },
    // ... 3 detailed fallback services
];
```

- **Status:** ⚠️ PARTIAL - Has fallback but loads from API if available
- **Note:** Fallback is acceptable for graceful degradation, but all real data should come from admin
- **Recommendation:** Ensure API always has data; consider showing admin warning if services empty

**B. Work Process Steps (Lines 195-201)**

```typescript
const workSteps = [
    { num: "1", title: "Consultation Initiale", desc: "..." },
    { num: "2", title: "Étude et Devis", desc: "..." },
    // ... 5 hardcoded process steps
];
```

- **Issue:** 5 hardcoded work process steps
- **Admin Dashboard:** Could be stored as `process_steps` JSON in Service model or as PageSection
- **Fix Required:** Add to page sections or service model's `process_steps` field

---

### 5. **Projects Page** ([resources/js/pages/Projects.tsx](resources/js/pages/Projects.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/projects` → `hero_slides[0]`
- Categories Filter - Loaded from `/api/cms/projects` → `categories[]`
- Projects Grid - Loaded from `/api/projects` (paginated, filtered)

#### ❌ STATIC (Needs fixing)

**A. Region Filter Options (Line 81)**

```typescript
const regions = [
    "Toutes les régions",
    "Sénégal",
    "Côte d'Ivoire",
    "Mali",
    "Guinée",
    "Togo",
    "Bénin",
    "Burkina Faso",
    "Niger",
];
```

- **Issue:** 9 hardcoded region options
- **Fix Options:**
    1. Extract unique locations from projects table dynamically
    2. Create a `regions` settings table
    3. Store in page sections as JSON
- **Recommendation:** Add as site settings or extract from existing project locations

**B. Year Filter Options (Line 82)**

```typescript
const years = [
    "Toutes les années",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
];
```

- **Issue:** 7 hardcoded year options
- **Fix Required:** Dynamically generate from min/max project years in database
- **Recommendation:** Backend endpoint should return available years from projects

---

### 6. **Contact Page** ([resources/js/pages/Contact.tsx](resources/js/pages/Contact.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/contact` → `hero_slides[0]`
- Office Locations - Loaded from `/api/cms/contact` → `offices[]`
- Contact Form - Submits to `/api/contact`

#### ❌ No Static Data Issues

**Status:** ✅ **FULLY DYNAMIC** - All data loaded from API

---

### 7. **Careers Page** ([resources/js/pages/Careers.tsx](resources/js/pages/Careers.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/careers` → `hero_slides[0]`
- Job Listings - Loaded from `/api/cms/careers` → `job_listings[]`
- Benefits Section - Loaded from `/api/cms/careers` → `benefits[]`
- "Why Join Us" Section - Loaded from `/api/cms/careers` → `sections.why_join`

#### ❌ STATIC (Has fallback)

**A. Fallback Benefits (Lines 27-50)**

```typescript
const defaultBenefits: BenefitItem[] = [
    { icon: "GraduationCap", title: "Formation Continue", desc: "..." },
    { icon: "CheckCircle2", title: "Assurance Santé", desc: "..." },
    { icon: "TrendingUp", title: "Évolution Rapide", desc: "..." },
    { icon: "Users", title: "Esprit d'Équipe", desc: "..." },
];
```

- **Status:** ⚠️ PARTIAL - Has fallback but loads from API if available
- **Note:** Acceptable fallback pattern, but ensure admin always populates data

---

### 8. **Partnership Page** ([resources/js/pages/Partnership.tsx](resources/js/pages/Partnership.tsx))

#### ✅ DYNAMIC (Working correctly)

- Hero Section - Loaded from `/api/cms/partnership` → `hero_slides[0]`
- "Why Partner" Section - Loaded from `/api/cms/partnership` → `sections.advantages`
- Partnership Advantages - Loaded from `/api/cms/partnership` → `why_partner_items[]`
- Partner Logos (if configured) - Loaded from `/api/cms/partnership` → `partners[]`

#### ❌ STATIC (Has fallback)

**A. Fallback Advantages (Lines 44-65)**

```typescript
const defaultAdvantages: AdvantageItem[] = [
    {
        icon: "TrendingUp",
        text: "Accès à des projets d'envergure internationale.",
    },
    {
        icon: "Shield",
        text: "Sécurité de paiement et transparence contractuelle.",
    },
    { icon: "Target", text: "Vision partagée de l'excellence architecturale." },
    { icon: "Zap", text: "Processus de collaboration agiles et efficaces." },
];
```

- **Status:** ⚠️ PARTIAL - Has fallback but loads from API if available
- **Note:** Acceptable fallback pattern

---

## 📊 Summary Statistics

### By Page Priority

| Page            | Status       | Critical Issues | Partial Issues | Total Issues |
| --------------- | ------------ | --------------- | -------------- | ------------ |
| **Home**        | 🔴 CRITICAL  | 5               | 0              | 5            |
| **About**       | 🔴 CRITICAL  | 3               | 0              | 3            |
| **Blog**        | 🔴 CRITICAL  | 3               | 0              | 3            |
| **Services**    | 🟡 PARTIAL   | 1               | 1              | 2            |
| **Projects**    | 🟡 PARTIAL   | 2               | 0              | 2            |
| **Careers**     | 🟢 MOSTLY OK | 0               | 1              | 1            |
| **Partnership** | 🟢 MOSTLY OK | 0               | 1              | 1            |
| **Contact**     | ✅ COMPLETE  | 0               | 0              | 0            |

### By Data Type

| Data Type        | Admin Managed? | API Exists?       | Used on Pages | Status               |
| ---------------- | -------------- | ----------------- | ------------- | -------------------- |
| **Testimonials** | ✅ Yes         | ❌ Protected only | Home          | 🔴 CRITICAL          |
| **Team Members** | ✅ Yes         | ❌ Protected only | About         | 🔴 CRITICAL          |
| **Timeline**     | ✅ Yes         | ❌ Protected only | About         | 🔴 CRITICAL          |
| **Statistics**   | ✅ Yes         | ❌ Protected only | Home, About   | 🔴 CRITICAL          |
| **Services**     | ✅ Yes         | ✅ Yes            | Home          | 🟡 NEEDS INCLUSION   |
| **Projects**     | ✅ Yes         | ✅ Yes            | Home          | 🟡 NEEDS FILTERING   |
| **Articles**     | ✅ Yes         | ✅ Yes            | Home, Blog    | 🟡 NEEDS INTEGRATION |
| **Categories**   | ✅ Yes         | ✅ Yes            | Blog          | 🟡 NEEDS COUNTS      |
| **Regions**      | ❌ No          | ❌ No             | Projects      | 🔴 NEW FEATURE       |
| **Years**        | ❌ No          | ❌ No             | Projects      | 🔴 NEW FEATURE       |

---

## 🛠️ Required Backend Fixes

### Critical API Endpoints to Update

#### 1. **CmsController@getHome** - `/api/cms/home`

**Current:** Returns hero_slides, home_features  
**Needs to add:**

```php
return [
    'hero_slides' => ...,
    'home_features' => ...,
    'services' => Service::where('is_active', true)->orderBy('order')->limit(4)->get(),
    'featured_projects' => Project::where('is_featured', true)->where('is_published', true)->limit(6)->get(),
    'testimonials' => Testimonial::where('is_active', true)->orderBy('order')->limit(4)->get(),
    'stats' => Stat::where('group', 'home')->orderBy('order')->get(),
    'latest_articles' => Article::where('is_published', true)->orderBy('published_at', 'desc')->limit(3)->get(),
];
```

#### 2. **CmsController@getAbout** - `/api/cms/about`

**Current:** Returns hero_slides, sections, values  
**Needs to add:**

```php
return [
    // ... existing data
    'timeline' => TimelineMilestone::orderBy('order')->get(),
    'team' => TeamMember::where('is_active', true)->orderBy('order')->get(),
    'stats' => Stat::where('group', 'about')->orderBy('order')->get(),
];
```

#### 3. **CmsController@getBlog** - `/api/cms/blog`

**Current:** Returns hero_slides  
**Needs to add:**

```php
return [
    'hero_slides' => ...,
    'categories' => Category::where('type', 'article')
        ->withCount(['articles' => function($q) {
            $q->where('is_published', true);
        }])
        ->get(),
    'recent_articles' => Article::where('is_published', true)
        ->orderBy('published_at', 'desc')
        ->limit(5)
        ->get(),
];
```

#### 4. **NEW Endpoint** - `/api/cms/projects/filters`

**Purpose:** Provide dynamic filter options  
**Returns:**

```php
return [
    'regions' => Project::whereNotNull('location')
        ->distinct()
        ->pluck('location')
        ->sort()
        ->values(),
    'years' => Project::whereNotNull('year')
        ->distinct()
        ->pluck('year')
        ->sort()
        ->reverse()
        ->values(),
];
```

---

## 📋 Frontend Refactoring Checklist

### High Priority (Must Fix)

- [ ] **Home Page**
    - [ ] Remove hardcoded `services` array, load from API
    - [ ] Remove hardcoded `projects` array, load featured projects from API
    - [ ] Remove hardcoded `testimonials` in TestimonialsSlider, load from API
    - [ ] Remove hardcoded `stats` array, load from API
    - [ ] Remove hardcoded `blogPosts` array, load from API

- [ ] **About Page**
    - [ ] Remove hardcoded `timeline` array, load from API
    - [ ] Remove hardcoded `team` array, load from API
    - [ ] Remove hardcoded `stats` array, load from API (grouped by 'about')

- [ ] **Blog Page**
    - [ ] Remove hardcoded `categories` array, load from API with counts
    - [ ] Remove hardcoded `recentArticles` array, load from API
    - [ ] Remove hardcoded `articles` array, load from API (already has endpoint, needs integration)

### Medium Priority (Should Fix)

- [ ] **Projects Page**
    - [ ] Remove hardcoded `regions` array, load dynamically from API
    - [ ] Remove hardcoded `years` array, load dynamically from API

- [ ] **Services Page**
    - [ ] Consider moving `workSteps` to page sections or database
    - [ ] Ensure fallback services are only used if API fails

### Low Priority (Nice to Have)

- [ ] **Careers Page**
    - [ ] Ensure benefits always populated in admin, remove fallback

- [ ] **Partnership Page**
    - [ ] Ensure advantages always populated in admin, remove fallback

---

## 🎯 Implementation Priority Order

### Phase 1: Critical Data (Week 1)

1. ✅ Testimonials on Home page
2. ✅ Statistics on Home & About pages
3. ✅ Team members on About page
4. ✅ Timeline on About page

### Phase 2: Content Integration (Week 2)

5. ✅ Featured projects on Home page
6. ✅ Services on Home page
7. ✅ Blog posts on Home page
8. ✅ Categories & recent articles on Blog page

### Phase 3: Dynamic Filters (Week 3)

9. ✅ Project regions filter
10. ✅ Project years filter
11. ✅ Category article counts

### Phase 4: Polish (Week 4)

12. ✅ Remove all fallback data where possible
13. ✅ Add admin warnings for empty content
14. ✅ Test all pages with real data
15. ✅ Update seeder to populate all required data

---

## 📝 Notes & Recommendations

### Database Considerations

- **Statistics Model** already has `group` field for page-specific stats ✅
- **Timeline Model** exists and has admin interface ✅
- **Team Model** exists and has admin interface ✅
- **Testimonial Model** exists and has admin interface ✅
- **No dedicated Region/Country model** - recommend extracting from project locations dynamically

### API Performance

- Consider caching `/api/cms/*` endpoints with 1-hour TTL
- Use eager loading for relationships (categories with article counts, projects with categories)
- Add pagination where appropriate (articles, projects already have it)

### Admin Dashboard

- All necessary management pages exist ✅
- Consider adding warnings in admin if critical sections are empty (e.g., "No testimonials added yet")
- Add "Preview" links from admin pages to public site

### Data Migration

- Create comprehensive seeder with realistic data for all models
- Migrate any valuable existing static content to database before removing hardcoded data
- Create script to extract hardcoded data into database format

---

## ✅ Verification Checklist (After Fixes)

Before marking this issue as resolved:

- [ ] All Home page sections load from database
- [ ] About page has no hardcoded team/timeline/stats
- [ ] Blog page loads real categories with counts
- [ ] Projects filters are dynamically generated
- [ ] All admin-created content appears on public site
- [ ] Fallback content only shows when database is genuinely empty
- [ ] Page load performance is acceptable (< 500ms)
- [ ] All public API endpoints are documented
- [ ] Seeders create complete realistic data
- [ ] No console errors related to missing data

---

**Report End**
