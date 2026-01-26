# Day 10 - Git Branching Strategy

**Instructor:** Abhishek  
**Course:** DevOps Zero to Hero  
**Topic:** Git Branching Strategy - Real World Example  
**Video:** [Day-10 | Git Branching Strategy | Real World Example](https://www.youtube.com/watch/MCyvYT8FS5w)

---

## Table of Contents
1. [Why Branching Strategy Matters](#why-branching-strategy-matters)
2. [What is a Branch?](#what-is-a-branch)
3. [Types of Branches](#types-of-branches)
4. [Branching Strategy Overview](#branching-strategy-overview)
5. [Real-World Example: Kubernetes](#real-world-example-kubernetes)
6. [Real-World Example: Uber](#real-world-example-uber)
7. [Branch Workflow](#branch-workflow)
8. [Best Practices](#best-practices)
9. [Interview Questions](#interview-questions)
10. [Key Takeaways](#key-takeaways)

---

## Why Branching Strategy Matters

### Primary Goal of Any Organization:
- **Deliver releases to customers on time**
- **Deliver new features frequently** (every 1-3 months)
- **Keep customers happy** with continuous updates

### Why is This a Top DevOps Interview Question?

Git Branching Strategy appears in:
- ✅ Top 50 DevOps Questions
- ✅ Top 20 DevOps Interview Questions
- ✅ Almost every DevOps interview

**Reason:** A proper branching strategy is **critical** for:
- Efficient development
- Timely releases
- Team collaboration
- Code quality

---

## What is a Branch?

### Simple Definition:
**A branch is a separation in your codebase** that allows you to:
- Work on new features independently
- Avoid affecting existing functionality
- Test changes before merging
- Collaborate with multiple developers

---

### Basic Example: Calculator Application

#### Scenario:
You have a **Calculator Application** with:
- ✅ Addition
- ✅ Subtraction
- ✅ Multiplication
- ✅ Division

#### New Requirement:
Add **Version 2** with advanced features:
- Percentage calculations
- Advanced calculator capabilities
- Breaking changes to existing code

#### Problem:
Making changes directly to the **main/master branch** could:
- ❌ Break existing functionality
- ❌ Affect current users
- ❌ Cause production issues

#### Solution: Create a New Branch

```
main/master (V1)
    │
    ├── Existing: add, subtract, multiply, divide
    │
    └── V2 Branch (new branch)
        └── Development: percentage, advanced features
```

**Process:**
1. Create new branch: `feature-v2` or `feature-advanced-calculator`
2. Develop new features on this branch
3. Test thoroughly
4. Merge back to main/master when confident
5. Delete the feature branch

---

### Real-World Example: Uber

#### Initial State:
**Uber** was only a **Cab Application**

```
main/master
    │
    └── Cabs Feature (working fine, customers using it)
```

#### New Feature Request:
Add **Bikes** functionality

#### Challenge:
- Cabs functionality is **already live**
- Customers are **actively using** cabs
- Don't want to **break existing** functionality
- Not confident if bikes will **affect the app**

#### Solution:

```
main/master (Cabs)
    │
    ├── Existing cabs functionality (active, live)
    │
    └── feature-bikes (new branch)
        │
        └── 5-6 developers working on bikes
        └── Testing bikes functionality
        └── Once confident → Merge to main
```

**Process:**
1. Create **`feature-bikes`** branch
2. 5-6 developers work on bikes
3. Test thoroughly
4. Merge to main when ready
5. New Uber app (Cabs + Bikes) delivered to customers
6. Delete `feature-bikes` branch

---

## Types of Branches

### 1. Master/Main Branch (Trunk)

**Also known as:**
- Master branch
- Main branch
- Trunk branch

**Purpose:**
- **Primary branch** for active development
- **Always up-to-date** with latest code
- **Source of truth** for the project
- All changes eventually merge here

**Characteristics:**
- ✅ Default branch
- ✅ Always maintained
- ✅ Never deleted
- ✅ Reflects latest development state

**Rules:**
- All feature branches merge back to master
- All hotfix branches merge back to master
- Master should always be in a working state

---

### 2. Feature Branches

**Purpose:**
- Develop **new features**
- Introduce **breaking changes**
- Work on **major updates**
- Isolate development from main code

**Naming Convention:**
```
feature-<feature-name>
feature-percentage
feature-exponential
feature-bikes
feature-intercity
feature-XYZ
```

**Lifecycle:**
```
main
 │
 ├──→ feature-percentage (created)
 │        │
 │        ├── Developer 1 works
 │        ├── Developer 2 works
 │        ├── Testing
 │        │
 │        └──→ Merge to main (when ready)
 │
 └──→ Delete feature-percentage (after merge)
```

**Characteristics:**
- ✅ Multiple developers can work
- ✅ Independent testing
- ✅ No impact on main until merge
- ✅ Short to medium lifespan
- ✅ Deleted after merge

**When to Create:**
- New feature development
- Breaking changes
- Major functionality updates
- Large team collaboration needed

---

### 3. Release Branches

**Purpose:**
- **Prepare code for release** to customers
- **Freeze development** for testing
- **End-to-end testing**
- **Ship to customers**

**Naming Convention:**
```
release-1.26
release-1.27
release-v2.0
release-v3.0
```

**Why Not Release from Master?**

**Master Branch:**
- Active development continues
- New changes constantly added
- Not stable for release

**Release Branch:**
- Code frozen at a point in time
- No new features added
- Only bug fixes allowed
- Stable for customer delivery

**Lifecycle:**
```
main (active development)
 │
 ├── Feature 1 merged
 ├── Feature 2 merged
 ├── Feature 3 merged
 │
 ├──→ release-v3.0 (created for release)
 │        │
 │        ├── End-to-end testing
 │        ├── Functionality testing
 │        ├── No new features
 │        │
 │        └──→ Ship to customers
 │
 └── Active development continues on main
```

**Process:**
1. **Create** release branch from main
2. **Freeze** code (no new features)
3. **Test** thoroughly
4. **Fix** critical bugs only
5. **Ship** to customers
6. **Keep** branch for maintenance

**Example: Kubernetes**
- Current: `release-1.26`
- Next: `release-1.27` (created in April)
- **3300+ contributors** use this strategy

---

### 4. Hotfix Branches (Bug Fix Branches)

**Purpose:**
- **Critical production bugs**
- **Emergency fixes**
- **Quick turnaround** required
- **Immediate deployment** needed

**Naming Convention:**
```
hotfix-<bug-description>
hotfix-login-issue
hotfix-payment-bug
bugfix-critical-error
```

**Characteristics:**
- ⚡ **Very short-lived** (1-2 days)
- ⚡ **Urgent fixes** only
- ⚡ **Quick testing**
- ⚡ **Immediate deployment**

**Critical Rule:**
Hotfix changes must go to **BOTH**:
1. **Master/Main branch** (to keep it updated)
2. **Release branch** (to fix production)

**Lifecycle:**
```
main (v3.0)
 │
 ├── Active development
 │
 └── Customer reports bug in production
      │
      ├──→ hotfix-critical-bug (created)
      │        │
      │        ├── Fix bug (1-2 days)
      │        ├── Test quickly
      │        │
      │        ├──→ Merge to main
      │        └──→ Merge to release-v3.0
      │
      └──→ Ship fix to customers
      └──→ Delete hotfix branch
```

**Why Merge to Both?**
- **Release branch** = Code shipped to customers (needs fix now)
- **Main branch** = Future releases (needs fix for future)

---

## Branching Strategy Overview

### The Four Branch Types:

| Branch Type | Purpose | Lifespan | Merges To |
|-------------|---------|----------|-----------|
| **Master/Main** | Active development | Permanent | N/A (all merge here) |
| **Feature** | New features | Weeks/Months | Master |
| **Release** | Customer delivery | Permanent | Master (bug fixes) |
| **Hotfix** | Critical bugs | 1-2 days | Master + Release |

---

### Visual Workflow:

```
┌─────────────────────────────────────────────────────────┐
│                    MASTER/MAIN BRANCH                   │
│              (Always Active, Always Updated)            │
└─────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
    ┌────▼────┐          ┌────▼────┐         ┌────▼────┐
    │ Feature │          │ Feature │         │ Feature │
    │ Branch 1│          │ Branch 2│         │ Branch 3│
    │         │          │         │         │         │
    │ (bikes) │          │(intercity)│       │ (XYZ)   │
    └────┬────┘          └────┬────┘         └────┬────┘
         │                    │                    │
         └────────┬───────────┴────────────────────┘
                  │
                  │ (All features merged)
                  │
         ┌────────▼────────┐
         │  MASTER/MAIN    │
         │   (Updated)     │
         └────────┬────────┘
                  │
                  │ (Ready for release)
                  │
         ┌────────▼────────┐
         │ RELEASE v3.0    │
         │  (Testing)      │
         │  (Ship to       │
         │   customers)    │
         └────────┬────────┘
                  │
                  │ (Bug found!)
                  │
         ┌────────▼────────┐
         │  HOTFIX BRANCH  │
         │  (Quick fix)    │
         └────┬──────┬─────┘
              │      │
              │      └──────→ RELEASE v3.0 (fix production)
              │
              └─────────────→ MASTER (keep updated)
```

---

## Real-World Example: Kubernetes

### About Kubernetes:
- **3300+ contributors**
- Open-source project on GitHub
- New release every **3 months**
- Manages complex codebase efficiently

### Kubernetes Branching Strategy:

Visit: [github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)

#### Branches You'll See:

**1. Master Branch:**
- Active development
- Continuously updated
- Latest code changes

**2. Feature Branches:**
```
feature-rate-limiting
feature-server-set
feature-workload-GA
```
- 10 developers on one feature
- 20 developers on another
- Independent development
- Merge to master when ready

**3. Release Branches:**
```
release-1.24
release-1.25
release-1.26
release-1.27 (next release in April)
```
- Code frozen for testing
- Customer-ready code
- No new features after creation

**4. Workflow:**
1. Developers create **feature branches**
2. Work independently
3. Test features
4. Merge to **master** when confident
5. Delete feature branches
6. When ready for release, create **release-1.27**
7. Test release branch
8. Ship to customers

---

## Real-World Example: Uber

### Timeline Example:

#### **Day 1 (15th Jan):**
```
main/master
    │
    └── Cab functionality (existing)
        - Daily bug fixes
        - Active development
        - Commits added daily
```

#### **Day 10:**
**Product Manager:** "Add Bikes feature!"

```
main/master (Cabs)
    │
    ├── Daily fixes continue
    │
    └── feature-bikes (NEW)
        └── 2-3 developers working
```

#### **Day 30:**
**Bikes testing complete**

```
main/master
    │
    ├── feature-bikes merged ← Bikes added!
    │
    └── Cabs + Bikes now in master
```

#### **Day 31:**
**Product Manager:** "Add Intercity feature!"

```
main/master (Cabs + Bikes)
    │
    ├── Active development continues
    │
    └── feature-intercity (NEW)
        └── Development starts
```

#### **Day 90:**
**Feature Intercity ready**

```
main/master
    │
    └── feature-intercity merged
        │
        └── Cabs + Bikes + Intercity
```

#### **Day 91:**
**Ready for customer release**

```
main/master (v2.0)
    │
    ├── Active development continues
    │
    └── release-v3.0 (NEW)
        │
        ├── Testing phase
        ├── End-to-end testing
        ├── Functionality testing
        │
        └── Ship to customers
```

#### **Day 94:**
**Customer reports bug!**

```
release-v3.0 (in production)
    │
    └── Bug reported!

hotfix-payment-bug (NEW)
    │
    ├── Fix bug (1 day)
    ├── Test quickly
    │
    ├──→ Merge to main
    └──→ Merge to release-v3.0
         └── Ship fix to customers
```

---

## Branch Workflow

### Standard Development Workflow:

```
1. Start with MASTER
   │
   ├── Always up-to-date
   └── Latest code
   
2. Create FEATURE branch
   │
   ├── New feature development
   ├── Multiple developers work
   └── Independent testing
   
3. Merge to MASTER
   │
   ├── Feature tested
   ├── Feature approved
   └── Feature working

4. Create RELEASE branch
   │
   ├── When ready for customers
   ├── Freeze code
   └── Testing phase

5. Ship to CUSTOMERS
   │
   ├── From release branch
   └── Production deployment

6. HOTFIX if needed
   │
   ├── Critical bugs only
   ├── Merge to master
   ├── Merge to release
   └── Ship immediately
```

---

### Key Rules:

#### Rule 1: All Changes Go to Master
```
Feature Branch ──────→ Master
Release Branch ──────→ Master (bug fixes)
Hotfix Branch ───────→ Master
```

**Why?**
- Master = source of truth
- Master = always updated
- Master = latest version reference

#### Rule 2: Release from Release Branches
```
Master ──→ Create Release ──→ Test ──→ Ship to Customers
```

**Why?**
- Master has active development
- Release branch is stable
- Testing needs frozen code

#### Rule 3: Hotfixes Go to Both
```
Hotfix ──────→ Master (future releases)
         └───→ Release (current production)
```

**Why?**
- Production needs fix now (release branch)
- Future versions need fix (master)

---

## Best Practices

### 1. **Branch Naming Conventions**

**Good Names:**
```
feature-user-authentication
feature-payment-gateway
release-2.5.0
hotfix-login-crash
bugfix-cart-total
```

**Bad Names:**
```
new-stuff
test
my-branch
fix
temp
```

### 2. **Keep Master Updated**

**Always merge to master:**
- ✅ Feature branches
- ✅ Hotfix branches
- ✅ Release bug fixes

**Never:**
- ❌ Let master become outdated
- ❌ Skip merging important fixes
- ❌ Abandon master

### 3. **Delete Merged Branches**

After merging:
```bash
# Feature merged to master
git branch -d feature-bikes

# No longer needed
```

**Benefits:**
- Clean repository
- Avoid confusion
- Easy navigation

### 4. **Test Before Merging**

**Before merging feature to master:**
1. ✅ Unit tests pass
2. ✅ Integration tests pass
3. ✅ Code review complete
4. ✅ No breaking changes
5. ✅ Documentation updated

### 5. **Release Branch Freeze**

**After creating release branch:**
- ❌ No new features
- ✅ Bug fixes only
- ✅ Critical fixes
- ✅ Testing focus

### 6. **Hotfix Communication**

**When creating hotfix:**
1. Notify team immediately
2. Document the issue
3. Merge to both branches
4. Verify fix in production
5. Update documentation

---

## Interview Questions

### Q1: What is a Git Branching Strategy?

**Answer:**

A Git Branching Strategy is a **defined approach** for managing branches in a repository to:
- Enable **parallel development**
- Maintain **code stability**
- Ensure **timely releases**
- Support **team collaboration**

**Key components:**
1. **Master/Main Branch** - Active development
2. **Feature Branches** - New features
3. **Release Branches** - Customer releases
4. **Hotfix Branches** - Critical bug fixes

---

### Q2: What are the different types of branches?

**Answer:**

**1. Master/Main/Trunk Branch:**
- Primary branch
- Always up-to-date
- Source of truth
- Never deleted

**2. Feature Branches:**
- New feature development
- Breaking changes
- Team collaboration
- Merged to master when ready

**3. Release Branches:**
- Customer delivery
- Code frozen for testing
- No new features
- Stable releases

**4. Hotfix/Bugfix Branches:**
- Critical production bugs
- Short-lived (1-2 days)
- Merged to master + release
- Immediate deployment

---

### Q3: From which branch do you perform releases?

**Answer:**

Releases are performed from **Release Branches**, not from Master.

**Why not Master?**
- Master has **active development**
- New changes constantly added
- Not stable for customers

**Why Release Branch?**
- Code **frozen** at a point in time
- **Stable** and tested
- No new features added during testing
- Ready for customer deployment

**Example:**
```
master → release-v3.0 → Testing → Ship to customers
```

---

### Q4: What is a Feature Branch and when do you create one?

**Answer:**

**Feature Branch:**
A separate branch created for developing new features or breaking changes without affecting the main codebase.

**When to Create:**
1. **New feature** development
2. **Breaking changes** to existing code
3. **Large updates** requiring multiple developers
4. **Experimental** features

**Example:**
```
main
 │
 └── feature-payment-gateway
     └── 5 developers work for 2 months
     └── Test thoroughly
     └── Merge to main when ready
```

**Benefits:**
- Isolated development
- No impact on main
- Team collaboration
- Safe experimentation

---

### Q5: What is the difference between a Hotfix and a Feature branch?

**Answer:**

| Aspect | Hotfix Branch | Feature Branch |
|--------|---------------|----------------|
| **Purpose** | Critical bug fixes | New features |
| **Urgency** | Immediate | Planned |
| **Lifespan** | 1-2 days | Weeks/Months |
| **Scope** | Small fixes | Large changes |
| **Testing** | Quick validation | Thorough testing |
| **Merges To** | Master + Release | Master only |
| **Trigger** | Production bug | Planned development |

**Hotfix Example:**
```
Production bug → Create hotfix → Fix (1 day) → Merge to master + release
```

**Feature Example:**
```
New feature → Create feature branch → Develop (1 month) → Merge to master
```

---

### Q6: Why must hotfix changes go to both master and release branches?

**Answer:**

Hotfix changes must merge to **BOTH** branches because:

**1. Release Branch (Immediate):**
- Contains **production code**
- Customers experiencing the bug **now**
- Need **immediate fix** deployed

**2. Master Branch (Future):**
- Source of **future releases**
- Must include the fix for **next version**
- Keeps master **up-to-date**

**If you only merge to release:**
- ❌ Bug will reappear in next release
- ❌ Master doesn't have the fix
- ❌ Future releases broken

**Example:**
```
hotfix-payment-bug
    │
    ├──→ release-v3.0 (fix production NOW)
    └──→ master (fix future releases)
```

---

### Q7: How does Kubernetes manage 3300+ contributors?

**Answer:**

Kubernetes uses a **well-defined branching strategy**:

**1. Master Branch:**
- Active development
- Continuously updated
- All features merge here

**2. Feature Branches:**
- `feature-rate-limiting`
- `feature-server-set`
- `feature-workload-GA`
- Multiple teams work independently

**3. Release Branches:**
- `release-1.26` (current)
- `release-1.27` (next - April)
- New release every **3 months**

**Process:**
1. Developers create **feature branches**
2. Work independently (10-20 developers per feature)
3. Test and merge to **master**
4. When ready, create **release branch**
5. Test thoroughly
6. Ship to customers

**Success Factors:**
- Clear branching strategy
- Independent work streams
- Regular releases (every 3 months)
- Stable release branches

---

### Q8: What is the master/main branch and what makes it special?

**Answer:**

**Master/Main Branch** (also called Trunk) is the **primary branch** that:

**Characteristics:**
1. ✅ **Always up-to-date** with latest code
2. ✅ **Source of truth** for the project
3. ✅ **Never deleted** (permanent)
4. ✅ **Receives all merges** (features, hotfixes, releases)

**Rules:**
- All feature branches merge to master
- All hotfix branches merge to master
- All release bug fixes merge to master
- Master is the reference for latest version

**What Master Contains:**
- Latest features
- All bug fixes
- Current development state
- Future release code

**What Master is NOT:**
- ❌ NOT for direct development (use feature branches)
- ❌ NOT for customer releases (use release branches)
- ❌ NOT always stable (active development)

---

### Q9: Explain a complete branching workflow with an example.

**Answer:**

**Scenario:** Adding "Bikes" feature to Uber

**Step 1: Initial State**
```
main (master)
    └── Cabs feature (working)
```

**Step 2: Create Feature Branch**
```bash
git checkout main
git checkout -b feature-bikes
```
```
main (Cabs)
    │
    └── feature-bikes (NEW)
```

**Step 3: Development (2 months)**
```
feature-bikes
    ├── Developer 1: Add bike search
    ├── Developer 2: Add bike booking
    ├── Developer 3: Add bike pricing
    └── Testing
```

**Step 4: Merge to Main**
```bash
git checkout main
git merge feature-bikes
git branch -d feature-bikes
```
```
main
    └── Cabs + Bikes (merged)
```

**Step 5: Create Release**
```bash
git checkout main
git checkout -b release-v3.0
```
```
main (active development)
    │
    └── release-v3.0 (testing)
```

**Step 6: Ship to Customers**
```
release-v3.0
    ├── End-to-end testing
    ├── Bug fixes
    └── Deploy to production
```

**Step 7: Hotfix (if needed)**
```bash
git checkout -b hotfix-bike-crash
# Fix bug
git checkout main
git merge hotfix-bike-crash
git checkout release-v3.0
git merge hotfix-bike-crash
```

---

### Q10: What should you do before merging a feature branch to master?

**Answer:**

**Pre-Merge Checklist:**

**1. Testing:**
- ✅ All unit tests pass
- ✅ Integration tests pass
- ✅ No breaking changes
- ✅ Feature works as expected

**2. Code Quality:**
- ✅ Code review completed
- ✅ Follows coding standards
- ✅ No merge conflicts
- ✅ Documentation updated

**3. Validation:**
- ✅ Feature tested independently
- ✅ Tested with existing code
- ✅ Performance acceptable
- ✅ Security reviewed

**4. Communication:**
- ✅ Team notified
- ✅ Stakeholders informed
- ✅ Release notes prepared

**5. Cleanup:**
- ✅ Remove debug code
- ✅ Remove commented code
- ✅ Update dependencies

**Only merge when:**
```
All checks pass ✅
Team approves ✅
Tests green ✅
No conflicts ✅
```

---

## Practical Commands

### Creating Branches

```bash
# Create and switch to new feature branch
git checkout -b feature-bikes

# Create release branch
git checkout -b release-v3.0

# Create hotfix branch
git checkout -b hotfix-login-bug
```

### Switching Branches

```bash
# Switch to main
git checkout main

# Switch to feature branch
git checkout feature-bikes
```

### Merging Branches

```bash
# Merge feature to main
git checkout main
git merge feature-bikes

# Merge hotfix to main
git checkout main
git merge hotfix-login-bug

# Merge hotfix to release
git checkout release-v3.0
git merge hotfix-login-bug
```

### Deleting Branches

```bash
# Delete local branch (after merge)
git branch -d feature-bikes

# Force delete (if not merged)
git branch -D feature-bikes

# Delete remote branch
git push origin --delete feature-bikes
```

### Viewing Branches

```bash
# List local branches
git branch

# List all branches (local + remote)
git branch -a

# See branch details
git branch -v
```

---

## Key Takeaways

### 1. **Four Branch Types:**
- **Master/Main** - Active development, always updated
- **Feature** - New features, independent work
- **Release** - Customer releases, frozen code
- **Hotfix** - Critical bugs, quick fixes

### 2. **Branch Lifecycle:**
```
Create → Develop → Test → Merge → Delete
```

### 3. **Critical Rules:**
- ✅ All changes merge to master
- ✅ Release from release branches
- ✅ Hotfixes merge to master + release
- ✅ Delete merged branches
- ✅ Keep master updated

### 4. **Benefits:**
- **Parallel development** - Multiple teams work independently
- **Code stability** - Main code unaffected by experiments
- **Timely releases** - Organized release process
- **Quick fixes** - Hotfix branches for emergencies

### 5. **Real-World Success:**
- **Kubernetes:** 3300+ contributors, releases every 3 months
- **Uber:** Successful feature additions (bikes, intercity)
- **Industry standard** - Used by all major companies

---

## Additional Resources

### Study Open-Source Projects:

**1. Kubernetes:**
- GitHub: `kubernetes/kubernetes`
- Branches: master, feature-*, release-*
- Learn: How 3300+ contributors collaborate

**2. Docker:**
- GitHub: `docker/docker`
- Learn: Container platform branching

**3. Jenkins:**
- GitHub: `jenkinsci/jenkins`
- Learn: CI/CD tool development

**4. Istio:**
- GitHub: `istio/istio`
- Learn: Service mesh branching strategy

### Explore Their:
- Branch structure
- Naming conventions
- Merge strategies
- Release processes

---

## Summary Diagram

```
┌─────────────────────────────────────────────────────┐
│              GIT BRANCHING STRATEGY                 │
└─────────────────────────────────────────────────────┘

                    MASTER/MAIN
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   FEATURE-1        FEATURE-2        FEATURE-3
   (bikes)          (intercity)       (XYZ)
        │                │                │
        └────────────────┴────────────────┘
                         │
                    MASTER/MAIN
                    (All merged)
                         │
                    RELEASE-v3.0
                    (Ship to customers)
                         │
                    HOTFIX (if bug)
                         │
                    ┌────┴────┐
                    │         │
                MASTER    RELEASE
                (future)  (production)
```

---

## What's Next?

**Upcoming Topics:**
- Pull Requests
- Code Reviews
- Merge Conflicts Resolution
- Git Advanced Commands
- CI/CD Integration with Branches
- GitHub Actions
- Branch Protection Rules

---

**Practice Exercise:**

1. **Create a sample repository**
2. **Create feature branches** for different features
3. **Merge to master** when ready
4. **Create a release branch**
5. **Simulate a hotfix** scenario
6. **Practice the complete workflow**

---

**End of Day 10 Notes**

---

## Quick Reference Card

```
BRANCH TYPE     | PURPOSE           | LIFESPAN      | MERGE TO
----------------|-------------------|---------------|------------------
Master/Main     | Active dev        | Permanent     | N/A (all merge here)
Feature         | New features      | Weeks/Months  | Master
Release         | Customer delivery | Permanent     | Master (fixes)
Hotfix          | Critical bugs     | 1-2 days      | Master + Release
```

**Remember:** 
- Master = Source of Truth
- Feature = New Development
- Release = Customer Delivery
- Hotfix = Emergency Fixes
