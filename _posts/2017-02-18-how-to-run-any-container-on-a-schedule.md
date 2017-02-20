---
title: "How to run any container on a schedule"
---

Configuring a recurring task on a Docker container requires an [uncountable number of steps](https://www.tddapps.com/2016/05/05/how-to-run-node-cron-jobs-in-a-docker-container/). Moreover, an image designed to *"compute an hourly database health report"* can rarely be reused to *"check the api server status every three minutes"*. [`camilin87/docker-cron`](https://github.com/camilin87/docker-cron) is a Docker image that interacts with the [Docker Engine Api](https://docs.docker.com/engine/api/v1.25/) to create and run containers on a schedule. The following examples describe its usage and inner workings.  

## Task 1: Ping `www.google.com`  

This snippet creates a new container named `urlStatusChecker` based on the `dperson/smokeping:latest` image. It will run the `ping www.google.com -c 1` command on startup.

```bash
docker run --rm --name urlStatusChecker \
  dperson/smokeping:latest              \
  ping www.google.com -c 1
```

### Task 1.1: Ping `www.google.com` every three minutes  

The following snippet also creates a `urlStatusChecker` container to ping `www.google.com`. However, this new container will get recreated and executed every three minutes.

```bash
cat > containerInfo.json <<EOL
{
    "Image": "dperson/smokeping:latest",
    "Name": "urlStatusChecker",
    "Cmd": [
        "ping",
        "www.google.com",
        "-c",
        "1"
    ]
}
EOL

docker run --rm -d --name docker-cron                         \
  -v /var/run/docker.sock:/var/run/docker.sock                \
  --env TASK_SCHEDULE='*/3 * * * *'                           \
  -v $PWD/containerInfo.json:/usr/src/containerInfo.json      \
  camilin87/docker-cron
```

### How does it work?  

The code from `Task 1.1` is running a container named `docker-cron` based on the `camilin87/docker-cron` image. That container will in turn create a new `urlStatusChecker` container based on the `dperson/smokeping:latest` every three minutes.  

**`TASK_SCHEDULE`**: an environment variable to configure the frequency  

**`containerInfo.json`**: a file that contains the detailed specification of the task to run. It can describe any aspect of the spawned container -*volumes, networks, cmd, ...*- as long as it is supported on the [Docker Engine Api](https://docs.docker.com/engine/api/v1.25/). The `camilin87/docker-cron` image is built to `POST` this file to the [`/containers/create` Docker Engine Api method](https://docs.docker.com/engine/api/v1.25/).  

**`/var/run/docker.sock`**: [Is the socket where the Docker Daemon is listening to](https://docs.docker.com/engine/reference/commandline/dockerd/#/daemon-socket-option). It needs to be mounted as a volume for the `docker-cron` container to interact with the [Docker Engine Api](https://docs.docker.com/engine/api/v1.25/).  

### Things we didn't have to do  

Let's analyze some tasks we didn't have to do to ping `www.google.com` every three minutes:  

- We did not have to create a new Docker image. We were able to reuse the same `dperson/smokeping:latest` image we were using before.  
- We did not have to install nor configure `cron` nor any other dependency.  
- We did not have to configure a new `cron` task and all the complexities it involves with configuration files and log rotation.  
- We don't have to worry about memory leaks or performance degradation over time. Simply because a brand new instance of `dperson/smokeping:latest` is created and destroyed every three minutes.  

## Task 2: Parameterize the Ping url and count  

The following task is very similar to `Task 1`. However, in `Task 2` the url and the number of requests can be parameterized through the `PING_URL` and `PING_COUNT` environment variables.  

```bash
docker run --rm --name urlStatusChecker     \
  --env PING_URL="www.facebook.com"         \
  --env PING_COUNT=1                        \
  dperson/smokeping:latest                  \
  sh -c "ping \$PING_URL -c \$PING_COUNT"
```

### Task 2.1: Ping `www.facebook.com` every three minutes  

This would be the equivalent parameterized scheduled Ping.  

```bash
cat > containerInfo.json <<EOL
{
    "Image": "dperson/smokeping:latest",
    "Name": "urlStatusChecker",
    "Cmd": [
        "sh",
        "-c",
        "ping \$PING_URL -c \$PING_COUNT"
    ]
}
EOL

docker run --rm -d --name docker-cron                         \
  -v /var/run/docker.sock:/var/run/docker.sock                \
  --env TASK_SCHEDULE='*/3 * * * *'                           \
  --env PING_URL='www.facebook.com'                           \
  --env PING_COUNT=1                                          \
  --env COPY_ENV_VARS='PING_URL,PING_COUNT'                   \
  -v $PWD/containerInfo.json:/usr/src/containerInfo.json      \
  camilin87/docker-cron
```

### How does it work?  

The `camilin87/docker-cron` image copies environment variables from the `docker-cron` container into the `urlStatusChecker` container. However, -*for security reasons*- it does not copy all the environment variables. It only copies those environment variables specified in `COPY_ENV_VARS`.  

Once more `camilin87/docker-cron` is leveraging existing functionality of the [`/containers/create` Docker Engine Api method](https://docs.docker.com/engine/api/v1.25/). It is injecting the environment variables specified in `COPY_ENV_VARS` into the `Env` field of the Api request.  

### Why so much hassle with environment variables?  

Environment variables have traditionally been the foundation to provide non-persistent configuration to containers. Any decent container scheduler should provide a secure way to deal with them.  

## Bonus: Docker Swarm support  

[Docker Swarm](https://www.docker.com/products/docker-swarm) provides some nice monitoring capabilities out of the box. The following snippet has the same functionality as the one from `Task 2`.  

```bash
docker service create                                                                       \
  --replicas 1                                                                              \
  --name docker-cron                                                                        \
  --env TASK_SCHEDULE='*/3 * * * *'                                                         \
  --env PING_URL='www.facebook.com'                                                         \
  --env PING_COUNT=1                                                                        \
  --env COPY_ENV_VARS='PING_URL,PING_COUNT'                                                 \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock                 \
  --mount type=bind,source=$PWD/containerInfo.json,destination=/usr/src/containerInfo.json  \
  camilin87/docker-cron
```

## Additional resources  

- Visit [The Cron Format](http://www.nncron.ru/help/EN/working/cron-format.htm) to learn more about `cron` job frequencies  
- All the source [can be found here](https://github.com/camilin87/docker-cron)  
- This [readme file](https://github.com/camilin87/docker-cron/blob/master/readme.md) contains additional usage and configuration details  
- `camilin87/docker-cron` uses the [Docker Engine Api 1.24](https://docs.docker.com/engine/api/v1.24/) for compatibility reasons with Docker 1.12  

