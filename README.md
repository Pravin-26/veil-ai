# Veil

> **Let your AI break the ice.**

Veil is an AI-assisted dating experience that explores potential compatibility before two people decide whether they want to meet.

Instead of immediately connecting two matched users, Veil creates profile-based AI personas from the preferences they choose to share. The personas can participate in a simulated virtual first date, after which users receive a compatibility exploration report.

The goal is simple: **help people decide whether a conversation might be worth having before they meet in real life.**

---

## 💜 The Idea

Traditional dating apps primarily match people using profiles, photos, and preferences.

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

Veil uses this information to build a profile-based AI persona.

When two people match, their Veil personas can participate in a simulated virtual date. Afterward, users receive a report highlighting potential areas of alignment, differences worth exploring, and useful conversation starters.

The humans always make the final decision.

---

## ✨ How Veil Works

### 1. Create Your Veil

Complete an interactive questionnaire about your personality, preferences, values, interests, and relationship goals.

### 2. Discover a Match

Veil presents a potential match based on the preferences provided.

### 3. Schedule a Virtual Date

The two Veil personas participate in a simulated first-date conversation based on information the users have chosen to share.

### 4. Receive a Virtual Date Report

After the virtual date, Veil presents:

- Shared interests
- Areas of alignment
- Differences worth discussing
- Conversation starters
- Topics worth exploring on a real date

### 5. View Your Requirement Match Signal

Veil provides an exploratory match signal based on stated preferences and requirements.

The signal is not a scientific compatibility score and does not predict relationship success or real-world chemistry.

### 6. Lift the Veil

After reviewing the report, each person can decide whether they are interested in meeting the person behind the Veil.

The product vision is that a connection happens only when both people independently choose to connect.

---

## 🎭 Demo Experience

This hackathon prototype includes a complete Demo Mode so the entire Veil experience can be explored without requiring two real users or paid API access.

The demo includes:

- Interactive onboarding
- Dating questionnaire
- Profile-based Veil persona
- Potential match
- Virtual date scheduling
- Simulated persona conversation
- Virtual Date Report notification
- Requirement Match Signal
- Mutual interest and reveal experience

If live AI generation is unavailable, select:

**Continue with Demo Persona**

This allows the complete product experience to remain testable.

---

## 🤖 OpenAI Integration

Veil includes a server-side OpenAI integration for transforming questionnaire responses into a structured AI persona.

The integration is designed to:

- Use information supplied by the user
- Avoid inventing personal history
- Avoid making romantic decisions on behalf of users
- Keep API credentials on the server
- Provide a reliable Demo Mode when live generation is unavailable

The prototype also demonstrates the product architecture for extending this approach to AI-powered virtual date simulations and compatibility exploration reports.

---

## 🧠 How I Used Codex

Codex was a core development tool throughout the creation of Veil.

I used Codex to help:

- Build the Next.js application architecture
- Create the multi-step onboarding experience
- Develop reusable React components
- Implement the end-to-end demo journey
- Integrate server-side OpenAI persona generation
- Implement error handling and fallback behavior
- Review TypeScript implementation
- Debug build and lint issues
- Iterate on the user experience

I also directly developed and refined parts of the project, including the virtual-date scheduling experience, match-report flow, Requirement Match Signal, product copy, and overall product direction.

The development process combined human product decisions with Codex-assisted implementation.

---

## 🛠 Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Codex
- Git
- GitHub

---

## 🚀 Running Veil Locally

### Prerequisites

Make sure you have Node.js and npm installed.

### 1. Clone the repository

```bash
git clone https://github.com/Pravin-26/veil-ai.git
cd veil-ai
```

### 2. Install dependencies

```bash
npm install
```

This installs all packages required by the application, including the OpenAI SDK if it is listed in `package.json`.

### 3. Run in Demo Mode

You can run and explore the complete demo without an OpenAI API key:

```bash
npm run dev
```

Open:

`http://localhost:3000`

Complete the onboarding flow and choose **Continue with Demo Persona** if live AI generation is unavailable.

### 4. Optional: Enable Live OpenAI Persona Generation

To test live AI generation, create a file named:

```text
.env.local
```

Add:

```env
OPENAI_API_KEY=your_openai_api_key
```

Then restart the development server:

```bash
npm run dev
```

An OpenAI API key is **not required to experience the complete Demo Mode**.

Never commit `.env.local` or an API key to the repository.

---

## 🔐 Product Principles

### Human choice comes first

AI should help people explore potential connections, not make romantic decisions for them.

### AI personas are simulations

A Veil persona represents information a user chooses to provide. It is not the actual person.

### Compatibility is not certainty

The Requirement Match Signal is an exploratory indicator and should not be interpreted as a scientific prediction.

### Real chemistry happens between real people

Veil helps users explore whether a real conversation may be worth having. It cannot determine real-world chemistry.

### Mutual consent matters

The product vision requires both users to independently express interest before a connection is made.

---

## 🔮 Future Vision

Future development could include:

- User authentication and persistent profiles
- Real matchmaking
- Fully AI-generated multi-persona virtual dates
- Background virtual-date scheduling
- User notifications
- Mutual consent workflows
- Human-to-human messaging
- Expanded privacy and safety controls

---

## ⚠️ Disclaimer

Veil's AI-generated personas, simulated conversations, reports, and match signals are exploratory tools based on user-provided information.

They do not predict real-world compatibility, relationship success, personal safety, or chemistry.

---

## 💜 Veil

**The Veil can break the ice. The rest is up to you.**
