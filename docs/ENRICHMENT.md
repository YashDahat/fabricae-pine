# Feature Enrichment — Attempt 1

Generated: 2026-09-13

Each section is one LLM call (~5–8K tokens). The instruction tells the generator how all files in the feature interact and what contracts they must honour.

---

## Product Management (Backend)

**Name:** `product-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/fabricaepine/model/Product.java` — MODEL layer — Represents a single clothing product in the catalog, including details, pricing, and MOQ.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String; price: BigDecimal; minimumOrderQuantity: Integer; imageUrl: String; category: ProductCategory }
- `backend/src/main/java/com/fabricaepine/model/ProductCategory.java` — MODEL layer — Represents a category for products, used for filtering and organization.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String }
- `backend/src/main/java/com/fabricaepine/repository/ProductRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on Product entities, including finding products by category.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<Product> findByCategoryId(Long categoryId)
- `backend/src/main/java/com/fabricaepine/repository/ProductCategoryRepository.java` — REPOSITORY layer — Spring Data JPA repository for CRUD operations on ProductCategory entities.
- `backend/src/main/java/com/fabricaepine/service/ProductService.java` — SERVICE layer — implements business logic for managing products and categories, including filtering and CRUD operations.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<ProductDto> getAllProducts(Long categoryId); ProductDto getProductById(Long id); ProductDto createProduct(ProductDto productDto); ProductDto updateProduct(Long id, ProductDto productDto); void deleteProduct(Long id); List<ProductCategoryDto> getAllCategories(); ProductCategoryDto getCategoryById(Long id); ProductCategoryDto createCategory(ProductCategoryDto categoryDto); ProductCategoryDto updateCategory(Long id, ProductCategoryDto categoryDto); void deleteCategory(Long id)
- `backend/src/main/java/com/fabricaepine/controller/ProductController.java` — CONTROLLER layer — Public REST controller for fetching product and category data for the catalog.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<ProductDto> getAllProducts(Long categoryId); ProductDto getProductById(Long id); List<ProductCategoryDto> getAllCategories(); ProductCategoryDto getCategoryById(Long id)
- `backend/src/main/java/com/fabricaepine/controller/admin/AdminProductController.java` — CONTROLLER layer — Admin-only REST controller for CRUD operations on products and categories.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: ProductDto createProduct(ProductDto productDto); ProductDto updateProduct(Long id, ProductDto productDto); void deleteProduct(Long id); ProductCategoryDto createCategory(ProductCategoryDto categoryDto); ProductCategoryDto updateCategory(Long id, ProductCategoryDto categoryDto); void deleteCategory(Long id)
- `backend/src/main/java/com/fabricaepine/dto/ProductDto.java` — DTO layer — Data Transfer Object for Product entities, includes wholesale pricing for B2B clients.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String; price: BigDecimal; minimumOrderQuantity: Integer; imageUrl: String; categoryId: Long; categoryName: String }
- `backend/src/main/java/com/fabricaepine/dto/ProductCategoryDto.java` — DTO layer — Data Transfer Object for ProductCategory entities.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; name: String; description: String }

**Feature Instruction:**

The Product Management (Backend) feature provides a comprehensive API for managing clothing products and their categories. It supports both public catalog browsing and authenticated admin operations for CRUD on products and categories. The feature consists of `Product` and `ProductCategory` model entities, `ProductRepository` and `ProductCategoryRepository` for data persistence, `ProductService` for business logic, and two controllers: `ProductController` for public access and `AdminProductController` for administrative tasks. Data transfer objects `ProductDto` and `ProductCategoryDto` are used for all API interactions.

### Product Entity (`Product.java`)
Represents a single clothing product with fields such as `name`, `description`, `price`, `minimumOrderQuantity`, `imageUrl`, and a many-to-one relationship with `ProductCategory`.

### Product Category Entity (`ProductCategory.java`)
Represents a category for products, with fields like `name` and `description`.

### Repositories (`ProductRepository.java`, `ProductCategoryRepository.java`)
These Spring Data JPA repositories provide standard CRUD operations for `Product` and `ProductCategory` entities. `ProductRepository` will include a custom query to find products by category ID.

### Product Service (`ProductService.java`)
This service layer orchestrates interactions between controllers and repositories. It defines the following public methods:

1.  `getAllProducts(Long categoryId)`: Returns a list of `ProductDto`. If `categoryId` is provided, it filters products by that category. Otherwise, it returns all products.
    *   **Logic:**
        1.  If `categoryId` is not null, call `productRepository.findByCategoryId(categoryId)`. If no category is found for the given ID, throw `ResourceNotFoundException`. Map the resulting `Product` entities to `ProductDto`.
        2.  If `categoryId` is null, call `productRepository.findAll()`. Map the resulting `Product` entities to `ProductDto`.
    *   **Error Cases:** `ResourceNotFoundException` if `categoryId` is provided but no matching category exists.

2.  `getProductById(Long id)`: Returns a single `ProductDto` for the given product ID.
    *   **Logic:**
        1.  Call `productRepository.findById(id)`. If the product is not found, throw `ResourceNotFoundException`.
        2.  Map the found `Product` entity to `ProductDto`.
    *   **Error Cases:** `ResourceNotFoundException` if no product with the given ID is found.

3.  `createProduct(ProductDto productDto)`: Creates a new product from the provided `ProductDto`.
    *   **Logic:**
        1.  Validate `productDto`. Ensure `productDto.getCategoryId()` is not null and a `ProductCategory` with that ID exists by calling `productCategoryRepository.findById(productDto.getCategoryId())`. If not found, throw `ResourceNotFoundException`.
        2.  Map `productDto` to a `Product` entity.
        3.  Call `productRepository.save()` with the new `Product` entity.
        4.  Map the saved `Product` entity back to `ProductDto` and return it.
    *   **Error Cases:** `ResourceNotFoundException` if the specified category does not exist.

4.  `updateProduct(Long id, ProductDto productDto)`: Updates an existing product identified by `id` with data from `productDto`.
    *   **Logic:**
        1.  Call `productRepository.findById(id)`. If the product is not found, throw `ResourceNotFoundException`.
        2.  If `productDto.getCategoryId()` is provided and not null, ensure a `ProductCategory` with that ID exists by calling `productCategoryRepository.findById(productDto.getCategoryId())`. If not found, throw `ResourceNotFoundException`.
        3.  Update the fields of the existing `Product` entity with data from `productDto`.
        4.  Call `productRepository.save()` with the updated `Product` entity.
        5.  Map the saved `Product` entity back to `ProductDto` and return it.
    *   **Error Cases:** `ResourceNotFoundException` if no product with the given ID is found, or if a new `categoryId` is provided but no matching category exists.

5.  `deleteProduct(Long id)`: Deletes a product by its ID.
    *   **Logic:**
        1.  Call `productRepository.findById(id)`. If the product is not found, throw `ResourceNotFoundException`.
        2.  Call `productRepository.deleteById(id)`.
    *   **Error Cases:** `ResourceNotFoundException` if no product with the given ID is found.

6.  `getAllCategories()`: Returns a list of all `ProductCategoryDto`.
    *   **Logic:**
        1.  Call `productCategoryRepository.findAll()`.
        2.  Map the resulting `ProductCategory` entities to `ProductCategoryDto`.

7.  `getCategoryById(Long id)`: Returns a single `ProductCategoryDto` for the given category ID.
    *   **Logic:**
        1.  Call `productCategoryRepository.findById(id)`. If the category is not found, throw `ResourceNotFoundException`.
        2.  Map the found `ProductCategory` entity to `ProductCategoryDto`.
    *   **Error Cases:** `ResourceNotFoundException` if no category with the given ID is found.

8.  `createCategory(ProductCategoryDto categoryDto)`: Creates a new product category.
    *   **Logic:**
        1.  Map `categoryDto` to a `ProductCategory` entity.
        2.  Call `productCategoryRepository.save()` with the new `ProductCategory` entity.
        3.  Map the saved `ProductCategory` entity back to `ProductCategoryDto` and return it.

9.  `updateCategory(Long id, ProductCategoryDto categoryDto)`: Updates an existing product category.
    *   **Logic:**
        1.  Call `productCategoryRepository.findById(id)`. If the category is not found, throw `ResourceNotFoundException`.
        2.  Update the fields of the existing `ProductCategory` entity with data from `categoryDto`.
        3.  Call `productCategoryRepository.save()` with the updated `ProductCategory` entity.
        4.  Map the saved `ProductCategory` entity back to `ProductCategoryDto` and return it.
    *   **Error Cases:** `ResourceNotFoundException` if no category with the given ID is found.

10. `deleteCategory(Long id)`: Deletes a product category by its ID.
    *   **Logic:**
        1.  Call `productCategoryRepository.findById(id)`. If the category is not found, throw `ResourceNotFoundException`.
        2.  Call `productCategoryRepository.deleteById(id)`.
    *   **Error Cases:** `ResourceNotFoundException` if no category with the given ID is found.

### Product Controller (`ProductController.java`)
This controller exposes public API endpoints for fetching product and category data. It injects `ProductService`.

### Admin Product Controller (`AdminProductController.java`)
This controller exposes admin-only API endpoints for CRUD operations on products and categories. It injects `ProductService`.

### DTOs (`ProductDto.java`, `ProductCategoryDto.java`)
`ProductDto` includes fields for `id`, `name`, `description`, `price`, `minimumOrderQuantity`, `imageUrl`, and `categoryId`. `ProductCategoryDto` includes `id`, `name`, and `description`.

### Error Handling
`ResourceNotFoundException` is a custom exception that should be handled by a global exception handler (e.g., `GlobalExceptionHandler` in `shared-backend`) to return an appropriate HTTP 404 status.

---

## Inquiry Management (Backend)

**Name:** `inquiry-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/fabricaepine/model/Inquiry.java` — MODEL layer — represents a bulk order inquiry with fields for client details, product interest, quantity, and status.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; clientName: String; clientEmail: String; clientPhone: String; companyName: String; productInterest: String; quantity: Integer; additionalDetails: String; status: InquiryStatus; submissionDate: java.time.LocalDateTime }
- `backend/src/main/java/com/fabricaepine/model/InquiryStatus.java` — MODEL layer — an enum defining the possible states of a client inquiry.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { PENDING: enum; REVIEWED: enum; CONTACTED: enum; CLOSED: enum }
- `backend/src/main/java/com/fabricaepine/repository/InquiryRepository.java` — REPOSITORY layer — provides standard CRUD operations for `Inquiry` entities.
- `backend/src/main/java/com/fabricaepine/service/InquiryService.java` — SERVICE layer — implements `createInquiry(InquiryRequestDto): InquiryResponseDto`, `getAllInquiries(): List<InquiryResponseDto>`, `getInquiryById(Long id): InquiryResponseDto`, and `updateInquiryStatus(Long id, InquiryStatus status): InquiryResponseDto`.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: InquiryResponseDto createInquiry(InquiryRequestDto inquiryRequestDto); java.util.List<InquiryResponseDto> getAllInquiries(); InquiryResponseDto getInquiryById(Long id); InquiryResponseDto updateInquiryStatus(Long id, InquiryStatus status)
- `backend/src/main/java/com/fabricaepine/controller/InquiryController.java` — CONTROLLER layer — exposes a public REST endpoint for submitting new bulk order inquiries.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: InquiryResponseDto createInquiry(InquiryRequestDto inquiryRequestDto)
- `backend/src/main/java/com/fabricaepine/controller/admin/AdminInquiryController.java` — CONTROLLER layer — exposes admin-only REST endpoints for viewing and managing client inquiries.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: java.util.List<InquiryResponseDto> getAllInquiries(); InquiryResponseDto getInquiryById(Long id); InquiryResponseDto updateInquiryStatus(Long id, InquiryStatus status)
- `backend/src/main/java/com/fabricaepine/dto/InquiryRequestDto.java` — DTO layer — used for data transfer when creating a new inquiry.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { clientName: String; clientEmail: String; clientPhone: String; companyName: String; productInterest: String; quantity: Integer; additionalDetails: String }
- `backend/src/main/java/com/fabricaepine/dto/InquiryResponseDto.java` — DTO layer — used for data transfer when retrieving inquiry details.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; clientName: String; clientEmail: String; clientPhone: String; companyName: String; productInterest: String; quantity: Integer; additionalDetails: String; status: InquiryStatus; submissionDate: java.time.LocalDateTime }

**Feature Instruction:**

This feature manages bulk order inquiries from B2B clients for Fabricae PINE. It provides a public API endpoint for clients to submit new inquiries and an admin-only API for internal staff to view and manage these inquiries. The `Inquiry` entity represents a single inquiry, with its `InquiryStatus` enum tracking its lifecycle (PENDING, REVIEWED, CONTACTED, CLOSED). The `InquiryRepository` handles persistence, while `InquiryService` encapsulates the core business logic, including creating new inquiries and updating their statuses. `InquiryController` exposes the public endpoint for inquiry submission, and `AdminInquiryController` provides the administrative interface for managing inquiries.

### Inquiry Submission Flow
1. A B2B client (or an anonymous user) submits an inquiry via the `POST /api/v1/inquiries` endpoint.
2. The `InquiryController.createInquiry(InquiryRequestDto)` method receives the request.
3. It calls `inquiryService.createInquiry(InquiryRequestDto)`.
4. `InquiryService` maps the `InquiryRequestDto` to an `Inquiry` entity, sets its `status` to `PENDING`, and saves it using `inquiryRepository.save(inquiry)`.
5. The saved `Inquiry` entity is then mapped to an `InquiryResponseDto` and returned.

### Admin Inquiry Management Flow
1. An authenticated administrator accesses the admin portal to view inquiries.
2. The frontend calls `GET /api/v1/admin/inquiries` to fetch all inquiries or `GET /api/v1/admin/inquiries/{id}` for a specific inquiry.
3. `AdminInquiryController` methods `getAllInquiries()` and `getInquiryById(Long id)` call `inquiryService.getAllInquiries()` and `inquiryService.getInquiryById(Long id)` respectively.
4. `InquiryService` retrieves inquiries from `inquiryRepository` and maps them to `InquiryResponseDto` objects.
5. To update an inquiry's status, the admin frontend calls `PUT /api/v1/admin/inquiries/{id}/status`.
6. `AdminInquiryController.updateInquiryStatus(Long id, InquiryStatus status)` calls `inquiryService.updateInquiryStatus(Long id, InquiryStatus status)`.
7. `InquiryService` fetches the `Inquiry` by ID, updates its status, and saves it. If the inquiry is not found, `InquiryService` throws a `ResourceNotFoundException`.

### Error Handling
- If an inquiry is not found during an update or retrieval operation, `InquiryService` will throw a `ResourceNotFoundException`. This exception will be caught by the `GlobalExceptionHandler` (from the `shared-backend` feature), which will return an HTTP 404 Not Found response with an `ErrorResponse` body.

---

## Content Management (Backend)

**Name:** `content-management-backend`  
**Type:** BACKEND  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/fabricaepine/model/LookbookEntry.java` — MODEL layer — defines the LookbookEntry entity for persistence, mapping to the database table.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; title: String; content: String; imageUrl: String; publicationDate: LocalDate }
- `backend/src/main/java/com/fabricaepine/repository/LookbookEntryRepository.java` — REPOSITORY layer — provides standard CRUD operations for LookbookEntry entities.
- `backend/src/main/java/com/fabricaepine/service/LookbookEntryService.java` — SERVICE layer — implements business logic for managing lookbook entries, including createLookbookEntry(LookbookEntryDto), getAllLookbookEntries(), getLookbookEntryById(Long), updateLookbookEntry(Long, LookbookEntryDto), and deleteLookbookEntry(Long).

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: LookbookEntryDto createLookbookEntry(LookbookEntryDto lookbookEntryDto); List<LookbookEntryDto> getAllLookbookEntries(); LookbookEntryDto getLookbookEntryById(Long id); LookbookEntryDto updateLookbookEntry(Long id, LookbookEntryDto lookbookEntryDto); void deleteLookbookEntry(Long id)
- `backend/src/main/java/com/fabricaepine/controller/LookbookEntryController.java` — Public REST controller for fetching lookbook entries, exposing GET /api/v1/lookbook and GET /api/v1/lookbook/{id}.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: List<LookbookEntryDto> getAllLookbookEntries(); LookbookEntryDto getLookbookEntryById(Long id)
- `backend/src/main/java/com/fabricaepine/controller/admin/AdminLookbookController.java` — Admin-only REST controller for CRUD operations on lookbook entries, exposing POST /api/v1/admin/lookbook, PUT /api/v1/admin/lookbook/{id}, and DELETE /api/v1/admin/lookbook/{id}.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: LookbookEntryDto createLookbookEntry(LookbookEntryDto lookbookEntryDto); LookbookEntryDto updateLookbookEntry(Long id, LookbookEntryDto lookbookEntryDto); void deleteLookbookEntry(Long id)
- `backend/src/main/java/com/fabricaepine/dto/LookbookEntryDto.java` — DTO layer — Data Transfer Object for LookbookEntry entities, used for request and response bodies.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { id: Long; title: String; content: String; imageUrl: String; publicationDate: LocalDate }

