# TrizenAI Full-Stack Internship Challenge - Project Analysis

## Extracted Requirements Summary

### Core Application
A full-stack photo-sharing application for photography/event teams with three user roles:

---

## User Roles & Permissions

### 1. Admin/Lead
- Register/Login
- Create events
- Add team members
- View all team-uploaded photos
- Select photos for sharing
- Create and publish galleries
- Generate shareable links
- Set PIN for galleries

### 2. Team Member
- Login
- View assigned events
- Upload photos
- View their uploaded photos
- **Cannot** publish galleries
- **Cannot** manage other users' photos

### 3. Customer
- No account required
- Receive Gallery Link + PIN
- Open link
- Enter PIN
- View published photos
- Browse gallery

---

## Workflow Sequence

| Step | Actor | Action |
|------|-------|--------|
| 1 | Admin | Creates Event and adds Team Members |
| 2 | Team Member | Uploads event photos to platform |
| 3 | Admin | Reviews all uploaded photos and selects for gallery |
| 4 | Admin | Publishes Gallery and generates Link + PIN |
| 5 | Customer | Accesses Link, enters PIN, views published photos |

---

## Technical Requirements

### Photo Storage
- Use cloud object storage (AWS S3, Azure Blob, GCS, or similar)
- **Do not** store image files directly in database
- Store only metadata in database

### Photo Metadata Fields
- Photo ID
- Event ID
- Uploaded By
- Filename
- Storage Location
- File Size
- Created At

### Features
- Multiple photo uploads supported
- Admin can select photos and publish as gallery

---

## Security Requirements
- Authentication & Role-based authorization
- Secure photo uploads
- Input validation
- Error handling
- Protect against:
  - Unauthorized event access
  - Team Member attempting to publish
  - Failed photo uploads
  - Incorrect PIN attempts
  - Access to unpublished photos

---

## Technology Stack
- **No mandatory stack** - choose your preference
- Options: React, Next.js, Node.js, Python, Java, PostgreSQL, MongoDB, AWS, GCP, Docker, etc.

---

## Deliverables

### Required for Submission
1. ✅ Live application URL
2. ✅ Source code repository
3. ✅ Demo Admin credentials
4. ✅ Demo Team Member credentials
5. ✅ Demo Gallery URL & PIN
6. ✅ README.md with:
   - Project overview
   - Technology stack
   - System Architecture
   - Database design
   - Local setup instructions
   - Environment variables
   - Deployment steps
   - Known limitations

### Testing Requirements
- Authentication and Authorization
- Photo access controls
- Gallery publishing workflows
- PIN-protected access verification

### Bonus Features (Optional)
- Image thumbnails/resizing
- Pagination/infinite scrolling
- Photo search/filtering
- Bulk upload
- Photo downloading
- Gallery expiration
- CDN usage
- CI/CD pipelines

---

## Evaluation Criteria
- **Functionality**: Core features work end-to-end
- **Frontend & UX**: Clean, responsive, intuitive
- **Backend & API**: Clear structure, validation, error handling
- **Database & Architecture**: Appropriate data models, relationships, scalability
- **Security & Authorization**: Protect data, photos, APIs, authentication
- **Cloud & Deployment**: Real-world deployment considerations
- **Testing**: Cover important functionality
- **Code Quality**: Organized, maintainable, documented


photo-sharing-platform/
│
├── server/                          # Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── User.js                  # Admin/Team Member schema
│   │   ├── Event.js                 # Event schema
│   │   ├── Photo.js                 # Photo metadata schema
│   │   └── Gallery.js               # Published gallery schema
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── photoController.js
│   │   └── galleryController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── photoRoutes.js
│   │   └── galleryRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verify + role check
│   │   └── errorMiddleware.js       # Centralized error handler
│   ├── utils/
│   │   └── s3Upload.js              # AWS S3 / Cloudinary helper
│   ├── .env                         # Secrets (NOT committed)
│   ├── .gitignore
│   ├── server.js                    # Entry point
│   └── package.json
│
├── client/                          # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── member/
│   │   │   └── gallery/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── MemberDashboard.jsx
│   │   │   └── PublicGallery.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore

Roadmap — Photo Sharing Platform (MERN + Cloud Storage)

Phase 0 — Planning & Setup

Tech stack decide karo (recommend: React + Node/Express + MongoDB + AWS S3/Cloudinary for storage, JWT auth)
Folder structure: client/ (React) aur server/ (Express) — jaisa tumne FreelanceChain mein kiya tha
GitHub repo init, .env + .gitignore setup (secrets kabhi commit nahi karna — requirement hai)

Phase 1 — Backend Foundation

Express server setup, MongoDB connection
Mongoose schemas: User (role: admin/member), Event, Photo (metadata only — ID, eventId, uploadedBy, filename, storageLocation, fileSize, createdAt), Gallery (selected photos, PIN, link)
Basic error handling middleware

Phase 2 — Authentication & Authorization

Register/Login (JWT-based)
Role-based middleware (admin vs team member)
Test cases: unauthorized access, wrong role trying restricted action

Phase 3 — Event & Team Management (Admin)

Create event API
Add team members to event API
View assigned events (member side)

Phase 4 — Photo Upload & Storage

Team member upload endpoint
Integrate S3/Cloudinary (actual files go here, only metadata in DB)
Multiple file upload support
Handle failed upload scenario

Phase 5 — Gallery Management (Admin)

Admin views all uploaded photos for an event
Select photos → publish gallery
Generate shareable link + PIN (hash the PIN before storing!)

Phase 6 — Customer-Facing Gallery

No-login public route: enter link → enter PIN → view photos
Handle wrong PIN, unpublished gallery access attempts

Phase 7 — Frontend (React)

Auth pages (login/register)
Admin dashboard (events, team, photo review, publish)
Team member dashboard (upload, view own photos)
Public gallery viewer page
Responsive UI

Phase 8 — Security Hardening & Validation

Input validation everywhere (backend)
Rate limiting on PIN attempts (good practice, not mandatory but shows quality)
Access control checks (event isolation — user can't see other events' data)

Phase 9 — Testing

Basic tests: auth flow, photo access control, gallery publish workflow, PIN verification

Phase 10 — Deployment

Backend deploy (Render/Railway/EC2), frontend (Vercel/Netlify), DB (Atlas), storage (S3)
Environment variables setup on hosting

Phase 11 — Documentation & Submission

README (overview, architecture, DB design, setup, deployment, limitations)
Simple architecture diagram
Demo credentials + gallery link/PIN
Final checklist against submission deliverables
