---
title: "Ubuntu Server 18.04 LTS upgrade issues and their solutions"
draft: false
excerpt: I run KVM, PostgreSQL, Kubernetes and the ELK Stack on Ubuntu at home. These computers were running Ubuntu Server 16.04 LTS. These are the solutions to the problems encountered during the upgrade to the latest LTS version 18.04.
keywords:
  - ubuntu
  - kvm
  - postgresql
  - dns
  - devops
---

I run [KVM](https://www.linux-kvm.org/page/Main_Page), [PostgreSQL](https://www.postgresql.org/), [Kubernetes](https://kubernetes.io/) and the [ELK Stack](https://www.elastic.co/elk-stack) on [Ubuntu](https://www.ubuntu.com/) at home. These computers were running [Ubuntu Server 16.04 LTS](http://releases.ubuntu.com/16.04/). These are the solutions to the problems encountered during the upgrade to the [latest LTS version 18.04](http://releases.ubuntu.com/18.04/).  

**Disclaimer**: These solutions may not be appropriate for you. Follow them at your own risk.  

## Upgrade Process  

The operating system prompts you to upgrade whenever you log into a computer with an outdated distribution.  
After creating the mandatory backups I ran the suggested command.  

```bash
do-release-upgrade
```

The upgrade is relatively smooth. It displays several prompts, and everything works fine until it doesn't.  

## Problems during the upgrade  

### `/boot` partition is full  

Some computers that run for years, accumulate old kernels in the `/boot` partition. The upgrade reaches a point where `apt` crashes and nothing can be installed.  

This [guide to cleanup the `/boot` partition](https://gist.github.com/ipbastola/2760cfc28be62a5ee10036851c654600) proved invaluable.  

**Note**: The process to remove old kernels may have to be executed multiple times. Because `sudo apt-get -f install` can fill the `/boot` partition again.  

## Problems after the upgrade  

### Local DNS configuration disappeared  

Every upgraded computer lost their local DNS configuration.  

`cat /etc/resolv.conf` should print something like this:  

```
nameserver 192.168.1.1   # your local DNS IP
search router123456.com  # your local search domain
```

If that is not the case, load the DNS configuration from the new location  

```bash
sudo mv /etc/resolv.conf /etc/resolv.conf.bck
sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
```

### KVM virtual machines failed to start  

Sample Error: 

```bash
$ virsh start vm1
error: Failed to start domain vm1
error: the CPU is incompatible with host CPU: Host CPU does not provide required features: hle, rtm
```

**Note**: These were virtual machines that were running on that same computer before the upgrade.  

[This Red Hat bug report](https://bugzilla.redhat.com/show_bug.cgi?id=1182650) has instructions to correct the issue.  

**Step 1**: Edit the vm:  

```bash
virsh edit vm1
```

**Step 2**: Add the following features to the `cpu` xml node

```xml
<feature policy='disable' name='rtm'/>
<feature policy='disable' name='hle'/>
```

### Laptop screen does not turn off after long inactivity  

This used to work in the old 16.04 version.  

For the new 18.04 version I took a different approach. These commands make sure [the computer doesn't suspend when the lid is closed](https://itsfoss.com/ubuntu-close-lid-suspend/).  

```bash
sudo sed -i 's/#HandleLidSwitchDocked=ignore/HandleLidSwitchDocked=ignore/g' /etc/systemd/logind.conf
sudo sed -i 's/#HandleLidSwitch=suspend/HandleLidSwitch=ignore/g' /etc/systemd/logind.conf
sudo reboot
```

### Deprecated PostgreSQL package  

The upgrade process mentioned the installed PostgreSQL version was deprecated. And that I should try running `pg_upgradecluster` and reading `/usr/share/doc/postgresql-common/README.Debian.gz`.  

Since I had a backup of my data I reinstalled PostgreSQL and everything kept working just fine.  

## Bottomline  

Although the Ubuntu 18.04 upgrade was not free of hiccups, these proved to be relatively easy to solve. Moreover, there was enough troubleshooting documentation readily available.  
