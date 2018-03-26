---
title: How to use your Keybase key for ssh  
keywords:
  - keybase
  - ssh
  - security
---

Extracting an [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) key out of [Keybase](https://keybase.io/) is not straightforward for security beginners. These are the steps I took to automate the process.  

## The problem  

Manually managing usernames and passwords for [ssh](https://en.wikipedia.org/wiki/Secure_Shell) into servers can be a difficult task. All those different passwords need to be backed up, synchronized across multiple computers, and typed every single time. Although password managers mitigate the credentials problem there's a better mechanism to [remote into boxes without typing passwords](http://www.rebol.com/docs/ssh-auto-login.html). The process involves generating public and private [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) key files.  

These RSA keys need to be backed up and shared across different computers. While some use [Dropbox](https://db.tt/mawxtzeB) to keep their keys synchronized others use [Keybase](https://keybase.io/). It is an online service to store [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) keys and map them to public identities such as Twitter accounts and domain registrations.  

## Prerequisites  

1. Have a [Keybase](https://keybase.io/) account.  
2. Have a working [Docker](https://www.docker.com/) installation  

## Solution  

The following commands generate ssh keys out of the Keybase PGP keys  

```bash
TMP_KEY_STORAGE=~/devroot/keys
mkdir -p $TMP_KEY_STORAGE
docker run -it --rm -v $TMP_KEY_STORAGE:/home ubuntu:16.04 /bin/bash

apt-get update -y
apt-get install curl monkeysphere -y
curl -O https://prerelease.keybase.io/keybase_amd64.deb
dpkg -i keybase_amd64.deb
apt-get install -f -y
rm keybase_amd64.deb

groupadd -g 1001 user_data
useradd --create-home -g user_data -u 1001 user_data
su user_data
cd /home/user_data

keybase login

# Exporting your Keybase public key to keybase.public.key
keybase pgp export -o keybase.public.key
# Exporting your Keybase private key to keybase.private.key
keybase pgp export -s --unencrypted -o keybase.private.key

# Import your Keybase public key
gpg -q --import keybase.public.key
# Import your Keybase private key
gpg -q --allow-secret-key-import --import keybase.private.key
# The key import process produces a short hexadecimal hash
# We need to extract this hash and use it to generate the RSA key
# The hash is temporarily saved into hash.key
gpg --list-keys | grep '^pub\s*.*\/*.\s.*' | grep -oEi '\/(.*)\s' | cut -c 2- | awk '{$1=$1};1' > hash.key

ENC_KEY=`cat hash.key`
echo $ENC_KEY

# Generate the RSA private key using the hexadecimal hash
# The private key will be saved in the id_rsa file
gpg --export-options export-reset-subkey-passwd,export-minimal,no-export-attributes --export-secret-keys --no-armor $ENC_KEY | openpgp2ssh $ENC_KEY > id_rsa
# Secure the private RSA key file  
chmod 400 id_rsa
# Generate the public RSA key file  
ssh-keygen -y -f id_rsa > id_rsa.pub

# Remove all the temporary files  
rm *.key

exit
exit

chmod 400 $TMP_KEY_STORAGE/user_data/id_rsa
```

### Bonus: Replace the default ssh key  

```bash
# Delete any pre-existing key  
rm -f ~/.ssh/id_rsa.pub
rm -f ~/.ssh/id_rsa

mkdir -p ~/.ssh/

# Create symbolic links to the default  
ln -s $TMP_KEY_STORAGE/user_data/id_rsa.pub ~/.ssh/id_rsa.pub
ln -s $TMP_KEY_STORAGE/user_data/id_rsa ~/.ssh/id_rsa
```

## Want to know more?  
- [Security basics with GPG, OpenSSH, OpenSSL and Keybase](http://www.integralist.co.uk/posts/security-basics.html#7.3)  
- [Convert keys between GnuPG, OpenSsh and OpenSSL](http://sysmic.org/dotclear/index.php?post/2010/03/24/Convert-keys-betweens-GnuPG%2C-OpenSsh-and-OpenSSL)  
