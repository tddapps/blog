---
title: I built my own AWS Cloudwatch log forwarder as an npm package
draft: true
---

[AWS Cloudwatch](https://aws.amazon.com/cloudwatch/) is an outstanding monitoring platform. It is extremely configurable with support to many log sources and custom alarms based on metrics. On top of that AWS Cloudwatch prices are competitive to say the least. Unfortunately, monitoring resources outside of AWS [is not straightforward](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html). To solve this problem I created my own [`AWS Cloudwatch logs forwarder`](https://www.npmjs.com/package/aws-cloudwatch-forwarder) as a non-obtrusive `npm` package.  

## Existing Cloudwatch log forwarding tools   

Amazon provides a [CloudWatch Logs Agent](http://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AgentReference.html) off the batch. Unfortunately, this agent must be installed as a service running on a server. While this is easy on EC2 instances, it is practically impossible to do in other more ephemeral environments such as [Heroku](https://www.heroku.com/).  

Fortunately, Amazon built the [CloudWatch Logs API](http://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/Welcome.html) for developers to interact with the system. The development team was nice enough to provide SDKs in several programming languages. While these SDKs are relatively simple to use, they still require a certain amount of work and understanding of the API.  

To overcome these issues other developers built [their own forwarding tools](https://www.npmjs.com/search?q=cloudwatch) based on the Cloudwatch SDK. Unfortunately, they all share the same problem. The application code would have to change to explicitly log to Cloudwatch. Moreover, the majority of the javascript tools can only be used from other javascript applications.  

## Why I built the [`aws-cloudwatch-forwarder`](https://www.npmjs.com/package/aws-cloudwatch-forwarder)  

- **It can be used outside of AWS**: It will forward logs from anywhere as long as the firewall rules don't block it.  

- **It doesn't need an agent installation**: Built as a regular `npm` package, it can be used as a standalone tool such as `echo` or `grep`. Yes, you can use it to send your [Heroku](https://www.heroku.com/) logs to [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/).  

- **No need to change any existing code**: It can be used with existing applications. Even if they're not built with javascript.  
    ```sh
    aws-cloudwatch-forwarder 'echo "sample application"'
    ```

## How do I use it  

Visit the [`aws-cloudwatch-forwarder` `npm` page](https://www.npmjs.com/package/aws-cloudwatch-forwarder) for the latest documentation.  

## I want to see how it works  

The [aws-cloudwatch-forwarder is entirely open source](https://github.com/camilin87/aws-cloudwatch-forwarder).  
