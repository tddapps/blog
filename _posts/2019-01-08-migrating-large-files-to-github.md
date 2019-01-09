---
title: "Migrating large files to GitHub"
keywords:
  - git
  - github
  - migration
---

GitHub does not track [files larger than 100MB](https://stackoverflow.com/questions/33330771/git-lfs-this-exceeds-githubs-file-size-limit-of-100-00-mb). I hit this limit during a [recent repository migration](https://blog.github.com/changelog/2019-01-08-pricing-changes/). [`git lsf`](https://git-lfs.github.com/) and [`bfg`](https://rtyley.github.io/bfg-repo-cleaner/) helped me push everything. These are the steps I took to overcome this limitation.  

## Prerequisites  
- Create a backup of your repository.  
- Install the [Git Large File Storage Tool](https://git-lfs.github.com/).  
- Get the [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/).  
- Make sure the repository is in a clean state.  

## Solution  

**Step 1**: Try to push.  

```bash
git push origin master
```

### `GH001` Error  

```
Pushing to https://github.com/tddapps/my_secret_app.git
POST git-receive-pack (chunked)
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.        
remote: error: Trace: 354c0f098fda496abeb40f7f6472b655        
remote: error: See http://git.io/iEPt8g for more information.        
remote: error: File Assets/Dependencies/libsmbclient.a is 114.65 MB; this exceeds GitHub's file size limit of 100.00 MB        
To https://github.com/tddapps/my_secret_app.git
 ! [remote rejected] change-photo-source-buttons -> change-photo-source-buttons (pre-receive hook declined)
 ! [remote rejected] critical-section -> critical-section (pre-receive hook declined)
 ! [remote rejected] master -> master (pre-receive hook declined)
 ! [remote rejected] version_1_0 -> version_1_0 (pre-receive hook declined)
 ! [remote rejected] version_1_1 -> version_1_1 (pre-receive hook declined)
error: failed to push some refs to 'https://github.com/tddapps/my_secret_app.git'
Completed with errors, see above
```

Write down the problematic filename. `libsmbclient.a` in this case.  

**Step 2**: Remove the file from your history. Don't worry, it will stay in your working directory.  

```bash
java -jar ~/Downloads/bfg-1.13.0.jar --delete-files libsmbclient.a --no-blob-protection
```

**Step 3**: Unstage the file.  

```bash
git reset
```

**Step 4**: Track the file as a Large Object.  

```bash
git lfs track "libsmbclient.a"
```

**Step 5**: Stage, commit and push.  

```bash
git add -A && \
  git commit -m "track large objects properly" && \
  git push origin master
```

### Success!  

```
Pushing to https://github.com/tddapps/my_secret_app.git
POST git-receive-pack (786 bytes)
To https://github.com/tddapps/my_secret_app.git
 = [up to date]      version_1_0 -> version_1_0
 = [up to date]      version_1_1 -> version_1_1
   8ce3374..e7fb4b8  master -> master
updating local tracking ref 'refs/remotes/github/master'
Uploading LFS objects: 100% (1/1), 120 MB | 1.4 MB/s, done
Completed successfully
```

## Got other errors?  

Repeat the steps if the error persists with other files.  

## Want to know more?  

- [BFG Repo Cleaner Website](https://rtyley.github.io/bfg-repo-cleaner/)  
- [Stack Overflow question on the topic](https://stackoverflow.com/questions/33330771/git-lfs-this-exceeds-githubs-file-size-limit-of-100-00-mb)  
- [Git LFS Website](https://git-lfs.github.com/)  
