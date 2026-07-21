# Veil

> **Let your AI break the ice.**

Veil is an AI-assisted dating experience that helps people explore potential compatibility before deciding whether they want to meet in person.

Instead of immediately connecting two matched users, Veil creates profile-based AI personas from the preferences users choose to share. Their Veils can participate in a simulated virtual first date, after which users receive an exploratory compatibility report and a Requirement Match Signal.

The goal is simple:

**Help people decide whether a conversation may be worth having before they meet in real life.**

---

## The Idea

Traditional dating apps primarily match people using photos, profiles, and preferences.

Veil introduces another layer:

**What if your AI persona could break the ice first?**

Users complete a questionnaire covering:

- Relationship goals
- Interests
- Personal values
- Lifestyle preferences
- Communication style
- Social energy
- Ideal dates
- Favorite conversation topics

Veil uses this information to create a profile-based persona and compare users through an explainable matching algorithm.

When two people match, their Veil personas can participate in a simulated virtual date.

Afterward, the users receive a report highlighting:

- Shared interests
- Areas of alignment
- Differences worth exploring
- Conversation starters
- Topics worth discussing on a real first date

The humans always make the final decision.

---

## How Veil Works

### 1. Create Your Veil

The user completes an interactive dating questionnaire about their personality, preferences, values, lifestyle, and relationship goals.

### 2. Generate a Profile-Based Persona

Veil can use the OpenAI API to transform questionnaire responses into a structured AI persona.

The persona is designed to:

- Represent only user-provided information
- Avoid inventing personal history
- Avoid making romantic decisions for the user
- Clearly remain a simulation rather than pretending to be the actual person

A built-in Demo Persona is available when live API generation is unavailable.

### 3. Discover a Match

Veil compares two profiles using an explainable weighted matching algorithm.

### 4. Schedule a Virtual Date

Two Veil personas participate in a simulated first-date conversation based on the information both users chose to provide.

### 5. Receive a Virtual Date Report

After the conversation, Veil presents:

- Areas of alignment
- Differences worth discussing
- Conversation starters
- Topics worth exploring in person

### 6. View the Requirement Match Signal

Veil calculates an exploratory percentage using user-stated preferences.

This is not a scientific compatibility prediction.

### 7. Lift the Veil

After reviewing the report, the user decides whether they want to meet the person behind the Veil.

The product vision is that identities are revealed only when both people independently choose to connect.

---

## Matching Algorithm

Veil uses an **explainable weighted similarity algorithm**.

For multi-select preferences, the application uses **Jaccard similarity**, which measures how much two sets of preferences overlap.

The match signal considers:

- Relationship goals — 30%
- Personal values — 25%
- Interests — 15%
- Lifestyle — 10%
- Communication style — 10%
- Ideal date preferences — 10%

Each category produces a similarity score between 0 and 1.

The final score is calculated as a weighted combination of those category scores and converted into a percentage.

The application also shows a category-level breakdown so users can understand why a particular Requirement Match Signal was produced.

The score is designed to be transparent and explainable.

It is **not** a machine-learning prediction and does not claim to predict relationship success.

---

## Requirement Match Signal

The Requirement Match Signal is an exploratory indicator based on the preferences users provide.

For example, Veil may calculate alignment across:

- Relationship goals
- Values
- Interests
- Lifestyle
- Communication
- Date preferences

The final percentage represents preference overlap and alignment.

It should not be interpreted as:

- A probability that a relationship will succeed
- A scientific compatibility score
- A prediction of real-world chemistry

Real chemistry can only be discovered by the people themselves.

---

## Demo Experience

This hackathon prototype includes a complete Demo Mode so the full Veil experience can be explored without requiring two real users or paid API access.

The demo includes:

- Interactive onboarding
- Dating questionnaire
- Profile-based persona
- Explainable matching algorithm
- Requirement Match Signal
- Realistic demo profiles
- Virtual-date scheduling
- Simulated avatar conversation
- Virtual Date Report notification
- Compatibility exploration report
- Mutual-interest reveal experience