**Feature Instruction:**

This feature provides the backend infrastructure for managing lookbook entries, which showcase Fabricae PINE's collections and manufacturing insights. It includes a Spring Data JPA entity (`LookbookEntry`), a repository (`LookbookEntryRepository`) for database interactions, a service layer (`LookbookEntryService`) for business logic, and two controllers: `LookbookEntryController` for public access to view entries, and `AdminLookbookController` for authenticated administrators to perform CRUD operations. A `LookbookEntryDto` is used for data transfer between layers.

`LookbookEntry` defines the structure of a lookbook entry, including fields for title, content, image URL, and publication date. `LookbookEntryRepository` extends `JpaRepository` to provide standard CRUD functionalities.

`LookbookEntryService` orchestrates interactions between the controllers and the repository. It provides methods for creating, retrieving, updating, and deleting lookbook entries. When creating or updating an entry, the service maps `LookbookEntryDto` to `LookbookEntry` and vice-versa. It handles `ResourceNotFoundException` if an entry is not found during update or deletion operations.

`LookbookEntryController` exposes public API endpoints for fetching all lookbook entries and a single entry by its ID. These endpoints are accessible without authentication. `AdminLookbookController` provides authenticated endpoints for administrators to create, update, and delete lookbook entries. All controller methods return `ResponseEntity` objects, encapsulating the `LookbookEntryDto` or a list of them, along with appropriate HTTP status codes.

