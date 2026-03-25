# Modernité Architecturale Dynamique Style Guide

**Style Overview**:
A modern energetic flat design for MAC construction company, featuring vibrant cyan as the primary brand color on soft multi-color blur gradient backgrounds. The style creates sharp functional hierarchy through surface color differences and clear contrast without shadows, embodying architectural dynamism with African modernity and accessible innovation.

## Colors
### Primary Colors
  - **primary-base**: `text-[#00B8D4]` or `bg-[#00B8D4]` - Vibrant cyan from MAC logo
  - **primary-lighter**: `bg-[#4DD0E1]`
  - **primary-darker**: `text-[#0097A7]` or `bg-[#0097A7]`

### Background Colors

#### Structural Backgrounds

Choose based on layout type:

**For Vertical Layout** (Top Header + Optional Side Panels):
- **bg-nav-primary**: `style="background: radial-gradient(circle at 20% 50%, rgba(0, 184, 212, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 179, 120, 0.06) 0%, transparent 50%), #FAFAFA;"` - Top header with subtle gradient
- **bg-nav-secondary**: `bg-[#FAFAFA]` - Inner Left sidebar (if present)
- **bg-page**: `style="background: radial-gradient(circle at 30% 20%, rgba(0, 184, 212, 0.05) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(245, 179, 120, 0.04) 0%, transparent 60%), #FFFFFF;"` - Page background with diffused pale cyan and warm beige orbs

**For Horizontal Layout** (Side Navigation + Optional Top Bar):
- **bg-nav-primary**: `style="background: radial-gradient(circle at 50% 30%, rgba(0, 184, 212, 0.08) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(245, 179, 120, 0.06) 0%, transparent 50%), #FAFAFA;"` - Left main sidebar with subtle gradient
- **bg-nav-secondary**: `bg-[#FAFAFA]` - Inner Top header (if present)
- **bg-page**: `style="background: radial-gradient(circle at 30% 20%, rgba(0, 184, 212, 0.05) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(245, 179, 120, 0.04) 0%, transparent 60%), #FFFFFF;"` - Page background with diffused pale cyan and warm beige orbs

#### Container Backgrounds
For main content area. Adjust values when used on navigation backgrounds to ensure sufficient contrast.
- **bg-container-primary**: `bg-white`
- **bg-container-secondary**: `bg-[#F5F5F5]`
- **bg-container-inset**: `bg-[#00B8D4]/5`
- **bg-container-inset-strong**: `bg-[#00B8D4]/10`

### Text Colors
- **color-text-primary**: `text-[#212121]`
- **color-text-secondary**: `text-[#616161]`
- **color-text-tertiary**: `text-[#9E9E9E]`
- **color-text-quaternary**: `text-[#BDBDBD]`
- **color-text-on-dark-primary**: `text-white/95` - Text on dark backgrounds and primary-base, accent-dark color surfaces
- **color-text-on-dark-secondary**: `text-white/75` - Text on dark backgrounds and primary-base, accent-dark color surfaces
- **color-text-link**: `text-[#00B8D4]` - Links, text-only buttons without backgrounds, and clickable text in tables

### Functional Colors
Use **sparingly** to maintain a clean and modern overall style. Used for the surfaces of text-only cards, simple cards, buttons, and tags.
  - **color-success-default**: #4CAF50
  - **color-success-light**: #E8F5E9 - tag/label bg
  - **color-error-default**: #EF5350 - alert banner bg
  - **color-error-light**: #FFEBEE - tag/label bg
  - **color-warning-default**: #FFA726 - tag/label bg
  - **color-warning-light**: #FFF3E0 - tag/label bg, alert banner bg
  - **color-function-default**: #5C6BC0
  - **color-function-light**: #E8EAF6 - tag/label bg

### Accent Colors
  - A secondary palette for contemporary harmony and architectural dynamism. **Avoid overuse** to protect brand identity. Use **sparingly**.
  - **accent-sky**: `text-[#4FC3F7]` or `bg-[#4FC3F7]` - Sky blue
  - **accent-teal**: `text-[#26A69A]` or `bg-[#26A69A]` - Soft teal

### Data Visualization Charts
For data visualization charts only.
  - Standard data colors: #E0E0E0, #BDBDBD, #9E9E9E, #757575, #616161, #424242
  - Important data can use small amounts of: #00B8D4, #4FC3F7, #26A69A, #FFA726

