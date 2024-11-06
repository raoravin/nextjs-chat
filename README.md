# Multi-Language Real-Time Chat Application with Chrome’s Built-in AI

This is a real-time, multilingual chat application built with **Next.js** and **Firebase**, using **Google Chrome’s built-in AI APIs** to provide dynamic, cross-language messaging powered by **Gemini Nano**. The app automatically translates messages to the recipient’s preferred language, enhancing global communication. This project is part of the **Google Chrome Built-in AI Challenge**.

## Table of Contents
- [Features](#features)
- [Project Demo](#project-demo)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Google Chrome Built-in AI APIs](#google-chrome-built-in-ai-apis)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-Time Messaging**: Instant communication using Firebase Firestore.
- **Multi-Language Translation**: Messages automatically translate into the recipient’s preferred language using Chrome’s Translation API with Gemini Nano.
- **User Authentication**: Google authentication to personalize chat sessions.
- **Contextual Prompt API**: Suggested responses based on chat context.
- **Summarization API**: View summaries of conversations for a quick overview.
- **Rewrite API**: Alternative phrasing suggestions to clarify messages.

---

## Project Demo

- **[Video Demonstration](#)**: A 3-minute YouTube demo of the application in action.

---

## Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Firebase Firestore (real-time data)
- **Authentication**: Firebase Authentication with Google Sign-In
- **AI APIs**: Google Chrome’s Gemini Nano model (Translation API, Prompt API, Summarization API, Rewrite API)

---

## Folder Structure

```plaintext
multi-lang-chat-app/
├── public/
│   └── favicon.ico                  # App favicon
├── src/
│   ├── app/
│   │   ├── layout.js                # Layout file for shared components
│   │   ├── globals.css              # Global styles
│   │   ├── page.js                  # Home page with Google Sign-In
│   │   └── chat/
│   │       ├── page.js              # Main chat page
│   │       └── ChatBox.js           # Main chat component handling translation
│   ├── components/
│   │   ├── Message.js               # Component for displaying each message
│   │   ├── MessageInput.js          # Input field for sending messages
│   │   └── Navbar.js                # Navigation bar with sign-in/sign-out
│   ├── contexts/
│   │   └── AuthContext.js           # Authentication state management
│   ├── firebase/
│   │   └── firebase.js              # Firebase initialization
│   ├── hooks/
│   │   ├── useAuth.js               # Custom hook for auth state
│   │   └── useTranslate.js          # Custom hook for translation with Translation API
└── package.json                     # Project dependencies