If live AI persona generation is unavailable, users can select:

**Continue with Demo Persona**

This keeps the complete product experience testable and reliable.

---

## AI-Assisted Architecture

Veil is designed as an AI-assisted product rather than an automated relationship-decision system.

The architecture includes:

```text
Questionnaire
    ↓
Profile-Based Persona
    ↓
Weighted Similarity Matching
    ↓
Requirement Match Signal
    ↓
Virtual Date Simulation
    ↓
Compatibility Exploration Report
    ↓
Human Decision
```

The OpenAI integration is server-side so API credentials are never exposed to the browser.

The application includes a fallback Demo Mode when live API access is unavailable.

---

## OpenAI Integration

Veil includes server-side OpenAI integration for transforming questionnaire responses into a structured Veil persona.

The integration is designed around several constraints:

- Use user-provided information as the source of truth
- Avoid inventing personal history
- Avoid making commitments for the user
- Avoid making romantic decisions on behalf of the user
- Keep API credentials private
- Provide graceful fallback behavior

The prototype architecture can be extended further to support fully generated multi-persona virtual dates and dynamic post-date reports.

---

## How We Used Codex

Codex was a core development tool throughout the creation of Veil.

We used Codex to help:

- Initialize and structure the Next.js application
- Build the multi-step onboarding experience
- Create reusable React components
- Implement the complete demo journey
- Build the persona-generation integration
- Create fallback and error-handling flows
- Debug TypeScript and build issues
- Improve the overall user experience

We also directly worked on and refined:

- The Veil product concept
- The virtual-date workflow
- The Requirement Match Signal
- The weighted matching algorithm
- Jaccard similarity logic
- The final mutual-reveal experience
- Avatar integration
- Product copy and safety positioning

The development process combined human product decisions with Codex-assisted implementation.

---

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Codex
- Node.js
- Git
- GitHub

---

## Running Veil Locally

### Prerequisites

Install Node.js and npm.

### 1. Clone the repository

```bash
git clone https://github.com/Pravin-26/veil-ai.git
cd veil-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in Demo Mode

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The full demo can be explored without a live OpenAI API connection.

### 4. Optional: Enable Live OpenAI Persona Generation

Create a `.env.local` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
```

Then restart:

```bash
npm run dev
```

Never commit `.env.local` or API credentials to GitHub.

---

## Product Principles

### Human choice comes first

AI should assist people in exploring potential connections, not make romantic decisions for them.

### Explainability matters

The Requirement Match Signal is calculated using transparent preference-matching logic instead of presenting an unexplained black-box score.

### AI personas are simulations

A Veil persona is based on information the user chooses to provide. It is not the actual person.

### Compatibility is not certainty

The match signal does not predict relationship success or chemistry.

### Mutual consent matters

The product vision requires both users to independently express interest before identities are revealed.

### Real chemistry happens between real people

Veil can break the ice.

The rest is up to the humans.

---

## Current Prototype

This project was created as a hackathon prototype focused on demonstrating the core Veil experience.

The current version prioritizes a complete end-to-end product journey over production-scale dating infrastructure.

Future development could include:

- User authentication
- Persistent user profiles
- Database-backed matchmaking
- Fully AI-generated avatar conversations
- Dynamic AI compatibility reports
- Background virtual-date scheduling
- Notifications
- Mutual consent workflows
- Human-to-human messaging
- Expanded privacy and safety controls

---

## Disclaimer

Veil's AI-generated personas, simulated conversations, reports, and Requirement Match Signals are exploratory tools based on user-provided information.

They do not predict:

- Real-world compatibility
- Relationship success
- Personal safety
- Attraction
- Chemistry

---


## License

This project was created for competition and demonstration purposes.
All rights reserved by the project team unless otherwise stated.



## Veil

**The Veil can break the ice. The rest is yours.**
