🇸🇦 Absher Smart Assistant

AI-Powered Government Services Assistant

🧠 Overview

Absher Smart Assistant is an AI-powered multilingual assistant designed to help users interact with Saudi government services through a natural chat interface.
It understands user requests, provides guidance, and can automatically prepare and submit service requests.

Built for Vision 2030 digital transformation goals.

✨ Key Features
🤖 Smart Chat Assistant

Natural conversation with users

Understands service-related requests

Distinguishes between:

Normal chat

Government service requests (intents)

Unclear messages (fallback)

🧩 Intelligent Intent Detection

The assistant automatically detects when the user wants to:

Create a request

Update a request

Check request status

Cancel a request

Book an appointment

Report a lost ID

Request a general service

When an intent is detected, it is routed to a Request Processing workflow.

⚙️ Automated Request Processing

Generates a unique ticket ID (e.g. TCK-2025-12345)

Infers service name

Assigns processing status

Estimates processing time

Returns a structured JSON response

🌍 Multilingual Support

Currently supported:

Arabic (default)

English

Planned (Coming Soon):

Urdu

Tagalog

Language features:

Auto-detect language

Reply in the same language

Full RTL / LTR support

Language switcher in UI

🔁 Fallback Handling

If the assistant cannot understand the request, it safely responds with:

Arabic:
"سيتم التواصل معك مستقبلاً من قبل موظف."

English:
"A staff member will contact you soon."

This ensures no broken or awkward responses.

🏗️ Architecture
Frontend (Angular)

Standalone Components

Signal-based state management

Clean Chat UI

RTL / LTR auto-switching

Translation using JSON files

Dashboard, Chat, Info & Landing pages

Backend (n8n + AI)

Chat Workflow

Detects intent or chat

Returns structured JSON only

Request Processor Workflow

Generates tickets

Prepares request data

Returns final response

AI Model

Groq LLaMA-3

Strict JSON output enforcement

No hallucinated text outside JSON

🔀 Application Flow

User sends a message

AI Agent analyzes the message

Response type:

chat → reply directly

intent → forward to request processor

Request processor returns final response

UI displays the result

📁 Project Structure
src/
│
├── app/
│   ├── pages/
│   │   ├── landing/
│   │   ├── dashboard/
│   │   ├── chat/
│   │   └── info/
│   │
│   ├── services/
│   │   └── translation.service.ts
│   │
│   ├── app.routes.ts
│   └── app.ts
│
├── assets/
│   └── i18n/
│       ├── ar.json
│       └── en.json
│
└── styles.scss

🌐 Internationalization (i18n)

JSON-based translations

Dynamic language switching

Automatic dir="rtl" or dir="ltr"

Default language: Arabic

🧪 Error Handling

Network errors handled gracefully

AI fallback responses enforced

No empty or broken UI states

🎯 Why This Solution?

Fast and intuitive for users

Scalable for future services

Multilingual by design

Safe fallback behavior

Suitable for real government platforms