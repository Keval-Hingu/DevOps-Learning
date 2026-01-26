# Advanced Shell Scripting - Day 07

**Author:** Based on Abhishek's Tutorial  
**Date:** January 25, 2026  
**Topic:** Advanced Shell Scripting Concepts for DevOps Engineers

---

## Table of Contents
1. [Introduction](#introduction)
2. [Shell Script Best Practices](#shell-script-best-practices)
3. [Node Health Monitoring Script](#node-health-monitoring-script)
4. [Essential Linux Commands](#essential-linux-commands)
5. [Control Structures](#control-structures)
6. [Signal Handling with Trap](#signal-handling-with-trap)

---

## Introduction

### Prerequisites
- Completion of Shell Scripting Basics (Day 06)
- Access to a Linux VM (Ubuntu/AWS EC2 instance)
- Basic understanding of Bash scripting

### Recap from Previous Session
- Basic shell script execution
- Node health commands:
  - `df` - Disk space
  - `free` - Memory information
  - `nproc` - CPU count
  - `top` - Running processes and system status

---

## Shell Script Best Practices

### 1. Shebang Line
Always start scripts with the shebang pointing to the correct executable:

```bash
#!/bin/bash
```

**Why not just `#!/bin/sh`?**
- `sh` is a symlink to the default shell
- If default is not bash (e.g., dash), script might fail
- Always be explicit about the executable

### 2. Metadata/Comments
Provide script information at the beginning:

```bash
#!/bin/bash

# Author: Abhishek
# Date: 1st December
# Purpose: This script outputs the node health
# Version: V1
```

**Benefits:**
- Clear understanding of script purpose
- Easy maintenance
- Version tracking
- Prerequisite documentation

### 3. Debug Mode - `set -x`
Enable debug mode to print commands before execution:

```bash
#!/bin/bash
set -x

# Your commands here
df -h
free -g
nproc
```

**Output shows:**
- The actual command being executed
- The output of the command
- Helps in troubleshooting

**Interview Question:** Why use `set -x` over echo statements?
- `set -x` automatically shows all commands
- No need to write echo for each command
- Easier maintenance for large scripts
- Can be easily disabled by commenting one line

### 4. Exit on Error - `set -e`
Script exits immediately when any command fails:

```bash
#!/bin/bash
set -e

# If this fails, script stops here
someInvalidCommand

# This won't execute if above fails
df -h
```

**Use Case:**
```bash
# Step 1: Create user
# Step 2: Create file
# Step 3: Add username to file
```
If Step 1 fails, no point executing Steps 2 and 3.

### 5. Pipe Failure Handling - `set -o pipefail`
Catch failures in piped commands:

```bash
#!/bin/bash
set -e
set -o pipefail

# Without pipefail, only last command's exit status is checked
invalidCommand | echo "hello" | echo "world"
```

**Problem with `set -e` alone:**
- Only checks the last command in a pipe chain
- Middle command failures go unnoticed

**Solution:**
```bash
set -o pipefail  # Now all pipe commands are checked
```

### 6. Combined Best Practice
```bash
#!/bin/bash

# Metadata
# Author: Your Name
# Date: Today's Date
# Purpose: Script description
# Version: V1

# Script settings
set -x          # Debug mode
set -e          # Exit on error
set -o pipefail # Pipe failure detection

# Alternative single line (not recommended):
# set -exo pipefail
```

**Why separate lines?**
- Easy to enable/disable individual settings
- Better readability
- Easier for team members to understand and modify

---

## Node Health Monitoring Script

### Basic Script Structure

```bash
#!/bin/bash

# Author: Abhishek
# Date: 1st December
# Purpose: This script outputs the node health
# Version: V1

set -x
set -e
set -o pipefail

echo "Print the disk space"
df -h

echo "Print the memory"
free -g

echo "Print the CPU"
nproc

echo "Print Amazon processes"
ps -ef | grep Amazon | awk -F" " '{print $2}'
```

### Execution
```bash
chmod 777 node-health.sh  # Grant permissions
./node-health.sh          # Execute script
```

---

## Essential Linux Commands

### 1. Process Management - `ps -ef`

**Command:** `ps -ef`
- `ps` = processes
- `-e` = all processes
- `-f` = full format

```bash
# List all processes
ps -ef

# Output columns:
# UID  PID  PPID  C STIME TTY  TIME     CMD
# root 123  1     0 10:00 ?    00:00:01 /usr/bin/python
```

### 2. Grep - Pattern Matching

**Purpose:** Filter output based on patterns

```bash
# Find all Amazon processes
ps -ef | grep Amazon

# Find specific text in file
grep "name" employee.txt
```

**Real Example:**
```bash
# File: employee.txt
# my name is Keval
# my employee id is 111

# Get only name line
grep name employee.txt
# Output: my name is Keval
```

### 3. Pipe Operator `|`

**Purpose:** Send output of first command to second command

```bash
# Command1 | Command2
ps -ef | grep Amazon
```

**How it works:**
1. `ps -ef` generates all process information
2. `|` sends this output to next command
3. `grep Amazon` filters only Amazon-related processes

**Example Script:**
```bash
#!/bin/bash
# test.sh
echo 1
echo 11
echo 12
echo 55
echo 99

# Execute and filter
./test.sh | grep 1
# Output: 1, 11, 12
```

**Interview Question:** What's the output of this?
```bash
date | echo "Today is"
```

**Answer:** Only prints "Today is"

**Why?**
- `date` sends output to `stdin`
- `pipe` only redirects `stdout` to next command
- `echo` doesn't read from stdin
- Default system commands send output to stdin, not stdout

### 4. AWK - Column Extraction

**Purpose:** Extract specific columns from output

```bash
# Get only Process IDs (column 2)
ps -ef | grep Amazon | awk -F" " '{print $2}'
```

**Syntax Breakdown:**
- `awk` - Pattern scanning tool
- `-F" "` - Field separator is space
- `'{print $2}'` - Print column 2

**Examples:**
```bash
# Column 1 (User)
ps -ef | grep Amazon | awk -F" " '{print $1}'

# Column 2 (PID)
ps -ef | grep Amazon | awk -F" " '{print $2}'

# From file
grep name employee.txt | awk -F" " '{print $4}'
# Output: Abhishek
```

**Interview Tip:** AWK is more powerful than cut/trim commands. Always prefer AWK in interviews.

### 5. CURL - Transfer Data from URLs

**Purpose:** Retrieve data from internet or make API calls

```bash
# Get log file from GitHub
curl https://raw.githubusercontent.com/user/repo/main/dummy.log

# Filter errors from remote log
curl https://url-to-log-file | grep ERROR

# Make API calls
curl -X GET https://api.foo.com
```

**Use Cases:**
- Download files from cloud storage (S3, GCS, Azure Blob)
- Make API requests (alternative to Postman)
- Retrieve remote logs
- Python equivalent: `requests` module

### 6. WGET - Download Files

**Purpose:** Download and save files locally

```bash
# Download log file
wget https://raw.githubusercontent.com/user/repo/main/dummy.log

# File is saved locally
ls
# Output: dummy.log

# Use the downloaded file
cat dummy.log | grep ERROR
```

**CURL vs WGET:**

| Feature | CURL | WGET |
|---------|------|------|
| Output | Displays on screen | Saves to file |
| Steps | Single command | Download then read |
| Use Case | Quick viewing | Need local copy |

```bash
# CURL - One step
curl https://url/log.txt | grep ERROR

# WGET - Two steps
wget https://url/log.txt
cat log.txt | grep ERROR
```

### 7. FIND - Search Files

**Purpose:** Find files and directories in the system

```bash
# Find file by name
find / -name "pam.d"

# Find in specific directory
find /etc -name "*.conf"

# As root (for permission access)
sudo find / -name "pam.d"
```

**Syntax:**
- `find` - command
- `/` - search location (/ = everywhere)
- `-name` - search by name
- `"pattern"` - what to search

**Use Case:**
- Large file systems with thousands of files
- Don't know exact file location
- Need to locate configuration files

---

## User Management

### Switch User - `su`

```bash
# Switch to specific user
su abhishek    # Switch to user 'abhishek'
su harsha      # Switch to user 'harsha'

# Switch to root
su -           # Switch to root user
```

### Sudo - Execute as Super User

```bash
# Execute single command as root
sudo find / -name "pam.d"

# Switch to root
sudo su -
```

**Breakdown of `sudo su -`:**
- `sudo` - Substitute User Do (run as super user)
- `su` - Switch User
- `-` - Go to root user

**Why use personal accounts?**
- Root can delete anything permanently
- No recovery unless:
  - Mounted volumes with snapshots
  - Backup exists
- Use root only when necessary

---

## Control Structures

### 1. If-Else Conditions

**Syntax:**
```bash
if [ condition ]
then
    # Actions if condition is true
else
    # Actions if condition is false
fi  # End of if (reverse of 'if')
```

**Example:**
```bash
#!/bin/bash

a=4
b=10

if [ $a -gt $b ]
then
    echo "a is greater than b"
else
    echo "b is greater than a"
fi
```

**Output:** `b is greater than a`

**Key Points:**
- Variables: `a=4` (no spaces)
- Access: `$a` (dollar sign)
- Operators: `-gt` (greater than), `-lt` (less than), `-eq` (equal)
- Closing: `fi` (reverse of if)

### 2. For Loops

**Purpose:** Execute actions repeatedly

**Syntax:**
```bash
for variable in range
do
    # Actions to repeat
done
```

**Example 1: Print numbers 1-100**
```bash
#!/bin/bash

for i in {1..100}
do
    echo $i
done
```

**Example 2: Print specific range**
```bash
#!/bin/bash

for i in {1..10}
do
    echo "Number: $i"
done
```

**How it works:**
1. **Initialization:** `i=1`
2. **Condition:** `i <= 100`
3. **Action:** `echo $i`
4. **Increment:** `i++`
5. **Repeat** until condition fails

**Use Cases:**
- Print numbers in range
- Process multiple files
- Iterate through list of servers
- Batch operations

---

## Signal Handling with Trap

### What are Signals?

**Definition:** Signals are notifications sent to processes to perform specific actions.

**Common Linux Signals:**

| Signal | Name | Number | Description |
|--------|------|--------|-------------|
| SIGINT | Interrupt | 2 | Ctrl+C pressed |
| SIGTERM | Terminate | 15 | Graceful termination |
| SIGKILL | Kill | 9 | Force kill (cannot be trapped) |
| SIGHUP | Hangup | 1 | Terminal closed |

**Example:**
```bash
# Kill command sends signal
kill -9 1111  # Sends SIGKILL to process 1111

# Ctrl+C sends SIGINT
yes  # Runs continuously
^C   # Press Ctrl+C to stop
```

### Trap Command

**Purpose:** Intercept signals and execute custom actions

**Syntax:**
```bash
trap 'command' SIGNAL
```

**Example: Prevent Ctrl+C**
```bash
#!/bin/bash

trap "echo 'Don't use Ctrl+C'" SIGINT

# Your script continues even if user presses Ctrl+C
while true
do
    echo "Running..."
    sleep 1
done
```

**Real-World Use Case:**

**Scenario:** Script populating database with users
- Script runs and adds 50 users
- User accidentally presses Ctrl+C
- Only 25 users added (incomplete data)
- Database thinks it's complete → Problems!

**Solution:**
```bash
#!/bin/bash

# Cleanup function
cleanup() {
    echo "Ctrl+C detected! Cleaning up incomplete data..."
    rm -rf /tmp/incomplete_data/*
    echo "Cleanup complete. Database is safe."
    exit 1
}

# Trap SIGINT (Ctrl+C)
trap cleanup SIGINT

# Database population script
for user in {1..100}
do
    echo "Adding user $user to database..."
    # Database insertion logic here
    sleep 0.1
done

echo "All users added successfully!"
```

**Benefits:**
- Ensures data integrity
- Prevents partial execution issues
- Provides graceful exit
- Sends notifications if needed

---

## Complete Node Health Script Example

```bash
#!/bin/bash

# ==========================================
# Author: Abhishek
# Date: 1st December 2024
# Purpose: Node Health Monitoring Script
# Version: V1
# Prerequisites: Linux system with bash
# ==========================================

# Script settings
set -x          # Debug mode
set -e          # Exit on error
set -o pipefail # Catch pipe failures

# ==========================================
# Disk Space Information
# ==========================================
echo "========== DISK SPACE =========="
df -h

# ==========================================
# Memory Information
# ==========================================
echo "========== MEMORY =========="
free -g

# ==========================================
# CPU Information
# ==========================================
echo "========== CPU COUNT =========="
nproc

# ==========================================
# Process Information
# ==========================================
echo "========== RUNNING PROCESSES =========="
ps -ef | grep -i amazon | awk -F" " '{print $2}'

# ==========================================
# Log Analysis (from remote source)
# ==========================================
echo "========== ERROR LOGS =========="
curl https://raw.githubusercontent.com/user/repo/main/app.log | grep ERROR

echo "========== SCRIPT COMPLETED =========="
```

---

## Interview Questions & Answers

### Q1: What is the difference between `set -e` and `set -o pipefail`?
**A:** 
- `set -e`: Exits script when any single command fails
- `set -o pipefail`: Exits when any command in a pipe chain fails
- `set -e` alone doesn't catch failures in middle of pipe chains
- Always use both together for robust error handling

### Q2: Why does `date | echo "Today is"` not print the date?
**A:** 
- `date` sends output to stdin (system command behavior)
- `pipe` only redirects stdout to next command
- `echo` doesn't read from stdin
- Result: Only "Today is" is printed

### Q3: Difference between CURL and WGET?
**A:**
- **CURL**: Displays output on terminal, doesn't save by default
- **WGET**: Downloads and saves file locally
- **Use CURL**: Quick viewing, piping to other commands
- **Use WGET**: Need to save file for later use

### Q4: What is AWK and when to use it?
**A:**
- AWK is a pattern scanning and processing language
- Used to extract specific columns from structured output
- More powerful than cut/trim commands
- Essential for processing command outputs in scripts

### Q5: Why use `#!/bin/bash` instead of `#!/bin/sh`?
**A:**
- `/bin/sh` is a symlink to default shell (might be dash, not bash)
- Bash-specific features might not work in other shells
- Explicit declaration prevents unexpected errors
- Best practice for portability and reliability

### Q6: What is the trap command used for?
**A:**
- Trap intercepts signals sent to the script
- Used to handle Ctrl+C, termination signals, etc.
- Enables cleanup operations before exit
- Prevents data corruption from incomplete execution
- Cannot trap SIGKILL (signal 9)

---

## Best Practices Summary

1. ✅ Always use shebang: `#!/bin/bash`
2. ✅ Add metadata comments (author, date, purpose, version)
3. ✅ Enable debug mode: `set -x`
4. ✅ Exit on errors: `set -e`
5. ✅ Handle pipe failures: `set -o pipefail`
6. ✅ Use meaningful variable names
7. ✅ Add echo statements before major operations
8. ✅ Grant appropriate permissions (not always 777)
9. ✅ Test scripts in safe environments first
10. ✅ Use trap for cleanup operations

---

## Command Reference Quick Sheet

```bash
# Node Health
df -h                          # Disk space
free -g                        # Memory
nproc                          # CPU count
top                            # Running processes

# Process Management
ps -ef                         # All processes
ps -ef | grep <name>          # Filter processes
kill -9 <PID>                 # Kill process

# Text Processing
grep <pattern> <file>         # Search pattern
awk -F" " '{print $2}' <file> # Extract column
cat <file> | grep <pattern>   # Filter file content

# Network Operations
curl <url>                     # Fetch from URL
wget <url>                     # Download file
curl <url> | grep <pattern>   # Filter remote content

# File Operations
find / -name <filename>        # Find file
chmod 777 <file>              # Change permissions
cat <file>                    # Display file

# User Management
sudo su -                      # Switch to root
su <username>                 # Switch user
sudo <command>                # Execute as root
```

---
**Remember:** Practice is key! Write scripts daily, make mistakes, debug, and improve. Shell scripting is a fundamental skill for every DevOps engineer.
