# Day 03 - Creating Virtual Machines (AWS & Azure) | DevOps Learning

**Course:** Free DevOps Course (45 days - Zero to Hero)  
**Topic:** AWS & Azure - How to Create Virtual Machines (Part 2)  
**URL:** https://www.youtube.com/watch/NJkMe9cdYEQ

---

## Table of Contents

1. [Introduction](#introduction)
2. [Recap: Virtual Machines Theory](#recap-virtual-machines-theory)
3. [Manual vs Automated Approach](#manual-vs-automated-approach)
4. [Creating Virtual Machines: Overview](#creating-virtual-machines-overview)
5. [Methods for Automation](#methods-for-automation)
6. [Cloud Providers: AWS, Azure, On-Premise](#cloud-providers-aws-azure-on-premise)
7. [AWS Automation Tools](#aws-automation-tools)
8. [AWS CLI](#aws-cli)
9. [AWS API](#aws-api)
10. [AWS CloudFormation Templates (CFT)](#aws-cloudformation-templates-cft)
11. [AWS Cloud Development Kit (CDK)](#aws-cloud-development-kit-cdk)
12. [Terraform](#terraform)
13. [When to Use Terraform](#when-to-use-terraform)
14. [Hybrid Cloud Model](#hybrid-cloud-model)
15. [AWS Console: Creating VMs Manually](#aws-console-creating-vms-manually)
16. [Azure Console: Creating VMs Manually](#azure-console-creating-vms-manually)
17. [Key Differences: AWS vs Azure](#key-differences-aws-vs-azure)
18. [Next Steps](#next-steps)

---

## Introduction

- Day 03 covers the practical implementation of virtual machines
- This is **Virtual Machines Part 2** - the practical demonstration
- We will learn:
  - How to create VMs through UI (manual approach)
  - Different cloud platforms: AWS, Azure, and on-premise solutions
  - How to automate VM creation (API calls, scripts)
- This session builds on Day 03's theoretical foundation
- Both beginners and advanced users will benefit from different perspectives

**[↑ Back to Contents](#table-of-contents)**

---

## Recap: Virtual Machines Theory

### What We Learned in Day 03

- **Server Definition:** A machine that hosts and runs applications
- **Physical Servers:** Traditional approach with one server per team/application
- **Problem:** Massive resource wastage (90%+ underutilization)
- **Solution:** Virtualization using hypervisors
- **Hypervisor:** Software layer that creates and manages multiple VMs on one physical server
- **Virtual Machines:** Logical computer systems that share one physical server
- **Efficiency Gain:** Move from serving 100 teams to serving millions of teams with the same infrastructure

### Evolution Context

- 20-30 years ago: Everyone had to buy physical servers
- Today: Cloud computing with virtualization is standard
- Even startups can access enterprise-grade infrastructure
- Small organizations benefit from massive economies of scale

**[↑ Back to Contents](#table-of-contents)**

---

## Manual vs Automated Approach

### The Core Challenge in DevOps

- **DevOps Core Principle:** Efficiency
- **Manual Approach Problem:**
  - If you receive 100 requests for VMs
  - You would need to log into AWS console 100 times
  - Create each VM one by one manually
  - This is **inefficient and against DevOps principles**

### Why Automation Matters

- **Time Saving:** Automation completes in seconds/minutes vs hours manually
- **Error Reduction:** No human error with automation scripts
- **Scalability:** Create 100 or 1000 VMs with same effort
- **Consistency:** Every VM created with exact same configuration
- **DevOps Alignment:** Automation is the core of DevOps philosophy

### Important Note

- Even automating a single VM creation is better than doing it manually
- Even if it saves just one minute of time, it counts as automation
- Automation reduces manual intervention, which means fewer errors
- The goal is always to improve efficiency

**[↑ Back to Contents](#table-of-contents)**

---

## Creating Virtual Machines: Overview

### High-Level Process

**User Request:**
- A user (Mr. X) sits at their laptop
- They want to create a virtual machine
- They have two options:
  1. **Manual Approach:** Log into cloud console UI
  2. **Automated Approach:** Use scripts/APIs

### Manual Approach Flow

1. Open browser
2. Navigate to AWS Console or Azure Portal
3. Search for EC2 (AWS) or Virtual Machines (Azure)
4. Fill in configuration details
5. Click "Launch/Create"
6. Receive IP address and credentials

### Automated Approach Flow

1. Write a script in CLI, Python, or other language
2. Script makes API call to cloud provider
3. API validates: Is request valid? Is user authenticated? Is user authorized?
4. If all checks pass, cloud provider creates VM
5. Script receives VM details (IP address, credentials)

### The API Layer

**Three Essential Criteria for API Calls:**

1. **Valid Request:**
   - Request must follow the API standards
   - All required parameters must be provided
   - Format must be correct

2. **Authenticated User:**
   - User must have valid AWS/Azure account
   - User must be logged in
   - Credentials must be verified

3. **Authorized User:**
   - User must have permission to create VMs
   - Just having an AWS account doesn't mean you can create everything
   - Permissions are controlled through IAM (Identity and Access Management)

**[↑ Back to Contents](#table-of-contents)**

---

## Methods for Automation

### Overview of Available Methods

When creating VMs programmatically, you have multiple options depending on your needs and organization.

### The Tools Available

- **AWS CLI**
- **AWS API**
- **AWS CloudFormation Templates (CFT)**
- **AWS Cloud Development Kit (CDK)**
- **Terraform** (multi-cloud)

### Comparison Table

| Method | Cloud-Specific | Best For | Use Case |
|--------|---|---|---|
| AWS CLI | AWS only | Quick automation, single servers | Quick scripts, one-time tasks |
| AWS API | AWS only | Custom integrations | Complex workflows |
| CFT | AWS only | Infrastructure templates | Repeatable infrastructure |
| AWS CDK | AWS only | Advanced infrastructure | AWS-focused organizations |
| Terraform | Multi-cloud | Hybrid environments | Multi-cloud setups |

**[↑ Back to Contents](#table-of-contents)**

---

## Cloud Providers: AWS, Azure, On-Premise

### Three Main Deployment Models

1. **AWS (Cloud)**
   - Public cloud provider
   - Global data centers in multiple regions
   - Managed infrastructure
   - Pay-as-you-go model

2. **Azure (Cloud)**
   - Microsoft's public cloud provider
   - Similar to AWS but with different branding
   - Integration with Microsoft products
   - Similar automation approaches

3. **On-Premise (Private Infrastructure)**
   - Organization owns physical servers
   - Uses their own data center
   - Hypervisor installed locally (VMware, Xen, etc.)
   - Organization manages everything

### Process Across All Platforms

**Despite different platforms, the core process is the same:**

- Identify available resources
- Make a request with specifications
- Hypervisor allocates resources
- VM is created with specified configuration
- User receives access details

**Important:** As a DevOps engineer, you must be familiar with all three scenarios because organizations might use any of them.

**[↑ Back to Contents](#table-of-contents)**

---

## AWS Automation Tools

### AWS-Specific Automation Options

AWS provides developers with multiple APIs and tools to automate resource creation. Each service has its own API.

### The Concept Behind APIs

- **API = Application Programming Interface**
- Every AWS service exposes an API
- Examples:
  - EC2 API (for virtual machines)
  - S3 API (for storage)
  - RDS API (for databases)
  - EBS API (for volumes)

### Developer Responsibility

- AWS developers expose the EC2 service through API
- This allows external developers to programmatically control EC2
- Any automation tool must talk to these APIs

**[↑ Back to Contents](#table-of-contents)**

---

## AWS CLI

### What is AWS CLI?

- **CLI = Command Line Interface**
- A command-line tool provided by AWS
- Allows you to interact with AWS services from your terminal
- No need to open browser or console

### Usage Example

```bash
aws ec2 create-instances --image-id ami-12345678 --instance-type t2.micro --key-name my-key
```

### Advantages

- Quick and efficient
- Good for single or few VMs
- Easy to learn and use
- Direct interaction with AWS

### Disadvantages

- Can be tedious for large-scale automation
- Limited template capabilities
- Not ideal for complex infrastructure

### When to Use

- One-off VM creation
- Quick testing
- Simple infrastructure needs
- Learning purposes

**[↑ Back to Contents](#table-of-contents)**

---

## AWS API

### What is AWS API?

- Direct programming interface to AWS services
- Can be used in any programming language
- Requires understanding of REST APIs
- More flexible but more complex

### Using AWS API Directly

**If you know:**
- REST APIs
- Any programming language (Python, Java, JavaScript, etc.)

**Then you can:**
- Write custom scripts
- Make direct API calls to AWS
- Build complex automation workflows

### Example: Python with Boto3

- **Boto3** = AWS SDK for Python
- Allows Python developers to write software that uses AWS
- Example:

```python
import boto3

ec2 = boto3.resource('ec2')
instances = ec2.create_instances(ImageId='ami-12345678', MinCount=1, MaxCount=1)
```

### Advantages

- Full control and customization
- Can build complex workflows
- Language flexibility
- Most powerful option

### Disadvantages

- Requires programming knowledge
- Steeper learning curve
- More prone to custom errors
- Overkill for simple tasks

**[↑ Back to Contents](#table-of-contents)**

---

## AWS CloudFormation Templates (CFT)

### What is CFT?

- **CloudFormation Template** = Infrastructure as Code template
- AWS proprietary templating language
- Define infrastructure in YAML or JSON
- AWS handles resource creation based on template

### How It Works

**Provide Template → AWS Creates All Resources:**

1. You write a template defining your infrastructure
2. Template specifies: how many VMs, configurations, networks, etc.
3. You submit template to AWS CloudFormation
4. AWS creates all resources as defined
5. Can create 1 to N resources from single template

### Example Concept

```yaml
Resources:
  MyVM:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro
      Count: 10
```

### Advantages

- Infrastructure as Code approach
- Repeatable and version-controllable
- Excellent for creating multiple resources
- AWS-native solution

### Disadvantages

- AWS-specific only
- Learning curve for template syntax
- Limited to AWS ecosystem

### When to Use

- Creating entire infrastructure stacks
- Repeated deployments
- Infrastructure version control
- Multiple related resources

**[↑ Back to Contents](#table-of-contents)**

---

## AWS Cloud Development Kit (CDK)

### What is AWS CDK?

- **CDK = Cloud Development Kit**
- Recently introduced by AWS
- Write infrastructure code in programming languages
- More advanced than CFT
- Better IDE support and debugging

### How It Differs

**CFT:**
- Template-based (YAML/JSON)
- Declarative approach

**CDK:**
- Programming language-based (Python, TypeScript, Java, etc.)
- More programmatic control
- Better for developers

### Advantages

- Modern approach to IaC
- Programming language support
- Better IDE integration
- Easier debugging
- More powerful logic capabilities

### AWS Priority for New Services

- When AWS launches new services, **CDK gets initial support first**
- Then CFT gets support
- Finally other tools like Terraform get support

### Important Advantage

- CDK is proprietary to AWS
- AWS prioritizes support for their own tools
- If you use CDK, you get early access to new AWS services
- Terraform waits for community contribution

### When to Use CDK

- AWS-focused organizations staying with AWS long-term
- Complex infrastructure with logic
- Organizations that prefer programming languages
- Need for early access to new services

**[↑ Back to Contents](#table-of-contents)**

---

## Terraform

### What is Terraform?

- **Multi-cloud infrastructure automation tool**
- Open-source (developed and maintained by HashiCorp)
- Works with AWS, Azure, Google Cloud, and many others
- Not AWS-specific or Azure-specific

### Key Advantage: Multi-Cloud Support

**Terraform vs AWS-specific tools:**

| Aspect | AWS Tools (CLI, CFT, CDK) | Terraform |
|--------|---|---|
| AWS Support | ✓ | ✓ |
| Azure Support | ✗ | ✓ |
| GCP Support | ✗ | ✓ |
| Multi-cloud | ✗ | ✓ |
| Cloud-agnostic | ✗ | ✓ |

### Writing Infrastructure in Terraform

```hcl
resource "aws_instance" "example" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}

resource "azurerm_virtual_machine" "example" {
  name     = "example-vm"
  location = "East US"
}
```

### Advantages

- Multi-cloud capability
- Open-source and community-driven
- Works with any cloud provider
- Consistent syntax across clouds
- Good for hybrid cloud setups

### Disadvantages

- Early access to new services comes late
- Community-maintained (not AWS-maintained)
- General-purpose tool (not optimized for specific cloud)
- Slightly steeper learning curve

### Important Note

- Don't use Terraform just because it's popular
- Choose based on your organization's needs
- If using only AWS, AWS-specific tools might be better

**[↑ Back to Contents](#table-of-contents)**

---

## When to Use Terraform

### Scenario 1: Single Cloud Provider

**If your organization:**
- Uses only AWS
- Plans to stick with AWS for next 10-15 years
- Has no plans for multi-cloud

**Recommendation:**
- Use AWS CDK, CFT, or CLI
- These have early support for new AWS services
- More optimized for AWS

### Scenario 2: Multi-Cloud/Hybrid Cloud

**If your organization:**
- Uses AWS for some services
- Uses Azure for others
- Uses Google Cloud for AI/ML
- Plan to expand across clouds

**Recommendation:**
- Use Terraform
- Unified tool across all platforms
- Consistent workflow
- Easy to manage infrastructure across clouds

### Hybrid Cloud Example

**Common pattern in modern organizations:**

- **AWS:** General infrastructure, RDS databases
- **Azure:** Enterprise integration services
- **Google Cloud:** AI/ML workloads
- **Reasoning:** Different clouds excel at different services

### Interview Tip

- Don't always say "Terraform" in interviews
- Understand your organization's cloud strategy
- Answer wisely based on:
  - Current cloud usage
  - Future plans
  - Organization requirements
  - Business objectives

**Remember:** Terraform is not always the right answer. It depends on context.

**[↑ Back to Contents](#table-of-contents)**

---

## Hybrid Cloud Model

### What is Hybrid Cloud?

**Definition:** Using multiple cloud providers simultaneously for different workloads and services.

### Why Organizations Choose Hybrid Cloud

1. **Specialized Services:**
   - Google Cloud is best for AI/ML
   - AWS is good for general compute
   - Azure integrates well with Microsoft products

2. **Cost Optimization:**
   - Some clouds cheaper for specific services
   - Avoid vendor lock-in

3. **Redundancy:**
   - Distribute risk across providers
   - Better disaster recovery

4. **Compliance:**
   - Some data must be in specific regions/clouds
   - Meet regulatory requirements

### Hybrid Cloud Infrastructure Example

```
Organization Infrastructure:
├── AWS
│   ├── Web Servers (EC2)
│   └── Databases (RDS)
├── Azure
│   └── Enterprise Services
└── Google Cloud
    ├── Machine Learning
    └── Big Data Analytics
```

### Why Terraform for Hybrid Cloud

- **Single Tool:** Manage all clouds with one tool
- **Consistent Syntax:** Same commands for all providers
- **Easy Migration:** Move services between clouds
- **Unified State:** Track all infrastructure centrally

**[↑ Back to Contents](#table-of-contents)**

---

## AWS Console: Creating VMs Manually

### Step 1: Create AWS Account

**Process:**

- Go to: `signin.dot.aws.com` or search "AWS console"
- If you have an account: Sign in with email
- If you don't have an account: Click "Create a new AWS account"
- Follow the wizard with personal details
- Provide valid card details
- AWS will validate by charging small amount (returned immediately)
- Account is created

### Step 2: Navigate to EC2 Service

**In AWS Console:**

1. Search for "EC2" in the services search bar
2. Click on EC2
3. You'll see the EC2 dashboard

### Step 3: Launch Instance

**Process:**

1. Click on "Instances" in left sidebar
2. Click on "Launch Instance"
3. You'll see the instance configuration page

### Step 4: Configure Instance

**Instance Name:**
- Give your VM a name (e.g., "test-vm")

**Choose Operating System:**

Available options:
- Amazon Linux
- Ubuntu (Recommended for beginners)
- Windows
- Red Hat
- Others

**Recommendation:** Use **Ubuntu** because:
- Widely used in DevOps community
- Well-documented
- Easy to learn

### Step 5: Choose Instance Type

**Free Tier Option (Important!):**
- Look for "free tier eligible" badge
- Select free tier instance type
- Example: t2.micro (1 CPU, 1GB RAM)

**Paid Options (if not using free tier):**
- t2.small (1 CPU, 2GB RAM)
- t2.medium (2 CPU, 4GB RAM)
- t2.large (2 CPU, 8GB RAM)
- And many more

**Note:** Free tier keeps you from being charged by AWS

### Step 6: Create Key Pair

**What is Key Pair?**
- Like a password for logging into your VM
- Two keys: Public (AWS) and Private (you)
- You use private key to connect to VM

**Process:**

1. Click "Create new key pair"
2. Name it (e.g., "test-key-1")
3. Select encryption type: **RSA** (default is fine)
4. Select file format: **PEM** (for SSH access)
5. Click "Create key pair"
6. `.pem` file downloads automatically
7. **IMPORTANT:** Save this file securely
   - If lost, you cannot log into your instance
   - Keep backups

**Note:** Currently ignore security groups and VPCs (advanced topics for later)

### Step 7: Launch Instance

1. Click "Launch Instance"
2. Your VM is being created
3. Wait a few minutes for it to start
4. Go back to instances list
5. You'll see your VM with:
   - Instance ID
   - IP Address
   - Status (running/pending)

### That's It!

Your VM is now created and running on AWS.

**[↑ Back to Contents](#table-of-contents)**

---

## Azure Console: Creating VMs Manually

### Step 1: Create Azure Account

**Process:**

- Go to: `portal.azure.com`
- Sign up for new account
- **Special Feature:** Azure accepts GitHub login
  - If you have GitHub account, use it
  - Easier signup process
  - Faster authentication

### Step 2: Free Trial vs Paid

**Azure Free Trial:**
- 30-45 days free (less than AWS)
- Cannot create VMs beyond trial period without payment
- Unlike AWS, no extended free tier

**AWS Free Tier:**
- 12 months free
- More generous than Azure
- Better for learning

### Step 3: Create Virtual Machine

**Process:**

1. Click "Create Resource" button
2. Or search for "Virtual Machines"
3. Click "Create Virtual Machine"

### Step 4: Configure VM

**Same process as AWS:**
- Choose name
- Select operating system
- Choose VM size (if paying)
- Configure networking

**Note:** User Experience (UX) is slightly better on Azure according to instructor

### Step 5: VM Creation

1. Fill in all details
2. Click "Create"
3. Wait for deployment
4. VM is created with:
   - IP Address
   - Access credentials
   - Connection details

### Comparison: AWS vs Azure (for this process)

Both follow same high-level process:
- Open console/portal
- Search for VM service
- Provide configuration details
- Click launch/create
- VM is created
- Receive IP address and credentials

**[↑ Back to Contents](#table-of-contents)**

---

## Key Differences: AWS vs Azure

### Free Trial/Tier

| Aspect | AWS | Azure |
|--------|-----|-------|
| Free Period | 12 months | 30-45 days |
| Learning Advantage | Better for learning | Limited time |
| Cost Structure | Generous free tier | Requires payment sooner |

### User Interface/Experience

| Aspect | AWS | Azure |
|--------|-----|-------|
| UX Design | Traditional | Slightly more intuitive |
| Navigation | Direct but more clicks | Direct and organized |
| Learning Curve | Standard | Slightly easier |

### Authentication

| Aspect | AWS | Azure |
|--------|-----|-------|
| Sign Up | Email-based | Email or GitHub |
| GitHub Integration | Not built-in | Built-in |
| Ease of signup | Standard | Easier with GitHub |

### Terminology

| Concept | AWS | Azure |
|---------|-----|-------|
| Virtual Machine | EC2 Instance | Virtual Machine |
| Storage | S3 | Blob Storage |
| Database | RDS | SQL Database |
| Container | ECR | Container Registry |

### Automation Tools

| Category | AWS | Azure |
|----------|-----|-------|
| CLI | AWS CLI | Azure CLI |
| IaC Template | CloudFormation | Azure Resource Manager |
| Modern IaC | AWS CDK | N/A (use CLI) |

**Note:** These are just the differences in terminology and tools. The fundamental concepts are the same.

**[↑ Back to Contents](#table-of-contents)**

---


## Key Takeaways

1. **Manual Console Method:**
   - Good for learning and understanding basics
   - Not scalable for production
   - Simple and straightforward

2. **Automation Options:**
   - AWS CLI: Simple automation
   - APIs: Full control and customization
   - CFT: AWS infrastructure templates
   - CDK: Modern AWS development
   - Terraform: Multi-cloud solution

3. **Cloud Platforms:**
   - AWS: Better free tier, more mature
   - Azure: GitHub integration, similar capabilities
   - On-Premise: Full control, more management

4. **DevOps Principle:**
   - Efficiency over everything
   - Automate when possible
   - Scale thoughtfully

5. **Choice Matters:**
   - Base decisions on organization needs
   - Don't use tools just because they're popular
   - Understand context before choosing

---