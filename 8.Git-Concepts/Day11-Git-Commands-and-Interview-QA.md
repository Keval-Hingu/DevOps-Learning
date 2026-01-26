# Day 11 - Git Interview Q&A and Commands for DevOps

**Instructor:** Abhishek  
**Course:** DevOps Zero to Hero  
**Topic:** Git Commands & Interview Questions - Real World Examples  
**Video:** [Day-11 | Git Interview Q&A and Commands for DevOps](https://www.youtube.com/watch/mT6qrAx14O4)

---

## Table of Contents
1. [Git Workflow Overview](#git-workflow-overview)
2. [Git Repository Initialization](#git-repository-initialization)
3. [Essential Git Commands](#essential-git-commands)
4. [Git Clone vs Fork](#git-clone-vs-fork)
5. [Authentication Methods](#authentication-methods)
6. [Git Branching](#git-branching)
7. [Merging Strategies](#merging-strategies)
8. [Git Merge vs Rebase vs Cherry-Pick](#git-merge-vs-rebase-vs-cherry-pick)
9. [Handling Merge Conflicts](#handling-merge-conflicts)
10. [Interview Questions & Answers](#interview-questions--answers)
11. [Command Reference](#command-reference)
12. [Best Practices](#best-practices)

---

## Git Workflow Overview

### Standard Daily Workflow

Every developer/DevOps engineer uses these commands **daily**:

```bash
git add <file>          # Stage changes
git commit -m "message" # Create version
git push                # Share with team
```

**Combined Command:**
```bash
git add <file> && git commit -m "message" && git push
```

---

## Git Repository Initialization

### Creating a Repository (CLI Method)

#### Step 1: Initialize Repository

```bash
git init
```

**Output:**
```
Initialized empty Git repository in /path/to/your/directory/.git/
```

#### What Happens?

A **hidden folder** `.git` is created:

```bash
ls -la
# or
ls -a
```

**You'll see:**
```
.git/
calculator.sh
```

---

### Understanding the `.git` Folder

#### Interview Question: What happens when you run `git init`?

**Answer:**

When you run `git init`, a **`.git` folder** is created in the directory. This folder is responsible for:

1. **Tracking** - Monitors file changes
2. **Logging** - Maintains commit history
3. **Configuration** - Stores repository settings
4. **Credentials** - Manages authentication
5. **Hooks** - Pre-commit and post-commit scripts

#### Contents of `.git` Folder:

```
.git/
├── refs/         # References to commits
├── objects/      # All tracked files (as objects)
├── hooks/        # Pre/post commit scripts
├── config        # Repository configuration
└── HEAD          # Current branch pointer
```

#### Important `.git` Features:

**1. Objects:**
- Every file tracked by Git is stored as an object
- Objects are compressed and encrypted
- Can handle millions of files efficiently

**2. Hooks:**
- Prevent sensitive data commits (passwords, API tokens)
- Run automated scripts on commit/push
- Enforce code standards

**3. Config:**
- Store credentials
- TLS/SSL certificates for secure repositories
- Remote repository references

**Critical Note:** If you **delete `.git` folder**, Git stops tracking your repository!

---

## Essential Git Commands

### 1. `git status` - Check Repository Status

```bash
git status
```

**Output (Untracked File):**
```
Untracked files:
  calculator.sh

nothing added to commit but untracked files present
(use "git add" to track)
```

**What Git is Saying:**
- "I see a file `calculator.sh`"
- "Do you want me to track it?"
- "Use `git add` to start tracking"

---

### 2. `git add` - Track Files

#### Purpose:
Add files to Git tracking system so Git can:
- Monitor changes
- Enable version control
- Maintain file history

#### Commands:

```bash
# Add specific file
git add calculator.sh

# Add all files
git add .

# Add multiple specific files
git add file1.sh file2.sh
```

#### After `git add`:

```bash
git status
```

**Output:**
```
Changes to be committed:
  new file: calculator.sh
```

---

### 3. `git diff` - View Changes

```bash
git diff
```

**Example Output:**
```diff
diff --git a/calculator.sh b/calculator.sh
index abc1234..def5678 100644
--- a/calculator.sh
+++ b/calculator.sh
@@ -1,1 +1,2 @@
 # Addition
+x = 1 + 2
```

**Legend:**
- `-` Lines removed (red)
- `+` Lines added (green)

#### Use Cases:
- Review changes before committing
- Check what you modified
- Verify unintended changes

---

### 4. `git commit` - Create Version

#### Purpose:
Create a **snapshot** of your code at a specific point in time.

#### Command:

```bash
git commit -m "My first commit"
```

**Why Commit Messages Matter:**

In a team of **100+ developers**:
- Track who made which changes
- Understand change purpose
- Revert to specific versions
- Debug production issues

**Example Scenario:**
- Developer XYZ added 100 files yesterday
- Your code stopped working
- You need to identify the change
- Use commit history to find and revert

---

### 5. `git log` - View Commit History

```bash
git log
```

**Output:**
```
commit abc123def456...
Author: Abhishek <email@example.com>
Date: Mon Jan 11 10:00:00 2026

    My first commit

commit def789ghi012...
Author: Abhishek <email@example.com>
Date: Mon Jan 11 09:00:00 2026

    Initial commit
```

#### Useful `git log` Options:

```bash
# One-line format (concise)
git log --oneline

# View specific branch
git log <branch-name>
git log division

# Last N commits
git log -n 5

# With file changes
git log --stat

# Graphical view
git log --graph --oneline --all
```

**One-line Output:**
```
abc123d My first commit
def789g Initial commit
```

---

### 6. `git push` - Share with Remote

#### Purpose:
Push local code to remote repository (GitHub, GitLab, Bitbucket).

```bash
git push
```

#### Why `git push` Might Fail:

**Problem:** No remote repository configured

**Solution:** Add remote reference

```bash
# Add remote repository
git remote add origin https://github.com/username/repo-name.git

# Verify remote
git remote -v
```

**Output:**
```
origin  https://github.com/username/repo-name.git (fetch)
origin  https://github.com/username/repo-name.git (push)
```

---

### 7. `git clone` - Download Repository

#### Purpose:
Download entire repository from remote to local.

#### Command:

```bash
git clone <repository-url>
```

**Example:**
```bash
git clone https://github.com/argoproj/argo-cd.git
```

#### What Gets Cloned:
- ✅ Entire codebase
- ✅ Complete commit history
- ✅ All branches
- ✅ Remote reference (automatic)

#### Verify Remote After Clone:

```bash
cd argo-cd
git remote -v
```

**Output:**
```
origin  https://github.com/argoproj/argo-cd.git (fetch)
origin  https://github.com/argoproj/argo-cd.git (push)
```

---

## Git Clone vs Fork

### Critical Interview Question

**Q: What is the difference between `git clone` and `git fork`?**

---

### Git Clone

**Definition:** Download a copy of a repository to your local machine.

**Process:**
```
GitHub Repository
        ↓
    git clone
        ↓
Local Machine
```

**Command:**
```bash
git clone https://github.com/argoproj/argo-cd.git
```

**Characteristics:**
- ✅ Downloads to local
- ✅ Automatic remote reference
- ✅ Can pull updates
- ✅ Can push (if you have permissions)
- ✅ Works on public/private repos

**Use Case:**
- Join existing project
- Work on company repository
- Download open-source code

---

### Git Fork

**Definition:** Create a **complete copy** of a repository on GitHub (in your account).

**Process:**
```
Original Repository (argoproj/argo-cd)
        ↓
    Fork Button
        ↓
Your Repository (your-username/argo-cd)
```

**Characteristics:**
- ✅ Creates GitHub copy
- ✅ **Independent** from original
- ✅ Complete code + history
- ✅ You have full control
- ✅ Can sync with original (manually)

**Real-World Example:**

**Argo CD Repository:**
- Original: `argoproj/argo-cd`
- 3400+ forks exist
- Each fork is independent

**If you fork today:**
```
https://github.com/argoproj/argo-cd
        ↓ Fork
https://github.com/your-username/argo-cd
```

**Key Points:**
1. Your fork has **different URL**
2. Changes to original **don't auto-update** your fork
3. You can **collaborate** independently
4. You can create **your own version**

---

### Clone vs Fork Summary

| Aspect | Clone | Fork |
|--------|-------|------|
| **Location** | Local machine | GitHub server |
| **Purpose** | Work locally | Create independent copy |
| **Ownership** | Original owner | You own the fork |
| **Updates** | Pull from original | Manual sync needed |
| **Use Case** | Team development | Open-source contribution |
| **Command** | `git clone <url>` | Click "Fork" button |

---

### Distributed Version Control Example

**Fork** enables Git's **distributed** nature:

```
Original: example.com Repository
    │
    ├──→ Fork: developer-1/repository
    ├──→ Fork: developer-2/repository
    ├──→ Fork: developer-3/repository
    └──→ Fork: your-username/repository
```

**Benefits:**
- Code distributed across multiple locations
- No single point of failure
- Independent development
- Collaboration flexibility

---

## Authentication Methods

### Two Methods to Clone/Pull Code

---

### Method 1: HTTPS

**URL Format:**
```
https://github.com/username/repository.git
```

**Command:**
```bash
git clone https://github.com/argoproj/argo-cd.git
```

**Authentication:**
- Prompts for **username**
- Prompts for **password**
- Uses GitHub account credentials

**Pros:**
- ✅ Simple setup
- ✅ Works everywhere
- ✅ No key management

**Cons:**
- ❌ Password required every time
- ❌ Less secure than SSH
- ❌ Can be tedious

---

### Method 2: SSH (Recommended)

**URL Format:**
```
git@github.com:username/repository.git
```

**Command:**
```bash
git clone git@github.com:argoproj/argo-cd.git
```

**Authentication:**
- Uses **public/private key pair**
- No password required
- More secure

---

### Setting Up SSH Authentication

#### Step 1: Generate SSH Keys

```bash
ssh-keygen -t rsa
```

**Or (more specific):**
```bash
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

**Process:**
```
Generating public/private rsa key pair.
Enter file in which to save the key: [Press Enter]
Enter passphrase: [Press Enter or type passphrase]
```

**Generated Files:**
```
~/.ssh/
├── id_rsa          # Private key (keep secret!)
└── id_rsa.pub      # Public key (share with GitHub)
```

#### Step 2: View Public Key

```bash
cd ~/.ssh
cat id_rsa.pub
```

**Output (Example):**
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDZcK... your-email@example.com
```

**Copy this entire content!**

#### Step 3: Add Public Key to GitHub

1. Go to **GitHub.com**
2. Click **Settings** (top right)
3. Click **SSH and GPG keys** (left sidebar)
4. Click **New SSH Key**
5. **Title:** Give it a name (e.g., "My Laptop")
6. **Key:** Paste your public key
7. Click **Add SSH Key**

#### Step 4: Verify Setup

```bash
ssh -T git@github.com
```

**Success Output:**
```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

### SSH vs HTTPS Summary

| Feature | SSH | HTTPS |
|---------|-----|-------|
| **Password** | Not required | Required every time |
| **Security** | More secure | Less secure |
| **Setup** | One-time setup | No setup |
| **Authentication** | Public/Private keys | Username/Password |
| **Recommended** | ✅ Yes | For quick tasks |

---

## Git Branching

### What is a Branch?

A **branch** is a separate line of development that:
- Isolates new features
- Prevents breaking existing code
- Enables parallel development
- Allows experimentation

---

### Why Create Branches?

#### Real-World Example: Amazon

**Scenario:**
- Amazon has existing e-commerce platform
- Wants to add **House Services** (like Urban Company)
- This is a **huge feature** (months of work)

**Problem if no branch:**
- Daily commits to main
- Each commit could break production
- Customers affected by incomplete features

**Solution with branch:**
```
main (production)
    │
    ├── Daily bug fixes (safe)
    │
    └── feature-house-services (isolated)
        ├── Month 1: Foundation
        ├── Month 2: Development
        ├── Month 3: Testing
        └── Merge to main (when ready)
```

**Benefits:**
- ✅ Production code unaffected
- ✅ Safe experimentation
- ✅ Team collaboration on feature
- ✅ Merge only when confident

---

### Branch Commands

#### View Branches

```bash
# List local branches
git branch

# Current branch marked with *
* main
  division
  merge-example
```

#### Create Branch (Method 1)

```bash
git branch <branch-name>
```

**Example:**
```bash
git branch division
```

**Result:** Creates branch but doesn't switch to it.

#### Create and Switch (Method 2 - Recommended)

```bash
git checkout -b <branch-name>
```

**Example:**
```bash
git checkout -b division
```

**What This Does:**
1. Creates new branch called `division`
2. Copies current code to new branch
3. Switches to new branch

**Output:**
```
Switched to a new branch 'division'
```

---

#### Switch Between Branches

```bash
git checkout <branch-name>
```

**Example:**
```bash
# Switch to main
git checkout main

# Switch to division
git checkout division
```

---

### Branch Workflow Example

#### Starting Point:

**main branch:**
```javascript
// calculator.sh
// Addition
// Subtraction
```

#### Create Division Branch:

```bash
git checkout -b division
```

#### Add Division Feature:

```bash
vim calculator.sh
# Add: Division functionality
```

#### Commit in Division Branch:

```bash
git add calculator.sh
git commit -m "Add division functionality"
```

#### Check Commits:

```bash
# In division branch
git log --oneline
```

**Output:**
```
def789g Add division
abc123d My second commit
xyz456f My first commit
```

#### Switch to Main:

```bash
git checkout main
git log --oneline
```

**Output (No division commit):**
```
abc123d My second commit
xyz456f My first commit
```

**Why?** Division feature only exists in `division` branch!

---

### Branch Isolation Example

**Visual Representation:**

```
main
├── calculator.sh
│   ├── Addition
│   └── Subtraction
│
└── division (branch)
    └── calculator.sh
        ├── Addition
        ├── Subtraction
        └── Division  ← Only in this branch
```

**This is the power of branching!**

---

## Merging Strategies

### Three Ways to Merge Branches

1. **Git Merge** - Standard merging
2. **Git Rebase** - Linear history
3. **Git Cherry-Pick** - Select specific commits

---

## Git Merge vs Rebase vs Cherry-Pick

### 1. Git Cherry-Pick

#### What is Cherry-Pick?

**Pick specific commits** from one branch and apply to another.

#### When to Use:
- ✅ One or two commits to move
- ✅ Selective merging
- ✅ Bug fixes from feature branch

#### Command:

```bash
# View commits in another branch
git log division --oneline

# Output:
# def789g Add division
# abc123d My second commit

# Cherry-pick specific commit
git cherry-pick def789g
```

#### Complete Example:

```bash
# In main branch
git checkout main

# View division branch commits
git log division --oneline

# Pick the division commit
git cherry-pick <commit-id>

# Verify
git log --oneline
```

**Result:** Division commit now in main branch!

---

#### Cherry-Pick Limitations:

**Problem:** What if there are **6,000 commits**?

- ❌ Can't cherry-pick one by one
- ❌ Too time-consuming
- ❌ Error-prone
- ❌ Impractical for large features

**Solution:** Use **Git Merge** or **Git Rebase**

---

### 2. Git Merge

#### What is Git Merge?

Combine all commits from one branch into another.

#### Visual Example:

**Before Merge:**
```
main
├── Commit 1
├── Commit 2
└── Test commit

feature-branch
├── Commit 1 (from main)
├── Commit 2 (from main)
└── Feature commit
```

**After Merge:**
```
main
├── Commit 1
├── Commit 2
├── Test commit
└── Feature commit  ← Merged at the top
```

#### Command:

```bash
# Switch to target branch
git checkout main

# Merge source branch
git merge feature-branch
```

#### Characteristics:

**Commit Order:**
- Merged commits appear **at the top**
- **Non-linear** history
- Shows branch merge point

**Git Log Output:**
```
def789g Feature commit      ← From feature-branch
abc123d Test commit         ← From main
xyz456f Commit 2
lmn789o Commit 1
```

---

### 3. Git Rebase

#### What is Git Rebase?

**Reapply commits** from one branch onto another, maintaining **linear history**.

#### Visual Example:

**Before Rebase:**
```
main
├── Commit 1
├── Commit 2
└── Test commit

feature-branch
├── Commit 1 (from main)
├── Commit 2 (from main)
└── Feature commit
```

**After Rebase:**
```
main
├── Commit 1
├── Commit 2
├── Feature commit  ← Inserted before test commit
└── Test commit
```

#### Command:

```bash
# Switch to target branch
git checkout main

# Rebase source branch
git rebase feature-branch
```

#### Characteristics:

**Commit Order:**
- Rebased commits appear **before** main commits
- **Linear** history
- Cleaner commit timeline

**Git Log Output:**
```
abc123d Test commit         ← From main
def789g Feature commit      ← From feature-branch
xyz456f Commit 2
lmn789o Commit 1
```

---

### Merge vs Rebase: Key Differences

#### Interview Question: What's the difference between `git merge` and `git rebase`?

**Answer:**

Both merge and rebase **combine branches**, but they differ in **how commits are organized**:

| Aspect | Git Merge | Git Rebase |
|--------|-----------|------------|
| **History** | Non-linear | Linear |
| **Commit Position** | At the top | Before main commits |
| **Use Case** | Quick merges | Clean history needed |
| **Conflicts** | Resolve once | May resolve multiple times |
| **Collaboration** | Safe for shared branches | Avoid on shared branches |
| **Traceability** | Shows merge point | Looks like straight-line development |

---

### Visual Comparison

#### Git Merge:

```
main
│
├── C1 ──→ C2 ──→ C5 (test commit)
│            │
│            └──→ C3 (feature) ──→ C4 (merge)
│                                    │
└────────────────────────────────────┘
                                     
Timeline: C1 → C2 → C5 → C3 (merged)
```

#### Git Rebase:

```
main
│
├── C1 ──→ C2 ──→ C3 (feature) ──→ C5 (test commit)
│
└─────────────────────────────────────────────→

Timeline: C1 → C2 → C3 → C5 (linear)
```

---

### When to Use Merge vs Rebase

#### Use **Git Merge** When:

✅ Working on **shared branches**  
✅ Want to **preserve** merge history  
✅ **Quick integration** needed  
✅ Multiple people collaborating  
✅ Don't care about linear history

**Example:**
```bash
git checkout main
git merge feature-payment-gateway
```

---

#### Use **Git Rebase** When:

✅ Want **clean linear history**  
✅ Working on **personal feature branch**  
✅ **Before pushing** to shared branch  
✅ Large project with many contributors  
✅ Need to track changes chronologically

**Example:**
```bash
git checkout main
git rebase feature-user-auth
```

---

### Practical Example: Merge vs Rebase

#### Scenario Setup:

```bash
# Create main branch commits
git checkout main
echo "Addition" >> calculator.sh
git add . && git commit -m "My first commit"

echo "Subtraction" >> calculator.sh
git add . && git commit -m "My second commit"

# Create merge-example branch
git checkout -b merge-example
echo "Multiplication" >> calculator.sh
git add . && git commit -m "Demonstrate merge"

# Back to main, add another commit
git checkout main
echo "Test change" >> calculator.sh
git add . && git commit -m "Test commit"

# Create rebase-example branch
git checkout -b rebase-example
echo "Percentage" >> calculator.sh
git add . && git commit -m "Percentage"

# Back to main
git checkout main
```

---

#### Execute Merge:

```bash
git checkout main
git merge merge-example
git log --oneline
```

**Output:**
```
abc123d Demonstrate merge   ← Merged at top
def456f Test commit
ghi789o My second commit
jkl012p My first commit
```

---

#### Execute Rebase:

```bash
git checkout main
git rebase rebase-example
git log --oneline
```

**Output:**
```
def456f Test commit
mno345q Percentage          ← Rebased before test commit
ghi789o My second commit
jkl012p My first commit
```

---

### Diagrammatic Representation

#### From Official Git Documentation:

**Git Merge:**
```
    A---B---C main
         \
          D---E feature
         
After merge:
    A---B---C---F main
         \     /
          D---E feature
```

**Git Rebase:**
```
    A---B---C main
         \
          D---E feature

After rebase:
    A---B---C---D'---E' main
```

**Note:** D' and E' are rewritten commits

---

## Handling Merge Conflicts

### What is a Merge Conflict?

A **merge conflict** occurs when:
- Multiple branches modify **same file**
- Git can't auto-merge changes
- **Manual resolution** required

---

### Example Conflict Scenario:

**Branch 1 (merge-example):**
```bash
# calculator.sh
Multiplication
```

**Branch 2 (rebase-example):**
```bash
# calculator.sh
Percentage
```

**Both modified the same line!**

---

### Conflict Markers:

When you try to merge/rebase, Git shows:

```bash
<<<<<<< HEAD
Multiplication
=======
Percentage
>>>>>>> rebase-example
```

**Markers Explained:**
- `<<<<<<< HEAD` - Your current branch changes
- `=======` - Separator
- `>>>>>>> branch-name` - Incoming branch changes

---

### Resolving Conflicts

#### Step 1: Identify Conflict

```bash
git merge feature-branch
# or
git rebase feature-branch
```

**Output:**
```
CONFLICT (content): Merge conflict in calculator.sh
Automatic merge failed; fix conflicts and then commit the result.
```

#### Step 2: Open Conflicted File

```bash
vim calculator.sh
# or
code calculator.sh
```

**You'll see:**
```bash
# Addition
# Subtraction

<<<<<<< HEAD
Multiplication
=======
Percentage
>>>>>>> rebase-example
```

#### Step 3: Resolve Manually

**Option 1: Keep Both**
```bash
# Addition
# Subtraction
Multiplication
Percentage
```

**Option 2: Keep One**
```bash
# Addition
# Subtraction
Multiplication
```

**Option 3: Sit with Developers**
- Discuss which change to keep
- Understand both changes
- Make informed decision

---

#### Step 4: Mark as Resolved

```bash
# Add resolved file
git add calculator.sh
```

#### Step 5: Continue Merge/Rebase

**For Merge:**
```bash
git commit -m "Resolved merge conflict"
```

**For Rebase:**
```bash
git rebase --continue
```

---

### Conflict Resolution Best Practices

1. **Don't Panic** - Conflicts are normal
2. **Communicate** - Talk to other developers
3. **Understand Both Changes** - Know what each does
4. **Test After Resolution** - Ensure code still works
5. **Use Tools** - VS Code, GitKraken, etc.

---

## Interview Questions & Answers

### Q1: How do you initialize a Git repository?

**Answer:**

Use the `git init` command:

```bash
git init
```

**What happens:**
1. Creates `.git` folder in current directory
2. Git starts tracking the repository
3. Repository ready for version control

**Verification:**
```bash
ls -la
# You'll see .git folder
```

**Important:** The `.git` folder contains:
- Objects (tracked files)
- Refs (commit references)
- Hooks (pre/post commit scripts)
- Config (repository settings)
- HEAD (current branch pointer)

---

### Q2: What is the Git workflow in your organization?

**Answer:**

The standard Git workflow involves three main commands:

```bash
# 1. Stage changes
git add <file>

# 2. Commit with message
git commit -m "descriptive message"

# 3. Push to remote
git push
```

**Combined:**
```bash
git add . && git commit -m "Add new feature" && git push
```

**Detailed Workflow:**
1. **Modify files** locally
2. **Check status**: `git status`
3. **Review changes**: `git diff`
4. **Stage changes**: `git add`
5. **Commit**: `git commit -m "message"`
6. **Push to remote**: `git push`

---

### Q3: What is the difference between `git clone` and `git fork`?

**Answer:**

| Aspect | Git Clone | Git Fork |
|--------|-----------|----------|
| **Definition** | Download repository to local | Create copy on GitHub |
| **Location** | Your local machine | GitHub server |
| **Purpose** | Work locally | Create independent copy |
| **Ownership** | Original repo owner | You own the fork |
| **Command** | `git clone <url>` | Click "Fork" button on GitHub |
| **Updates** | Pull from original | Manual sync required |
| **Use Case** | Team collaboration | Open-source contribution |

**Clone Example:**
```bash
git clone https://github.com/kubernetes/kubernetes.git
```
- Downloads to local
- Work on code
- Push if you have permissions

**Fork Example:**
- Original: `kubernetes/kubernetes`
- Your fork: `your-username/kubernetes`
- Completely independent
- You have full control

**Key Difference:**
- **Clone** = Local copy
- **Fork** = GitHub copy (distributed version control)

---

### Q4: How do you create a branch and why?

**Answer:**

**Create Branch:**
```bash
# Create and switch
git checkout -b <branch-name>

# Or create only
git branch <branch-name>
```

**Why Create Branches:**

1. **Isolate Features**
   - Develop new features without affecting main code
   - Example: Amazon adding "House Services"

2. **Prevent Breaking Changes**
   - Test in isolation
   - Merge only when confident

3. **Parallel Development**
   - Multiple teams work simultaneously
   - No interference

4. **Safe Experimentation**
   - Try new ideas
   - Discard if doesn't work

**Real-World Example:**
```bash
# Main branch (production code)
git checkout main

# Create feature branch
git checkout -b feature-payment-gateway

# Develop for weeks/months
git add .
git commit -m "Add payment integration"

# Merge when ready
git checkout main
git merge feature-payment-gateway
```

---

### Q5: What is the difference between `git merge` and `git rebase`?

**Answer:**

Both combine branches, but differ in **commit organization**:

**Git Merge:**
- **Non-linear history**
- Merged commits appear **at the top**
- Preserves branch context
- Shows merge point
- Safe for shared branches

**Example:**
```bash
git checkout main
git merge feature-branch
```

**Result:**
```
Commit History:
- Feature commit (merged)
- Test commit (main)
- Previous commits
```

---

**Git Rebase:**
- **Linear history**
- Rebased commits appear **before** main commits
- Clean commit timeline
- No merge commits
- Rewrites history

**Example:**
```bash
git checkout main
git rebase feature-branch
```

**Result:**
```
Commit History:
- Test commit (main)
- Feature commit (rebased)
- Previous commits
```

---

**When to Use:**

**Use Merge:**
- ✅ Shared branches
- ✅ Preserve history
- ✅ Team collaboration

**Use Rebase:**
- ✅ Personal branches
- ✅ Clean history needed
- ✅ Large projects
- ✅ Before pushing to shared branch

**Critical:** Never rebase shared branches!

---

### Q6: What is `git cherry-pick` and when do you use it?

**Answer:**

**Cherry-Pick** = Select **specific commits** from one branch and apply to another.

**Command:**
```bash
git cherry-pick <commit-id>
```

**Example:**
```bash
# View commits in feature branch
git log feature-branch --oneline

# Output:
# abc123d Fix critical bug
# def456e Add new feature

# Pick only the bug fix
git checkout main
git cherry-pick abc123d
```

**When to Use:**
- ✅ **One or two commits** to move
- ✅ **Hotfix** from feature branch
- ✅ **Selective merging**
- ✅ **Specific bug fix** needed urgently

**When NOT to Use:**
- ❌ **Thousands of commits** (use merge/rebase)
- ❌ **Entire feature** (use merge)
- ❌ **Multiple related commits** (use merge)

**Why:**
- Cherry-picking 6,000 commits is impractical
- Time-consuming
- Error-prone
- Better to use `git merge` or `git rebase`

---

### Q7: How do you handle merge conflicts?

**Answer:**

**Steps to Resolve Conflicts:**

**1. Identify Conflict:**
```bash
git merge feature-branch
# CONFLICT (content): Merge conflict in file.sh
```

**2. Open Conflicted File:**
```bash
vim file.sh
```

**3. Locate Conflict Markers:**
```bash
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> feature-branch
```

**4. Resolve Manually:**
- **Option A:** Keep your changes
- **Option B:** Keep their changes
- **Option C:** Keep both
- **Option D:** Write new code

**5. Remove Conflict Markers:**
```bash
# Final code (example: keep both)
Your changes
Their changes
```

**6. Mark as Resolved:**
```bash
git add file.sh
```

**7. Complete Merge:**
```bash
git commit -m "Resolved merge conflict"
```

**Best Practices:**
- **Communicate** with team
- **Understand both changes**
- **Test after resolution**
- **Don't rush** - conflicts are normal

---

### Q8: What is the purpose of `.git` folder?

**Answer:**

The `.git` folder is the **heart of Git repository**. It contains:

**1. Objects:**
- All files tracked by Git
- Stored in compressed/encrypted format
- Handles millions of files efficiently

**2. Refs:**
- References to commits
- Branch pointers
- Tag references

**3. Hooks:**
- Pre-commit scripts
- Post-commit scripts
- Prevent sensitive data commits (passwords, API keys)

**4. Config:**
- Repository configuration
- Remote repository URLs
- User credentials
- TLS/SSL certificates

**5. HEAD:**
- Points to current branch
- Tracks current position

**Critical:**
- If you **delete `.git`**, Git stops tracking!
- Contains entire repository history
- Never modify manually (use Git commands)

---

### Q9: How do you authenticate with Git? (SSH vs HTTPS)

**Answer:**

**Two Authentication Methods:**

**1. HTTPS:**
```bash
git clone https://github.com/username/repo.git
```
- **Pros:** Simple, works everywhere
- **Cons:** Password required every time
- **Use Case:** Quick tasks, public repos

**2. SSH (Recommended):**
```bash
git clone git@github.com:username/repo.git
```
- **Pros:** No password, more secure, one-time setup
- **Cons:** Initial setup required
- **Use Case:** Daily work, private repos

**Setup SSH:**
```bash
# 1. Generate keys
ssh-keygen -t rsa -b 4096

# 2. View public key
cat ~/.ssh/id_rsa.pub

# 3. Add to GitHub
# Settings → SSH Keys → Add SSH Key

# 4. Verify
ssh -T git@github.com
```

**Recommendation:** Use SSH for production work.

---

### Q10: What is `git remote` and why is it important?

**Answer:**

**Git Remote** = Reference to remote repository (GitHub, GitLab, etc.).

**Commands:**

**View remotes:**
```bash
git remote -v
```

**Output:**
```
origin  https://github.com/user/repo.git (fetch)
origin  https://github.com/user/repo.git (push)
```

**Add remote:**
```bash
git remote add origin https://github.com/user/repo.git
```

**Why Important:**
- **Links local to remote** repository
- **Enables `git push`** and `git pull`
- **Collaboration** with team
- **Backup** on cloud

**Without Remote:**
- `git push` fails
- Can't share code
- Only local repository

**With Remote:**
- Share with team
- Backup code
- Collaborate effectively

---

## Command Reference

### Repository Management

```bash
# Initialize repository
git init

# Clone repository
git clone <url>

# Check status
git status

# View changes
git diff

# View commit history
git log
git log --oneline
git log --graph
```

---

### Staging and Committing

```bash
# Stage specific file
git add <file>

# Stage all files
git add .

# Commit with message
git commit -m "message"

# View commit history
git log
git log --oneline
```

---

### Remote Operations

```bash
# Add remote
git remote add origin <url>

# View remotes
git remote -v

# Push to remote
git push

# Push specific branch
git push origin <branch-name>

# Pull from remote
git pull
```

---

### Branch Management

```bash
# List branches
git branch

# Create branch
git branch <branch-name>

# Create and switch
git checkout -b <branch-name>

# Switch branches
git checkout <branch-name>

# Delete branch
git branch -d <branch-name>
```

---

### Merging

```bash
# Merge branch
git merge <branch-name>

# Rebase branch
git rebase <branch-name>

# Cherry-pick commit
git cherry-pick <commit-id>

# Abort merge
git merge --abort

# Continue rebase
git rebase --continue
```

---

### Advanced

```bash
# View branch commits
git log <branch-name> --oneline

# Stash changes
git stash

# Apply stashed changes
git stash apply

# Discard changes
git checkout <file>

# Reset to commit
git reset --hard <commit-id>
```

---

## Best Practices

### 1. Commit Messages

**Good:**
```bash
git commit -m "Add user authentication feature"
git commit -m "Fix login bug for mobile users"
git commit -m "Update README with installation steps"
```

**Bad:**
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

---

### 2. Frequent Commits

✅ **Do:** Commit small, logical changes  
❌ **Don't:** Wait until end of day

**Example:**
```bash
# After completing each function
git add calculator.sh
git commit -m "Add addition function"

# Later
git add calculator.sh
git commit -m "Add subtraction function"
```

---

### 3. Branch Naming

**Good Names:**
```
feature-user-auth
bugfix-login-error
hotfix-payment-crash
release-v2.0
```

**Bad Names:**
```
test
my-branch
new
fix
```

---

### 4. Pull Before Push

```bash
# Always pull first
git pull

# Then push
git push
```

**Why:** Avoid conflicts and ensure you have latest code.

---

### 5. Never Commit Secrets

❌ **Never commit:**
- Passwords
- API keys
- Private keys
- Credentials

✅ **Use:**
- `.gitignore` file
- Environment variables
- Secret management tools
- Git hooks

---

### 6. Use `.gitignore`

**Example `.gitignore`:**
```
# Dependencies
node_modules/
venv/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

---

### 7. Review Before Commit

```bash
# Always review changes
git diff

# Check what's staged
git status

# Then commit
git commit -m "message"
```

---

### 8. Rebase vs Merge

**Use Rebase:**
- ✅ Personal feature branches
- ✅ Clean history needed
- ✅ Before merging to main

**Use Merge:**
- ✅ Shared branches
- ✅ Preserve history
- ✅ Team collaboration

**Never:**
- ❌ Rebase shared branches
- ❌ Rebase public commits

---

## Troubleshooting

### Problem 1: `git push` Not Working

**Error:**
```
fatal: No configured push destination
```

**Solution:**
```bash
# Add remote
git remote add origin <url>

# Verify
git remote -v

# Push
git push -u origin main
```

---

### Problem 2: Merge Conflicts

**Error:**
```
CONFLICT (content): Merge conflict in file.sh
```

**Solution:**
1. Open conflicted file
2. Resolve conflicts manually
3. Remove conflict markers
4. `git add <file>`
5. `git commit` or `git rebase --continue`

---

### Problem 3: Wrong Commit Message

**Solution:**
```bash
# Amend last commit
git commit --amend -m "Correct message"
```

---

### Problem 4: Accidentally Committed Secrets

**Solution:**
```bash
# Remove from history (careful!)
git filter-branch --index-filter \
  "git rm -rf --cached --ignore-unmatch <file>" HEAD

# Better: Use BFG Repo-Cleaner
# Or contact security team immediately
```

---

### Problem 5: Lost Commits

**Solution:**
```bash
# View reflog
git reflog

# Recover commit
git checkout <commit-id>
```

---

## Additional Resources

### Official Git Documentation
- [Git SCM](https://git-scm.com/)
- [Git Reference](https://git-scm.com/docs)
- [Pro Git Book](https://git-scm.com/book/en/v2) (Free)

### GitHub Resources
- [GitHub Docs](https://docs.github.com/)
- [GitHub Skills](https://skills.github.com/)
- [GitHub CLI](https://cli.github.com/)

### Practice Resources
- Try Git commands on real projects
- Contribute to open-source
- Practice with sample repositories
- Use Git visualizers (e.g., Git Graph)

---

## Key Takeaways

1. **Git Workflow:** `add → commit → push`
2. **Clone vs Fork:** Local copy vs GitHub copy
3. **Merge vs Rebase:** Non-linear vs Linear history
4. **Cherry-Pick:** For selective commits
5. **Conflicts:** Normal and resolvable
6. **Authentication:** SSH > HTTPS
7. **Branches:** Isolate development
8. **Commit Messages:** Be descriptive
9. **`.git` Folder:** Heart of repository
10. **Practice:** Best way to learn

---

## What's Next?

**Future Topics:**
- Advanced Git commands
- Git workflows (Gitflow, GitHub Flow)
- Pull requests and code reviews
- Git hooks in detail
- CI/CD with Git
- Git best practices for teams
- Troubleshooting complex scenarios

---

**Practice Exercise:**

1. ✅ Initialize a repository
2. ✅ Create multiple branches
3. ✅ Practice merge and rebase
4. ✅ Resolve conflicts manually
5. ✅ Set up SSH authentication
6. ✅ Clone an open-source project
7. ✅ Use cherry-pick
8. ✅ Write good commit messages

---

**End of Day 11 Notes**

---

## Quick Reference Card

```bash
# ESSENTIALS
git init                        # Initialize repo
git add <file>                  # Stage file
git commit -m "msg"             # Commit
git push                        # Push to remote
git pull                        # Pull from remote
git status                      # Check status
git log --oneline               # View history

# BRANCHING
git branch                      # List branches
git checkout -b <branch>        # Create & switch
git merge <branch>              # Merge
git rebase <branch>             # Rebase
git cherry-pick <commit>        # Pick commit

# REMOTE
git clone <url>                 # Clone repo
git remote -v                   # View remotes
git remote add origin <url>     # Add remote

# TROUBLESHOOTING
git diff                        # View changes
git stash                       # Stash changes
git reset --hard <commit>       # Reset to commit
```

**Remember:**
- **Add** - Stage changes
- **Commit** - Create version
- **Push** - Share with team
- **Pull** - Get updates
- **Branch** - Isolate work
- **Merge/Rebase** - Combine work
