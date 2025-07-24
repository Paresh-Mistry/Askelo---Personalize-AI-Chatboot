# Askelo – AI Chatbot 

> Cointab Assignment 

**Askelo** is a personalized AI-powered chatbot built with **Next.js**, **TinyLLaMA via Ollama**, and **Radix UI**. It supports **multi-tab conversations**, allowing users to manage, rename, and delete chats. This project was developed for the **Cointab assignment**.

---
## ✨ Features

- 🧠 Chat with a local LLM using Ollama
- ➕ **Create new chat tabs** dynamically
- ✏️ **Rename** existing chat tabs for personalization
- ❌ **Delete** conversations individually
- 💾 **Store messages** per tab (in-memory context state)
- 🔄 Realtime **AI response** with loader animation
- 💬 Sleek chat interface using Radix UI components
- 🌗 Fully responsive with light/dark mode support

---

## 📹 Demo Video

> Watch the working demo of the project:

### ▶️ Click to Watch - [Assignment Video](https://drive.google.com/file/d/1n5r3gh1eFuI4vo67AKsfxfkYRUNALonQ/view?usp=drive_link)
 
 ---

## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge)
![TinyLLaMA](https://img.shields.io/badge/Genma-AI-blue?style=for-the-badge)

---




## ⚙️ Setup & Run

### 1. Ollama Installation 

> Download Ollama - https://ollama.com 


```bash
ollama pull genma:2b
ollama run genma:2b
```


### 2. Clone the Repo

```bash
git clone https://github.com/yourname/askelo-chatbot.git
```


```bash
cd askelo-chatbot
bun install 
bun dev
```
