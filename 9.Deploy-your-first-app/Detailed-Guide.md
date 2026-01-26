# Day 12 | Deploy and Expose Your First App to AWS EC2

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Project Overview](#project-overview)
4. [Local Setup and Testing](#local-setup-and-testing)
5. [AWS Console Setup](#aws-console-setup)
6. [IAM User Creation](#iam-user-creation)
7. [EC2 Instance Creation](#ec2-instance-creation)
8. [Connecting to EC2 Instance](#connecting-to-ec2-instance)
9. [Deploying Application on EC2](#deploying-application-on-ec2)
10. [Exposing Application to Internet](#exposing-application-to-internet)
11. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
12. [Best Practices](#best-practices)
13. [Interview Questions](#interview-questions)
14. [Key Takeaways](#key-takeaways)

---

## Introduction

This session covers the complete workflow of deploying a Node.js application on AWS EC2 instance and making it accessible over the internet. This is a fundamental DevOps skill required in most organizations.

**Session Presenter**: Kunal Verma (DevOps Intern at Devtron, Cube Simplify Ambassador)

### Why Deploy to Cloud?
- **Removes maintenance overhead**: No need to manage physical servers, patching, or upgrades
- **Scalability**: Easily scale applications by creating new instances
- **Cost optimization**: Pay only for what you use (when used efficiently)
- **Accessibility**: Access applications from anywhere in the world
- **Resource availability**: Get high-performance compute resources without expensive hardware

---

## Prerequisites

### Tools and Knowledge Required
1. **Git**: Version control basics
2. **Linux Commands**: Basic terminal navigation and file operations
3. **SSH**: Secure shell connection understanding
4. **AWS Account**: Free tier eligible account

### Recommended Learning Resources
- **Git Documentation**: Official Git docs (highly recommended)
- **Linux Commands**: Basic commands like `cd`, `ls`, `chmod`, `cat`
- **AWS Documentation**: For understanding AWS services
- **DigitalOcean Documentation**: Excellent guides for various setup procedures

---

## Project Overview

### Application Details
- **Type**: Node.js web application
- **Framework**: Express.js server
- **Integration**: Stripe payment gateway (demo mode)
- **Original Tutorial Repository**: [GitHub - AWS Session Repository](https://github.com/verma-kunal/AWS-Session)
- **Practice Repository with Guide**: [GitHub - Demo App by Keval Hingu](https://github.com/Keval-Hingu/Demo-app)

> **Note**: You can use either repository for this tutorial. The practice repository includes a complete guide and simplified Node.js app code for hands-on learning.

### Technologies Used
- Node.js (JavaScript runtime)
- npm (Node Package Manager)
- Express.js (Web framework)
- Stripe API (Payment gateway)
- Ubuntu Server (Operating system)

---

## Local Setup and Testing

### Step 1: Clone the Repository

**Option 1: Original Tutorial Repository**
```bash
# Clone the original repository
git clone https://github.com/kunal-verma/aws-session.git

# Navigate to the project directory
cd aws-session

# List files in the directory
ls
```

**Option 2: Practice Repository with Guide** (Recommended for beginners)
```bash
# Clone the practice repository
git clone https://github.com/Keval-Hingu/Demo-app.git

# Navigate to the project directory
cd Demo-app

# List files in the directory
ls
```

**What is Git Clone?**
- Creates a local copy of the remote repository
- Downloads all files and version history
- Essential first step before deploying any application

---

### Step 2: Set Up Environment Variables

Create a `.env` file for storing sensitive credentials:

```bash
# Create hidden environment file
touch .env
```

**What is .env file?**
- Hidden file (starts with dot)
- Stores environment variables and secrets
- Never committed to version control (security best practice)
- Used to avoid hard-coding credentials in source code

**Environment Variables for This Project**:
```env
DOMAIN=localhost
PORT=3000
STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
STRIPE_SECRET_KEY=your_secret_key_here
```

**How to Get Stripe Keys** (Optional for this demo):
1. Go to [stripe.com](https://stripe.com)
2. Create a free demo account
3. Navigate to: More → Developers → API Keys
4. Copy the publishable key and secret key (test mode)

---

### Step 3: Install Dependencies

```bash
# Install all required packages
npm install
```

**What Does npm install Do?**
- Reads `package.json` file
- Downloads all dependencies listed
- Creates `node_modules` folder with all packages
- Similar to `pip install` in Python

**Expected Output**:
```
added 150 packages in 5s
```

---

### Step 4: Run Application Locally

```bash
# Start the development server
npm run start
```

**Expected Output**:
```
Server is listening on Port 3000
You can access application at localhost:3000
```

### Step 5: Test in Browser

Open browser and navigate to:
```
http://localhost:3000
```

You should see the application running successfully! ✅

---

## AWS Console Setup

### Creating AWS Account

1. Visit [aws.amazon.com](https://aws.amazon.com)
2. Sign up with email and password
3. Complete account verification
4. Access AWS Management Console

**Important**: After signing in, you'll be using the **root account** (administrator with full access).

---

## IAM User Creation

### Why Create IAM User?

**IAM (Identity and Access Management)** allows you to:
- Create users with specific permissions
- Avoid using root account for daily operations
- Implement **role-based access control (RBAC)**
- Enhance security by limiting access

### Real-World Scenario

In an organization:
- **Team Lead**: Has root account access
- **Developers**: Need access only to EC2, S3
- **Operations Team**: Need access to monitoring, CloudWatch
- **Security Team**: Need access to IAM, security groups

IAM enables you to assign appropriate permissions to each role.

---

### Step-by-Step IAM User Creation

#### 1. Navigate to IAM Dashboard

```
AWS Console → Search "IAM" → Click IAM
```

#### 2. Create New User

1. Click **"Users"** in left sidebar
2. Click **"Add users"**
3. **User name**: `kunal_abhishek` (or your preferred name)
4. **Enable console access**: ✅ Checked
5. **Console password**: Create custom password
6. **Uncheck**: "Users must create a new password at next sign-in"

#### 3. Set Permissions

**Option 1: Attach Policies Directly** (We'll use this)
- Search for: `AdministratorAccess`
- Select and attach

**Option 2: Add User to Group**
- Create permission groups (e.g., "Developers", "DevOps")
- Assign policies to groups
- Add users to groups

**Best Practice**: For learning, use `AdministratorAccess`. In production, grant only necessary permissions (Principle of Least Privilege).

#### 4. Review and Create

- Review user details
- Click **"Create user"**
- Save the sign-in URL, username, and password

#### 5. Sign In as IAM User

1. Sign out of root account
2. Use the IAM sign-in URL
3. Enter:
   - Account ID
   - IAM username
   - Password

**Verification**: Check top-right corner - you'll see `IAM_username @ root_account_name`

---

## EC2 Instance Creation

### What is EC2?

**EC2 (Elastic Compute Cloud)**:
- Virtual servers in the cloud
- Run applications without physical hardware
- Choose operating system, CPU, RAM, storage
- Pay only for what you use

### Use Cases for EC2

1. **Old Laptop Problem**: Need more RAM/CPU for running Kubernetes, Docker, etc.
2. **Scalability**: Quickly create multiple servers to handle traffic
3. **Cost-Effective**: No hardware maintenance costs
4. **Global Access**: Access from anywhere in the world

---

### Step-by-Step EC2 Instance Creation

#### 1. Navigate to EC2 Dashboard

```
AWS Console → Search "EC2" → Click EC2
```

#### 2. Launch Instance

1. Click **"Instances"** in left sidebar
2. Click **"Launch instances"**

#### 3. Configure Instance Details

**Name and Tags**:
```
Name: demo-nodejs-app
```

**Application and OS Images (AMI)**:
- **Quick Start**: Ubuntu
- **AMI**: Ubuntu Server 22.04 LTS
- **Architecture**: 64-bit (x86)
- **Eligibility**: Free tier eligible ✅

**Why Ubuntu?**
- Popular Linux distribution
- Large community support
- Excellent documentation
- Lightweight and fast

---

**Instance Type**:
- **Type**: t2.micro
- **vCPUs**: 1
- **Memory**: 1 GiB
- **Free tier eligible**: ✅

**Instance Type Options**:
```
t2.nano   → 0.5 GiB RAM (smallest)
t2.micro  → 1 GiB RAM (free tier)
t2.small  → 2 GiB RAM
t2.medium → 4 GiB RAM
t2.large  → 8 GiB RAM
... and many more
```

**Choosing Instance Type**:
- Depends on application requirements
- Consider CPU, memory, network performance
- Check cost implications

---

**Key Pair (Login)**:

What is a Key Pair?
- Authentication file for secure SSH login
- Private key stored on your local machine
- Public key stored on EC2 instance

Create New Key Pair:
1. Click **"Create new key pair"**
2. **Key pair name**: `demo`
3. **Key pair type**: RSA
4. **Private key file format**: `.pem`
5. Click **"Create key pair"**

**Important**: `demo.pem` file will be downloaded to your Downloads folder. Keep it safe!

---

**Network Settings**:

Keep defaults:
- ✅ **Allow SSH traffic from**: Anywhere (0.0.0.0/0)
- ✅ **Allow HTTPS traffic from the internet**
- ✅ **Allow HTTP traffic from the internet**

**What Does This Mean?**

**SSH (Secure Shell)**:
- Protocol for secure remote login
- Port: 22
- Allows connection from any IP address

**Security Group**:
- Virtual firewall for EC2 instance
- Controls inbound and outbound traffic
- Essential for security

---

**Storage**:
- Keep default (8 GiB gp3)

**Advanced Details**:
- Keep all defaults

#### 4. Launch Instance

Click **"Launch instance"**

**Expected Output**:
```
Successfully launched instance: i-0123456789abcdef
```

#### 5. View Instance

1. Click **"View all instances"**
2. Wait for **Instance State**: `Running` ✅
3. Wait for **Status Checks**: `2/2 checks passed` ✅

**Instance Details**:
- **Instance ID**: Unique identifier
- **Instance Type**: t2.micro
- **Public IPv4 address**: Used to access instance
- **Availability Zone**: us-east-1a (North Virginia)

---

## Connecting to EC2 Instance

### Understanding SSH Connection

**SSH (Secure Shell)**:
- Encrypted network protocol
- Secure remote login to servers
- Uses public-key cryptography

### Connection Prerequisites

1. **Key pair file**: `demo.pem` (downloaded earlier)
2. **Public IP address**: From EC2 instance details
3. **SSH client**: Terminal (Mac/Linux) or PuTTY (Windows)

---

### Step-by-Step SSH Connection

#### 1. Locate Your Key Pair File

```bash
# Navigate to Downloads folder
cd ~/Downloads

# List files
ls

# You should see: demo.pem
```

---

#### 2. Set Correct Permissions

```bash
# Change file permissions to read-only
chmod 400 demo.pem
```

**What is chmod 400?**

**chmod** = Change Mode (file permissions)

**Permission Structure**:
```
4 = Read
2 = Write
1 = Execute

400 = Owner can read | Group cannot access | Others cannot access
```

**Three Permission Groups**:
1. **Owner** (you): 4 (read only)
2. **Group** (your team): 0 (no access)
3. **Others** (world): 0 (no access)

**Why 400 for SSH keys?**
- Security best practice
- Private keys should never be writable
- Prevents unauthorized modifications

---

#### 3. Get SSH Command from AWS

1. Go to EC2 Dashboard
2. Select your instance
3. Click **"Connect"**
4. Go to **"SSH client"** tab
5. Copy the SSH command

Example:
```bash
ssh -i "demo.pem" ubuntu@ec2-54-123-456-789.compute-1.amazonaws.com
```

**Command Breakdown**:
- `ssh`: SSH client command
- `-i "demo.pem"`: Identity file (private key)
- `ubuntu`: Username (default for Ubuntu AMI)
- `@`: Separator
- `ec2-54-123-456-789...`: Public DNS or IP address

---

#### 4. Connect to Instance

```bash
# Run the SSH command
ssh -i "demo.pem" ubuntu@54.123.456.789

# First-time connection prompt
The authenticity of host '54.123.456.789' can't be established.
Are you sure you want to continue connecting (yes/no/fingerprint)? yes

# Type: yes
```

**What Just Happened?**
- SSH asks to add host to `~/.ssh/known_hosts` file
- This prevents man-in-the-middle attacks
- Future connections won't ask again

---

**Successful Connection Output**:
```
Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-1023-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

ubuntu@ip-172-31-12-34:~$
```

**You're now inside your EC2 instance!** 🎉

---

## Deploying Application on EC2

### Step 1: Update System Packages

```bash
# Update package lists
sudo apt update
```

**Why Update First?**
- Refreshes package repository information
- Ensures latest security patches
- Prevents dependency conflicts
- **Best practice**: Always update before installing packages

**Expected Output**:
```
Hit:1 http://us-east-1.ec2.archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://us-east-1.ec2.archive.ubuntu.com/ubuntu jammy-updates InRelease
...
All packages are up to date.
```

---

### Step 2: Install Git (if not present)

```bash
# Check if git is installed
git --version

# If not installed, install it
sudo apt install git -y
```

**Note**: Ubuntu 22.04 LTS on EC2 comes with Git pre-installed!

---

### Step 3: Install Node.js and npm

Follow [DigitalOcean's Guide](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04)

```bash
# Install Node.js
sudo apt install nodejs -y

# Verify installation
node -v
# Output: v12.22.9

# Install npm (Node Package Manager)
sudo apt install npm -y

# Verify installation
npm -v
# Output: 8.5.1
```

**What Did We Just Install?**
- **Node.js**: JavaScript runtime environment
- **npm**: Package manager for Node.js (like pip for Python)

---

### Step 4: Clone Repository on EC2

```bash
# Clone the GitHub repository
git clone https://github.com/kunal-verma/aws-session.git

# Navigate to project directory
cd aws-session

# List files
ls
```

**Expected Files**:
```
README.md
server.js
package.json
package-lock.json
public/
views/
```

---

### Step 5: Create Environment Variables File

```bash
# Create .env file
touch .env

# Verify file creation (hidden files)
ls -a
```

**Understanding `ls -a`**:
- `ls`: List files
- `-a`: All files (including hidden files starting with `.`)

**Expected Output**:
```
.  ..  .env  .git  README.md  server.js  package.json  ...
```

---

### Step 6: Edit Environment Variables with Vim

```bash
# Open .env file with Vim editor
vim .env
```

**Vim Basics**:
1. **Press `i`**: Enter INSERT mode (can type)
2. **Add content**:
```env
DOMAIN=localhost
PORT=3000
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx
```
3. **Press `Esc`**: Exit INSERT mode
4. **Type `:x`**: Save and exit
5. **Press `Enter`**: Confirm

**Vim Exit Methods**:
- `:x` or `:wq` → Save and quit
- `:q!` → Quit without saving
- `:w` → Save only

---

**Verify File Contents**:
```bash
# Display file content
cat .env
```

**Expected Output**:
```
DOMAIN=localhost
PORT=3000
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx
```

---

### Step 7: Install Dependencies

```bash
# Install all npm packages
npm install
```

**What Happens?**
- Reads `package.json`
- Downloads all dependencies
- Creates `node_modules/` folder
- **Much faster on EC2** due to better network bandwidth!

**Expected Output**:
```
added 150 packages, and audited 151 packages in 3s
```

---

### Step 8: Start Application

```bash
# Start the Node.js server
npm run start
```

**Expected Output**:
```
Server is listening on Port 3000
Application is running inside the remote VM
```

**🎉 Application is running on EC2!** But wait...

---

### Step 9: Try Accessing from Browser

Open browser:
```
http://54.123.456.789:3000
```

**Result**: ❌ **Site can't be reached**

**Why?**
- Application is running inside EC2 ✅
- But EC2 instance is **not exposing port 3000** to the internet ❌
- We need to configure **Security Groups** to allow inbound traffic

---

## Exposing Application to Internet

### Understanding Security Groups

**Security Group** = Virtual firewall for EC2 instance

**Controls**:
- **Inbound rules**: Traffic coming INTO the instance
- **Outbound rules**: Traffic going OUT of the instance

**By Default**:
- SSH (port 22) is allowed → That's why we could connect!
- Custom ports (like 3000) are blocked → That's why browser fails!

---

### Step-by-Step: Configure Inbound Rules

#### 1. Navigate to Security Groups

```
EC2 Dashboard → Select Instance → Security Tab → Click Security Group ID
```

#### 2. Edit Inbound Rules

1. Click **"Inbound rules"** tab
2. Click **"Edit inbound rules"**
3. Click **"Add rule"**

#### 3. Add Custom Port Rule

**Configure Rule**:
- **Type**: Custom TCP
- **Port range**: `3000`
- **Source**: `0.0.0.0/0` (Anywhere)
- **Description**: Allow Node.js app access

**What Does `0.0.0.0/0` Mean?**
- Allow traffic from **any IP address**
- **Anywhere in the world** can access this port
- In production, you might restrict to specific IP ranges

---

#### 4. Save Rules

Click **"Save rules"**

**Expected Inbound Rules**:
```
┌──────────────┬──────────┬─────────────┬─────────────┐
│ Type         │ Protocol │ Port Range  │ Source      │
├──────────────┼──────────┼─────────────┼─────────────┤
│ SSH          │ TCP      │ 22          │ 0.0.0.0/0   │
│ Custom TCP   │ TCP      │ 3000        │ 0.0.0.0/0   │
└──────────────┴──────────┴─────────────┴─────────────┘
```

**Why Port 22 Was Already There?**
- Added automatically during instance creation
- Required for SSH access
- Without it, you couldn't connect via terminal!

---

### Step 10: Access Application from Browser

Open browser and navigate to:
```
http://54.123.456.789:3000
```

**Result**: ✅ **Application loads successfully!**

```
╔════════════════════════════════════╗
║   Cube Simplify Workshops Demo    ║
║   Application Running on AWS EC2   ║
╚════════════════════════════════════╝
```

---

## 🎉 Congratulations!

You've successfully:
1. ✅ Deployed a Node.js application locally
2. ✅ Created an AWS account and IAM user
3. ✅ Launched an EC2 instance
4. ✅ Connected via SSH
5. ✅ Deployed application on EC2
6. ✅ Exposed application to the internet

**Give yourself a pat on the back!** 🎊

---

## Common Issues and Troubleshooting

### Issue 1: "Permission denied (publickey)" Error

**Error Message**:
```
Permission denied (publickey).
```

**Solutions**:
1. **Check key file permissions**:
```bash
chmod 400 demo.pem
```

2. **Verify correct key file**:
```bash
ssh -i "correct-key.pem" ubuntu@IP_ADDRESS
```

3. **Check username** (should be `ubuntu` for Ubuntu AMI)

---

### Issue 2: "Connection timed out"

**Causes**:
- Security group doesn't allow SSH (port 22)
- Wrong IP address
- Instance is stopped

**Solutions**:
1. **Check instance state**: Should be "Running"
2. **Verify security group**: Port 22 should be open
3. **Check IP address**: Use current public IP (changes on restart)

---

### Issue 3: "Site Can't Be Reached" in Browser

**Causes**:
- Application not running on EC2
- Security group doesn't allow port 3000
- Wrong port number

**Solutions**:
1. **Check application is running**:
```bash
npm run start
# Should show: Server is listening on Port 3000
```

2. **Verify security group**: Add inbound rule for port 3000

3. **Check URL format**:
```
http://PUBLIC_IP:3000  ✅
https://PUBLIC_IP:3000 ❌ (no SSL configured)
```

---

### Issue 4: "npm: command not found"

**Cause**: Node.js/npm not installed

**Solution**:
```bash
# Install Node.js and npm
sudo apt update
sudo apt install nodejs npm -y

# Verify
node -v
npm -v
```

---

### Issue 5: Application Stops When Terminal Closes

**Problem**: When you close terminal, application stops

**Cause**: Application runs in foreground, tied to terminal session

**Solutions**:

**Option 1: Use `nohup`**:
```bash
nohup npm run start &
```

**Option 2: Use `screen`**:
```bash
# Install screen
sudo apt install screen

# Create new screen session
screen -S nodejs-app

# Run application
npm run start

# Detach: Press Ctrl+A, then D
# Reattach: screen -r nodejs-app
```

**Option 3: Use PM2** (Production-grade):
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application with PM2
pm2 start server.js --name "my-app"

# Application runs even after logout!
```

---

## Best Practices

### Security Best Practices

1. **Never Use Root Account for Daily Operations**
   - Always create IAM users
   - Assign minimal required permissions

2. **Secure Your Key Pairs**
   - Never share `.pem` files
   - Use `chmod 400` for private keys
   - Store keys in secure location

3. **Restrict Security Group Access**
   ```
   Development: 0.0.0.0/0 (anywhere) - OK for learning
   Production: Specific IP ranges only
   ```

4. **Use Environment Variables**
   - Never hard-code credentials
   - Use `.env` files
   - Add `.env` to `.gitignore`

5. **Keep Systems Updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

### Cost Optimization

1. **Use Free Tier Instances**
   - t2.micro (750 hours/month free)
   - Stop instances when not in use

2. **Monitor Usage**
   - Check AWS Billing Dashboard regularly
   - Set up billing alerts

3. **Terminate Unused Resources**
   - Delete stopped instances
   - Remove unused EBS volumes
   - Clean up old snapshots

---

### Development Best Practices

1. **Always Test Locally First**
   ```bash
   # Test on local machine before deploying
   npm run start
   # Open: http://localhost:3000
   ```

2. **Use Version Control**
   ```bash
   # Always commit changes
   git add .
   git commit -m "Add feature X"
   git push origin main
   ```

3. **Document Your Setup**
   - Maintain README.md
   - Document environment variables required
   - List dependencies clearly

4. **Use Process Managers in Production**
   - PM2, Forever, or systemd
   - Ensures app restarts on crashes
   - Enables monitoring and logging

---

## Interview Questions

### Q1: What is EC2 and why use it?

**Answer**:
EC2 (Elastic Compute Cloud) is AWS's virtual server service. It provides scalable compute capacity in the cloud.

**Benefits**:
- No upfront hardware costs
- Quickly scale up/down based on demand
- Pay only for what you use
- Global availability
- Managed infrastructure (no maintenance overhead)

**Use Cases**:
- Web application hosting
- Development and testing environments
- Big data processing
- Machine learning workloads

---

### Q2: Explain the difference between root user and IAM user in AWS

**Answer**:

**Root User**:
- Created when AWS account is opened
- Has complete, unrestricted access to all AWS resources
- Cannot be restricted by permissions
- Should only be used for initial setup and billing

**IAM User**:
- Created by root user or admin
- Can be assigned specific permissions
- Follows principle of least privilege
- Should be used for daily operations
- Can be grouped for easier management

**Best Practice**: Never use root account for regular tasks. Create IAM users with appropriate permissions.

---

### Q3: What is a Security Group and how does it work?

**Answer**:
Security Group is a virtual firewall that controls inbound and outbound traffic for EC2 instances.

**Key Characteristics**:
- **Stateful**: If you allow inbound traffic, outbound response is automatically allowed
- **Default Deny**: Blocks all traffic by default
- **Rule-based**: You explicitly allow traffic

**Inbound Rules**: Control incoming traffic
- Example: Allow SSH (port 22) from specific IP

**Outbound Rules**: Control outgoing traffic
- Example: Allow all outbound traffic (default)

**Difference from NACL**:
- Security Groups: Instance-level, stateful
- NACLs: Subnet-level, stateless

---

### Q4: How do you connect to an EC2 instance?

**Answer**:

**Methods**:
1. **SSH (Linux/Mac)**:
```bash
ssh -i "key.pem" ubuntu@PUBLIC_IP
```

2. **PuTTY (Windows)**:
   - Convert .pem to .ppk using PuTTYgen
   - Use PuTTY with .ppk key

3. **EC2 Instance Connect**:
   - Browser-based SSH (AWS Console)

4. **Session Manager** (Systems Manager):
   - No need for SSH keys or open ports

**Prerequisites**:
- Key pair (.pem file)
- Security group allowing port 22
- Instance in running state
- Correct username (ubuntu, ec2-user, admin, etc.)

---

### Q5: What are environment variables and why use them?

**Answer**:

**Environment Variables** are dynamic values that affect how processes run on a system.

**Why Use Them?**
1. **Security**: Store sensitive data (API keys, passwords) securely
2. **Flexibility**: Change configuration without modifying code
3. **Environment-specific**: Different values for dev/staging/production
4. **Scalability**: Easy to manage across multiple instances

**Example**:
```env
DB_HOST=localhost
DB_PORT=5432
API_KEY=secret_key_here
```

**Best Practices**:
- Never commit .env to version control
- Use different .env for each environment
- Document required variables in README
- Use tools like AWS Secrets Manager in production

---

### Q6: Explain chmod 400 and why it's used for SSH keys

**Answer**:

**chmod** changes file permissions in Unix/Linux.

**Permission Structure**:
```
4 = Read (r)
2 = Write (w)
1 = Execute (x)

Syntax: chmod [owner][group][others] filename
```

**chmod 400 Breakdown**:
- **4**: Owner can read
- **0**: Group has no permissions
- **0**: Others have no permissions

**Why for SSH Keys?**
- Security requirement: Private keys must not be accessible to others
- Prevents unauthorized modifications
- SSH will reject keys with loose permissions
- Follows principle of least privilege

**Other Common Permissions**:
- `chmod 644`: Owner read/write, others read (typical files)
- `chmod 755`: Owner all, others read/execute (scripts)
- `chmod 600`: Owner read/write only (config files)

---

### Q7: What is the difference between stopping and terminating an EC2 instance?

**Answer**:

**Stopping an Instance**:
- Instance is shut down but not deleted
- EBS volumes remain attached
- Can be restarted later
- **Billing**: No compute charges, but storage charges apply
- Public IP may change (unless Elastic IP)
- **Use case**: Temporary pause to save costs

**Terminating an Instance**:
- Instance is permanently deleted
- EBS volumes deleted (unless configured to persist)
- Cannot be restarted
- **Billing**: All charges stop
- All data lost (unless backed up)
- **Use case**: No longer needed

**Command Comparison**:
```bash
# Stop instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate instance
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

---

### Q8: How would you make an application persistent across reboots?

**Answer**:

**Problem**: Application stops when terminal closes or instance reboots.

**Solutions**:

**1. systemd Service** (Recommended for production):
```bash
# Create service file
sudo vim /etc/systemd/system/myapp.service
```

```ini
[Unit]
Description=My Node.js App
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/aws-session
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable myapp
sudo systemctl start myapp
```

**2. PM2 Process Manager**:
```bash
# Install PM2
sudo npm install -g pm2

# Start app
pm2 start server.js

# Save process list
pm2 save

# Setup auto-start on reboot
pm2 startup
```

**3. nohup** (Quick temporary solution):
```bash
nohup npm start &
```

---

### Q9: What steps would you take to troubleshoot if your application isn't accessible?

**Answer**:

**Systematic Troubleshooting Checklist**:

**1. Verify Instance Status**:
```bash
# Check if instance is running
AWS Console → EC2 → Instances → Instance State
```

**2. Confirm Application is Running**:
```bash
# SSH into instance
ssh -i key.pem ubuntu@IP

# Check process
ps aux | grep node
```

**3. Verify Port and Listening**:
```bash
# Check if application is listening on correct port
netstat -tulpn | grep 3000
# or
sudo lsof -i :3000
```

**4. Check Security Group**:
- Verify inbound rule for application port exists
- Confirm source is 0.0.0.0/0 or your IP

**5. Test Local Connectivity**:
```bash
# From EC2 instance itself
curl http://localhost:3000
```

**6. Check Logs**:
```bash
# Application logs
npm run start
# Look for errors

# System logs
sudo journalctl -u myapp
```

**7. Verify Firewall** (if enabled):
```bash
# Check UFW status
sudo ufw status
```

**8. Test from Different Network**:
- Try from different device/network
- Use mobile hotspot to rule out local network issues

---

### Q10: How do you secure an EC2 instance?

**Answer**:

**Security Best Practices**:

**1. IAM and Access Control**:
- Use IAM roles instead of hardcoded credentials
- Implement least privilege principle
- Enable MFA for root and IAM users

**2. Network Security**:
- Restrict Security Groups to specific IPs
- Use VPC with private subnets
- Implement NACLs for additional layer
```
Production: Only allow office IP range
Example: 203.0.113.0/24
```

**3. SSH Security**:
```bash
# Disable root login
sudo vim /etc/ssh/sshd_config
# Set: PermitRootLogin no

# Use SSH keys (never passwords)
# Change default SSH port (optional)
Port 2222
```

**4. System Updates**:
```bash
# Regular updates
sudo apt update && sudo apt upgrade -y

# Enable automatic security updates
sudo apt install unattended-upgrades
```

**5. Monitoring and Logging**:
- Enable CloudWatch monitoring
- Configure CloudTrail for API logging
- Set up alerts for suspicious activity

**6. Data Encryption**:
- Encrypt EBS volumes
- Use HTTPS for web traffic
- Encrypt data in transit and at rest

**7. Application Security**:
- Keep dependencies updated
- Use environment variables for secrets
- Implement proper authentication/authorization

---

## Key Takeaways

### Technical Skills Learned

1. ✅ **Git Operations**
   - Clone repositories
   - Understand git workflow
   - Work with .gitignore

2. ✅ **Linux Command Line**
   - Navigate directories (`cd`, `ls`, `pwd`)
   - File operations (`touch`, `cat`, `vim`)
   - Permissions (`chmod`)
   - Package management (`apt`)

3. ✅ **Node.js Development**
   - npm package management
   - Environment variables
   - Running Node.js applications

4. ✅ **AWS Services**
   - IAM user creation
   - EC2 instance management
   - Security groups configuration
   - SSH connection

5. ✅ **DevOps Fundamentals**
   - Local testing before deployment
   - Remote server setup
   - Application deployment
   - Exposing services to internet

---

### Important Concepts

**1. Cloud Computing Benefits**:
- No hardware maintenance
- Scalability on demand
- Pay-as-you-go pricing
- Global accessibility

**2. Security Principles**:
- Least privilege access
- Never use root for daily operations
- Protect private keys
- Environment-specific configurations

**3. Development Workflow**:
```
Local Development → Testing → Git Push → Deploy to Cloud → Configure Access
```

**4. Infrastructure as Code (Next Steps)**:
- Automate with Terraform
- Use CloudFormation templates
- Implement CI/CD pipelines

---

### Next Steps and Further Learning

**Immediate Next Steps**:
1. **Try with Different Applications**:
   - Deploy a Python Flask app
   - Deploy a Java Spring Boot app
   - Deploy a static HTML website

2. **Implement Production Features**:
   - Set up custom domain name
   - Configure HTTPS with SSL certificate
   - Implement load balancing

3. **Automation**:
   - Write shell scripts for deployment
   - Create Terraform configurations
   - Set up CI/CD with GitHub Actions

**Learning Resources**:
- [AWS Free Tier Documentation](https://aws.amazon.com/free/)
- [DigitalOcean Community Tutorials](https://www.digitalocean.com/community/tutorials)
- [Git Documentation](https://git-scm.com/doc)
- [Node.js Documentation](https://nodejs.org/docs/)

**Practice Projects**:
1. Deploy a blog application
2. Set up a REST API on EC2
3. Create a microservices architecture
4. Implement auto-scaling groups
5. Set up monitoring with CloudWatch

---

## Important Commands Reference Card

### Git Commands
```bash
git clone <URL>              # Clone repository
git status                   # Check status
git add .                    # Stage all changes
git commit -m "message"      # Commit changes
git push origin main         # Push to remote
```

### Linux Commands
```bash
cd <directory>               # Change directory
ls                           # List files
ls -a                        # List all (including hidden)
pwd                          # Print working directory
touch <file>                 # Create file
cat <file>                   # Display file content
vim <file>                   # Edit file
chmod 400 <file>             # Change permissions
```

### Node.js/npm Commands
```bash
npm install                  # Install dependencies
npm run start                # Start application
npm -v                       # Check npm version
node -v                      # Check Node.js version
```

### SSH Commands
```bash
ssh -i "key.pem" user@IP     # Connect to remote server
chmod 400 key.pem            # Set key permissions
exit                         # Disconnect from server
```

### System Commands
```bash
sudo apt update              # Update package lists
sudo apt install <package>   # Install package
sudo apt upgrade             # Upgrade all packages
ps aux | grep <process>      # Find running process
netstat -tulpn              # Show listening ports
```

---

## Visual Diagram: Complete Deployment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT WORKFLOW                          │
└─────────────────────────────────────────────────────────────────┘

    LOCAL MACHINE                          AWS CLOUD
    
1.  ┌──────────────┐                   
    │ Clone Repo   │                   
    │ git clone    │                   
    └──────┬───────┘                   
           │                           
           ▼                           
2.  ┌──────────────┐                   
    │ Test Locally │                   
    │ npm install  │                   
    │ npm start    │                   
    └──────┬───────┘                   
           │                           
           ▼                           
3.  ┌──────────────┐                   
    │ Create IAM   │                   
    │    User      │                   
    └──────┬───────┘                   
           │                                 ┌──────────────┐
           ▼                                 │   AWS IAM    │
4.  ┌──────────────┐                        │   Service    │
    │ Launch EC2   │ ──────────────────────>│              │
    │  Instance    │                        └──────────────┘
    └──────┬───────┘                                │
           │                                        ▼
           │                                 ┌──────────────┐
           │                                 │ EC2 Instance │
           │                                 │  (Ubuntu)    │
           ▼                                 └──────┬───────┘
5.  ┌──────────────┐                               │
    │ SSH Connect  │ ──────────────────────────────┘
    │ ssh -i key   │                           
    └──────┬───────┘                           
           │                           
           ▼                           
    ┌──────────────────────────────┐
    │  Inside EC2 Instance         │
    │  --------------------------- │
    │  6. sudo apt update          │
    │  7. Install Node.js & npm    │
    │  8. git clone repo           │
    │  9. Create .env file         │
    │ 10. npm install              │
    │ 11. npm start                │
    └──────┬───────────────────────┘
           │                           
           ▼                           
    ┌──────────────────────────────┐
    │  Configure Security Group    │
    │  Add Inbound Rule:           │
    │  Port 3000 → 0.0.0.0/0       │
    └──────┬───────────────────────┘
           │                           
           ▼                           
    ┌──────────────────────────────┐
    │  INTERNET ACCESS             │
    │  http://PUBLIC_IP:3000       │
    │  ✅ Application Live!        │
    └──────────────────────────────┘
```

---

## Security Groups Visualization

```
┌────────────────────────────────────────────────────┐
│              SECURITY GROUP RULES                  │
└────────────────────────────────────────────────────┘

BEFORE: ❌ Application Not Accessible
┌─────────────────────────────────────┐
│ Inbound Rules                       │
├─────────┬──────┬──────────┬─────────┤
│ Type    │ Port │ Protocol │ Source  │
├─────────┼──────┼──────────┼─────────┤
│ SSH     │ 22   │ TCP      │ 0.0.0.0 │
└─────────┴──────┴──────────┴─────────┘
                ↓
          Internet Request
        http://IP:3000 → ❌ BLOCKED

═══════════════════════════════════════════════════

AFTER: ✅ Application Accessible
┌─────────────────────────────────────┐
│ Inbound Rules                       │
├─────────┬──────┬──────────┬─────────┤
│ Type    │ Port │ Protocol │ Source  │
├─────────┼──────┼──────────┼─────────┤
│ SSH     │ 22   │ TCP      │ 0.0.0.0 │
│ Custom  │ 3000 │ TCP      │ 0.0.0.0 │
└─────────┴──────┴──────────┴─────────┘
                ↓
          Internet Request
        http://IP:3000 → ✅ ALLOWED
```

---

## File Permissions Visualization

```
┌────────────────────────────────────────────────────┐
│         LINUX FILE PERMISSIONS (chmod)             │
└────────────────────────────────────────────────────┘

Permission Values:
4 = Read (r)
2 = Write (w)
1 = Execute (x)

chmod 400 demo.pem

    4        0        0
    │        │        │
    ▼        ▼        ▼
┌────────┬────────┬────────┐
│ Owner  │ Group  │ Others │
│  r--   │  ---   │  ---   │
│ (read) │ (none) │ (none) │
└────────┴────────┴────────┘

Common Permissions:
┌──────┬────────┬─────────────────────────┐
│ Code │ Perm   │ Use Case                │
├──────┼────────┼─────────────────────────┤
│ 400  │ r--    │ SSH private keys        │
│ 644  │ rw-r-- │ Regular files           │
│ 755  │ rwxr-x │ Executable scripts      │
│ 600  │ rw---- │ Config files, .env      │
└──────┴────────┴─────────────────────────┘
```

---

## Congratulations! 🎉

You've completed a comprehensive DevOps deployment tutorial covering:
- Local development and testing
- Cloud infrastructure setup (AWS, IAM, EC2)
- Remote server configuration
- Application deployment
- Security configuration
- Exposing services to the internet

**This is a real-world skill used by DevOps engineers daily!**

### Share Your Success
- Deploy the application yourself
- Take a screenshot of your running app
- Share on LinkedIn and tag the instructor
- Add this project to your resume!

### Keep Learning
- Try deploying different applications
- Explore AWS services (S3, RDS, Lambda)
- Learn Infrastructure as Code (Terraform)
- Implement CI/CD pipelines

---

## Credits and Resources

**Session Presented By**: Kunal Verma
- LinkedIn: [Kunal Verma](https://linkedin.com/in/kunal-verma)
- GitHub: [kunal-verma](https://github.com/kunal-verma)
- Community: Cube Simplify Ambassador

**GitHub Repository**: [AWS Session Demo](https://github.com/kunal-verma/aws-session)

**Recommended Learning Platforms**:
- AWS Documentation
- DigitalOcean Tutorials
- Git Documentation
- YouTube DevOps Channels

---

**Remember**: DevOps is all about practice. Don't worry if you break things - that's how you learn! Always experiment in development environments and follow best practices in production.

**Happy Learning! 🚀**
