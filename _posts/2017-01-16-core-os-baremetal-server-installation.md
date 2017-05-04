---
title: CoreOS baremetal server installation
keywords:
  - coreos
---

[CoreOS](https://coreos.com/) is a lightweight Linux distribution designed specifically to run containers. Unfortunately its installation on baremetal servers is not as streamlined as [other Linux distributions](https://www.ubuntu.com/download/desktop/install-ubuntu-desktop). These are the steps I took to install CoreOS on a couple of physical machines.  

## Prerequisites  

1. [Download and burn a CoreOS ISO](https://coreos.com/os/docs/latest/booting-with-iso.html)  

1. [Generate ssh keys to log into the boxes](https://www.tddapps.com/2017/01/15/how-to-use-your-keybase-key-for-ssh/)  

1. Generate a `cloud-config.yml` file  

        cat > cloud-config.yaml <<EOL
        #cloud-config
        ssh-authorized-keys:
            - `cat id_rsa.pub`
        EOL

    *This `cloud-config.yaml` can be reused to provision multiple computers*  

1. Copy the `cloud-config.yaml` file to a flash drive  
    *[Additional `cloud-config.yaml` help](https://www.digitalocean.com/community/tutorials/how-to-use-cloud-config-for-your-initial-server-setup)*  

## Prepare the installation  

1. Connect the computer to the LAN  

1. Boot up from the CD  

1. Wait until a command prompt appears  
    *[More information on the CoreOS installation to disk](https://coreos.com/os/docs/latest/installing-to-disk.html)*

## Copy the `cloud-config.yaml` into the server  

1. Plug in the flash drive with the `cloud-config.yaml`  

1. List the physical disks  

        lsblk

1. Determine what is the first partition of the USB drive. In this example we'll use `/dev/sdb1` where `/dev/sdb` is the physical device  

1. Copy the `cloud-config.yaml`  

        sudo su - root
        mkdir ~/flash
        mount -o ro /dev/sdb1 ~/flash
        cp ~/flash/cloud-config.yaml ~/
        umount /dev/sdb1
        rm -Rf ~/flash

1. Unplug the flash drive  

## Run the installation  

    coreos-install -d /dev/sda -c ~/cloud-config.yaml
    reboot

At this point the server should boot up using DHCP. Its console will display its `IP` and `MAC` address.

## Remote into the server  

`ssh` into the box [using your private RSA key](https://www.cyberciti.biz/faq/force-ssh-client-to-use-given-private-key-identity-file/)  

    ssh -i id_rsa core@192.168.1.80

Success!

## BONUS: Configure the network to use a static IP  

1. List the Network Interfaces  

        ifconfig

1. Determine the name of the Ethernet Adapter. In this example we'll use `eno1`  

1. Execute the following commands using the appropriate values for your network  

        sudo su - root

        cat > /etc/systemd/network/static.network <<EOL
        [Match]
        Name=eno1

        [Network]
        Address=192.168.1.10/24
        Gateway=192.168.1.1
        DNS=8.8.8.8
        EOL

        reboot

    *[More information on CoreOS network configuration](https://coreos.com/os/docs/latest/network-config-with-networkd.html)*  

At this point the server should boot up using the new `IP`.
