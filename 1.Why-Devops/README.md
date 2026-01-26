# What is DevOps ?
- It's a culture or best practice that improves the deliverable abilities of organization.
- It's an adoption of a method to delivers the application.
- Devops is a process of delivering in a continuous manner:
- Devops is a process of improving the application delivery by ensuring following:
1.Automation
2.Quality
3.Continuous Testing
4.Continuous Monitoring

# Why DevOps ?
- Before DevOps -> to deploy the single application (to take the application from developer to the end customers.), there were multiple developers/engineers are involved to deploy,test the single application, 
- All the process is manually,
- To automate the process , the world of the DevOps is evolved.
 
---

# 🌐 DevOps – Day 1 Notes (Foundations)

## 🔹 What is DevOps?

DevOps is a **culture, practice, and set of tools** that helps organizations **deliver applications faster and more reliably**.

In simple words:

> **DevOps = Development + Operations working together**

DevOps focuses on **continuous delivery** of software by improving collaboration, automation, and monitoring.

### 🔑 Key Goals of DevOps

DevOps improves application delivery by ensuring:

1. **Automation** – Reduce manual work using tools and scripts
2. **Quality** – Stable, reliable releases
3. **Continuous Testing** – Test at every stage of development
4. **Continuous Monitoring** – Monitor performance and errors in real time

---

## 🔹 Why DevOps?

### Before DevOps:

* Multiple teams involved (Developers, Testers, Operations)
* Manual deployments
* Slow releases
* High chances of errors
* Poor communication between teams

### After DevOps:

* Automated build, test, and deployment
* Faster delivery to customers
* Reduced human errors
* Better collaboration
* Continuous feedback loop

👉 **DevOps evolved to automate and streamline the entire software delivery process.**

---

# 🖥️ Linux Basics for DevOps

Linux is the backbone of DevOps. Below are **essential commands** every DevOps engineer must know.

---

## 📂 Directory & File Commands

### Change Directory

```bash
cd <directory_name>
```

### List Files & Directories

```bash
ls
ls -l     # detailed view
ls -a     # show hidden files
```

### Create Directory

```bash
mkdir dir_name
mkdir -p parent/child/grandchild
```

### Create Empty File

```bash
touch empty_file.txt
```

---

## ✏️ Write Content

### Print Text to Console

```bash
echo "Hello DevOps"
```

### Write Text to File

```bash
echo "This is not empty file" > file.txt
```

### Append Text to File

```bash
echo "New line" >> file.txt
```

---

## 🧪 Practical Tasks & Commands

### 1️⃣ Create an Empty File

```bash
touch empty_file.txt
```

---

### 2️⃣ Create Empty Directory inside `/home/thor`

```bash
mkdir /home/thor/empty_dir
```

---

### 3️⃣ Create Directory Hierarchy

```bash
mkdir -p /home/thor/asia/india/bangalore
```

---

### 4️⃣ Create File with Content

```bash
echo "This is not empty fil" > /home/thor/contents_file.txt
```

---

### 5️⃣ Copy File to Directory

```bash
cp /home/thor/asia/bangalore.txt /home/thor/asia/india/bangalore/
```

---

### 6️⃣ Copy Directory to Another Location

```bash
cp -r /home/thor/asia/india/bangalore /home/thor/
```

---

### 7️⃣ Remove File

```bash
rm /home/thor/asia/bangalore.txt
```

---

### 8️⃣ Remove Directory with Contents

```bash
rm -r /home/thor/asia/india/bangalore
```

---

### 9️⃣ Count Files & Directories

```bash
tree /home/thor/test_dir/
```

**Output shows:**

* 📁 3 directories
* 📄 3 files

---

### 🔟 List Only `.txt` Files

```bash
ls /home/thor/test_dir/*.txt
```

---

## 👤 User & Permission Commands

### Current User

```bash
whoami
```

---

### User ID Details

```bash
id
```

Example Output:

```
uid=1001(thor) gid=1001(thor) groups=1001(thor),10(wheel)
```

---

### Switch User

```bash
su ansible
```

---

### Login to Remote Server (SSH)

```bash
ssh thor@172.16.238.3
```

---

## 🔐 Root & Sudo Commands

### List Root Directory Files

```bash
sudo ls /root
```

👉 Normal users **cannot access `/root` without sudo privileges**

---

## 🌍 Download Files from Internet

### Using curl

```bash
cd /home/thor
curl -O https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
```

### Using wget

```bash
wget https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf -O /home/thor/dummy.pdf
```

---

## 🖥️ OS Information Commands

### OS Details

```bash
cat /etc/*release*
```

### Kernel Info

```bash
uname -a
```

### System Architecture

```bash
arch
```

---

## ⭐ Extra Important Day-1 DevOps Commands

```bash
pwd        # show current directory
clear      # clear terminal
history    # show command history
man ls     # command manual
df -h      # disk usage
free -m    # memory usage
top        # real-time system usage
```

---

## 🎯 Summary – Day 1 Takeaways

* DevOps improves **speed, quality, and reliability**
* Linux commands are **mandatory for DevOps**
* Automation replaces manual effort
* DevOps is a **culture + process + tools**

---

