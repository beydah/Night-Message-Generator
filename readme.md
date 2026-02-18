# Night Message Generator 🌙✨

> **A thoughtful, AI-powered message generator designed to strengthen connections.**  

![Project Banner](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
 
[![Netlify Status](https://api.netlify.com/api/v1/badges/e856fba4-e402-4e68-af44-bf85925cfcf5/deploy-status)](https://app.netlify.com/projects/night-message-generator/deploys)

## 📖 Overview

The **Night Message Generator** is a sophisticated web application that leverages Google's Gemini AI to craft personalized, emotionally resonant "Good Night" messages. Unlike generic message generators, this tool allows users to fine-tune the **tone, sincerity, and style** of the messages, making them feel authentic and human.

It is built with a focus on **modern web standards, security, and component-driven architecture**.

---

## 🚀 Key Features

*   **🎨 Deep Personalization:** Control message length, sincerity level (Formal to Intimate), and emotional tone.
*   **🌍 Multi-Language Support:** Instant generation in **Turkish, Azerbaijani, English, German, and Russian**.
*   **🎭 Humanizer Engine:** Adjustable "Misspelling" and "Slang" sliders to mimic natural, casual texting.
*   **🌓 Adaptive UI:** Seamless Dark/Light mode with a glassmorphic, mobile-responsive design.
*   **⚡ Real-Time Generation:** Powered by **Gemini 2.5 Flash** for sub-second responses.

---

## 🛠️ Engineering Highlights

This project demonstrates meaningful software engineering practices suitable for scalable, maintainable production environments.

### 🛡️ 1. Security First: Serverless Proxy
To prevent API key exposure in the frontend, a **Serverless Proxy** architecture was implemented using **Netlify Functions**.
*   **Problem:** Storing API keys in client-side code (`VITE_GEMINI_API_KEY`) exposes them to theft.
*   **Solution:** The frontend requests a local endpoint (`/api/generate`), which Netlify redirects to a secure server-side function (`netlify/functions/generate.js`). The API key never leaves the server environment.

### ⚛️ 2. Atomic Design Methodology
The UI codebase is structured using **Atomic Design** principles to ensure reusability and clarity:
*   **🧪 Atoms:** Basic building blocks (buttons, inputs).
*   **🧬 Molecules:** Groups of atoms (e.g., `status_message.js`).
*   **🤖 Organisms:** Complex UI sections (e.g., `side_menu.js`, `card_carousel.js`).
*   **📄 Orchestrator:** `ui_manager.js` manages state and coordination.

### 📏 3. Strict Coding Conventions
Maintainability is enforcing through strict naming conventions:
*   **Files:** `snake_case.js` (e.g., `gemini_service.js`)
*   **Functions:** `F_Pascal_Case` (e.g., `F_Generate_Messages`)
*   **Classes:** `C_Pascal_Case` (e.g., `C_State_Manager`)
*   **Variables:** `snake_case` (local), `Snake_Case` (global constants)

---

## 💻 Tech Stack

| Category       | Technology                                                                   | Usage                                        |
| :------------- | :--------------------------------------------------------------------------- | :------------------------------------------- |
| **Frontend**   | ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)           | Core logic and DOM manipulation (Vanilla JS) |
| **Styling**    | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)         | Utility-first responsive styling             |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)                        | Blazing fast development and bundling        |
| **AI Model**   | ![Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2)       | Generative AI Engine                         |
| **Backend**    | ![Netlify](https://img.shields.io/badge/Netlify_Functions-Serverless-00C7B7) | Secure API Proxy                             |
| **Icons**      | ![Lucide](https://img.shields.io/badge/Lucide-Icons-orange)                  | Lightweight, beautiful SVG icons             |

---

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/beydah/night-message-generator.git
    cd night-message-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    # Only for local development if not using Netlify Dev
    VITE_GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run Locally:**
    ```bash
    npm run dev
    ```

5.  **Build for Production:**
    ```bash
    npm run build
    ```

---

## 👨‍💻 Developer

**Beydah Saglam**  
*Software Engineer*  
[Website](https://beydahsaglam.com) | [GitHub](https://github.com/beydah) | [LinkedIn](https://linkedin.com/in/beydah)

---

*Verified Production Build: February 2026* ✅
