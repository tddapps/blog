---
title: Ubuntu installation on KVM
keywords:
  - ubuntu
  - kvm
---

[Ubuntu](https://coreos.com/) is a very popular Linux distribution *[citation_needed]* and [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine) its default virtualization infrastructure. Unfortunately, creating Ubuntu virtual machines for KVM is not a simple process. [I built a tool to automate parts of this process](https://github.com/camilin87/kvm-automation) and here's how to use it.  

## Prerequitistes  
- [Ubuntu Server](https://wiki.ubuntu.com/XenialXerus/ReleaseNotes?_ga=1.8579765.1603762589.1484423368/)  
- [KVM](https://www.cyberciti.biz/faq/installing-kvm-on-ubuntu-16-04-lts-server/)  
- [Git](https://www.tddapps.com/2015/06/24/Git-Workflow/)  
- [Ruby](https://www.ruby-lang.org/en/)  
- [Ubuntu Server Installation ISO](http://releases.ubuntu.com/16.04/)  

## Installation  

```bash
git clone --depth 1 https://github.com/camilin87/kvm-automation.git && cd kvm-automation
```

## Create the virtual machine  

This command creates an Ubuntu virtual machine named `vm1` in the `~/vms` folder. The new machine will have two CPUs, four GB of RAM, seven GB of hard drive, and will use the bridge network adapter `br0`  

```bash
ruby vm_task.rb UbuntuVmCreationTask                     \
    --path ~/vms/ --name vm1                             \
    --cpu 2 --ram 4096 --hdd 7 --br br0                  \
    --os-variant "ubuntu16.04"                           \
    --img ~/vm-templates/ubuntu-16.04.2-server-amd64.iso \
    --vnc-port "5921"
```

## Complete the installation  

Fire off your favorite [VNC client](https://en.wikipedia.org/wiki/Virtual_Network_Computing) and connect to your KVM host on port `5921`  

![Ubuntu Installation](/images/ubuntu-kvm/ubuntu-installation-start.png)  

### [kvm-automation](https://github.com/camilin87/kvm-automation) caveats  
- Supports only CoreOS and Ubuntu  
- Designed to use exclusively bridge network adapters using DHCP  
- Does not automate the entire Ubuntu machine provisioning  
- Deletes pre-existing machines with the specified name  
- The VNC traffic is not encrypted and it is available on all the network interfaces of the host  
- The new machine will not be accessible over VNC if the port is already being used by another machine  
