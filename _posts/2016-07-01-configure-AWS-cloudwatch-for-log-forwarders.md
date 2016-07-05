---
title: "Configure AWS Cloudwatch for Log Forwarders"
---

[AWS CloudWatch](https://aws.amazon.com/cloudwatch/) is a monitoring service to collect logs. It can be configured to accept multiple log sources. As with other AWS services Cloudwatch has detailed security and access control support. These are the steps I take to configure any log forwarder to Cloudwatch.

This guide will produce an `Access Key Id` and a `Secret Access Key`.  

### Configure an Access Policy  

Policies are the backbone of AWS security. It is a good practice to write them as restrictive as possible. [^policies]  

1- Open the [IAM Policies](https://console.aws.amazon.com/iam/home#policies) section  
2- Select `Create Policy` ![Create Policy](/images/aws-docker-logs/create-policy-button.png)  
3- Select `Create Your Own Policy`  
4- Name it `CloudWatchLogSender`  
5- Add the following text to the `Policy Document` section  

```json
{
    "Version": "2016-07-02",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

*What is this?*: A policy that only Allows the actions `CreateLogGroup`, `CreateLogStream`, `DescribeLogGroups`, `DescribeLogStreams`, and `PutLogEvents` on any resource.  

### Create an AWS User  

Having a specialized user just to forward logs can significantly limit the impact of any attack on the account. [^overkill]  

1- Open the [User Management Module](https://console.aws.amazon.com/iam/home#users)  
2- Create a new user named `CloudWatchLogSender`.  
Make sure to **save these security credentials** because **this is the last time you'll see them**  
![User Created](/images/aws-docker-logs/user-created-2.png)  
3- Open the [`CloudWatchLogSender` user details page](https://console.aws.amazon.com/iam/home#users/CloudWatchLogSender)  
4- Click the `Attach Policy` button in the `Permissions` tab  
![Attach Policy](/images/aws-docker-logs/attach-policy-button.png)  
5- Attach the `CloudWatchLogSender` policy

Your user summary should look like this  
![User Summary](/images/aws-docker-logs/user-summary.png)  

# Summary  
We have created the necessary security provisions to forward logs to AWS Cloudwatch from any source. Moreover, we have credentials that can be used by any forwarder compatible with Cloudwatch.  

[^policies]: [More Info on AWS policies](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).

[^overkill]: Restrictive access controls limit the risk of somebody using your account [to mine Bitcoins](http://www.theregister.co.uk/2015/01/06/dev_blunder_shows_github_crawling_with_keyslurping_bots/) or some other crazy thing.  
