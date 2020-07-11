---
title: "Lessons from building a Raspberry Pi 4 NAS"
keywords:
  - raspberry pi
  - linux
  - ubuntu
---

I built a home NAS with a Raspberry Pi 4. It took longer than expected. The end result is not as great as I originally envisioned. These are some bits of hard-earned knowledge to save you time and pain.  

## USB  

USB 3 support is not great. I tested at least four different drives and as many drive enclosures. Powered USB hubs. Even powered hard drive enclosures. Drives just disconnect regularly.  

This [forum post](https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=245931) helped mitigate some USB problems. However, I found no reliable way to copy hundreds of gigabytes over USB. I had to copy the bulk of the data on my laptop.  

## File System  

Since I had to plug the NAS disk to my laptop, file system selection was harder.  

I chose [Ex-FAT](https://en.wikipedia.org/wiki/ExFAT). It comes native on Mac OS and [can be installed](https://pimylifeup.com/raspberry-pi-exfat/) on Linux. However, `mount.exfat` CPU usage becomes high at times.  

## Operating System  

Use Raspbian to minimize friction. Most documentation and examples are based on it.  

I tried Ubuntu first. But some things work differently (e.g. `/boot/cmdline.txt` is in `/boot/firmware/nobtcmd.txt`).  

## Power Supply  

Get the [Official Power Supply](https://amzn.to/3b2OsVn). The Raspberry Pi 4 comes with a USB-C charging port. But this port [is not entirely compliant with the USB-C standard](https://arstechnica.com/gadgets/2019/07/raspberry-pi-4-uses-incorrect-usb-c-design-wont-work-with-some-chargers/). Incompatible cables and power supplies cause throttling.  

Monitor your computer physical parameters. Voltage, temperature, etc. If the board gets too hot it will get throttled. The [`vcgencmd`](https://www.raspberrypi.org/documentation/raspbian/applications/vcgencmd.md) is very useful to troubleshoot these issues.  

## Automation  

Automate your setup. I created a few ansible playbooks for provisioning. These playbooks are the NAS core.  

I tried many different approaches because I had the automation to reduce variance and manual errors. Ultimately, this NAS will be moved to a different computer and the ansible playbooks will help me do it.  

## Learn  

Building a NAS out of a Raspberry Pi is a good learning experience for those who want to learn more about Linux administration.  

Is it worth the time and effort compared to an [off-the-shelf solution](https://amzn.to/2WoHfcQ)? It depends.  

This NAS is not suitable for high volume loads. But it is silent, small, and has a close to zero power consumption. It is built on a general purpose computer and operating system. It has no proprietary restrictions. It gets regular security updates. It gives you control to tailor it to your needs.
