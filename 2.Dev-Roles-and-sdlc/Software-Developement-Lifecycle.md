# Day-2: Improve SDLC with DevOps | DevOps Zero to Hero Course

**Video Link:** [https://www.youtube.com/watch/jRqBIpcgO4g](https://www.youtube.com/watch/jRqBIpcgO4g)  
**Instructor:** Abhishek  
**Course Context:** Day 2 of DevOps course.

## Core Topic: Software Development Life Cycle (SDLC)
SDLC (also called Software Development Lifecycle) is a **standard process/culture** followed by **all organizations** (startups, MNCs, unicorns) in the IT/software industry.

### Why Learn SDLC?
- Essential for **everyone**: Developers, testers, DevOps engineers.
- Ensures **high-quality product delivery** through structured phases: **Design → Develop → Test**.
- Without SDLC: No design → Can't develop; No testing → Poor quality, unmet customer expectations.
- **End Goal**: Deliver **high-quality, prompt applications** meeting customer needs.

### SDLC as a Circular Process
SDLC is **cyclical** (not linear) – repeat for every new feature/update.

```
Planning → Define Requirements → Design → Build → Test → Deploy → (Repeat for next feature)
```

**Example Scenario: example.com (E-commerce Site like Flipkart/Amazon)**  
- Current: Sells clothes for men/women.  
- New Feature: Add "Kids Catalog" (e.g., kids clothing 1-12 years) based on market research.  
- Follow full SDLC cycle for this feature.

## Detailed SDLC Phases

### 1. Planning & Requirements Gathering
- **Key Roles**: Product Owner, Business Analyst, Senior Members.
- **Activities**:
  - Gather customer feedback/inputs.
  - Validate idea viability (e.g., survey 10 existing + 15-20 potential customers: Interested in kids catalog? Age ranges?).
  - **Suspend if no demand** – Avoid wasting resources.
- **Output**: Clear requirements (e.g., "4 customers want 6-12 years; 16 want 1-4 years").
- **Importance**: Fundamental starting phase; prevents downstream failures.

### 2. Defining Requirements
- Document requirements formally.
- **Key Document**: **Software Requirement Specification (SRS)** Document.
  - Includes all collected data from planning (e.g., customer research summary).

### 3. Design Phase
- **Critical for scalability/reliability**.
- **High-Level Design (HLD)** (by Architect/Team Lead):
  - Overall system: Scalable? Highly available? (e.g., Handle Christmas load spikes for kids catalog).
  - High-level choices: Database type, # of app replicas.
- **Low-Level Design (LLD)** (by Senior Devs):
  - Detailed implementation: Functions, modules, APIs (e.g., "Use MySQL; Call function X with args Y, expect response Z").
  - Language-specific (e.g., Java/Python).

### 4. Build/Development Phase (DevOps Focus #1)
- **Key Roles**: Developers.
- **Activities**:
  - Read SRS/HLD/LLD/Jira tickets.
  - Write code in org's language.
  - Push to **Source Code Repository** (e.g., Git).
    - Peer review (PR) → Merge.
- **Why Repository?** Centralized sharing (not just on dev's laptop).

### 5. Testing Phase (DevOps Focus #2)
- **Key Roles**: **QE (Quality Engineering/Assurance) Team**.
- **Activities**:
  - Pull code from Git → Deploy to test server (staging/dev server).
  - Test for quality/promptness.
- **Goal**: Ensure code works beyond dev's machine.

### 6. Deployment Phase (DevOps Focus #3)
- Promote tested app to **Production Server**.
- **End User**: Customers access the feature (e.g., kids catalog live on example.com).

## DevOps Engineer's Role in SDLC
- **Primary Focus**: Automate **Build → Test → Deploy** for **efficiency & speed**.
- **DevOps Mindset**:
  - Think: "How does this tool (e.g., Terraform, Ansible) improve org efficiency?"
  - Suggest fits/mismatches (e.g., "Terraform not right for us").
- **Key Benefit**: **Automation eliminates manual intervention** → Faster delivery, higher efficiency.
  - DevOps doesn't *do* build/test/deploy manually – **scripts automate it**.
- **Not Exclusive**: Can contribute to earlier phases if dev-inclined, but core is automation.

| Phase          | Primary Team | DevOps Involvement                  |
|----------------|--------------|-------------------------------------|
| Planning/Reqs | Product Owner/BA | Optional (interest-based)          |
| Define/Design | Architects/Seniors | Optional                           |
| **Build**     | **Developers** | **Automate** (e.g., CI pipelines)  |
| **Test**      | **QE**       | **Automate** (e.g., auto-tests)    |
| **Deploy**    | Production   | **Automate** (e.g., CD pipelines)  |

## SDLC Models (High-Level Overview)
- **Waterfall**: Linear.
- **Iterative**: Repeat cycles.
- **Agile** (Most Common Today): Short sprints; Start phases on small chunks, repeat circuit.
- Full details in future Project Management classes.

## Interview Key Points
- **SDLC Pillars**: Planning → Define → Design → Build → Test → Deploy (cyclical).
- **DevOps Answer**: "As a DevOps engineer, I focus on **automating Build, Test, Deployment** to boost efficiency, reduce manual work, and speed up delivery."



***