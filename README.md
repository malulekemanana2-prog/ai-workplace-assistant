# Sesi — AI Workplace Productivity Assistant

## Project Overview

Sesi is an integrated AI-powered workplace productivity platform designed to help professionals, employees, administrators, managers, and students save time when completing everyday workplace tasks.

The idea behind the project was to explore how AI can be applied to practical workplace problems rather than simply using AI as a general chatbot.

The platform brings five AI-powered productivity tools together in one application:

* **AI Chat** — provides general workplace productivity assistance.
* **AI Research Assistant** — creates structured research briefs and practical insights.
* **AI Task Planner** — organises and prioritises workplace tasks.
* **Meeting Assistant** — structures meeting information into summaries, decisions, action items and deadlines.
* **Smart Email Generator** — creates professional workplace emails based on the user's requirements.

## The Problem

Employees spend a significant amount of time on repetitive tasks such as writing emails, organising tasks, researching information and preparing meeting documentation.

These tasks are necessary, but they can take time away from more valuable work.

Sesi was created to demonstrate how AI can assist with these activities through one accessible productivity platform.

## Key Features

### 💬 AI Workplace Chat

A general-purpose workplace assistant that can answer productivity-related questions and help users think through everyday workplace tasks.

### 🔎 AI Research Assistant

Generates structured research responses containing explanations, key insights, recommendations and areas for further research.

### 📋 AI Task Planner

Helps users organise tasks and create practical work plans while distinguishing between high, medium and low-priority tasks.

### 📝 Meeting Assistant

Transforms meeting information into structured outputs including:

* Meeting summaries
* Decisions made
* Action items
* Deadlines

### 📧 Smart Email Generator

Generates professional workplace emails based on:

* Purpose
* Recipient
* Key points
* Desired tone

Available tones include Formal, Friendly and Persuasive.

## AI Implementation

The five features use live AI functionality rather than simulated responses.

Each tool sends the user's request through the application's `runAssistant` server function. The function creates a structured prompt for the selected task and sends it to the AI model before returning the generated response to the user.

The application was tested end-to-end and all five AI tools successfully generated responses using the live AI service.

**Testing result: 5/5 AI features successfully working.**

## Prompt Engineering

Structured prompts were used to guide the AI toward useful and relevant workplace outputs.

The prompts were designed around:

* The role of the AI
* The task being performed
* Relevant user context
* Output requirements
* Appropriate constraints
* The desired structure and tone

For example, the Email Generator does not simply ask the AI to "write an email." It provides the information needed to produce a professional email appropriate to the user's purpose and selected tone.

This helped demonstrate how prompt quality can influence the usefulness and consistency of AI-generated outputs.

## Responsible AI

Sesi is designed to assist users rather than replace human judgement.

Users are encouraged to:

* Review AI-generated information before using it.
* Verify important facts and information.
* Avoid entering confidential or sensitive workplace information.
* Avoid relying on AI alone for important professional, academic, legal or financial decisions.
* Remember that AI-generated information can contain errors or bias.

AI outputs should therefore be treated as assistance that requires appropriate human review.

## Testing

Each feature was tested using realistic workplace scenarios.

| Feature     | Result    |
| ----------- | --------- |
| AI Chat     | ✅ Working |
| AI Research | ✅ Working |
| AI Planner  | ✅ Working |
| AI Meetings | ✅ Working |
| AI Email    | ✅ Working |

The testing confirmed that all five features successfully connected to the live AI service and generated responses.

## Technologies Used

* React
* TypeScript
* TanStack Start
* Tailwind CSS
* AI API / AI gateway
* Lovable
* GitHub

## Development Approach

Lovable was used to assist with the development of the application, while GitHub was used for version control and project storage.

The project was developed as **one integrated application** rather than five separate applications. All five AI tools share the same overall platform and navigation structure.

## Future Improvements

If development continued, possible improvements could include:

* User accounts and saved conversations
* Document upload and analysis
* Calendar integration
* Meeting transcription
* Additional workplace templates
* Personalised AI assistance
* Productivity analytics

## Live Application

**Sesi:**
https://9dbffd45-d059-44d0-b19c-c851042652ce.lovableproject.com

## Project Purpose

This project was created as part of the **CAPACITI AI Skills Programme** to demonstrate practical AI implementation, prompt engineering, problem-solving, responsible AI use and modern UI/UX design.

> **The goal is not to replace the employee with AI, but to give the employee a smarter assistant.**
