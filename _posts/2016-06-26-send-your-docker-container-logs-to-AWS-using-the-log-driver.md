---
title: Send your Docker container logs to AWS using the log-driver
---

Docker supports several [logging drivers](https://docs.docker.com/engine/admin/logging/overview/) to forward container logs. These are the steps to configure the [AWS CloudWatch log driver](https://github.com/docker/docker/blob/3effe484e6f572298d0c3490517f57391617aa51/docs/reference/logging/awslogs.md) to ship the [`hello-world` container](https://hub.docker.com/_/hello-world/) logs.

*The instructions of this guide are based on [Docker 1.9](https://docs.docker.com/v1.9/engine/reference/logging/overview/).*

## Step 1: Configure [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/)  
We need an `Access Key Id` and a `Secret Access Key` that can forward logs to Cloudwatch. Here's how to [configure AWS Cloudwatch for Log Forwarders](https://www.tddapps.com/2016/07/01/configure-AWS-cloudwatch-for-log-forwarders/).  

## Step 2: Configure your docker daemon to use the AWS credentials  

### Mac OS X  
*These instructions are for the [Docker Toolbox](https://www.docker.com/products/docker-toolbox) because [Docker for Mac](https://docs.docker.com/engine/installation/mac/) is still in beta.*  

1- Open a `Docker QuickStart Terminal`  
2- Stop the the `default` docker-machine  

```sh
docker-machine stop default
```

3- Create a new `awslogs` docker-machine with the AWS credentials  

```sh
docker-machine create -d virtualbox \
    --engine-env AWS_REGION=us-east-1 \
    --engine-env AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxx \
    --engine-env AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxx \
    awslogs
```

### Ubuntu  
The following [GitHub Issue](https://github.com/docker/docker/issues/16551) details the steps to configure AWS credentials on Ubuntu.

### Docker Cloud  
[No support for log drivers yet](https://forums.docker.com/t/is-it-possible-to-set-the-logging-driver/6666).

## Step 3: Run the Container  

```sh
docker run \
    --log-driver=awslogs \
    --log-opt awslogs-region=us-east-1 \
    --log-opt awslogs-group=sample-docker-logs \
    --log-opt awslogs-stream=hello-world-logs \
    hello-world
```

## Step 4: Review the logs  

1- Open the CloudWatch [`sample-docker-logs` group](https://console.aws.amazon.com/cloudwatch/home?#logStream:group=sample-docker-logs)  
2- Open the [`hello-world-logs` stream](https://console.aws.amazon.com/cloudwatch/home?#logEvent:group=sample-docker-logs;stream=hello-world-logs)  

Your should be able to see your logs  
![Hello-World container logs](/images/aws-docker-logs/hello-world-logs-uploaded.png)  