## Typography
- **Font Stack**:
  - **font-family-base**: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif` — For regular UI copy

- **Font Size & Weight**:
  - **Caption**: `text-sm font-normal`
  - **Body**: `text-base font-normal`
  - **Body Emphasized**: `text-base font-semibold`
  - **Card Title / Subtitle**: `text-lg font-semibold`
  - **Page Title**: `text-2xl font-bold`
  - **Headline**: `text-4xl font-bold`

- **Line Height**: 1.6

## Border Radius
  - **Small**: 8px — Elements inside cards (e.g., photos)
  - **Medium**: 12px
  - **Large**: 16px — Cards
  - **Full**: full — Toggles, avatars, small tags, inputs, etc.

## Layout & Spacing
  - **Tight**: 8px - For closely related small internal elements, such as icons and text within buttons
  - **Compact**: 12px - For small gaps between small containers, such as a line of tags
  - **Standard**: 20px - For gaps between medium containers like list items
  - **Relaxed**: 32px - For gaps between large containers and sections
  - **Section**: 48px - For major section divisions


## Create Boundaries (contrast of surface color, borders, shadows)
Pure flat design relying on strong surface color contrast and clear visual hierarchy. No shadows, no borders for most elements—boundaries are created through purposeful color differences and generous spacing that reflect architectural precision and accessible functionality.

### Borders
  - **Case 1**: No Borders for most containers and cards.
  - **Case 2**: If needed for inputs and form elements
    - **Default**: 2px solid #E0E0E0. Used for inputs. `border-2 border-[#E0E0E0]`
    - **Focused**: 2px solid #00B8D4. Used for active or focused states. `border-2 border-[#00B8D4]`

### Dividers
  - **Case 1**: Use when clear section separation is needed, `border-t` or `border-b` `border-[#E0E0E0]`.

### Shadows & Effects
  - **Case 1**: No shadow. Rely entirely on surface color contrast and spacing for visual hierarchy.

## Visual Emphasis for Containers
When containers (tags, cards, list items, rows) need visual emphasis to indicate priority, status, or category, use the following techniques:

| Technique | Implementation Notes | Best For | Avoid |
|-----------|---------------------|----------|-------|
| Background Tint | Use vibrant or muted background colors with strong contrast | Primary technique for all emphasis needs | Overuse of vibrant colors on large areas |
| Border Highlight | Use 2-3px border with brand colors for subtlety | Active/selected states, form validation | - |
| Status Tag/Label | Add colored tag/label inside container | Larger containers | - |
| Side Accent Bar | **Left edge only**, for **non-rounded containers** | Small non-rounded list items (e.g., side nav tabs), small non-rounded cards (e.g., project cards) | Large cards, wide list items, rounded containers |

## Assets
### Image

- For normal `<img>`: object-cover
- For `<img>` with:
  - Slight overlay: object-cover brightness-90
  - Heavy overlay: object-cover brightness-75

### Icon

- Use Lucide icons from Iconify.
- To ensure an aesthetic layout, each icon should be centered in a square container, typically without a background, matching the icon's size.
- Use Tailwind font size to control icon size
- Example:
  ```html
  <div class="flex items-center justify-center bg-transparent w-5 h-5">
  <iconify-icon icon="lucide:building-2" class="text-xl"></iconify-icon>
  </div>
  ```

### Third-Party Brand Logos:
   - Use Brand Icons from Iconify.
   - Logo Example:
     Monochrome Logo: `<iconify-icon icon="simple-icons:x"></iconify-icon>`
     Colored Logo: `<iconify-icon icon="logos:google-icon"></iconify-icon>`

### User's Own Logo:
- To protect copyright, do **NOT** use real product logos as a logo for a new product, individual user, or other company products.
- **Icon-based**:
  - **Graphic**: Use a simple, relevant icon (e.g., a `building-2` icon for construction, a `hammer` icon for building services).

## Page Layout - Web
### Determine Layout Type
- Choose between Vertical or Horizontal layout based on whether the primary navigation is a full-width top header or a full-height sidebar (left/right).
- User requirements typically indicate the layout preference. If unclear, consider:
  - Marketing/content sites typically use Vertical Layout.
  - Functional/dashboard sites can use either, depending on visual style. Sidebars accommodate more complex navigation than top bars. For complex navigation needs with a preference for minimal chrome (Vertical Layout adds an extra fixed header), choose Horizontal Layout (omits the fixed top header).
- Vertical Layout Diagram:
┌──────────────────────────────────────────────────────┐
│  Header (Primary Nav)                                │
├──────────┬──────────────────────────────┬────────────┤
│Left      │ Sub-header (Tertiary Nav)    │ Right      │
│Sidebar   │ (optional)                   │ Sidebar    │
│(Secondary├──────────────────────────────┤ (Utility   │
│Nav)      │ Main Content                 │ Panel)     │
│(optional)│                              │ (optional) │
│          │                              │            │
└──────────┴──────────────────────────────┴────────────┘
- Horizontal Layout Diagram:
┌──────────┬──────────────────────────────┬───────────┐
│          │ Header (Secondary Nav)       │           │
│ Left     │ (optional)                   │ Right     │
│ Sidebar  ├──────────────────────────────┤ Sidebar   │
│ (Primary │ Main Content                 │ (Utility  │
│ Nav)     │                              │ Panel)    │
│          │                              │ (optional)│
│          │                              │           │
└──────────┴──────────────────────────────┴───────────┘
### Detailed Layout Code
**Vertical Layout**
```html
<!-- Body: Adjust width (w-[1440px]) based on target screen size -->
<body class="w-[1440px] min-h-[700px] font-[-apple-system,BlinkMacSystemFont,'Segoe_UI','Roboto','Helvetica_Neue',Arial,sans-serif] leading-[1.6]">

  <!-- Header (Primary Nav): Fixed height -->
  <header class="w-full">
    <!-- Header content -->
  </header>

  <!-- Content Container: Must include 'flex' class -->
  <div class="w-full flex min-h-[700px]">
    <!-- Left Sidebar (Secondary Nav) (Optional): Remove if not needed. If Left Sidebar exists, use its ml to control left page margin -->
    <aside class="flex-shrink-0 min-w-fit">

    </aside>

    <!-- Main Content Area:
     Use Main Content Area's horizontal padding (px) to control distance from main content to sidebars or page edges.
     For pages without sidebars (like Marketing Pages, simple content pages such as help centers, privacy policies) use larger values (px-30 to px-80), for pages with sidebars (Functional/Dashboard Pages, complex content pages with multi-level navigation like knowledge base articles) use moderate values (px-8 to px-16) -->
    <main class="flex-1 overflow-x-hidden flex flex-col">
    <!--  Main Content -->

    </main>

    <!-- Right Sidebar (Utility Panel) (Optional): Remove if not needed. If Right Sidebar exists, use its mr to control right page margin -->
    <aside class="flex-shrink-0 min-w-fit">
    </aside>

  </div>
</body>
```

**Horizontal Layout**

```html
<!-- Body: Adjust width (w-[1440px]) based on target screen size. Must include 'flex' class -->
<body class="w-[1440px] min-h-[700px] flex font-[-apple-system,BlinkMacSystemFont,'Segoe_UI','Roboto','Helvetica_Neue',Arial,sans-serif] leading-[1.6]">

<!-- Left Sidebar (Primary Nav): Use its ml to control left page margin -->
  <aside class="flex-shrink-0 min-w-fit">
  </aside>

  <!-- Content Container-->
  <div class="flex-1 overflow-x-hidden flex flex-col min-h-[700px]">

    <!-- Header (Secondary Nav) (Optional): Remove if not needed. If Header exists, use its mx to control distance to left/right sidebars or page margins -->
    <header class="w-full">
    </header>

    <!-- Main Content Area: Use Main Content Area's pl to control distance from main content to left sidebar. Use pr to control distance to right sidebar/right page edge -->
    <main class="w-full">
    </main>


  </div>

  <!-- Right Sidebar (Utility Panel) (Optional): Remove if not needed. If Right Sidebar exists, use its mr to control right page margin -->
  <aside class="flex-shrink-0 min-w-fit">
  </aside>

</body>
```

## Tailwind Component Examples (Key attributes)
**Important Note**: Use utility classes directly. Do NOT create custom CSS classes or add styles in <style> tags for the following components

### Basic

- **Button**:
  - Example 1 (Primary button - filled):
    - button: flex items-center gap-2 bg-[#00B8D4] text-white/95 px-6 py-3 rounded-xl font-semibold hover:bg-[#0097A7] transition-colors
      - icon (optional)
      - span(button copy): whitespace-nowrap
  - Example 2 (Secondary button - outlined):
    - button: flex items-center gap-2 border-2 border-[#00B8D4] text-[#00B8D4] px-6 py-3 rounded-xl font-semibold hover:bg-[#00B8D4]/5 transition-colors
      - icon (optional)
      - span(button copy): whitespace-nowrap
  - Example 3 (Text button):
    - button: flex items-center gap-2 text-[#00B8D4] font-semibold hover:opacity-70 transition-opacity
      - icon (optional)
      - span(button copy): whitespace-nowrap

- **Tag Group (Filter Tags)**
  - container(scrollable): flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden
    - label (Tag item 1):
      - input: type="radio" name="tag1" class="sr-only peer" checked
      - div: bg-[#F5F5F5] text-[#616161] px-4 py-2 rounded-full peer-checked:bg-[#00B8D4] peer-checked:text-white/95 hover:opacity-80 transition whitespace-nowrap cursor-pointer font-medium

### Data Entry
- **Progress bars/Slider**: h-2 bg-[#E0E0E0] rounded-full
  - Progress fill: h-2 bg-[#00B8D4] rounded-full

- **Checkbox**
  - label: flex items-center gap-3 cursor-pointer
    - input: type="checkbox" class="sr-only peer"
    - div: w-6 h-6 bg-white border-2 border-[#E0E0E0] rounded-md flex items-center justify-center peer-checked:bg-[#00B8D4] peer-checked:border-[#00B8D4] text-transparent peer-checked:text-white/95 transition-colors
      - svg(Checkmark): stroke="currentColor" stroke-width="3"
    - span(text): text-[#212121]

- **Radio button**
  - label: flex items-center gap-3 cursor-pointer
    - input: type="radio" name="option1" class="sr-only peer"
    - div: w-6 h-6 bg-white border-2 border-[#E0E0E0] rounded-full flex items-center justify-center peer-checked:border-[#00B8D4] transition-colors
      - svg(dot indicator): w-3 h-3 fill-transparent peer-checked:fill-[#00B8D4] transition-colors
    - span(text): text-[#212121]

- **Switch/Toggle**
  - label: flex items-center gap-3 cursor-pointer
    - div: relative
      - input: type="checkbox" class="sr-only peer"
      - div(Toggle track): w-14 h-7 bg-[#E0E0E0] peer-checked:bg-[#00B8D4] rounded-full transition-colors
      - div(Toggle thumb): absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full peer-checked:translate-x-7 transition-transform
    - span(text): text-[#212121]

- **Select/Dropdown**
  - Select container: flex items-center gap-2 bg-white border-2 border-[#E0E0E0] px-4 py-3 rounded-xl cursor-pointer hover:border-[#00B8D4] transition-colors
    - text: text-[#212121]
    - Dropdown icon(square container): flex items-center justify-center bg-transparent w-5 h-5
      - icon: text-[#616161]


### Container
- **Navigation Menu - horizontal**
    - Navigation with sections/grouping:
        - Nav Container: flex items-center justify-between w-full px-12 py-4
        - Left Section: flex items-center gap-12
          - Menu Item: flex items-center gap-2 text-[#212121] font-medium hover:text-[#00B8D4] transition-colors cursor-pointer
        - Right Section: flex items-center gap-6
          - Menu Item: flex items-center gap-2 text-[#212121] font-medium hover:text-[#00B8D4] transition-colors cursor-pointer
          - Notification (if applicable): relative flex items-center justify-center w-10 h-10
            - notification-icon: w-5 h-5 text-[#616161]
            - badge (if has unread): absolute -top-1 -right-1 w-5 h-5 bg-[#EF5350] rounded-full flex items-center justify-center text-white text-xs font-bold
          - Avatar(if applicable): flex items-center gap-2 cursor-pointer
            - avatar-image: w-10 h-10 rounded-full object-cover
            - dropdown-icon (if applicable): w-5 h-5 text-[#616161]

- **Card**
    - Example 1 (Vertical card with image and text):
        - Card: bg-white rounded-2xl flex flex-col overflow-hidden
        - Image: w-full h-48 object-cover
        - Text area: flex flex-col gap-3 p-5
          - card-title: text-lg font-semibold text-[#212121]
          - card-subtitle: text-sm font-normal text-[#616161]
    - Example 2 (Horizontal card with image and text):
        - Card: bg-white rounded-2xl flex gap-5 overflow-hidden p-5
        - Image: rounded-lg h-32 w-32 object-cover flex-shrink-0
        - Text area: flex flex-col gap-3 justify-center
          - card-title: text-lg font-semibold text-[#212121]
          - card-subtitle: text-sm font-normal text-[#616161]
    - Example 3 (Image-focused card: no background or padding):
        - Card: flex flex-col gap-4
        - Image: rounded-2xl w-full h-64 object-cover
        - Text area: flex flex-col gap-2
          - card-title: text-lg font-semibold text-[#212121]
          - card-subtitle: text-sm font-normal text-[#616161]
    - Example 4 (Project/Service cards with accent):
        - Card: bg-[#00B8D4]/5 rounded-2xl p-6 flex flex-col gap-4 hover:bg-[#00B8D4]/10 transition-colors
          - Icon container: w-12 h-12 bg-[#00B8D4] rounded-xl flex items-center justify-center
            - icon: text-white/95 text-2xl
          - Text area: flex flex-col gap-2
            - card-title: text-lg font-semibold text-[#212121]
            - card-description: text-sm text-[#616161]

## Additional Notes

This style guide embodies MAC's commitment to architectural innovation and accessible modernity. The vibrant cyan brand color creates energetic focal points against soft gradient backgrounds, while the pure flat design approach with strong color contrast ensures clarity and professional functionality. The medium border radius balances contemporary aesthetics with approachability, perfect for showcasing construction excellence and African architectural dynamism.