Both controllers inject `LookbookEntryService`. The service, in turn, injects `LookbookEntryRepository`. Image URLs for lookbook entries are expected to be managed externally, likely through a media management system (e.g., the `gallery` foundation feature), and are stored as simple `String` fields in the `LookbookEntry` entity. The `LookbookEntryDto` mirrors the relevant fields of the `LookbookEntry` entity for safe data transfer.

---

## Shared (Backend)

**Name:** `shared-backend`  
**Type:** SHARED  
**Change required:** true

**Files in this feature:**
- `backend/src/main/java/com/fabricaepine/exception/GlobalExceptionHandler.java` — EXCEPTION handler — catches application-wide exceptions and formats them into a standard ErrorResponse DTO.
- `backend/src/main/java/com/fabricaepine/dto/ErrorResponse.java` — DTO — defines the standard JSON structure for API error responses.
- `backend/src/main/java/com/fabricaepine/exception/ResourceNotFoundException.java` — EXCEPTION — custom exception for when a requested resource is not found.

**Feature Instruction:**

This feature provides shared backend utilities for error handling and custom exceptions. The `ErrorResponse.java` DTO defines a standardized JSON structure for all API error responses, ensuring consistency across the application. The `ResourceNotFoundException.java` is a custom exception that should be thrown by services when a requested entity cannot be found. The `GlobalExceptionHandler.java` is a centralized exception handler that catches `ResourceNotFoundException` and other uncaught exceptions, mapping them to appropriate HTTP status codes and formatting the response body using the `ErrorResponse` DTO. Services throughout the application will throw `ResourceNotFoundException` when an entity is not found, and the `GlobalExceptionHandler` will automatically convert this into a 404 Not Found HTTP response with a structured error message.

