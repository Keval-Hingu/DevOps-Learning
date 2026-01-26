# Day 9 - Git and GitHub Fundamentals

**Instructor:** Abhishek  
**Course:** DevOps Zero to Hero  
**Topic:** Git, GitHub, and Version Control Systems  
**Video:** [Day-9 | Git and GitHub | What is GIT ? | What is Version Control ?](https://www.youtube.com/watch/fIMySI_gZJU)

---

## Table of Contents
1. [What is Version Control System?](#what-is-version-control-system)
2. [Problems Solved by Version Control](#problems-solved-by-version-control)
3. [Centralized vs Distributed Version Control](#centralized-vs-distributed-version-control)
4. [Git vs GitHub](#git-vs-github)
5. [Git Installation](#git-installation)
6. [Essential Git Commands](#essential-git-commands)
7. [Git Lifecycle](#git-lifecycle)
8. [GitHub Repository Creation](#github-repository-creation)
9. [Key Concepts](#key-concepts)
10. [Interview Questions](#interview-questions)

---

## What is Version Control System?

**Version Control System (VCS)** is a fundamental concept that forms the core of Git and GitHub. It has become extremely popular in modern software development.

### Why Version Control?

Version Control System addresses **two major problems**:

1. **Sharing of Code**
2. **Versioning**

---

## Problems Solved by Version Control

### Problem 1: Sharing of Code

#### Scenario:
- **Developer 1** and **Developer 2** work in the same team
- Both are building a **Calculator Application**
- Dev 1 writes **Addition functionality**
- Dev 2 writes **Subtraction functionality**

#### The Challenge:
- Both need to combine their code to build a complete application
- Simply sharing via Gmail or Slack is impractical

#### Why Simple Sharing Doesn't Work:
- In real-world scenarios (Amazon, Flipkart, MNCs):
  - **Hundreds of packages**
  - **Thousands of files**
  - **Complex dependencies** (JAR files, etc.)
  - Dev 1 might change 25 files
  - Dev 2 might change 32 files
- Sharing individual files becomes **practically impossible**

**Solution:** Version Control System provides efficient code sharing mechanisms.

---

### Problem 2: Versioning

#### Scenario:
Developer working on Addition functionality:

**Day 1:** Addition of two numbers
```
a + b
```

**Day 2:** Manager requests - Addition of three numbers
```
a + b + c
```

**Day 3:** Updated to - Addition of four numbers
```
a + b + c + d
```

**Day 5:** Customer feedback - Go back to addition of two numbers (original version)

#### The Challenge:
- Need to track **multiple versions** of code
- Must be able to **go back** to previous versions (10, 20, or 50 days back)
- In reality:
  - **Day 1:** Modify 100 files
  - **Day 2:** Modify 5 files
  - **Day 3:** Modify 50 files
- How to keep track of all changes?

**Solution:** Version Control System maintains version history and allows rollback.

---

## Centralized vs Distributed Version Control

### Evolution of Version Control Systems

```
Version Control World
│
├── CVS (Centralized)
├── SVN (Centralized)
└── Git (Distributed) ← Most Popular Today
```

### Centralized Version Control System (CVS, SVN)

#### Architecture:
```
Dev 1 ──────┐
            │
            ├──── Central SVN Server
            │
Dev 2 ──────┘
```

#### How it Works:
- All code sharing happens through a **central server**
- Dev 1 wants to share code → Uploads to SVN
- Dev 2 needs code → Downloads from SVN
- **Everything goes through the central server**

#### Problems:
1. **Single Point of Failure**
   - If SVN/CVS server goes down → No communication between developers
   - System administrators manage these servers
   - Servers can go down anytime (they're just applications)

2. **No Alternative Path**
   - Dev A and Dev B cannot communicate if central server is offline
   - Work stops completely

---

### Distributed Version Control System (Git)

#### Architecture:
```
        Distributed Git System
               │
    ┌──────────┼──────────┐
    │          │          │
  Dev 1      Dev 2    Fork (Copy)
    │          │          │
  Fork 1    Fork 2    Fork 3
```

#### How it Works:
- Developers can create **multiple copies** (forks) of the repository
- Can communicate through:
  - Main distributed system
  - Their own forks
  - Other developers' forks

#### Advantages:
1. **No Single Point of Failure**
   - Multiple copies exist
   - If one goes down, others remain available

2. **Flexibility**
   - Can create unlimited copies
   - Code is distributed across multiple locations

3. **Continued Operation**
   - Even if main repository is down, work can continue
   - Developers can sync from their forks

---

### What is a Fork?

**Fork** = Complete copy of the original repository

#### Example:
- Organization: **example.com**
- Main repository: **X Git Repository**
- Developer creates fork: **Fork-Abhishek**
  - Contains **entire codebase**
  - If main repository goes down, fork still has all code
  - Code is **distributed**, not centralized

**Interview Question:** What is a Fork?
- **Answer:** A fork is a complete copy of a repository, including all code and history, allowing distributed development and serving as a backup.

---

## Git vs GitHub

### What is Git?

- **Git** is a **Distributed Version Control System**
- **Open Source** tool
- Can be downloaded and installed anywhere
- Command-line tool

### How Organizations Use Git:

1. Create an EC2 instance (or any server)
2. Install Git on the server
3. Developers (Dev 1, Dev 2, Dev 3) commit changes to this Git server

```
    EC2 Instance (Git Installed)
           │
    ┌──────┼──────┐
    │      │      │
  Dev 1  Dev 2  Dev 3
```

---

### What is GitHub?

GitHub is a **solution built on top of Git** that provides:

1. **Better Usability**
   - User-friendly web interface
   - Visual representation of repositories

2. **Collaboration Features**
   - Raising issues
   - Commenting on code
   - Code reviews
   - Peer discussions

3. **Project Management**
   - Project tracking
   - Task management
   - Milestones

4. **Additional Services**
   - CI/CD integration
   - Security features
   - File sharing

### Similar Platforms:
- **GitLab** - Built on top of Git
- **Bitbucket** - Built on top of Git
- All use Git fundamentals but add their own features

### Can You Use Git Without GitHub?

**Yes!** You can:
- Download an EC2 instance or VM
- Install open-source Git
- Get a basic UI
- Start working

**But** GitHub/GitLab/Bitbucket provide:
- Enhanced features
- Better collaboration
- Managed infrastructure
- No maintenance overhead

---

## Git Installation

### Download Git

Visit: **[git-scm.com/downloads](https://git-scm.com/downloads)**

### Installation Options:

#### **Windows:**
- Download Windows installer
- Run installation wizard

#### **macOS:**
- Download macOS installer
- Or use: `brew install git`

#### **Linux:**
Choose based on distribution:

**Debian/Ubuntu:**
```bash
sudo apt-get update
sudo apt-get install git
```

**Red Hat/CentOS:**
```bash
sudo yum install git
```

**Fedora:**
```bash
sudo dnf install git
```

### Verify Installation:
```bash
git --version
```

Or simply type:
```bash
git
```
You should see a list of available Git commands.

---

## Essential Git Commands

### The Three Core Commands:

Every DevOps Engineer, Developer, or anyone working with Git **must know**:

1. **`git add`** - Stage changes
2. **`git commit`** - Save version
3. **`git push`** - Share with remote repository

---

## Git Lifecycle

### Step 1: Initialize Git Repository

Create a project folder:
```bash
mkdir example.com
cd example.com
```

Create a file:
```bash
vim calculator.sh
```

Add initial code:
```bash
#!/bin/bash
# Addition of two numbers
x=a+b
```

Initialize Git:
```bash
git init
```

**Output:** `Initialized empty Git repository`

This creates a hidden **`.git`** folder:
```bash
ls -la
```

---

### Understanding the `.git` Folder

The `.git` folder contains:

```
.git/
├── refs/         # References to commits
├── objects/      # All files tracked as objects
├── hooks/        # Pre/post commit scripts (prevent password commits)
├── config        # Git credentials, TLS certificates
└── HEAD          # Current branch pointer
```

**Important:** If you delete `.git` folder, Git stops tracking your repository!

---

### Step 2: Check Repository Status

```bash
git status
```

**Output:**
```
Untracked files:
  calculator.sh

nothing added to commit but untracked files present
(use "git add" to track)
```

**What Git is Saying:**
- "I see a file `calculator.sh`"
- "Do you want me to track this file?"
- "Use `git add` to start tracking"

---

### Step 3: Track Files with `git add`

Add file to tracking:
```bash
git add calculator.sh
```

Check status again:
```bash
git status
```

**Output:**
```
Changes to be committed:
  new file: calculator.sh
```

**What Git is Saying:**
- "I'm now tracking `calculator.sh`"
- "File is staged and ready to commit"

---

### Step 4: Commit Changes (Create Version)

```bash
git commit -m "This is my first version of addition"
```

Check status:
```bash
git status
```

**Output:**
```
On branch main
nothing to commit, working tree clean
```

**What Git is Saying:**
- "All changes are committed"
- "No pending changes"

---

### Step 5: Make Changes and Track Differences

Modify the file:
```bash
vim calculator.sh
```

Change to:
```bash
#!/bin/bash
# Addition of three numbers
x=a+b+c
```

Check status:
```bash
git status
```

**Output:**
```
modified: calculator.sh
```

Check what changed:
```bash
git diff
```

**Output:**
```
- x=a+b
+ x=a+b+c
```

**What `git diff` shows:**
- Lines with `-` are removed
- Lines with `+` are added

---

### Step 6: Add and Commit New Version

```bash
git add calculator.sh
git commit -m "This is my second version - addition of three numbers"
```

---

### Step 7: View Commit History

```bash
git log
```

**Output:**
```
commit abc123... (HEAD -> main)
Author: Abhishek
Date: ...

    This is my second version

commit def456...
Author: Abhishek  
Date: ...

    This is my first version of addition
```

**What `git log` shows:**
- **Commit ID** (unique identifier)
- **Author** information
- **Date** of commit
- **Commit message**

---

### Step 8: Revert to Previous Version

Add subtraction functionality:
```bash
vim calculator.sh
```

```bash
#!/bin/bash
x=a+b+c
y=a-b  # Subtraction
```

Now, product owner says: **"Go back to first version (only a+b)"**

View commit history:
```bash
git log
```

Copy the commit ID of the first version.

Reset to that version:
```bash
git reset --hard <commit-id>
```

Example:
```bash
git reset --hard def456
```

Verify:
```bash
cat calculator.sh
```

**Output:**
```bash
#!/bin/bash
x=a+b
```

**Success!** You've reverted to the first version.

---

### How Git Tracks Everything

Git uses the **`.git/objects`** folder:
- Every file is stored as an **object**
- Changes are tracked in compressed/encrypted format
- Can handle:
  - 100 files
  - 1,000 files
  - 1,000,000 files
- Git efficiently manages entire project history

---

## Complete Git Workflow Summary

### Local Git Workflow:

```
1. Create/Modify Files
         ↓
2. git add <file>        # Stage changes
         ↓
3. git status            # Check status
         ↓
4. git diff              # View changes
         ↓
5. git commit -m "msg"   # Create version
         ↓
6. git log               # View history
         ↓
7. git reset --hard <id> # Revert if needed
```

---

## GitHub Repository Creation

### Why Use GitHub?

Local Git handles **versioning**, but for **sharing code**, you need:
- **Distributed System** (GitHub, GitLab, Bitbucket, Self-hosted Git)

### Steps to Create GitHub Repository:

#### 1. Create GitHub Account

- Go to **[github.com](https://github.com)**
- Click **"Sign Up"**
- Enter email
- Answer verification questions
- Account created!

#### 2. Create New Repository

- Click **GitHub icon** (home)
- Click **"New"** button (to create repository)

#### 3. Repository Settings

**Repository Name:**
```
abhishek-shell-example-project
```

**Description:**
```
This is a sample shell scripting project demonstrating calculator functionality.
```

**Visibility:**
- **Public** - Anyone can see (open to world)
  - In organizations, visible to all org members
- **Private** - Only you and invited users can see

**Initialize with:**
- ☑️ **README.md** - Provides metadata/documentation
  - Example: "This is my first shell scripting program"
  - "Calculator with 4 functionalities: add, subtract, multiply, divide"

#### 4. Click "Create Repository"

**Repository Created!**

---

### Working with GitHub Repository

#### Option 1: Push Local Code to GitHub

Already have local code? Push it to GitHub:
```bash
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

#### Option 2: Start Fresh on GitHub

Create files directly on GitHub:
- Click **"Add file"**
- Create **calculator.sh**
- Add your code
- Commit changes

---

### GitHub Features

#### **Fork**
- Create a complete copy of a repository
- Collaborate independently
- Visible in your account

**To Fork:**
- Click **"Fork"** button on any repository
- Creates copy in your account

#### **Collaboration**
- Multiple developers can work on the same repository
- Share code efficiently
- Use forks to collaborate

---

## Key Concepts

### 1. **Git Repository**
- Folder tracked by Git
- Contains `.git` folder
- Manages version history

### 2. **Untracked Files**
- Files Git doesn't monitor
- Use `git add` to start tracking

### 3. **Staged Files**
- Files added with `git add`
- Ready to be committed

### 4. **Commit**
- Snapshot of code at a point in time
- Creates a version
- Has unique commit ID

### 5. **Commit ID**
- Unique identifier (hash)
- Used to reference specific versions
- Example: `abc123def456...`

### 6. **Branch**
- Parallel version of code
- Default branch: `main` (or `master`)
- Allows isolated development

### 7. **HEAD**
- Pointer to current commit
- Shows where you are in history

### 8. **Distributed System**
- Code exists in multiple places
- GitHub, GitLab, Bitbucket
- No single point of failure

### 9. **Fork**
- Complete copy of repository
- Independent from original
- Can sync changes

---

## Interview Questions

### Q1: What is the difference between Centralized and Distributed Version Control Systems?

**Answer:**

**Centralized VCS (SVN, CVS):**
- Single central server
- All operations go through central server
- If server goes down, no collaboration possible
- Single point of failure

**Distributed VCS (Git):**
- Multiple copies of repository
- Can work offline
- No single point of failure
- Can create forks
- Better collaboration

---

### Q2: What is a Fork?

**Answer:**
A fork is a complete copy of a repository that includes:
- Entire codebase
- All commit history
- All branches

**Purpose:**
- Create independent development space
- Backup of original repository
- Contribute to open-source projects
- Experiment without affecting original

**Example:**
- Main repo: `example.com/project`
- Your fork: `your-username/project`

---

### Q3: What is the difference between Git and GitHub?

**Answer:**

**Git:**
- Distributed Version Control System
- Open-source tool
- Command-line interface
- Can be installed anywhere
- Core version control functionality

**GitHub:**
- Web platform built on Git
- Provides UI for Git
- Additional features:
  - Code review
  - Issue tracking
  - Project management
  - CI/CD integration
  - Collaboration tools
- Hosted solution (no server maintenance)

**Similar Platforms:** GitLab, Bitbucket

---

### Q4: What are the essential Git commands every developer should know?

**Answer:**

**The Big Three:**
1. `git add` - Stage changes
2. `git commit` - Create version/snapshot
3. `git push` - Upload to remote repository

**Other Important Commands:**
- `git init` - Initialize repository
- `git status` - Check current state
- `git diff` - View changes
- `git log` - View commit history
- `git reset` - Revert changes

---

### Q5: Explain the Git workflow from creating a file to committing it.

**Answer:**

**Step-by-step:**

1. **Create/Modify File:**
   ```bash
   vim myfile.txt
   ```

2. **Check Status:**
   ```bash
   git status  # Shows untracked file
   ```

3. **Stage File:**
   ```bash
   git add myfile.txt
   ```

4. **Verify Staging:**
   ```bash
   git status  # Shows staged file
   ```

5. **Commit:**
   ```bash
   git commit -m "Add myfile.txt"
   ```

6. **Verify Clean State:**
   ```bash
   git status  # Working tree clean
   ```

---

## Git Commands Reference

### Repository Management

| Command | Description |
|---------|-------------|
| `git init` | Initialize new Git repository |
| `git status` | Show working tree status |
| `git log` | View commit history |
| `git diff` | Show changes between commits/files |

### Staging and Committing

| Command | Description |
|---------|-------------|
| `git add <file>` | Stage specific file |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit staged changes |
| `git reset --hard <commit-id>` | Reset to specific commit |

### Remote Operations (Coming in Next Class)

| Command | Description |
|---------|-------------|
| `git push` | Upload local commits to remote |
| `git pull` | Download and merge remote changes |
| `git clone` | Copy remote repository locally |
| `git remote` | Manage remote repositories |

---

## What's Coming Next?

### Day 10 - Deep Dive into GitHub:

Topics to be covered:
1. **GitHub Features**
   - Why GitHub is more popular than GitLab/Bitbucket
   - Advanced GitHub options

2. **User Management**
   - Creating users
   - Managing organizations
   - Access control

3. **Collaboration**
   - What are Issues?
   - What are Pull Requests?
   - Code review process

4. **GitHub Actions (CI/CD)**
   - Basic introduction
   - How GitHub CI/CD works

5. **Project Management**
   - Project boards
   - Task tracking
   - Milestones

6. **Security Features**
   - Security scanning
   - Dependency management
   - Secret management

7. **File Sharing**
   - Sharing files within teams
   - Collaboration best practices

---

## Additional Git Commands (Future Topics)

Commands to be covered in upcoming classes:
- `git branch` - Branch management
- `git merge` - Merge branches
- `git rebase` - Reapply commits
- `git stash` - Temporarily save changes
- `git cherry-pick` - Apply specific commits
- `git tag` - Mark release points
- `git fetch` - Download remote changes
- Advanced reset options

---

## Best Practices

### 1. **Write Meaningful Commit Messages**
```bash
# Good
git commit -m "Add user authentication feature"

# Bad
git commit -m "Updated files"
```

### 2. **Commit Often**
- Small, logical commits
- Easier to track changes
- Simpler to revert if needed

### 3. **Use `.gitignore`**
- Exclude files you don't want to track
- Examples: logs, temporary files, credentials

### 4. **Always Check `git status`**
- Before adding files
- Before committing
- To verify clean state

### 5. **Review Changes with `git diff`**
- Before staging
- Catch unintended changes
- Understand what you're committing

---

## Common Workflow Example

### Real-World Scenario:

```bash
# 1. Start working
cd my-project

# 2. Check current status
git status

# 3. Create/modify files
vim feature.js

# 4. Check what changed
git diff

# 5. Stage changes
git add feature.js

# 6. Verify staging
git status

# 7. Commit with message
git commit -m "Implement new feature X"

# 8. View history
git log

# 9. (Later) Push to GitHub
git push origin main
```

---

## Why Version Control is Critical

### Without Version Control:
- ❌ No change history
- ❌ Difficult collaboration
- ❌ Can't revert mistakes
- ❌ Risk of code loss
- ❌ Merge conflicts nightmare

### With Version Control (Git):
- ✅ Complete history
- ✅ Easy collaboration
- ✅ Revert anytime
- ✅ Code safely stored
- ✅ Managed merging
- ✅ Multiple developers working simultaneously

---

## Key Takeaways

1. **Version Control Solves Two Problems:**
   - Sharing code efficiently
   - Managing versions/history

2. **Git is Distributed:**
   - No single point of failure
   - Multiple copies (forks) possible
   - Better than centralized systems (SVN, CVS)

3. **Git ≠ GitHub:**
   - Git: Core version control tool
   - GitHub: Platform built on Git with extra features

4. **Essential Commands:**
   - `git init`, `git add`, `git commit`
   - `git status`, `git diff`, `git log`

5. **GitHub Enables:**
   - Code sharing
   - Team collaboration
   - Project management
   - Open-source contributions

6. **Version Control is Essential:**
   - Every modern development team uses it
   - Industry standard skill
   - Enables distributed development

---

## Resources

- **Git Official Site:** [git-scm.com](https://git-scm.com)
- **Git Documentation:** [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub:** [github.com](https://github.com)
- **GitLab:** [gitlab.com](https://gitlab.com)
- **Bitbucket:** [bitbucket.org](https://bitbucket.org)

---

## Next Steps

1. **Practice Git Commands:**
   - Create a local repository
   - Make commits
   - Practice reverting

2. **Create GitHub Account:**
   - Sign up at github.com
   - Create your first repository

3. **Experiment:**
   - Create files
   - Make changes
   - Use git commands

4. **Prepare for Day 10:**
   - GitHub deep dive
   - Advanced collaboration features
   - CI/CD basics

---

**End of Day 9 Notes**

---

## Quick Command Cheat Sheet

```bash
# Initialize repository
git init

# Check status
git status

# Stage file
git add <filename>
git add .              # Add all files

# Commit changes
git commit -m "message"

# View history
git log

# View changes
git diff

# Revert to previous version
git reset --hard <commit-id>

# Create GitHub repo (via web)
# Push to GitHub (covered in Day 10)
git push origin main
```

---

**Remember:** Practice is key! Create repositories, make commits, and experiment with Git commands to build muscle memory.
