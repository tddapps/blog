---
title: How to run Node cron jobs inside a Docker container
draft: true
---

Although there are several tutorials on how to [run cronjobs inside Docker containers](https://www.ekito.fr/people/run-a-cron-job-with-docker/). They mostly focus on very simple tasks that don't need to read environment variables. Moreover, there are [node specific solutions](https://www.npmjs.com/package/node-schedule). I didn't like those either because they rely on the stability on a long running process. The following guide is my solution to the problem after many hours of searching through [StackOverflow](http://stackoverflow.com/) and good old experimentation.

***TL;DR:*** Create your own [Dockerfile](https://docs.docker.com/engine/reference/builder/) with the following contents  

```sh
FROM camilin87/node-cron:latest

ENV TASK_SCHEDULE='* * * * *'
COPY . /usr/src/app
```

## The base image  
Given the complexity of scheduling a node cron job, the best way I could find to abstract that out was to create my [own base image](https://hub.docker.com/r/camilin87/node-cron/).  

### Inputs  
- `/usr/src/app`: Directory where the executable code shall reside. The image will run `npm start` from this directory.  
- `TASK_SCHEDULE`: Environment variable with the cron schedule. e.g. `TASK_SCHEDULE='* * * * *'` configures a task that runs every minute [Cron HowTo](https://help.ubuntu.com/community/CronHowto)  

### Outputs  
- `/var/log/cron.log`: All the execution logs  


## How to use it?  
1. Create your own [Dockerfile](https://docs.docker.com/engine/reference/builder/) based off the `camilin87/node-cron` image.
2. Make sure to copy your code into `/usr/src/app`. You should have a [`package.json`](https://docs.npmjs.com/getting-started/using-a-package.json) file with a `start` script. The image will run [`npm start`](https://docs.npmjs.com/cli/start) from `/usr/src/app`.
3. Specify the `TASK_SCHEDULE` environment variable. It can be done in the Dockerfile or in the `docker run` command.

Here's a sample `Dockerfile` for a task that runs every minute.

```sh
FROM camilin87/node-cron:latest

ENV TASK_SCHEDULE='* * * * *'
COPY . /usr/src/app
```

## How does it work?  
Our base image is nothing more than a Dockerfile and a couple of shell scripts. [Its source code its free](https://github.com/camilin87/node-cron) and [here's a sample application](https://github.com/camilin87/learn-docker) that uses it. If you feel that something can be improved please create a pull request. Let's deconstruct the base image step by step.  

### [Dockerfile](https://github.com/camilin87/node-cron/blob/master/Dockerfile)  
```sh
FROM node:latest                                   # base this image off the official node image
                                                   # if you need a specific node version
                                                   # simply change latest for what you want
                                                   #
                                                   # more info here => https://hub.docker.com/_/node/

RUN apt-get update && apt-get install -y cron      # install cron
                                                   #
                                                   # more info => https://help.ubuntu.com/community/CronHowto
                                                   #           => https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#apt-get

RUN mkdir -p /usr/src/app                          # our code will be shipped with the new container
                                                   # into the /usr/src/app directory
                                                   # this line creates the directory preemptively

COPY ./templates/crontab /tmp/crontab              # cronjobs are configured as files
                                                   # with a very specific format
                                                   # the file ./templates/crontab will be the base template
                                                   # for all of our cron jobs
                                                   # it will be explained in details later on

RUN touch /etc/cron.d/my-cron-job                  # our cron job configuration will end up in /etc/cron.d/my-cron-job
                                                   # this line creates the file preemptively

RUN chmod 0644 /etc/cron.d/my-cron-job             # give permissions to the cron job configuration file

RUN touch /var/log/cron.log                        # the logs from our job
                                                   # this line creates the log file preemptively

COPY ./templates/setupCron.sh > /tmp/setupCron.sh  # to execute our cronjob we must run multiple commands
                                                   # it is not possible to do it directly from the Dockerfile
                                                   #
                                                   # the file ./templates/setupCron.sh will be
                                                   # executed when the container runs
                                                   # it will be explained in details later 
                                                   #
                                                   # more info => https://docs.docker.com/engine/reference/builder/#cmd

RUN chmod +x /tmp/setupCron.sh                     # give execution permissions to the command

CMD ["/tmp/setupCron.sh"]                          # configure the command to run when the container runs
```

### [templates/crontab](https://github.com/camilin87/node-cron/blob/master/templates/crontab)  
The file `./templates/crontab` contains the initial template of our [cron](https://help.ubuntu.com/community/CronHowto) job.  

```sh
 root cd /usr/src/app && npm start >> /var/log/cron.log 2>&1
# An empty line is required
```

### Cron configuration breakdown  

- **User**: `root`  
- **Working Directory**: `/usr/src/app`  
- **Logs**: `/var/log/cron.log`  
- **Command**: `npm start` This base image is highly opinionated on that sense. Since it's running a node cron job it assumes what the command to execute is.  
- **Schedule**: The schedule is missing from this configuration template because it will be determined when the image runs the `CMD`. That way it can be configurable.

### [templates/setupCron.sh](https://github.com/camilin87/node-cron/blob/master/templates/setupCron.sh)  
The most important file of our image. `./templates/setupCron.sh` is the command that will be executed when our image runs. It will be responsible for making the container environment variables visible to the cron job, and several other useful tasks.  

```bash
#!/bin/bash
env                                           >> /tmp/.env                   # save all the environment variables
                                                                             # into /tmp/.env

cat /tmp/.env                                 >> /etc/cron.d/my-cron-job     # write the environment
                                                                             # variables into the cron job configuration

echo -n "$TASK_SCHEDULE" | cat - /tmp/crontab >> /etc/cron.d/my-cron-job     # write the TASK_SCHEDULE variable
                                                                             # into the cron job configuration
                                                                             # along with the contents 
                                                                             # of the /tmp/crontab file
                                                                             # which is nothing more than the
                                                                             # ./templates/crontab file from the image repo

cron && tail -f /var/log/cron.log                                            # run cron and append its logs
                                                                             # to the log file from our task
```

### Why so complicated?  
The biggest hurdle I had to overcome was making the environment variables visible to the cron job. [Since cron knows nothing about the running shell](http://unix.stackexchange.com/a/27291/134094) the best way I could find was to include them in the crontab file.  
The other caveat was that none of this could be done in the Dockerfile because the most of environment variables are being set when the image is run. The substitution had to be done at runtime. Thus the need for a big shell script.  
