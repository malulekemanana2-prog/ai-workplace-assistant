# AI Workplace Assistant

Build a modern, responsive web application called "AI Workplace Productivity Assistant".

The application must be ONE integrated workplace productivity platform, not separate projects. It should help professionals save time by using AI to automate common workplace tasks.

TARGET USERS:

Professionals, employees, administrators, managers, and students entering the workplace who need help with everyday productivity tasks.

CORE FEATURES:

Create five AI-powered tools accessible from one dashboard:

1. SMART EMAIL GENERATOR

- Allow users to enter the purpose, recipient, key points, and desired tone.

- Provide tone options: Formal, Friendly, and Persuasive.

- Generate a professional workplace email.

- Allow the generated email to be edited.

- Include buttons to copy the result and clear the form.

2. MEETING NOTES SUMMARIZER

- Allow users to paste or enter long meeting notes.

- Generate a concise meeting summary.

- Extract Action Items, Decisions Made, and Deadlines.

- Present each category clearly in separate sections.

- Allow the generated output to be edited and copied.

3. AI TASK PLANNER

- Allow users to enter multiple tasks.

- Allow users to provide deadlines, estimated time, and priority where available.

- Use AI to organize and prioritize the tasks.

- Generate a practical daily or weekly schedule.

- Clearly distinguish high, medium, and low priority tasks.

- Allow the user to edit the generated plan.

4. AI RESEARCH ASSISTANT

- Allow users to enter a workplace-related research question or topic.

- Generate a structured explanation and summary.

- Provide key insights, practical recommendations, and suggested areas for further research.

- Clearly indicate that AI-generated information should be verified before being used for important professional or academic decisions.

- Do not present unsupported information as verified fact.

5. AI WORKPLACE CHATBOT

- Create an interactive workplace productivity assistant.

- Allow users to enter general workplace productivity questions and prompts.

- Provide helpful, professional responses.

- Encourage users to verify important information.

APPLICATION STRUCTURE:

Create a professional dashboard layout with:

- A left sidebar navigation on desktop.

- Responsive navigation for mobile devices.

- Dashboard/Home page.

- Separate pages or views for each AI tool.

- Clear page titles and descriptions.

- Consistent navigation throughout the application.

DASHBOARD:

The home dashboard should include:

- Welcome heading.

- Short explanation of what the AI Workplace Productivity Assistant does.

- Feature cards for all five AI tools.

- A quick-access area allowing users to select a productivity tool.

- A clean, professional SaaS-style appearance.

INPUT AND OUTPUT DESIGN:

Every AI feature must have:

- Clearly labelled input fields.

- Helpful placeholder text.

- A prominent action button.

- Loading state while AI processing occurs.

- Clearly separated AI-generated output.

- Editable output where appropriate.

- Copy-to-clipboard functionality where appropriate.

- Clear/reset functionality.

- Friendly error messages when required information is missing.

DESIGN:

Use a clean, modern, professional SaaS dashboard aesthetic.

Use strong visual hierarchy, cards, rounded components, subtle shadows, clear typography, and professional icons.

Keep the interface uncluttered and easy to understand.

Make the application fully responsive for desktop, tablet, and mobile screens.

Use consistent spacing, buttons, forms, and components throughout the application.

RESPONSIBLE AI:

Include a visible Responsible AI disclaimer in the application explaining that AI-generated outputs may contain errors and should be reviewed and verified before being used for important workplace, professional, academic, legal, financial, or other high-impact decisions.

The AI should not fabricate sources, facts, or information when it does not have sufficient context.

PROMPT ENGINEERING:

Design structured AI prompts for each feature using clear roles, tasks, context, constraints, and expected output formats.

The prompts should produce structured, useful, professional responses rather than generic answers.

FUNCTIONALITY:

Build the application so that the interface and interactions are functional and realistic.

Use appropriate sample/demo behaviour if an external AI API has not yet been connected.

Keep the code modular and maintainable.

IMPORTANT:

This is one integrated application containing multiple AI-powered workplace productivity features.

Do not create five unrelated applications.

Prioritize functionality, usability, professional UI/UX, responsible AI, and a polished presentation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9dbffd45-d059-44d0-b19c-c851042652ce).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
