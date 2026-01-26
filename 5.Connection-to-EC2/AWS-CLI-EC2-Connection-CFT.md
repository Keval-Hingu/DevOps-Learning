# Day 5 | AWS CLI Full Guide | How to Connect to EC2 Instance | AWS CFT Walkthrough

## Topics Covered
- Connecting to EC2 instances (UI and Terminal)
- Terminal options for different platforms
- AWS CLI installation and configuration
- Automating AWS resource creation
- Introduction to AWS CloudFormation Templates (CFT)
- Brief overview of boto3 for Python automation

---

## 1. Connecting to EC2 Instances

### 1.1 Method 1: AWS Console UI

**Steps:**
1. Navigate to AWS Console → EC2 Dashboard
2. Click on "Instances"
3. Select the running instance
4. Click on the Instance ID
5. Click "Connect" button
6. Scroll down and click "Connect" again
7. Browser-based terminal session opens

**Disadvantages:**
- Session timeout issues
- Not convenient for daily operations
- Cannot save session configurations
- Limited functionality compared to native terminals
- Manual navigation through UI every time

### 1.2 Method 2: Terminal/CLI Connection (Recommended)

**Advantages:**
- Persistent sessions
- Use your preferred terminal
- Can save configurations
- More efficient for DevOps engineers
- Access to local tools and scripts

---

## 2. Terminal Options by Platform

### 2.1 macOS
**Recommended: iTerm2**
- Website: https://iterm2.com
- Best terminal for Mac users
- Download and install in ~1 minute
- Rich features and customization

### 2.2 Windows
**Option 1: PuTTY**
- Widely used
- Basic UI
- Free download available

**Option 2: MobaXterm (Recommended)**
- Better user interface
- Free version: Save up to 10 connections
- Paid version: 100+ connections
- Feature-rich

**Option 3: NoMachine**
- Alternative terminal option
- Used in the past by the instructor
- Good functionality

### 2.3 Linux
- Built-in terminal usually sufficient
- Can also use iTerm2 or other alternatives

---

## 3. SSH Connection to EC2 Instance

### 3.1 Connection Command Structure
```bash
ssh -i <path-to-pem-file> <username>@<public-ip-address>
```

### 3.2 Step-by-Step Process

**Step 1: Get Public IP Address**
- Go to EC2 Dashboard
- Click on your instance
- Copy the **Public IP Address** (NOT Private IP)
- Private IP: Only accessible within AWS VPC
- Public IP: Accessible from external sources

**Step 2: Basic SSH Attempt**
```bash
ssh ubuntu@<public-ip-address>
```
**Result:** Permission denied (missing key file)

**Step 3: SSH with Identity File**
```bash
ssh -i ~/Downloads/test11.pem ubuntu@<public-ip-address>
```
**Result:** Permission error - "permissions are too open"

**Step 4: Fix PEM File Permissions**
```bash
chmod 600 ~/Downloads/test11.pem
```
**Why?** PEM files contain sensitive information. Open permissions allow others to access your credentials.

**Step 5: Connect Successfully**
```bash
ssh -i ~/Downloads/test11.pem ubuntu@<public-ip-address>
```
**Result:** Successfully connected!

### 3.3 First Connection
- First time: System asks to remember fingerprint → Type "yes"
- Connection established to EC2 instance

### 3.4 Verification
```bash
# Create a test file
touch abhishek

# List files
ls

# Create another file
touch abhishek2

# Verify
ls
```

---

## 4. Managing EC2 Instances

### 4.1 Stopping an Instance
1. Select instance in EC2 Dashboard
2. Click "Actions"
3. Go to "Instance State" → "Stop instance"

**Why Stop?**
- AWS bills only for running instances
- Stop instances when not in use to save costs
- Can restart later if needed

### 4.2 Terminating an Instance
1. Stop the instance first (best practice)
2. Click "Actions" → "Instance State" → "Terminate instance"

**Warning:** Termination deletes the instance permanently!

---

## 5. Automation Options for AWS

As discussed in previous classes, multiple automation approaches exist:

