---
title: How to use your Keybase key for ssh  
draft: false
---

Extracting an [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) key out of [Keybase](https://keybase.io/) is not straightforward for security beginners. These are the steps I took to automate the process.  

## The problem  

Manually managing usernames and passwords for [ssh](https://en.wikipedia.org/wiki/Secure_Shell) into servers can be a difficult task. All those different passwords need to be backed up, synchronized across multiple computers, and typed every single time. Although password managers mitigate the credentials problem there's a better mechanism to [remote into boxes without typing passwords](http://www.rebol.com/docs/ssh-auto-login.html). The process involves generating public and private [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) key files.  

These RSA keys need to be backed up and shared across different computers. While some use [Dropbox](https://db.tt/mawxtzeB) to keep their keys synchronized others use [Keybase](https://keybase.io/). It is an online service to store [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) keys and map them to public identities such as Twitter accounts and domain registrations.  

## Prerequisites  

1. Have a [Keybase](https://keybase.io/) account.  
*The service is not entirely open to the public yet but I may be able to get you an invitation*  

2. Install [Git](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git), [Keybase](https://keybase.io/download), [GnuPg](https://www.gnupg.org/download/index.html) and [MonkeySphere](http://web.monkeysphere.info/download/).  
*[Homebrew](http://brew.sh/) users can run the following command*  

```bash
    brew install git keybase gpg monkeysphere
```

## **TL;DR;** Run the following command  

```bash
git clone https://gist.github.com/957f184047f768e6c5939d54cdea7448.git ./ && sh keybase-to-rsa.sh
```

Your public key will be the file `id_rsa.pub` and your private key will be `id_rsa`  

## How does it work?  

[This gist](https://gist.github.com/camilin87/957f184047f768e6c5939d54cdea7448) automates the process of exporting your Keybase PGP keys into RSA keys.  

```bash
#!/bin/bash

echo "Start Export Process"

echo "Log into Keybase..."
keybase login

echo "Exporting your PGP keys..."
# Exporting your Keybase public key to keybase.public.key
keybase pgp export -o keybase.public.key
# Exporting your Keybase private key to keybase.private.key
keybase pgp export -s -o keybase.private.key

echo "Importing your Keybase keys..."
# Import your Keybase public key
gpg -q --import keybase.public.key
# Import your Keybase private key
gpg -q --allow-secret-key-import --import keybase.private.key
# The key import process produces a short hexadecimal hash
# We need to extract this hash and use it to generate the RSA key
# The hash is temporarily saved into hash.key
gpg --list-keys | grep '^pub\s*.*\/*.\s.*' | grep -oEi '\/(.*)\s' | cut -c 2- | awk '{$1=$1};1' > hash.key

echo "Generating RSA keys..."
# Generate the RSA private key using the hexadecimal hash
# The private key will be saved in the id_rsa file
gpg --export-options export-reset-subkey-passwd,export-minimal,no-export-attributes --export-secret-keys --no-armor `cat hash.key` | openpgp2ssh `cat hash.key` > id_rsa
# Secure the private RSA key file  
chmod 400 id_rsa
# Generate the public RSA key file  
ssh-keygen -y -f id_rsa > id_rsa.pub

echo "Cleaning up..."
# Remove all the temporary files  
rm *.key

echo "Success"
```

## Want to know more?  
- [Security basics with GPG, OpenSSH, OpenSSL and Keybase](http://www.integralist.co.uk/posts/security-basics.html#7.3)  
- [Convert keys between GnuPG, OpenSsh and OpenSSL](http://sysmic.org/dotclear/index.php?post/2010/03/24/Convert-keys-betweens-GnuPG%2C-OpenSsh-and-OpenSSL)  
