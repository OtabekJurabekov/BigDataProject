<div align="center">

# 🚀 Classic Models Analytics Dashboard

**A comprehensive data analytics platform exploring naming conventions, spelling patterns, and textual characteristics within the Classic Models database**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [About](#-about-the-developer)

</div>

---

## 📊 Overview

This comprehensive analytics dashboard represents a deep exploration into the **naming conventions, spelling patterns, and textual characteristics** within the Classic Models database. The project goes far beyond simple data visualization—it's a systematic analysis of how names, words, and text patterns are structured across different entities.

Through **30+ sophisticated SQL queries**, we examine everything from the length distribution of country names to the complexity scores of customer names, from the vowel frequency in product names to the capitalization patterns across the database. Each analysis reveals unique insights about how textual data is organized, how naming conventions vary by geography and entity type, and how these patterns can inform database design, search optimization, and data quality initiatives.

The dashboard features **40+ interactive visualizations**, each accompanied by detailed descriptions, the underlying SQL code, and human-readable insights. This transparency allows users to understand not just what the data shows, but how the analysis was performed and what it means in practical terms.

Built with modern web technologies including **Next.js 14, TypeScript, and MySQL**, the entire system is containerized with Docker for easy deployment. The glassmorphic design, smooth animations, and responsive layout create an experience that feels both professional and engaging—proving that data analytics can be both powerful and beautiful.

---

## ✨ Features

### 🎨 Modern UI Design
- **Dark-first interface** with OLED-friendly colors
- **Glassmorphic design** with backdrop blur effects
- **Smooth animations** using Framer Motion
- **Floating cards** with depth and shadows
- **Gradient accents** and hover effects
- **Fully responsive** design for all screen sizes

### 📈 Advanced Analytics
- **30+ sophisticated SQL queries** analyzing naming conventions, patterns, and textual characteristics
- **40+ interactive visualizations** with beautiful, glassmorphic design
- **Real-time data updates** with smooth animations
- **Comprehensive insights** with detailed descriptions and SQL code
- **Cross-entity analysis** covering customers, products, employees, offices, and more

### 🚀 Advanced Features
- **Command Palette** (⌘K / Ctrl+K) for quick navigation
- **Collapsible sidebar** navigation
- **Smooth page transitions** with loading states
- **Error handling** with user-friendly messages
- **Keyboard shortcuts** for power users

### 🐳 Docker Integration
- **Docker Compose** setup for easy deployment
- **MySQL 8.0** container with automatic initialization
- **Next.js application** container with hot reload
- **Health checks** and automatic restarts
- **Production-ready** configuration

---

## 🎯 Key Statistics

<div align="center">

| Metric | Value |
|:------:|:-----:|
| **Analytical Queries** | 30+ |
| **Visualizations** | 40+ |
| **Data Points** | 10K+ |
| **Insights** | 100+ |

</div>

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Database**: [MySQL 8.0](https://www.mysql.com/)
- **API**: Next.js API Routes
- **Connection Pooling**: mysql2

### Infrastructure
- **Containerization**: [Docker](https://www.docker.com/) & Docker Compose
- **Development**: Hot reload with volume mounts
- **Production**: Optimized builds

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed
- Node.js 20+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OtabekJurabekov/BigDataProject.git
   cd BigDataProject
   ```

2. **Start the services:**
   ```bash
   docker-compose up -d
   ```

3. **Wait for MySQL to initialize** (this may take 1-2 minutes on first run)

4. **Access the dashboard:**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** (create `.env.local`):
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=classicuser
   DATABASE_PASSWORD=classicpass
   DATABASE_NAME=classicmodels
   ```

3. **Make sure MySQL is running** and the database is initialized

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
BigDataProject/
├── app/                      # Next.js app directory
│   ├── api/analytics/        # API endpoint for queries
│   ├── dashboard/            # Dashboard page
│   ├── customers/            # Customer analytics page
│   ├── products/             # Product analytics page
│   ├── employees/            # Employee analytics page
│   ├── offices/              # Office analytics page
│   ├── analytics/            # Advanced analytics page
│   ├── overview/             # Overview page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/               # React components
│   ├── Dashboard.tsx         # Main dashboard
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── MetricCard.tsx        # Metric display cards
│   ├── ChartCard.tsx         # Chart wrapper
│   ├── ChartWithDetails.tsx  # Chart with details component
│   ├── CommandPalette.tsx    # Command palette
│   └── Footer.tsx            # Footer component
├── lib/                      # Utilities
│   ├── db.ts                 # Database connection
│   ├── queries.ts            # SQL queries
│   └── queryMetadata.ts      # Query metadata
├── NeededResourcesToUse/     # Database resources
│   ├── classicmodels.sql     # Database schema
│   └── Images/              # Icon assets
├── public/                   # Static assets
├── docker-compose.yml        # Docker Compose config
├── Dockerfile                # Production Docker image
├── Dockerfile.dev            # Development Docker image
└── package.json              # Dependencies
```

---

## 📊 Analytical Queries

The dashboard includes **30+ analytical queries** focusing on:

### Country & Geographic Analysis
- Country name length distribution
- City name length characteristics
- Address length analysis

### Customer Analysis
- Customer name patterns and characteristics
- Customer name length distribution
- Customer name word count
- Customer name endings
- Contact name patterns

### Product Analysis
- Product name analysis (length, word count, patterns)
- Product name starting characters
- Product name patterns (Classic, Vintage, etc.)
- Product line analysis
- Vendor name analysis

### Employee Analysis
- Employee name patterns
- First and last name length analysis
- Job title patterns
- Email domain analysis

### Cross-Entity Analytics
- Textual characteristics across entities
- Naming convention comparisons
- Pattern frequency analysis

---

## 🎮 Available Commands

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Docker
```bash
docker-compose up -d        # Start services in background
docker-compose down         # Stop services
docker-compose logs -f      # View logs
docker-compose restart      # Restart services
docker-compose ps           # Check service status
```

---

## 🎨 Design Philosophy

This dashboard follows a modern analytics design philosophy:

1. **Data Is Alive**: Reactive, animated visualizations that respond to user interaction
2. **Spatial Depth**: Layered cards with shadows, gradients, and z-index
3. **Micro-interactions**: Smooth hover effects, transitions, and state changes
4. **Performance First**: Optimistic UI, progressive loading, skeleton states
5. **Accessibility**: Keyboard navigation, semantic HTML, proper ARIA labels

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 👨‍💻 About the Developer

<div align="center">

### Otabek Jurabekov

**PDP University (Group 24-303)** • **Back-End Developer** • **Competitive Programmer**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/otabek-jurabekov-290302225/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/otabek.jurabekov/)
[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/u/OtabekJurabekov/)
[![Codeforces](https://img.shields.io/badge/Codeforces-1F8ACB?style=for-the-badge&logo=codeforces&logoColor=white)](https://codeforces.com/profile/OtabekJurabekov)

</div>

### 🏆 Key Achievements

- 🥇 **IOI 2023 (Hungary) Participant** - International Olympiad in Informatics
- 💻 **1400+ Algorithmic Problems Solved** - Across multiple platforms
- 💼 **Back-End Developer at Asaxiy.uz** - Building scalable backend systems
- 🎯 **Expert-Level Competitive Programmer** - Deep expertise in algorithms and data structures

### 💼 Professional Experience

I'm a student at **PDP University (Group 24-303)** and a professional competitive programmer and mathematician. I actively combine strong theoretical foundations with real-world engineering, focusing on building scalable backend systems and solving complex algorithmic problems.

Currently, I work as a **Back-End Developer at Asaxiy.uz**, where I build and maintain high-load backend services, and as a **Laravel Back-End Developer at Revolution Group**, contributing to production-grade systems with real users and real constraints.

I aim to bridge competitive programming discipline with modern software engineering, building systems that are both mathematically sound and practically robust.

---

## 📝 License

This project is created for **educational purposes** as part of a Data Analytics course.

---

## 📌 Notes

- The database initialization may take **1-2 minutes** on first run
- Ensure ports **3000** and **3306** are available
- For production deployment, update environment variables and security settings
- The dashboard is optimized for modern browsers

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/OtabekJurabekov/BigDataProject/issues).

---

<div align="center">

**Made with ❤️ by [Otabek Jurabekov](https://www.linkedin.com/in/otabek-jurabekov-290302225/)**

⭐ Star this repo if you find it helpful!

</div>