1. **AWS CLI** (Command Line Interface) - Today's focus
2. **AWS API** (Direct API calls)
3. **AWS CDK** (Cloud Development Kit)
4. **AWS CloudFormation Templates**
5. **Terraform** (Third-party IaC tool)
6. **boto3** (Python SDK)

---

## 6. AWS CLI Setup and Usage

### 6.1 Installation

**Download AWS CLI:**
- Search: "download AWS CLI"
- Official page: AWS Command Line Interface

**Installation by Platform:**

**Windows:**
- Download 64-bit MSI installer
- Run installer with Next → Next → Finish
- Add to PATH or use from installation location

**macOS:**
- Download macOS package
- Follow installation instructions

**Linux:**
- Follow Linux installation guide

### 6.2 Verify Installation
```bash
aws --version
```
**Expected Output:**
```
aws-cli/2.x.x Python/3.x.x ...
```

### 6.3 Locate AWS Binary
```bash
which aws
```

---

## 7. AWS CLI Authentication

### 7.1 Create Access Keys

**Steps:**
1. Go to AWS Console
2. Click on username (top-right)
3. Select "Security credentials"
4. Scroll to "Access keys" section
5. Click "Create access key"
6. Acknowledge the risks
7. Click "Create access key"

**Result:**
- **Access Key ID**: Public identifier
- **Secret Access Key**: Private secret (shown once!)

**Security Best Practices:**
- ⚠️ NEVER share access keys publicly
- Store in secure location (vault/secret manager)
- Delete access keys after demo/testing
- Rotate keys regularly

### 7.2 Configure AWS CLI
```bash
aws configure
```

**Prompts:**
```
AWS Access Key ID: <paste-access-key-id>
AWS Secret Access Key: <paste-secret-access-key>
Default region name: us-east-1
Default output format: json
```

**Configuration Location:**
- Stored in: `~/.aws/credentials` and `~/.aws/config`
- boto3 and other AWS SDKs can read from this location

---

## 8. AWS CLI Commands

### 8.1 List S3 Buckets
```bash
aws s3 ls
```
**Output:** Lists all S3 buckets in your account

### 8.2 Create S3 Bucket
```bash
aws s3 mb s3://abhishek-123456-642
```
**Note:** S3 bucket names must be globally unique

### 8.3 EC2 Commands

**List EC2 Instances:**
```bash
aws ec2 describe-instances
```

**Create EC2 Instance:**
```bash
aws ec2 run-instances \
    --image-id ami-xxxxxxxx \
    --instance-type t2.micro \
    --key-name my-key-pair \
    --security-group-ids sg-xxxxxxxx \
    --subnet-id subnet-xxxxxxxx
```

**Required Parameters:**
- `--image-id`: AMI ID
- `--instance-type`: Instance size (t2.micro, t2.small, etc.)
- `--key-name`: SSH key pair name
- `--security-group-ids`: Security group ID
- `--subnet-id`: Subnet ID

---

## 9. AWS CLI Documentation

### 9.1 Finding Commands
- Search: "AWS CLI documentation"
- Navigate to: Command References
- Browse by service: S3, EC2, IAM, etc.

### 9.2 Example Documentation Structure
```
AWS CLI → Command References → EC2 → run-instances
```

**Each command includes:**
- Description
- Syntax
- Required parameters
- Optional parameters
- Examples
- Output format

---

## 10. AWS CloudFormation Templates (CFT)

### 10.1 What is CloudFormation?
- Infrastructure as Code (IaC) approach
- Define AWS resources in templates
- Automate resource creation
- Version control for infrastructure

### 10.2 Finding CFT Examples

**GitHub Repository:**
- Organization: `aws-samples`
- Repository: `aws-cloudformation-templates`
- URL: https://github.com/aws-samples/aws-cloudformation-templates

**Navigation:**
```
aws-cloudformation-templates/
  └── AWS/
      └── Services/
          └── EC2/
              └── EC2 Instance examples
```

### 10.3 Using CloudFormation in AWS Console

**Steps:**
1. Go to AWS Console
2. Search for "CloudFormation"
3. Click "Create stack"

**Template Options:**
- **Use a sample template**: AWS-provided examples
- **Upload a template file**: Your custom template
- **Amazon S3 URL**: Template stored in S3

