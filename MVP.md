Build a modern MVP web app called **Cat** — a simple blogging and community platform designed for IT students. The platform should feel clean, fast, intuitive, and modern, with responsive design for desktop and mobile.

## Core Concept

The platform has **three separate content feeds**, each serving a different purpose:

### 1. Cat Food

A casual, open posting feed where all students can create posts about anything relevant or interesting.

Each post includes:

- Header image
- Title
- Short tagline / summary
- Full body content
- Tags
- Likes
- Timestamp
- Comments section

### 2. Dog Posts

A more official and serious feed for:

- Important updates
- Announcements
- News
- PSAs
- Academic or community notices

Only authorized users can create posts here.

Each post includes:

- Header image
- Title
- Short tagline
- Full body content
- Tags
- Likes
- Timestamp

(No comments required for MVP unless easy to add)

### 3. Mouse Clicks

A link-sharing feed where any user can post external content such as:

- Articles
- Videos
- Blogs
- Tutorials
- GitHub repos

Each post includes:

- Title
- External URL
- Optional short description
- Tags
- Likes
- Timestamp
- Comments section

## Required MVP Features

### Feed System

Each of the three feeds should have:

- Dedicated page/view
- Fast switching between feeds
- Card-based post previews
- Clean list/grid layout
- Search-ready structure

### Sorting & Filtering

Users can sort posts by:

- Newest / oldest
- Most liked
- Tags

Users can filter by tag.

### Post Pages

Clicking a post opens a detailed post page showing full content and comments where applicable.

### Comments

For Cat Food and Mouse Clicks:

- Add comment
- View comment list
- Timestamp on comments

### Likes

Simple like/upvote button for all content types.

### UI / UX

Design should be:

- Minimalist
- Modern
- Smooth navigation
- Fast loading
- Easy to understand
- Student-friendly aesthetic

Use components such as:

- Top navigation bar
- Feed tabs
- Sidebar (optional)
- Tag pills
- Cards
- Clean typography
- Subtle animations

## Technical Requirements

Use **JSON files as local mock data** for posts, comments, users, and tags.

Structure data so it can later be easily replaced by API calls.

Example folders:

```text
/data
  cat-food.json
  dog-posts.json
  mouse-clicks.json
  comments.json
```

Use reusable components and clean architecture.

## Suggested Stack

Use any modern frontend stack, preferably:

- React / Next.js
- TypeScript
- Tailwind CSS
- Local state or lightweight store

## Bonus (Optional for MVP)

- Dark mode
- User roles (student/admin/moderator)
- Bookmark posts
- Infinite scroll
- Markdown editor for posts

## Final Goal

Deliver a polished MVP prototype demonstrating the full platform concept with realistic mock data, smooth navigation, scalable structure, and production-ready frontend patterns.