---

## Core UI

**Name:** `core-ui`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/App.tsx` — Main application component that sets up React Router, global providers, and the `sonner` Toaster. It defines the main public and admin routes, applying `SiteLayout` and `AdminLayout` respectively.
- `frontend/src/pages/HomePage.tsx` — Public page that serves as the landing page, composed of a hero section, featured products, and a company introduction snippet.
- `frontend/src/pages/AboutPage.tsx` — Public page that displays detailed information about Fabricae PINE's history, mission, and manufacturing process.
- `frontend/src/pages/ContactPage.tsx` — Public page that provides contact information, a general inquiry form, and an embedded Google Map showing the business location.
- `frontend/src/pages/NotFoundPage.tsx` — Public page that serves as a standard 404 error page for invalid routes.
- `frontend/src/components/home/HeroSection.tsx` — Component for the home page hero section, featuring a background image, a prominent headline, and a call-to-action button.
- `frontend/src/components/home/FeaturedProducts.tsx` — Component for displaying a grid of featured products on the home page, fetching data from the product-management-backend.
- `frontend/src/components/home/AboutSnippet.tsx` — Component providing a brief introduction to Fabricae PINE and its values, displayed on the home page.
- `frontend/src/components/about/CompanyStory.tsx` — Component detailing the history, mission, and values of Fabricae PINE for the About Us page.
- `frontend/src/components/about/ManufacturingProcess.tsx` — Component visually showcasing the steps involved in Fabricae PINE's garment manufacturing process.
- `frontend/src/components/contact/ContactForm.tsx` — Component for a general inquiry form, allowing users to submit messages to Fabricae PINE, which calls the inquiry-management-backend.
- `frontend/src/components/contact/LocationMap.tsx` — Component that embeds a Google Map to display the physical location of Fabricae PINE.
- `frontend/src/components/shared/WhatsAppCta.tsx` — Reusable floating action button component that initiates a WhatsApp chat with the business.
- `frontend/src/components/shared/DeleteConfirmationDialog.tsx` — Reusable dialog component to confirm delete actions, typically used in admin panels.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { isOpen: boolean; onClose: () => void; onConfirm: () => void; itemType: string; itemName: string }

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#0A4837] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Secondary CTA: border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#333333] leading-relaxed

The `core-ui` feature provides the foundational UI structure and common components for the Fabricae PINE website. It includes the main application entry point (`App.tsx`), core public pages (`HomePage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `NotFoundPage.tsx`), and shared components used across the application. This feature establishes the overall look and feel, navigation, and basic user interaction patterns.

`App.tsx` is the root component that sets up the React Router for navigation and wraps the application with necessary providers. It defines the main routes for public pages and the admin portal, ensuring the `SiteLayout` (which includes `SiteHeader` and `SiteFooter`) is applied globally to public routes, and `AdminLayout` to admin routes. It also integrates the `Toaster` component from `sonner` for displaying toast notifications.

`HomePage.tsx` serves as the landing page, composed of `HeroSection.tsx`, `FeaturedProducts.tsx`, and `AboutSnippet.tsx`. The `HeroSection` displays a prominent banner with a background image, a compelling headline, and a call-to-action button. `FeaturedProducts` showcases a selection of products by fetching them from the `product-management-backend` via the generated `productService` and rendering them using `ProductCard` components. `AboutSnippet` provides a brief introduction to Fabricae PINE, encouraging users to learn more.

`AboutPage.tsx` presents detailed information about Fabricae PINE, utilizing `CompanyStory.tsx` to describe the company's history and mission, and `ManufacturingProcess.tsx` to visually illustrate the garment production steps. The content should be professional and emphasize quality craftsmanship.

`ContactPage.tsx` offers various ways for clients to reach Fabricae PINE. It includes `ContactForm.tsx` for general inquiries, which submits data to the `inquiry-management-backend` via the generated `inquiryService`. It also embeds `LocationMap.tsx` to display the business address using Google Maps, and lists contact details such as phone number and opening hours.

`NotFoundPage.tsx` is a generic 404 page displayed when a user navigates to an invalid URL.

Shared components like `WhatsAppCta.tsx` provide a floating action button for direct communication, and `DeleteConfirmationDialog.tsx` offers a reusable modal for confirming delete actions, primarily for admin interfaces.

### Inter-file Wiring and Data Flow:
- `App.tsx` uses `react-router-dom` to define routes and render pages. It implicitly applies `SiteLayout` to public routes and `AdminLayout` to admin routes.
- `HomePage.tsx` imports and renders `HeroSection`, `FeaturedProducts`, and `AboutSnippet`.
- `FeaturedProducts.tsx` calls the generated `productService.getAllProducts()` to fetch product data and maps this data to `ProductCard` components. Each `ProductCard` will display product details like `name`, `price`, and `imageUrl` from the `ProductDto` data shape.
- `AboutPage.tsx` imports and renders `CompanyStory` and `ManufacturingProcess`.
- `ContactPage.tsx` imports and renders `ContactForm` and `LocationMap`.
- `ContactForm.tsx` uses the generated `inquiryService.createInquiry(InquiryRequestDto)` to submit inquiry data to the backend. Upon successful submission, it should display a toast notification using `sonner`.
- `LocationMap.tsx` uses the hardcoded latitude and longitude from the business context to display the map.
- All pages and components will adhere to the defined Design Tokens for styling, using Tailwind CSS classes for colors, typography, and spacing.
- Monetary values, where displayed (e.g., in `ProductCard` if prices are shown), must be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