**Process:**
1. Select template source
2. Upload/paste template
3. Click "Next"
4. Configure stack parameters
5. Review and create

**Note:** Detailed CFT will be covered in future Infrastructure as Code (IaC) sessions

---

## 11. AWS boto3 (Python SDK)

### 11.1 What is boto3?
- Python SDK for AWS
- Programmatic access to AWS services
- Well-maintained with comprehensive documentation

### 11.2 Documentation
- Website: boto3.amazonaws.com
- Installation guide
- Configuration instructions
- API references
- Code examples

### 11.3 Installation
```bash
pip install boto3
```

### 11.4 Configuration
boto3 automatically uses credentials from:
```bash
aws configure
```
(Same credentials used by AWS CLI)

### 11.5 Example: List EC2 Instances
```python
import boto3

# Create EC2 client
ec2 = boto3.client('ec2')

# List instances
response = ec2.describe_instances()

# Process response
for reservation in response['Reservations']:
    for instance in reservation['Instances']:
        print(f"Instance ID: {instance['InstanceId']}")
        print(f"State: {instance['State']['Name']}")
```

### 11.6 boto3 Documentation Features
- Request syntax
- Response structure
- Error handling
- Code examples for each service

**Note:** Detailed boto3 programming will be covered in future automation sessions

---

## 12. Summary of Automation Methods

| Method | Use Case | Complexity |
|--------|----------|------------|
| **AWS Console (UI)** | Manual operations, learning | Low |
| **AWS CLI** | Scripting, automation, quick tasks | Low-Medium |
| **CloudFormation** | Infrastructure as Code, reproducible | Medium |
| **boto3 (Python)** | Complex automation, integration | Medium-High |
| **Terraform** | Multi-cloud IaC | Medium-High |
| **AWS CDK** | Code-based infrastructure | High |

---

## 13. Assignment

### Task 1: Install AWS CLI
- Download and install AWS CLI for your platform
- Verify installation: `aws --version`

### Task 2: Configure Authentication
1. Create AWS access keys
2. Run `aws configure`
3. Enter credentials and region

### Task 3: Practice CLI Commands
Try the following:
```bash
# List S3 buckets
aws s3 ls

# Create an S3 bucket (use unique name)
aws s3 mb s3://your-unique-name-12345

# List EC2 instances
aws ec2 describe-instances

# Create an EC2 instance (follow documentation)
aws ec2 run-instances --help
```

### Task 4: Explore Documentation
- Visit AWS CLI documentation
- Find commands for:
  - S3 operations (copy, move, remove)
  - EC2 operations (start, stop, terminate)
  - Choose any other service you're interested in

### Task 5: Optional Challenge
- Find an AWS CloudFormation template example
- Try to understand the template structure
- Attempt to create a simple resource using CFT

---

## 14. Important Notes

### Security Reminders
- ⚠️ Delete access keys after testing
- Never commit credentials to Git
- Use IAM roles when possible
- Rotate keys regularly
- Follow principle of least privilege

### Best Practices
- Stop instances when not in use (save costs)
- Use consistent naming conventions
- Tag your resources
- Use version control for scripts
- Document your automation

### Billing Awareness
- AWS charges for running instances
- Stop or terminate unused resources
- Monitor your AWS billing dashboard
- Set up billing alerts

---


## 15. Key Takeaways

1. **Two ways to connect to EC2:**
   - AWS Console UI (quick but not efficient)
   - SSH via terminal (recommended for daily use)

2. **Authentication is crucial:**
   - PEM files for SSH access
   - Access keys for CLI/API access
   - Proper permissions (chmod 600)

3. **Automation improves efficiency:**
   - Manual UI: Time-consuming
   - AWS CLI: Scriptable and repeatable
   - IaC tools: Version-controlled infrastructure

4. **Documentation is your friend:**
   - AWS CLI reference
   - boto3 documentation
   - CloudFormation examples
   - Community resources (GitHub)

5. **Security first:**
   - Protect credentials
   - Use appropriate permissions
   - Delete unused resources

---
## End of Day 5 Guide