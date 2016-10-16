---
title: How to forward your Heroku logs to AWS Cloudwatch for free
---

[Heroku](https://www.heroku.com/) is a great platform to run apps with little infrastructure involvement. Most of the time, you just push your code and you get a website up and running in seconds. Heroku even supports third party addons for those times when extra functionality is required. However, I could not find any addon to send my application logs to [AWS Cloudwatch](https://aws.amazon.com/cloudwatch/). The only logical solution was to [build my own AWS Cloudwatch log forwarder](/2016/10/09/my-own-aws-cloudwatch-forwarder-as-an-npm-package/).  

## How to forward the logs to AWS Cloudwatch?  

*The following steps are for [node](https://nodejs.org/) based apps. If you have a Heroku app made in something else drop me a line and I'll help you set it up.*  

**Step 1**: Have a deployed NodeJs application in Heroku. [How?](https://devcenter.heroku.com/articles/getting-started-with-nodejs)  
**Step 2**: [Get your AWS credentials](/2016/07/01/configure-AWS-cloudwatch-for-log-forwarders/)  
**Step 3**: Setup the following [Heroku environment variables](https://devcenter.heroku.com/articles/config-vars)  

```sh
heroku config:set AWS_REGION='us-east-1'
heroku config:set AWS_ACCESS_KEY_ID='XXXXXXXXXXXXXXX'
heroku config:set AWS_SECRET_ACCESS_KEY='XXXXXXXXXXXXXXX'
```

**Step 4**: Install [aws-cloudwatch-forwarder](https://www.npmjs.com/package/aws-cloudwatch-forwarder) on your project  

```sh
npm i aws-cloudwatch-forwarder --save
```

**Step 5**: Use it in your `package.json`  

Change the `start` script in your `package.json` in a similar way to this:  

```json
"start": "aws-cloudwatch-forwarder 'node web.js'"
```

## Want to see it in action?  
[Here's some sample code](https://github.com/camilin87/test-heroku-cron)  
