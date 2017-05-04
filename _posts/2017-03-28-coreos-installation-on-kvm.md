---
title: CoreOS installation on KVM
keywords:
  - coreos
  - kvm
---

[CoreOS](https://coreos.com/) is a lightweight Linux distribution designed specifically to run containers. [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine) is the default virtualization infrastructure for [Ubuntu](https://www.ubuntu.com/). Unfortunately, creating a CoreOS virtual machine for KVM is not a simple process. [I built a tool to automate this process](https://github.com/camilin87/kvm-automation) and here's how to use it.  

## Prerequitistes  
- [Ubuntu Server](https://wiki.ubuntu.com/XenialXerus/ReleaseNotes?_ga=1.8579765.1603762589.1484423368/)  
- [RSA key](https://www.tddapps.com/2017/01/15/how-to-use-your-keybase-key-for-ssh/)  
- [KVM](https://www.cyberciti.biz/faq/installing-kvm-on-ubuntu-16-04-lts-server/)  
- [Git](https://www.tddapps.com/2015/06/24/Git-Workflow/)  
- [Wget](https://www.gnu.org/software/wget/)  
- [bzip2](http://www.bzip.org/)  
- [Ruby](https://www.ruby-lang.org/en/)  

## Installation  

```bash
git clone --depth 1 https://github.com/camilin87/kvm-automation.git && cd kvm-automation
```

## Create the virtual machine  

This command creates a CoreOS virtual machine named `vm1` in the `~/vms` folder. The new machine will have two CPUs, four GB of RAM, seven GB of hard drive, and will use the bridge network adapter `br0`  

```bash
ruby vm_task.rb CoreOsVmCreationTask         \
    --path ~/vms/ --name vm1 --dwnld true    \
    --cpu 2 --ram 4096 --hdd 7 --br br0      \
    --key ~/.ssh/id_rsa.pub
```

### How does it work?  
[kvm-automation](https://github.com/camilin87/kvm-automation) generates a hard drive after downloading the [latest Stable CoreOS QEMU Image](https://coreos.com/os/docs/latest/booting-with-qemu.html). It then builds a [`cloud-config.yml`](https://coreos.com/os/docs/latest/cloud-config.html) out of the [public RSA key](https://www.tddapps.com/2017/01/15/how-to-use-your-keybase-key-for-ssh/) and the machine name. The tool then uses this information to create a KVM virtual machine that will autostart on system boot.  

### [kvm-automation](https://github.com/camilin87/kvm-automation) caveats  
- Supports only CoreOS and Ubuntu  
- Designed to use exclusively bridge network adapters using DHCP  
- Does not allow guest customization through the [`cloud-config.yml`](https://coreos.com/os/docs/latest/cloud-config.html)  
- Deletes pre-existing machines with the specified name  