### Error Handling:
- `ContactForm.tsx` should handle potential errors from `inquiryService.createInquiry` by displaying an error toast notification to the user.
- `FeaturedProducts.tsx` should handle errors from `productService.getAllProducts` by displaying an error message or toast, indicating that products could not be loaded.


---

## Authentication

**Name:** `authentication`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/LoginPage.tsx` — Public page for user login, rendering the LoginForm component.
- `frontend/src/pages/SignupPage.tsx` — Public page for new B2B client registration, rendering the SignupForm component.
- `frontend/src/components/auth/LoginForm.tsx` — React component for user login, interacting with the useAuth() hook.
- `frontend/src/components/auth/SignupForm.tsx` — React component for B2B client registration, interacting with the useAuth() hook.
- `frontend/src/components/ProtectedRoute.tsx` — React component acting as a route guard, checking authentication status and roles using useAuth().

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { children: React.ReactNode; roles: string[] | undefined }

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#0A4837] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#C2A02F] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#333333] leading-relaxed

This feature provides the client-facing authentication pages and components for Fabricae PINE, enabling B2B clients and administrators to log in and new B2B clients to register. It leverages the pre-scaffolded `useAuth()` hook from the authentication foundation to handle all authentication logic, including login, signup, and session management. The `LoginPage.tsx` and `SignupPage.tsx` are public pages that render the `LoginForm.tsx` and `SignupForm.tsx` components respectively. The `ProtectedRoute.tsx` component acts as a route guard, ensuring that only authenticated users with appropriate roles can access specific routes within the application. All forms will include appropriate validation and user feedback using `react-hook-form` and `sonner` for toasts.

### `LoginPage.tsx`
This page serves as the entry point for existing B2B clients and administrators to log into their accounts. It will display a prominent login form, centered on the page, with a clear call to action. The page will use the `LoginForm` component to handle the actual login process.

### `SignupPage.tsx`
This page allows new B2B clients to register for an account with Fabricae PINE. It will present a registration form, also centered, guiding users through the necessary steps to create a new account. The page will use the `SignupForm` component for the registration logic.

### `LoginForm.tsx`
This component encapsulates the user login form. It will use `react-hook-form` for form management and validation. Upon submission, it will call the `useAuth().login(email, password)` method. Successful login will redirect the user to the client dashboard (`/client-dashboard`) or admin dashboard (`/admin`) based on their role, while failed attempts will display an error toast using `sonner`.

### `SignupForm.tsx`
This component handles the B2B client registration process. It will use `react-hook-form` for form management and validation. Upon submission, it will call the `useAuth().signup(name, email, password, companyName)` method. Successful registration will redirect the user to the login page (`/login`) with a success message, while failed attempts will display an error toast using `sonner`.

### `ProtectedRoute.tsx`
This component is a higher-order component (HOC) or a render prop component that wraps routes requiring authentication. It will utilize `useAuth().isAuthenticated` and `useAuth().user.role` to determine access. If the user is not authenticated, they will be redirected to the `/login` page. If they are authenticated but lack the required role, they will be redirected to a suitable fallback page (e.g., `/client-dashboard` for unauthorized admin access).

---

## Client Dashboard

**Name:** `client-dashboard`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/pages/ClientDashboardPage.tsx` — PAGE layer — orchestrates the client dashboard view, displaying a personalized header and the client's inquiry history.
- `frontend/src/components/client/DashboardHeader.tsx` — COMPONENT layer — displays a welcome message for the authenticated client.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { clientName: string }
- `frontend/src/components/client/InquiryHistoryTable.tsx` — COMPONENT layer — fetches and displays a table of the client's past inquiries.

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#0A4837] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#B8942E] text-white font-semibold rounded-md px-6 py-3 transition-all duration-200
- Secondary CTA: border border-[#0A4837] text-[#0A4837] hover:bg-[#0A4837] hover:text-white font-semibold rounded-md px-6 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-lg shadow-sm border border-gray-100 p-5
- Section container: <section className="py-12 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-5xl font-bold text-white
- Body: text-[#333333] leading-relaxed
- Table header: bg-[#0A4837] text-white
- Table row: bg-white even:bg-gray-50

The Client Dashboard feature provides a dedicated portal for logged-in B2B clients to manage their profile and view their inquiry history. The `ClientDashboardPage.tsx` serves as the main entry point, orchestrating the display of client-specific information. It utilizes the `DashboardHeader.tsx` component to present a personalized welcome message and the `InquiryHistoryTable.tsx` component to list all past inquiries made by the client. The `InquiryHistoryTable.tsx` component fetches inquiry data from the backend using the generated `inquiryService` and displays it in a structured, professional table format. All monetary values, if any, will be displayed in Indian Rupees (₹) using the `en-IN` locale.

### ClientDashboardPage.tsx
This page is responsible for rendering the overall client dashboard layout. It will use the `useAuth()` hook to retrieve the current user's information and display a personalized welcome message via the `DashboardHeader` component. It will then render the `InquiryHistoryTable` component to show the client's past inquiries. The page will ensure a clean and structured layout, adhering to the defined design tokens.

### DashboardHeader.tsx
This component receives the `clientName` as a prop and displays a welcoming header for the client dashboard. It will use the brand accent color for the client's name to maintain a professional and elegant look. The header will be simple and focused, aligning with the overall tone of reliability and expertise.

### InquiryHistoryTable.tsx
This component is responsible for fetching and displaying the client's inquiry history in a tabular format. It will use the generated `inquiryService` to call the `getAllInquiries()` function, which in turn consumes the `GET /api/v1/admin/inquiries` endpoint from the `inquiry-management-backend` feature. Although the backend endpoint is `/admin/inquiries`, the frontend will filter the results to show only inquiries belonging to the current authenticated client. The table will display relevant inquiry details such as `submissionDate`, `productInterest`, `quantity`, and `status` from the `InquiryResponseDto` data shape. The table will be styled with the defined table header and row design tokens, ensuring a professional and readable presentation. Each row will display the `submissionDate` formatted as a localized date string for India, and any quantities as plain numbers. The `status` will be displayed as a capitalized string.


---

## Product Catalog

**Name:** `product-catalog`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/product.ts` — Generated from the backend API contract — TypeScript types and interfaces for products and product categories.
- `frontend/src/services/productService.ts` — SERVICE layer — provides asynchronous functions to interact with the product-management-backend API.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: getAllProducts(categoryId?: number): Promise<ProductDto[]>; getProductById(id: number): Promise<ProductDto>; getAllCategories(): Promise<ProductCategoryDto[]>
- `frontend/src/pages/ProductsPage.tsx` — PAGE component — displays the main product catalog with filtering capabilities.
- `frontend/src/pages/ProductDetailPage.tsx` — PAGE component — displays detailed information for a single product and an inquiry form.
- `frontend/src/components/product/ProductGrid.tsx` — COMPONENT — renders a responsive grid of ProductCard components.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { products: ProductDto[] }
- `frontend/src/components/product/ProductCard.tsx` — COMPONENT — displays a summary of a single product with a view details button and add to cart functionality.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { product: ProductDto }
- `frontend/src/components/product/ProductFilterSidebar.tsx` — COMPONENT — provides controls to filter products by category.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { categories: ProductCategoryDto[]; selectedCategory: ProductCategoryDto | null; onSelectCategory: (category: ProductCategoryDto | null) => void }
- `frontend/src/components/product/ProductImageGallery.tsx` — COMPONENT — displays a gallery of images for a single product.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { product: ProductDto }
- `frontend/src/components/product/ProductDetails.tsx` — COMPONENT — displays textual details of a product.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { product: ProductDto }
- `frontend/src/types/inquiry.ts` — Generated from the backend API contract — TypeScript types and interfaces for bulk order inquiries.
- `frontend/src/services/inquiryService.ts` — SERVICE layer — provides asynchronous functions to interact with the inquiry-management-backend API.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: createInquiry(inquiry: InquiryRequestDto): Promise<InquiryResponseDto>
- `frontend/src/components/inquiry/InquiryForm.tsx` — COMPONENT — form for B2B clients to submit a bulk order inquiry.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { productId: number; productName: string }

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#0A4837] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#B8942E] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-[#F5F5DC] (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#333333] leading-relaxed

The Product Catalog feature provides a comprehensive frontend experience for Fabricae PINE's product offerings, allowing B2B clients to browse products, view detailed information, and submit bulk order inquiries. This feature consists of TypeScript types, service functions for API interaction, and React components for UI rendering.

`frontend/src/types/product.ts` defines the `Product` and `ProductCategory` interfaces, mirroring the backend `ProductDto` and `ProductCategoryDto` data shapes from the `product-management-backend` feature. Similarly, `frontend/src/types/inquiry.ts` defines the `InquiryRequest` and `InquiryResponse` interfaces, corresponding to the `inquiry-management-backend`'s `InquiryRequestDto` and `InquiryResponseDto`.

`frontend/src/services/productService.ts` provides asynchronous functions to interact with the `product-management-backend`'s public API endpoints. It exposes `getAllProducts(categoryId?: Long): Promise<ProductDto[]>` to fetch a list of products, optionally filtered by category, and `getProductById(id: Long): Promise<ProductDto>` to retrieve details for a single product. It also exposes `getAllCategories(): Promise<ProductCategoryDto[]>` to fetch all available product categories. These functions will be consumed by the UI components to display product data.

`frontend/src/services/inquiryService.ts` provides the `createInquiry(inquiry: InquiryRequest): Promise<InquiryResponse>` function, which sends a POST request to the `inquiry-management-backend`'s `/api/v1/inquiries` endpoint to submit a new bulk order inquiry.

`frontend/src/pages/ProductsPage.tsx` serves as the main entry point for the product catalog. It fetches all products and categories using the generated service functions from `productService.ts`. It renders a `ProductFilterSidebar` component to allow users to filter products by category and a `ProductGrid` component to display the filtered products. The page layout will be structured with a hero section featuring a professional image and a compelling headline about Fabricae PINE's commitment to quality, followed by the filter sidebar and product grid.

`frontend/src/components/product/ProductFilterSidebar.tsx` fetches product categories using `productService.getAllCategories()` and renders a list of clickable categories. When a category is selected, it updates the filter state in `ProductsPage.tsx` to display only products belonging to that category.

`frontend/src/components/product/ProductGrid.tsx` receives a list of `ProductDto` objects as props. It iterates through this list and renders a `ProductCard` for each product. The grid will be responsive, displaying products in a visually appealing layout.

`frontend/src/components/product/ProductCard.tsx` displays a summary of a single `ProductDto`. It shows the product's `name`, `imageUrl`, and `price`. The card includes an "View Details" button that navigates to the `ProductDetailPage.tsx` for the specific product. It also includes an "Add to Cart" button that calls `useCart().addItem()` with the product details, allowing B2B clients to build a bulk order.

`frontend/src/pages/ProductDetailPage.tsx` displays detailed information for a single product. It retrieves the product `id` from the URL parameters and uses `productService.getProductById(id)` to fetch the product data. It renders `ProductImageGallery` to showcase product images, `ProductDetails` to display textual information, and an `InquiryForm` for bulk order inquiries. The page will have a clear, structured layout with a focus on high-resolution product imagery and detailed specifications.

`frontend/src/components/product/ProductImageGallery.tsx` receives a `ProductDto` and displays its `imageUrl` in a prominent gallery format. It can be extended to show multiple images if the `ProductDto` were to include an array of image URLs.

`frontend/src/components/product/ProductDetails.tsx` receives a `ProductDto` and displays its `name`, `description`, `price` (formatted in INR), and `minimumOrderQuantity`. It presents this information in a professional and easy-to-read format.

`frontend/src/components/inquiry/InquiryForm.tsx` is a form component that allows B2B clients to submit an inquiry for a specific product. It takes the `productId` as a prop. The form collects `clientName`, `clientEmail`, `clientPhone`, `companyName`, `quantity`, and `additionalDetails`. Upon submission, it calls `inquiryService.createInquiry()` with the collected data and the `productInterest` (which will be the product's name). It provides user feedback on submission success or failure using a toast notification (e.g., from `sonner`).


---

## Lookbook

**Name:** `lookbook`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/types/lookbook.ts` — Generated from the backend API contract — defines the TypeScript interface for a lookbook entry.
- `frontend/src/services/lookbookService.ts` — Generated from the backend API contract — provides functions for interacting with the lookbook API endpoints.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): methods: getAllLookbookEntries(): Promise<LookbookEntryDto[]>; getLookbookEntryById(id: number): Promise<LookbookEntryDto>
- `frontend/src/pages/LookbookPage.tsx` — PAGE layer — displays a grid of all lookbook entries, fetching data via the generated lookbook service.
- `frontend/src/pages/LookbookEntryDetailPage.tsx` — PAGE layer — displays the full content and images for a single lookbook entry, fetching data via the generated lookbook service.
- `frontend/src/components/lookbook/LookbookGrid.tsx` — COMPONENT layer — a responsive grid that displays lookbook entry cards.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { entries: LookbookEntryDto[] }
- `frontend/src/components/lookbook/LookbookCard.tsx` — COMPONENT layer — a card component to display a summary of a single lookbook entry.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { entry: LookbookEntryDto }

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#0A4837] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#b8952e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-xl shadow-md border border-gray-100 p-6
- Section container: <section className="py-16 px-4"><div className="max-w-7xl mx-auto">
- Hero h1: text-4xl md:text-6xl font-bold text-white
- Body: text-[#333333] leading-relaxed

This feature provides a lookbook section for Fabricae PINE, showcasing various collections and designs. It consists of TypeScript types, a service for API interaction, and React components for displaying the lookbook entries.

`frontend/src/types/lookbook.ts` defines the `LookbookEntry` interface, which mirrors the `LookbookEntryDto` from the `content-management-backend` feature. This ensures type safety across the frontend.

`frontend/src/services/lookbookService.ts` provides functions to interact with the backend API for lookbook entries. It exports `getAllLookbookEntries()` to fetch all entries and `getLookbookEntryById(id: Long)` to fetch a single entry. These functions will internally call the respective `GET /api/v1/lookbook` and `GET /api/v1/lookbook/{id}` endpoints from the `content-management-backend`.

`frontend/src/pages/LookbookPage.tsx` is the main page for the lookbook. It will fetch all lookbook entries using the generated service function (derived from `lookbookService.ts`) and render them using the `LookbookGrid` component. The page will have a hero section with a background image, a clear headline, and a subheadline conveying the professional tone of Fabricae PINE. The main content area will display the `LookbookGrid`.

`frontend/src/pages/LookbookEntryDetailPage.tsx` displays the detailed view of a single lookbook entry. It will extract the `id` from the URL parameters, fetch the specific lookbook entry using the generated service function (derived from `lookbookService.ts`), and render its title, content, and image. The page will include a prominent image of the lookbook entry and its detailed description.

`frontend/src/components/lookbook/LookbookGrid.tsx` is a reusable component that takes a list of `LookbookEntry` objects as props and renders them in a responsive grid layout. Each item in the grid will be a `LookbookCard` component.

`frontend/src/components/lookbook/LookbookCard.tsx` is a presentational component that displays a summary of a single `LookbookEntry`. It receives a `LookbookEntry` object as a prop and renders its `title`, `imageUrl`, and a link to its detail page. The card will have a clean, elegant design consistent with the overall visual direction, featuring a high-resolution image and the entry's title.

**Data Flow:**
1. `LookbookPage.tsx` calls the generated service function `getAllLookbookEntries()`.
2. `lookbookService.ts` makes an HTTP GET request to `/api/v1/lookbook` on the `content-management-backend`.
3. The `LookbookPage.tsx` receives a `List<LookbookEntryDto>` and passes it to `LookbookGrid.tsx`.
4. `LookbookGrid.tsx` iterates over the list and renders `LookbookCard.tsx` for each entry.
5. `LookbookCard.tsx` displays the summary and provides a link to `LookbookEntryDetailPage.tsx`.
6. `LookbookEntryDetailPage.tsx` extracts the `id` from the URL and calls the generated service function `getLookbookEntryById(id: Long)`.
7. `lookbookService.ts` makes an HTTP GET request to `/api/v1/lookbook/{id}` on the `content-management-backend`.
8. `LookbookEntryDetailPage.tsx` receives a `LookbookEntryDto` and displays its full details.

All monetary values, if any were to be displayed, would be formatted using `toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.

---

## Admin Portal

**Name:** `admin-portal`  
**Type:** FRONTEND  
**Change required:** true

**Files in this feature:**
- `frontend/src/components/AdminLayout.tsx` — COMPONENT layer — provides the main layout for the admin section, including a sidebar for navigation and routing protection.
- `frontend/src/pages/AdminDashboardPage.tsx` — PAGE layer — the landing page for the admin portal, displaying key statistics and navigation links.
- `frontend/src/pages/AdminProductsPage.tsx` — PAGE layer — admin page for managing the product catalog, integrating product table and forms.
- `frontend/src/pages/AdminInquiriesPage.tsx` — PAGE layer — admin page for viewing and managing all submitted client inquiries.
- `frontend/src/pages/AdminLookbookPage.tsx` — PAGE layer — admin page for creating, editing, and deleting lookbook entries.
- `frontend/src/components/admin/DashboardSummary.tsx` — COMPONENT layer — displays summary statistics on the admin dashboard.
- `frontend/src/components/product/admin/ProductTable.tsx` — COMPONENT layer — a data table for displaying and managing products in the admin panel.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { onEdit: (product: ProductDto) => void; onDelete: (product: ProductDto) => void }
- `frontend/src/components/product/admin/ProductForm.tsx` — COMPONENT layer — a form for creating and editing products, typically used within a dialog.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { product: ProductDto | null; onClose: () => void; onSuccess: () => void }
- `frontend/src/components/inquiry/admin/InquiryTable.tsx` — COMPONENT layer — a data table for displaying and managing client inquiries in the admin panel.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { onView: (inquiry: InquiryResponseDto) => void }
- `frontend/src/components/inquiry/admin/InquiryDetailView.tsx` — COMPONENT layer — a component to view the full details of a single client inquiry.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { inquiry: InquiryResponseDto; onClose: () => void; onStatusUpdate: () => void }
- `frontend/src/components/lookbook/admin/LookbookTable.tsx` — COMPONENT layer — a data table for displaying and managing lookbook entries in the admin panel.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { onEdit: (entry: LookbookEntryDto) => void; onDelete: (entry: LookbookEntryDto) => void }
- `frontend/src/components/lookbook/admin/LookbookForm.tsx` — COMPONENT layer — a form for creating and editing lookbook entries, typically used within a dialog.

RECONCILED CONTRACT (ground truth — implement EXACTLY this interface): { entry: LookbookEntryDto | null; onClose: () => void; onSuccess: () => void }

**Feature Instruction:**

## Design Tokens
- Navbar: bg-[#0A4837] text-white
- Sidebar: bg-[#0A4837] text-white
- Primary CTA: bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200
- Secondary CTA: bg-[#F5F5DC] hover:bg-[#E0E0C4] text-[#333333] font-semibold rounded-md px-6 py-2 transition-all duration-200
- Brand text accent: text-[#D4AF37]
- Section bg: bg-white (odd sections) / bg-gray-50 (even sections)
- Card: bg-white rounded-lg shadow-sm border border-gray-100 p-4
- Section container: <section className="py-8 px-4"><div className="max-w-7xl mx-auto"> (for admin pages, adjust padding as needed)
- Body: text-[#333333] leading-relaxed
- Table Header: bg-[#F5F5DC] text-[#333333] font-semibold

## Admin Portal Feature Instruction

This feature implements the administrative interface for Fabricae PINE, providing tools for managing products, client inquiries, and lookbook entries. It consists of a main layout component (`AdminLayout.tsx`) that provides consistent navigation and structure for all admin pages, and several page components (`AdminDashboardPage.tsx`, `AdminProductsPage.tsx`, `AdminInquiriesPage.tsx`, `AdminLookbookPage.tsx`) that display and manage specific data.

### AdminLayout.tsx
This component serves as the root layout for all authenticated admin routes. It renders a sidebar with navigation links to the dashboard, products, inquiries, and lookbook sections, and a main content area where the child routes are rendered. It utilizes the `ProtectedRoute` component from the `authentication` feature to ensure only authenticated users with appropriate roles can access the admin section. The navigation links should be:
- Dashboard: `/admin/dashboard`
- Products: `/admin/products`
- Inquiries: `/admin/inquiries`
- Lookbook: `/admin/lookbook`

### AdminDashboardPage.tsx
This page is the landing view for the admin portal. It displays a welcome message and summary statistics using the `DashboardSummary` component. The `DashboardSummary` component should display placeholder data for now, such as "Total Products: 150", "New Inquiries: 5", "Lookbook Entries: 20".

### AdminProductsPage.tsx
This page allows administrators to manage the product catalog. It integrates `ProductTable` to display a list of products and `ProductForm` for creating and editing product details. It also uses `DeleteConfirmationDialog` for confirming product deletions. All interactions with product data (fetching, creating, updating, deleting) are handled by calling the generated service functions from `product-catalog` feature (e.g., `getAllProducts`, `createProduct`, `updateProduct`, `deleteProduct`).

#### ProductTable.tsx
This component displays products in a tabular format. It fetches all products using the generated `getAllProducts()` service function. Each row should include product details like `name`, `price` (formatted in INR), `categoryName`, and `imageUrl`. It provides actions to edit and delete products. The edit action opens the `ProductForm` with the selected product's data, and the delete action triggers the `DeleteConfirmationDialog`.

#### ProductForm.tsx
This component provides a form for creating or editing a product. It takes an optional `ProductDto` prop for pre-filling the form when editing. The form fields should include `name`, `description`, `price`, `minimumOrderQuantity`, `imageUrl`, and `categoryId`. The `imageUrl` field should integrate with the `useMedia()` hook from the `gallery` foundation feature for image uploads. Upon submission, it calls either the generated `createProduct()` or `updateProduct()` service function based on whether an `id` is present in the product data. It should also fetch available product categories using `getAllCategories()` from `product-catalog` to populate a dropdown for `categoryId`.

### AdminInquiriesPage.tsx
This page is dedicated to viewing and managing client inquiries. It uses `InquiryTable` to list all inquiries and `InquiryDetailView` to show the full details of a selected inquiry. All inquiry data interactions are handled by calling the generated service functions from `inquiry-management-backend` feature (e.g., `getAllInquiries`, `getInquiryById`, `updateInquiryStatus`).

#### InquiryTable.tsx
This component displays client inquiries in a table. It fetches all inquiries using the generated `getAllInquiries()` service function. Each row should display `clientName`, `clientEmail`, `productInterest`, `submissionDate`, and `status`. It should allow viewing the full details of an inquiry, which opens `InquiryDetailView`.

#### InquiryDetailView.tsx
This component displays the comprehensive details of a single inquiry. It receives an `InquiryResponseDto` as a prop. It should display all fields from the `InquiryResponseDto` including `clientName`, `clientEmail`, `clientPhone`, `companyName`, `productInterest`, `quantity`, `additionalDetails`, `status`, and `submissionDate`. It should also provide an option to update the inquiry status using the generated `updateInquiryStatus()` service function.

### AdminLookbookPage.tsx
This page allows administrators to manage lookbook entries. It integrates `LookbookTable` to display a list of entries and `LookbookForm` for creating and editing entries. It also uses `DeleteConfirmationDialog` for confirming deletions. All interactions with lookbook data are handled by calling the generated service functions from `content-management-backend` feature (e.g., `getAllLookbookEntries`, `createLookbookEntry`, `updateLookbookEntry`, `deleteLookbookEntry`).

#### LookbookTable.tsx
This component displays lookbook entries in a table. It fetches all entries using the generated `getAllLookbookEntries()` service function. Each row should include `title`, `publicationDate`, and `imageUrl`. It provides actions to edit and delete entries. The edit action opens the `LookbookForm` with the selected entry's data, and the delete action triggers the `DeleteConfirmationDialog`.

#### LookbookForm.tsx
This component provides a form for creating or editing a lookbook entry. It takes an optional `LookbookEntryDto` prop for pre-filling the form when editing. The form fields should include `title`, `content`, `imageUrl`, and `publicationDate`. The `imageUrl` field should integrate with the `useMedia()` hook from the `gallery` foundation feature for image uploads. Upon submission, it calls either the generated `createLookbookEntry()` or `updateLookbookEntry()` service function based on whether an `id` is present in the entry data.

### DashboardSummary.tsx
This component displays summary cards with key metrics for the admin dashboard. It should display hardcoded placeholder values for now, such as "Total Products", "New Inquiries", and "Lookbook Entries", along with corresponding numerical values.

### DeleteConfirmationDialog.tsx
This component is a shared dialog for confirming deletion actions. It is imported from the `core-ui` feature and used in `AdminProductsPage.tsx` and `AdminLookbookPage.tsx` to confirm product and lookbook entry deletions respectively. It takes `isOpen`, `onClose`, `onConfirm`, `itemType`, and `itemName` as props.

---

## Infrastructure

**Name:** `infrastructure`  
**Type:** INFRA  
**Change required:** true

**Feature Instruction:**

_Not enriched (INFRA or skipped)._

---

