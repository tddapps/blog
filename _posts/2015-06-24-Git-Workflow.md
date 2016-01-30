---
title: Git Workflow
---

I worked in a place with a horrible Git[^git_succintly] repository. This repo was so slow that `git status` usually took more than two seconds. Deprived of a fast GUI tool, the command line became the tool of choice. These are my most frequently used commands.


##How is the working copy doing

    git status

Displays the current branch and the list of modified files in the working copy. Once it displays `nothing to commit, working directory clean` you're good to start working.


##Cleanup everything

    git checkout -- . && git clean -f && git status
  
1. `git checkout -- .` discards all the pending changes in the working copy. It makes no effect on untracked files.
2. `git clean -f` deletes all untracked files from the working copy.
3. `git status` at this point should say that everything is clean. Failures need to be resolved on a per case basis.


##Create a new branch

    git checkout master && git pull && git branch my_new_branch && git checkout my_new_branch

1. `git checkout master` switches to the master branch.
2. `git pull` gets master's latest version.
3. `git branch my_new_branch` creates a new branch named `my_new_branch` off the latest version of master. [^git_branches]
4. `git checkout my_new_branch` starts using the newly created branch. Upcoming changes will go into `my_new_branch`.


##Inspect pending changes

    git diff

Displays the changes detail in a diff format, except for staged changes and untracked files. Although it is very fast, `git diff` becomes almost useless for large changesets. On the other hand, the majority of GUI tools come preloaded with excellent diff capabilities. [^gui_tool]


##Commit everything
A commit is a unique changeset. [^small_commits]

    git add -A && git commit -m "committing all the files" && git push origin my_new_branch

1. `git add -A` stages all the modified and new files. The Staging Area is a snapshot of what will get committed. Staged changes will not be affected by working directory changes.
2. `git commit -m "committing all the files"` creates a new commit with the staged files. This new commit has the message `committing all the files`.
3. `git push origin my_new_branch` pushes `my_new_branch` to the remote tracking branch `origin/my_new_branch` in the remote repository. While it is not required to push every commit right away, doing so protects against losing work in case of hardware failure.

###Commit only the Javascript changes

    git add *.js

Sometimes it is necessary to commit only certain files. In those scenarios the `git add` command can be used with wildcards or specific filenames. Then the previous example becomes:

    git add *.js && git commit -m "committing only javascript changes" && git push origin my_new_branch


##Display the history
The commits history can be displayed from the command line. [^git_log] However, GUI tools truly excel for this task.


##Merge from the latest master
It is a good practice to sync branches frequently [*citation needed*].

    git fetch && git merge origin/master

1. `git fetch` downloads the commits from remote branches but it doesn't merge them.
2. `git merge origin/master` merges the remote master into the current branch. [^git_fetch_workflow]

Sometimes Git will complain in the middle of the operation and you'll be left with a big mess. The following command is equivalent, more resilient, and definitely slower.

    git checkout master && git pull && git checkout my_new_branch && git merge master

###Rebase from master

    git pull --rebase origin master

Rebasing is an alternative to merging. It keeps the history cleaner. However, since rebase rewrites the commits history, it is not recommended for pushed commits. [^git_rebase]


##Solve the conflicts

    git mergetool
 
 Launches the configured merge tool once per conflicted file. [^merge_tools]


##Leave what you're doing to do something else

    git stash -u && git status

1. `git stash -u` creates a stash with all the pending changes, including untracked files. [^git_stash_help]
2. `git status` at this point should say that everything is clean. Failures need to be resolved on a per case basis.

Afterwards, it is safe to do any other operation.


##Return to the previous state

    git stash pop

Stashes behave as a stack. `git stash pop` will pop the latest stash into the working copy. In a similar way `git stash apply` will peek the latest stash into the working copy without changing the stack. At this point the working copy should be in the same state as it was before.


##Rewrite the history
Avoid history modification when possible. [^rewrite_history]

###Something is wrong with the last commit

    git reset --soft HEAD~1 && git reset

1. `git reset --soft HEAD~1` removes the last commit from the history. Its changes are put back into the staging area.
2. `git reset` unstages the staged changes and puts them back into the working copy.

Afterwards, make the necessary edits and commit again. Editing pushed commits can cause serious issues. It is safer to create a new commit to correct the problem.


##What broke the project
When things break out of magic, use `git bisect` to pinpoint the exact commit where the issue started. `git bisect` is such a useful tool that merits a blogpost just for itself. In the meantime, [read this](http://webchick.net/node/99) to learn more about it.



[^git_succintly]: This guide is far from being a Git reference. The avid reader will enjoy [Git Succintly](https://www.syncfusion.com/resources/techportal/ebooks/git). It is a hundred pages book with the basic concepts of Git.

[^gui_tool]: [Git Extensions](https://code.google.com/p/gitextensions/) for Windows and [SourceTree](https://www.sourcetreeapp.com/) for Mac.

[^git_branches]: If branches feel like a drag, look for [Branchless development](http://www.tedunangst.com/flak/post/branchless-development)

[^small_commits]: There are no clearly defined rules for commit sizes. I prefer commits to be very small.

[^git_fetch_workflow]: Some developers prefer to pull directly from `origin/master`. I've encountered a fair number of issues doing this in the past not to do it again.

[^git_rebase]: Visit [this](http://git-scm.com/docs/git-rebase) and [this](http://gitready.com/advanced/2009/02/11/pull-with-rebase.html) to learn more about rebase.
 
[^git_stash_help]: For more information on Git Stashes follow [this link](https://git-scm.com/book/en/v1/Git-Tools-Stashing).

[^rewrite_history]: Go to [this Atlassian tutorial](https://www.atlassian.com/git/tutorials/rewriting-history/) to learn more about rewriting history.

[^merge_tools]: After some research on mergetools I settled for [SourceGear Diffmerge](https://sourcegear.com/diffmerge/). Nowadays, I'm more inclined to use [Beyond Compare](http://www.scootersoftware.com/). Both are very good tools. Configuring the mergetool is beyond the scope of this guide. Mainly, because it is different depending on your setup. Here's how to do it in [SourceTree for Windows](http://stackoverflow.com/questions/16800280/how-to-interactively-visually-resolve-conflicts-in-sourcetree-git). You can also do it in the [Git Extensions settings](http://git-extensions-documentation.readthedocs.org/en/latest/settings.html). Google is your best friend.

[^git_log]: [Git Basics - Viewing the Commit History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History)
