# GitWise — AI-Powered Release Intelligence

**Ship smarter. Verify every change.**

An AI-powered release intelligence platform that converts merged GitHub pull requests into accurate, traceable weekly release notes, independently verifies claims against source diffs, identifies missing changes, and validates facts using controlled adversarial test suites.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🎨 Visual Identity & Architecture

Crafted as a premium engineering SaaS interface inspired by Linear and Vercel:

- **Deep Navy Palette**: `#0B1220` (primary dark), `#111C2E` (dark surface)
- **Vivid Accent Orange**: `#F97316` (buttons, badges, active tabs, icon badges)
- **Clean Light Surfaces**: `#F7F8FA` (body background), `#FFFFFF` (cards & panels), `#E5E7EB` (subtle borders)
- **Typography**: Inter (modern sans-serif) + JetBrains Mono (diff hunks & commit hashes)

---

## 🚀 Key Sections

1. **Streamlined Header**: Compact height, low-key announcement bar, clean GitWise wordmark, and primary CTA.
2. **Unified Hero Composition**:
   - Eyebrow: *AI-POWERED RELEASE INTELLIGENCE*
   - Headline: *Release notes you can trust.* (orange highlighted)
   - 3 Value Propositions: GitHub-integrated, Evidence-linked, Independently verified.
   - Unified Product Preview: Demonstrates verified release notes, diff citations, and claim audit summary.
3. **Workspace Release Form**:
   - GitHub repository URL with owner/repo validation.
   - Date range selector & release type dropdown.
   - Quick presets for instant testing (`facebook/react`, `vercel/next.js`, `tailwindlabs/tailwindcss`).
   - Embedded verified Markdown output view.
4. **Core Capabilities (5 Clean Cards)**:
   - 1. GitHub Research
   - 2. AI Drafting
   - 3. Independent Verification
   - 4. Coverage Analysis
   - 5. Evaluation Lab
   - Purposeful CSS workflow diagrams without decorative stock photos.
5. **Verification: The Core Differentiator**:
   - Interactive evidence inspector showing 4 audited claim states (Verified, Unsupported, Missing PR, Invalid Ref).
   - Real ground-truth git diff evidence inspection.
6. **Evaluation Lab & Benchmarking**:
   - Dedicated feature testing against adversarial test vectors (Fabricated PR, Omitted PR, Hyperbole).
   - Baseline unverified LLM vs GitWise verified output comparison.
7. **Clean Footer**: Minimal, developer-centric footer with product navigation and repository links.

---

## 💻 Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
