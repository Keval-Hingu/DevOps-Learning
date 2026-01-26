# Day 7 - AWS Resource Tracking Shell Script Project

**Topic:** Real-time Shell Script Project for AWS Resource Monitoring

---

## Table of Contents
1. [Why Move to Cloud?](#why-move-to-cloud)
2. [Resource Tracking Importance](#resource-tracking-importance)
3. [Project Overview](#project-overview)
4. [Prerequisites](#prerequisites)
5. [Shell Script Implementation](#shell-script-implementation)
6. [Script Improvements](#script-improvements)
7. [Cron Job Integration](#cron-job-integration)
8. [Key Takeaways](#key-takeaways)

---

## Why Move to Cloud?

### Two Primary Reasons:

### 1. **Reduced Manageability/Maintenance Overhead**
- No need to maintain own data centers
- No need to manage physical servers
- Reduced patching and security update burden
- No dedicated systems engineering team required for infrastructure

### 2. **Cost Effectiveness (Pay-as-you-go Model)**
- Only pay for what you use
- No upfront infrastructure costs
- Avoid paying for unused resources
- Scalability without capital expenditure

---

## Resource Tracking Importance

### The Problem:
When organizations give AWS access to 100+ developers, resources can be:
- Created but left unused (e.g., 100 EC2 instances not being utilized)
- Orphaned (e.g., EBS volumes with no EC2 instances attached)
- Running unnecessarily, increasing costs

### The Solution:
As a **DevOps Engineer/AWS Admin**, you must:
- Track resource usage regularly
- Maintain cost effectiveness
- Generate reports for management
- Automate monitoring tasks

---

## Project Overview

### Goal:
Create a shell script that:
1. Tracks AWS resource usage for:
   - **EC2 instances**
   - **S3 buckets**
   - **Lambda functions**
   - **IAM users**
2. Generates a daily report (e.g., at 6 PM)
3. Runs automatically using **Cron jobs**
4. Outputs information to a file or reporting dashboard

### Why Shell Script?
- Not everyone is comfortable with Python
- Shell scripting is widely accessible
- Achieves the same goal effectively
- Alternative to AWS Lambda/Python/SDK/CDK approaches

---

## Prerequisites

### 1. AWS CLI Installation
Check if AWS CLI is installed:
```bash
aws --version
```

### 2. AWS Configuration
Configure AWS credentials:
```bash
aws configure
```

This will prompt for:
- **Access Key**
- **Secret Access Key**
- **Default Region** (e.g., us-east-1)
- **Output Format** (json)

### 3. Bash Shell
Ensure you're using bash:
```bash
bash --version
```

---

## Shell Script Implementation

### Step 1: Create the Script File

```bash
vim aws-resource-tracker.sh
```

### Step 2: Basic Script Structure

```bash
#!/bin/bash

################################
# Author: Keval
# Date: 26 Jan
# Version: V1
# 
# This script will report the AWS resource usage
################################

# AWS S3
# AWS EC2
# AWS Lambda
# AWS IAM Users
```

### Step 3: Initial Commands

#### List S3 Buckets
```bash
# List S3 buckets
aws s3 ls
```

#### List EC2 Instances
```bash
# List EC2 instances
aws ec2 describe-instances
```

#### List Lambda Functions
```bash
# List AWS Lambda functions
aws lambda list-functions
```

#### List IAM Users
```bash
# List IAM users
aws iam list-users
```

### Step 4: Make Script Executable

```bash
chmod 777 aws-resource-tracker.sh
```

### Step 5: Run the Script

```bash
./aws-resource-tracker.sh
```

---

## Script Improvements

### Improvement 1: Add Print Statements

Add echo statements for better readability:

```bash
#!/bin/bash

################################
# Author: Abhishek
# Date: 11th Jan
# Version: V1
# 
# This script will report the AWS resource usage
################################

# List S3 buckets
echo "Print list of S3 buckets"
aws s3 ls

# List EC2 instances
echo "Print list of EC2 instances"
aws ec2 describe-instances

# List Lambda functions
echo "Print list of Lambda functions"
aws lambda list-functions

# List IAM users
echo "Print list of IAM users"
aws iam list-users
```

### Improvement 2: Enable Debug Mode

Add `set -x` at the beginning to see command execution:

```bash
#!/bin/bash

set -x  # Debug mode

################################
# Author: Abhishek
# Date: 11th Jan
# Version: V1
################################
```

**What does `set -x` do?**
- Shows each command before execution
- Displays the actual output
- Helps in debugging

**Other useful set options:**
- `set -e` - Exit on error
- `set -u` - Exit on undefined variable

### Improvement 3: Use jq for JSON Parsing

#### The Problem:
The `describe-instances` command returns too much information. We only need instance IDs.

#### The Solution:
Use **jq** (JSON parser) to extract specific fields.

#### jq Command Example:

```bash
# Get only instance IDs
aws ec2 describe-instances | jq '.Reservations[].Instances[].InstanceId'
```

**How jq works:**
- `.Reservations[]` - Access the Reservations array
- `.Instances[]` - Access the Instances array (inside Reservations)
- `.InstanceId` - Extract only the InstanceId field

#### Similar Tools:
- **jq** - JSON parser
- **yq** - YAML parser

### Improvement 4: Redirect Output to File

Redirect all output to a file for reporting:

```bash
#!/bin/bash

set -x

################################
# Author: Abhishek
# Date: 11th Jan
# Version: V1
################################

# List S3 buckets
echo "Print list of S3 buckets" >> resourceTracker
aws s3 ls >> resourceTracker

# List EC2 instances
echo "Print list of EC2 instances" >> resourceTracker
aws ec2 describe-instances | jq '.Reservations[].Instances[].InstanceId' >> resourceTracker

# List Lambda functions
echo "Print list of Lambda functions" >> resourceTracker
aws lambda list-functions >> resourceTracker

# List IAM users
echo "Print list of IAM users" >> resourceTracker
aws iam list-users >> resourceTracker
```

### Better Output Viewing

View output in a more readable format:
```bash
./aws-resource-tracker.sh | more
```

---

## Cron Job Integration

### What is a Cron Job?
A **Cron job** is a Linux scheduler that executes scripts at specified times automatically.

**Example:** YouTube scheduled video publishing
- You upload a video at any time
- Set publish time to 7 PM
- YouTube automatically publishes at 7 PM (no manual intervention needed)

### Benefits:
- Script runs automatically at scheduled time
- No need to manually execute
- Ensures reports are generated on time
- Works even if you're not available

### How to Set Up Cron Job:

1. Open crontab editor:
```bash
crontab -e
```

2. Add a cron job entry (example - run daily at 6 PM):
```bash
0 18 * * * /path/to/aws-resource-tracker.sh
```

**Cron syntax:**
```
* * * * * command
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

**Examples:**
- `0 18 * * *` - Run at 6 PM daily
- `*/30 * * * *` - Run every 30 minutes
- `0 0 * * 0` - Run at midnight every Sunday

---

## AWS CLI Reference

When you don't know AWS CLI commands, refer to the official documentation:

**AWS CLI Reference:** https://docs.aws.amazon.com/cli/

### How to Find Commands:

1. Go to AWS CLI Reference
2. Search for the service (e.g., S3, EC2, Lambda, IAM)
3. Browse available commands
4. Check syntax and examples

### Common Commands Used:

| Service | Command | Purpose |
|---------|---------|---------|
| S3 | `aws s3 ls` | List all S3 buckets |
| EC2 | `aws ec2 describe-instances` | List EC2 instances |
| Lambda | `aws lambda list-functions` | List Lambda functions |
| IAM | `aws iam list-users` | List IAM users |

---

## Key Takeaways

### 1. **Best Practices**
- Always add comments to your scripts
- Include author, date, and version information
- Use meaningful variable names
- Test scripts before automation

### 2. **Shell Scripting Tips**
- Use `#!/bin/bash` (shebang) - not just `#!/bin/sh`
- `sh` is a symbolic link that can point to bash or dash
- Always prefer explicit bash for consistency
- Use `set -x` for debugging
- Use `set -e` to exit on errors

### 3. **Security**
- Don't use `chmod 777` in production (it's too permissive)
- Use appropriate permissions (e.g., `chmod 755` or `chmod 700`)
- Never hardcode AWS credentials in scripts
- Use IAM roles when possible

### 4. **DevOps Engineer Responsibilities**
- Monitor cloud resource usage
- Maintain cost effectiveness
- Automate repetitive tasks
- Generate reports for management
- Track resource utilization

### 5. **Tools & Technologies**
- **Shell Scripting** - Automation
- **AWS CLI** - AWS resource management
- **jq** - JSON parsing
- **Cron** - Job scheduling
- **Bash** - Shell environment

---

## Complete Final Script

```bash
#!/bin/bash

set -x  # Enable debug mode

################################
# Author: Abhishek
# Date: 11th Jan
# Version: V1
# 
# This script will report the AWS resource usage
################################

# Resources to track:
# AWS S3
# AWS EC2
# AWS Lambda
# AWS IAM Users

# List S3 buckets
echo "Print list of S3 buckets" >> resourceTracker
aws s3 ls >> resourceTracker

# List EC2 instances (only instance IDs)
echo "Print list of EC2 instances" >> resourceTracker
aws ec2 describe-instances | jq '.Reservations[].Instances[].InstanceId' >> resourceTracker

# List Lambda functions
echo "Print list of Lambda functions" >> resourceTracker
aws lambda list-functions >> resourceTracker

# List IAM users
echo "Print list of IAM users" >> resourceTracker
aws iam list-users >> resourceTracker
```

---

## Assignment

1. Write the complete shell script
2. Test the script on your AWS account
3. **Integrate the script with Cron tab**
4. Schedule it to run daily at a specific time
5. Verify the output in the `resourceTracker` file

---

## Future Improvements

- Add more AWS services (RDS, ELB, CloudWatch, etc.)
- Send reports via email
- Integrate with monitoring dashboards
- Add error handling
- Use shell functions for modularity
- Create HTML formatted reports
- Add cost analysis
- Alert on unused resources

---

## Additional Resources

- AWS CLI Documentation: https://docs.aws.amazon.com/cli/
- Bash Scripting Guide
- jq Documentation: https://stedolan.github.io/jq/
- Cron Job Tutorial

---

## Notes

- This is a **generic project** used in most organizations
- Can be added to your resume as a real-world project
- Multiple approaches exist (Python, Lambda, SDK, CDK)
- Choose the tool you're comfortable with
- The goal is to achieve the result efficiently

---

