# ☁️ Cloud-Native Todo & Notes Application

A modern, scalable, and fully containerized Todo and Notes application built with cloud-native principles.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Deployment to Cloud](#-deployment-to-cloud)
- [Demo & Documentation](#-demo--documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Project Overview

This project demonstrates a complete **Cloud-Native** web application that includes containerization, orchestration, and deployment automation. The application allows users to manage their daily tasks (Todo) and personal notes efficiently.

---

## ✨ Key Features

- Full **CRUD Operations** for Todo List and Notes
- Fully responsive and modern UI built with Tailwind CSS
- Real-time data management powered by MongoDB
- Containerized using **Docker** for consistent environments
- Orchestrated with **Kubernetes** for scalability and resilience
- Automated CI/CD pipeline using **GitHub Actions**

---

## 🛠️ Technology Stack

| Layer          | Technology                                           |
|----------------|------------------------------------------------------|
| Frontend       | Next.js 14 (App Router) + TypeScript + Tailwind CSS  |
| Backend        | Node.js + Express.js                                 |
| Database       | MongoDB + Mongoose                                   |
| Container      | Docker + Docker Compose                              |
| Orchestration  | Kubernetes (Minikube / GKE)                          |
| CI/CD          | GitHub Actions                                       |
| Libraries      | Axios, Lucide React                                  |

---

## 🏗️ Architecture

```
Client (Browser)
      │
      ▼
Frontend (Next.js) ──── Port 3000
      │
      ▼
Backend API (Express) ── Port 5000
      │
      ▼
MongoDB Database
```

- Containerized with **Docker** (multi-container via Docker Compose)
- Orchestrated using **Kubernetes** Deployments & Services
- Automated build & deploy via **GitHub Actions**

---

## 📋 Prerequisites

Make sure you have the following installed before getting started:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (v20+)
- [Git](https://git-scm.com/)
- [Minikube](https://minikube.sigs.k8s.io/) + [kubectl](https://kubernetes.io/docs/tasks/tools/) _(for Kubernetes demo)_
- Docker Hub account _(for pushing images)_

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todo-cloud-app.git
cd todo-cloud-app
```

### 2. Run with Docker Compose _(Recommended for Development)_

```bash
docker compose up --build
```

The application will be available at:

| Service       | URL                      |
|---------------|--------------------------|
| Frontend      | http://localhost:3000    |
| Backend API   | http://localhost:5000    |

### 3. Run with Kubernetes _(Production-like)_

```bash
# Start Minikube
minikube start

# Build Docker images
docker build -t hasbi/todo-backend:latest ./backend
docker build -t hasbi/todo-frontend:latest ./frontend

# Load images into Minikube
minikube image load hasbi/todo-backend:latest
minikube image load hasbi/todo-frontend:latest

# Apply Kubernetes manifests
kubectl apply -f k8s/

# Open the application
minikube service frontend-service
```

---

## 📁 Project Structure

```
todo-cloud-app/
├── backend/              # Node.js + Express REST API
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── frontend/             # Next.js Application
│   ├── app/
│   ├── Dockerfile
│   └── package.json
├── k8s/                  # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── mongo-deployment.yaml
├── .github/
│   └── workflows/        # GitHub Actions CI/CD pipeline
├── docker-compose.yml    # Local multi-container setup
└── README.md
```

---

## 🔄 CI/CD Pipeline

This project uses **GitHub Actions** to automate the following steps:

1. **Build** – Automatically builds Docker images on every push
2. **Push** – Pushes images to Docker Hub
3. **Deploy** – Triggers automated deployment to Kubernetes

The pipeline is defined in `.github/workflows/`.

---

## ☁️ Deployment to Cloud

This application is ready to be deployed to major Kubernetes cloud providers:

- **Google Kubernetes Engine (GKE Autopilot)**
- **DigitalOcean Kubernetes (DOKS)**
- **Amazon EKS**

---

## 🎥 Demo & Documentation

| Resource            | Link                          |
|---------------------|-------------------------------|
| Live Demo           | _Coming soon_                 |
| Video Presentation  | [YouTube Link](#)             |
| Hands-on Module     | _Coming soon_                 |

---

## 🤝 Contributing

Contributions are welcome! If you plan to make significant changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).