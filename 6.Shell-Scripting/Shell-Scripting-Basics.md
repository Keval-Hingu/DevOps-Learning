# Shell Scripting - Practical Guide

> **Prerequisites:** For Linux OS fundamentals and architecture, see [Linux-OS-Fundamentals.md](Linux-OS-Fundamentals.md)

## Table of Contents
1. [Essential Linux Commands](#essential-linux-commands)
2. [System Monitoring Commands](#system-monitoring-commands)
3. [File Permissions](#file-permissions---chmod-command)
4. [Writing Shell Scripts](#writing-your-first-shell-script)
5. [Real-World Examples](#real-world-devops-scenario)

---

## Essential Linux Commands

### File Management Commands

### 1. `ls` - List Files and Directories
```bash
ls              # List files and folders
ls -ltr         # List with details (permissions, owner, group, timestamp)
```
**Details shown:** Permissions, owner, group, file size, creation time

### 2. `touch` - Create a File
```bash
touch filename.txt          # Create a single file
touch file1 file2 file3     # Create multiple files
```
**Note:** `touch` only creates files, doesn't open them (useful for automation)

### 3. `man` - Manual/Documentation
```bash
man ls          # Show manual for ls command
man touch       # Show manual for touch command
man chmod       # Show manual for chmod command
```
**Use:** Get detailed information about any command

### 4. `vi/vim` - Text Editor
```bash
vi filename.sh      # Open file with vi
vim filename.sh     # Open file with vim (more user-friendly)
```

**Vim Commands:**
- Press `ESC` then `i` - Enter INSERT mode (to write)
- Press `ESC` then `:wq!` - Write and Quit (save the file)
- Press `ESC` then `:q!` - Quit without saving
- `vim filename.sh` - Creates file if it doesn't exist and opens it

**Difference between `touch` and `vim`:**
- `touch`: Only creates file (used in automation)
- `vim`: Creates AND opens file (can cause issues when creating thousands of files)

### 5. `cat` - Display File Contents
```bash
cat filename.sh     # Print file contents without opening
```
**Use:** Quick way to view file contents without editing

### 6. `pwd` - Present Working Directory
```bash
pwd     # Shows current directory path
```
**Already covered in Navigation section above - see complete examples there**

### 7. `mkdir` - Make Directory
```bash
mkdir folder_name           # Create a single folder
mkdir folder1 folder2       # Create multiple folders
mkdir "my first folder"     # Create folder with spaces (use quotes)
```

**Example:**
```bash
mkdir abhishek1
ls                          # Verify folder created
```

### 8. `cd` - Change Directory
**Already covered in Navigation section above - see complete examples there**

### 9. `vi` - Text Editor (Create and Write Files)

**Creating and Writing to a File:**
```bash
vi test         # Opens/creates file named 'test'
```

**Step-by-Step Process:**

1. **Open file:** `vi filename`
2. **Enter INSERT mode:** Press `ESC` then `i`
   - You'll see `-- INSERT --` at bottom of screen
3. **Write content:**
   ```
   hi I am Keval
   This is my first file
   ```
4. **Save and exit:** Press `ESC` then type `:wq!`
   - `:wq!` = Write, Quit, Force

**Other vi/vim Commands:**
- `:q!` - Quit without saving
- `:w` - Save without quitting
- `ESC` - Exit current mode (always press ESC first)

**Why this process?**
Linux needs to know your intention:
- **Read** the file?
- **Write** to the file?
- **Copy** from the file?

That's why you explicitly enter INSERT mode.

### 10. `rm` - Remove Files/Directories
```bash
rm filename             # Remove a file
rm -r folder_name       # Remove directory (recursive)
rm -rf folder_name      # Remove directory forcefully (no confirmation)
```

**Flags:**
- `-r`: Recursive (required for directories)
- `-f`: Force (no confirmation prompt)

**Example:**
```bash
mkdir abhishek1         # Create directory
rm -r abhishek1         # Delete directory
```

### 11. `history` - Command History
```bash
history     # Show all previously executed commands
```
**Use:** Recall commands you've used before

---

## System Monitoring Commands

### Overview

Just like Windows Task Manager shows CPU, RAM, and disk usage, Linux has command-line tools for system monitoring.

**Windows Approach:**
- Right-click taskbar → Task Manager
- System Properties → See RAM size
- Compare used vs total

**Linux Approach:**
- Use terminal commands
- No GUI needed
- Faster and more detailed

### 1. `free` - Memory Information

```bash
free            # Shows memory in KB
free -m         # Shows memory in MB
free -g         # Shows memory in GB
free -h         # Human-readable format (auto-scales)
```

**Example Output:**
```
              total        used        free      shared  buff/cache   available
Mem:           7.6G        1.9G        5.8G        256M        1.2G        6.1G
Swap:          2.0G          0B        2.0G
```

**What it shows:**
- **Total memory** - Total RAM installed
- **Used** - Currently used RAM
- **Free** - Available RAM
- **Shared** - Memory used by tmpfs
- **Buff/cache** - Cached memory
- **Available** - Usable memory for new applications

### 2. `nproc` - CPU Count

```bash
nproc       # Shows number of CPU cores/processors
```

**Example Output:** `1` (means 1 CPU core)

**Use:** Quickly check how many CPUs your server has

### 3. `df` - Disk Space Usage

```bash
df              # Disk space in bytes
df -h           # Human-readable format (GB, MB)
```

**Example Output:**
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1      7.6G  1.9G  5.8G  24% /
```

**What it shows:**
- **Size** - Total disk space
- **Used** - Space used
- **Avail** - Available space
- **Use%** - Percentage used
- **Mounted on** - Mount point

### 4. `top` - Real-Time Process Monitor

```bash
top         # Opens interactive process monitor
```

**What it shows (All-in-One):**
- **CPU usage** - Overall and per-process
- **Memory usage** - RAM consumption
- **Process details** - PID, user, CPU%, memory%, command
- **Running processes** - What's currently executing
- **System uptime** - How long system has been running
- **Load average** - System load

**Example Output:**
```
Tasks: 625 total,   5 running, 622 sleeping
%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.5 id
MiB Mem :   7680 total,   5800 free,   1900 used
MiB Swap:   2048 total,   2048 free,      0 used

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 ubuntu    20   0  162940   2212   1500 R   1.3   0.0   0:00.45 top
 5678 ubuntu    20   0 1234567  89012  12345 S   0.7   1.1   1:23.45 python
```

**Exit top:** Press `q`

### Interview Question: How to Monitor System Health?

**Question:** *What commands do you use to check CPU, memory, and disk on a Linux server?*

**Answer:**
- **Memory:** `free -h` - Shows RAM usage in human-readable format
- **CPU:** `nproc` - Shows number of CPU cores
- **Disk:** `df -h` - Shows disk space usage
- **Overall:** `top` - Real-time monitoring of CPU, memory, and processes (all-in-one)

### Comparison: Individual Commands vs `top`

| What to Check | Individual Command | `top` Command |
|---------------|-------------------|---------------|
| Memory | `free -h` | ✓ Included |
| CPU Count | `nproc` | ✓ Included |
| CPU Usage | N/A | ✓ Included |
| Disk Space | `df -h` | ✗ Not included |
| Processes | `ps aux` | ✓ Included |
| Real-time | No | Yes |

**Best Practice:** Use `top` for quick system health check, use individual commands for specific details.

---

## File Permissions - `chmod` Command

### Understanding chmod

**chmod** = **C**hange **M**ode (Change permissions)

Linux has strict security - even the file creator needs permission to execute files.

### Permission Categories (3 Groups)
1. **Owner/User** - Person who created the file
2. **Group** - Group the owner belongs to
3. **Everyone/Others** - All other users on the system

### Permission Formula: 4-2-1
- **4** = Read (r)
- **2** = Write (w)
- **1** = Execute (x)

### Common Permission Examples

```bash
chmod 777 filename.sh       # Full permissions to everyone
```
**Breakdown of 777:**
- First 7: Owner gets Read(4) + Write(2) + Execute(1) = 7
- Second 7: Group gets Read(4) + Write(2) + Execute(1) = 7
- Third 7: Others get Read(4) + Write(2) + Execute(1) = 7

```bash
chmod 755 filename.sh       # Owner: full, Group & Others: read+execute
```
**Breakdown of 755:**
- 7 (Owner): Read + Write + Execute
- 5 (Group): Read(4) + Execute(1) = 5
- 5 (Others): Read(4) + Execute(1) = 5

```bash
chmod 444 filename.sh       # Everyone can only read
```
**Breakdown of 444:**
- 4 (Owner): Read only
- 4 (Group): Read only
- 4 (Others): Read only

```bash
chmod 771 filename.sh       # Owner & Group: full, Others: execute only
```

---

## Writing Your First Shell Script

### Step 1: Create the file
```bash
vim first-script.sh
```

### Step 2: Add Shebang and Code
```bash
#!/bin/bash

# This is a comment - won't be executed
echo "My name is Abhishek"
```

### Step 3: Save the file
Press `ESC` then type `:wq!`

### Step 4: Grant Execute Permission
```bash
chmod 777 first-script.sh
```

### Step 5: Execute the Script
```bash
./first-script.sh       # Option 1: Using ./
sh first-script.sh      # Option 2: Using sh prefix
```

---

## Understanding Shebang (`#!`)

### What is Shebang?
The first line in every shell script: `#!/bin/bash`

### Purpose
Tells Linux **which executable/interpreter** to use for running the script.

### Different Shell Types
- **bash** - Bourne Again Shell (most popular)
- **sh** - Shell
- **ksh** - Korn Shell
- **dash** - Debian Almquist Shell
- **tcsh** - TENEX C Shell

### Important Notes

**Always use `#!/bin/bash` for bash scripting**

```bash
#!/bin/bash     # Correct - Explicitly uses bash
#!/bin/sh       # Not recommended - might use dash on some systems
```

**Why the difference matters:**

**Historical Context:**
- Previously: `/bin/sh` was linked to `/bin/bash` (both were same)
- Now: Some OS (like Ubuntu) link `/bin/sh` to `/bin/dash`
- Syntax differs between bash and dash
- Your script might fail if written for bash but executed with dash

**Best Practice:** Always explicitly specify `#!/bin/bash`

---

## Comments in Shell Scripts

```bash
# This is a single-line comment

# Comments help others understand your code
# Shell ignores lines starting with #
```

---

## Practical Shell Script Example

### Script to Create Folder and Files

```bash
#!/bin/bash

# Create a folder
mkdir Keval

# Go into the folder
cd Keval

# Create two files
touch first_file
touch second_file
```

**Save as:** `sample-script.sh`

**Execute:**
```bash
chmod 777 sample-script.sh
./sample-script.sh
```

**Result:**
- Creates folder named "Abhishek"
- Creates two files inside: first_file and second_file

---

## DevOps Use Case Example

### Scenario: Node Health Monitoring

**Problem:** DevOps engineer manages 10,000 Linux VMs. Developers report performance issues.

**Solution:** Write a shell script that:
1. Logs into all 10,000 VMs automatically
2. Checks CPU, memory, and process status
3. Identifies problematic nodes
4. Sends email notification with results

**Benefits:**
- Automates manual checking
- Runs periodically via cron jobs
- Proactive monitoring instead of reactive
- Saves hours of manual work

---

## Key Interview Questions

### Q1: What is the difference between `/bin/bash` and `/bin/sh`?

**Answer:**
- `/bin/bash` - Explicitly uses Bash shell
- `/bin/sh` - Previously linked to bash, but now some OS link it to dash
- Always use `/bin/bash` for bash scripts to avoid compatibility issues
- Syntax differs between different shells

### Q2: How do you monitor node health in Linux?

**Answer:**
Use commands like:
- `top` - Real-time processes, CPU, and memory
- `nproc` - Number of CPUs
- `free` - Memory usage
- Or write custom shell scripts for detailed monitoring

### Q3: What is chmod and how does it work?

**Answer:**
- chmod = Change Mode (change file permissions)
- Uses 3-digit format for Owner-Group-Others
- Formula: 4 (Read) + 2 (Write) + 1 (Execute)
- Example: `chmod 755 file.sh` means Owner(7=rwx), Group(5=rx), Others(5=rx)

---

## Quick Reference

### Navigation Commands
| Command | Purpose | Example |
|---------|---------|---------|
| `pwd` | Show current directory | `pwd` → `/home/ubuntu` |
| `cd folder` | Change directory | `cd bundle` |
| `cd ..` | Go back one level | `cd ..` |
| `cd ../..` | Go back two levels | `cd ../..` |
| `cd /path/to/dir` | Go to absolute path | `cd /home/ubuntu` |

### File Operations
| Command | Purpose | Example |
|---------|---------|---------|
| `touch file.txt` | Create empty file | `touch abhishek` |
| `vi file.txt` | Create/edit file (insert mode) | `vi test` |
| `cat file.txt` | View file contents | `cat test` |
| `rm file.txt` | Delete file | `rm abhishek` |
| `ls` | List files and folders | `ls` |
| `ls -ltr` | List with details & timestamp | `ls -ltr` |

### Directory Operations
| Command | Purpose | Example |
|---------|---------|---------|
| `mkdir folder` | Create directory | `mkdir abhishek1` |
| `mkdir -p path/to/dir` | Create nested directories | `mkdir -p a/b/c` |
| `rm -r folder` | Delete directory | `rm -r abhishek1` |
| `rm -rf folder` | Force delete directory | `rm -rf folder` |

### System Monitoring
| Command | Purpose | What it Shows |
|---------|---------|---------------|
| `top` | Real-time system monitor | CPU, RAM, processes (all-in-one) |
| `free -h` | Memory usage | Total, used, free RAM |
| `nproc` | CPU count | Number of CPU cores |
| `df -h` | Disk space | Total, used, available disk space |
| `history` | Command history | All previously run commands |

### Help & Documentation
| Command | Purpose |
|---------|---------|
| `man command` | Show command manual |
| `man ls` | Show ls documentation |
| `man chmod` | Show chmod documentation |

### Shell Script Essentials
| Element | Purpose | Example |
|---------|---------|---------|
| `#!/bin/bash` | Shebang (specifies interpreter) | First line of script |
| `# comment` | Comment (ignored) | `# This creates a file` |
| `echo "text"` | Print output | `echo "Hello"` |
| `chmod 777 script.sh` | Grant full permissions | Execute permission |
| `chmod 755 script.sh` | Owner: full, Others: read+exec | Common permission |
| `./script.sh` | Execute script | Run the script |
| `sh script.sh` | Execute with sh | Alternative execution |

### vi/vim Editor Commands
| Command | Purpose |
|---------|---------|
| `vi filename` | Open/create file |
| `ESC` then `i` | Enter INSERT mode (to write) |
| `ESC` then `:wq!` | Save and quit |
| `ESC` then `:q!` | Quit without saving |
| `ESC` then `:w` | Save without quitting |

---

## Summary of Key Concepts

### Essential Skills Learned
✅ Navigate directories (`pwd`, `cd`, `ls`)  
✅ Create/manage files (`touch`, `vi`, `cat`, `rm`)  
✅ Create/manage directories (`mkdir`, `rm -r`)  
✅ Monitor system health (`top`, `free`, `nproc`, `df`)  
✅ Write and execute shell scripts  
✅ Understand file permissions (`chmod`)  

---

## Common Interview Questions Summary
**Answer:** 
- `/bin/bash` - Explicitly uses Bash shell
- `/bin/sh` - Previously linked to bash, but some modern OS link it to dash
- Always use `#!/bin/bash` for bash scripts to avoid compatibility issues

### Q: How do you check system health in Linux?
**Answer:** Use:
- `top` - All-in-one monitoring (CPU, RAM, processes)
- `free -h` - Memory usage
- `nproc` - CPU count
- `df -h` - Disk space

### Q: What is chmod?
**Answer:** chmod = Change Mode (change file permissions). Uses 3-digit format:
- Formula: 4 (Read) + 2 (Write) + 1 (Execute)
- Example: `chmod 755 file.sh` means Owner(rwx=7), Group(rx=5), Others(rx=5)

### Q: How do you create and execute a shell script?
**Answer:**
```bash
# 1. Create file
vi script.sh

# 2. Add shebang and code
#!/bin/bash
echo "Hello World"

# 3. Save (:wq!)

# 4. Grant permission
chmod 755 script.sh

# 5. Execute
./script.sh
```

---

## Real-World DevOps Scenario

### Scenario: Production Issue Investigation

**Problem:** Application on production server is slow

**DevOps Engineer Workflow:**

```bash
# Step 1: Login to server
ssh -i prod-key.pem ubuntu@prod-server-ip

# Step 2: Check current location
pwd

# Step 3: Check system health
top                 # Is CPU or memory maxed out?
# Look for processes using high CPU/memory

# Step 4: Check disk space
df -h               # Is disk full?
# If disk is 90%+, that's likely the issue

# Step 5: Navigate to application logs
cd /var/log/application
ls -ltr             # See latest log files

# Step 6: Check recent logs
cat error.log       # Read error logs

# Step 7: Check memory details
free -h             # Detailed memory breakdown

# Step 8: Document findings
vi investigation-report.txt
# Write findings and exit (ESC → :wq!)

# Step 9: Create cleanup script if needed
vi cleanup.sh
#!/bin/bash
# Delete old log files
rm -rf /var/log/old-logs/*
# Save and execute
chmod 755 cleanup.sh
./cleanup.sh
```

**Result:** Issue identified and resolved using shell commands!

---

## Practical Tips for Production Environments

### ✅ DO:
- Always run `pwd` to confirm location before executing commands
- Use `ls -ltr` to see file details before modifying
- Test scripts in dev/staging before production
- Use `chmod 755` instead of `chmod 777` (more secure)
- Read `man` pages when unsure about a command
- Use `top` for quick health checks
- Document your actions in files (use `vi` to create notes)

### ❌ DON'T:
- Don't use `rm -rf /` or delete system directories
- Don't use `chmod 777` on production (security risk)
- Don't skip testing scripts
- Don't forget to save files in `vi` (use `:wq!`)
- Don't ignore disk space warnings (`df -h`)
- Don't execute unknown scripts without reviewing

---

## Tips for Learning Shell Scripting

1. **Practice Daily** - Hands-on experience is crucial
2. **Start Simple** - Begin with basic commands (ls, cd, pwd), then build complexity
3. **Use Comments** - Makes code readable for yourself and others
4. **Test Scripts** - Always test in a safe/dev environment first
5. **Read Man Pages** - Use `man command` to understand commands deeply
6. **Learn from Examples** - Study scripts on GitHub
7. **Understand the Workflow** - Always: `pwd` → `ls` → `cd` → action
8. **Compare with Windows** - Relate Linux commands to Windows actions you know
9. **Master vi/vim** - Essential for editing files on servers
10. **Monitor Systems** - Practice with `top`, `free`, `df` regularly

---
