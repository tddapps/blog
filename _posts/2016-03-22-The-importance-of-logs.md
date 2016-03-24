---
title: The Importance of Logs
draft: true
---


Logs are one of the most important components of an application. They provide a quick and reliable way to verify behavior and diagnose errors. Properly written logs can be mined to take business decisions. And yet, they are often neglected.  

## Antipattern: No logs on a production running system  
No matter what your software does, it should have logs. [^corner_cases] Logs will give you a quick way to verify the application behavior.  

## Antipattern: Logging ONLY errors  
Logging errors is certainly necessary. However, normal system behavior should also be logged.  

**Why?** Because it gives visibility of how the software is being used. It creates the infrastructure to monitor the business performance.  

**Example**: This website serves approximately 15,000 registered users a day. Logging every `Successful Login` event gives the ability to configure an alert when the number of logins falls below 10,000. A low number of logins can impact the business and needs to be thoroughly analyzed. Moreover, if the number of `Successful Login` events goes above 25,000 there could be an issue with another part of the system such as the Session Storage Server.  

## Myth: Logging will impact performance  
Garbage Collection too and that hasn't stopped us from using it.  

Although Logging can definitely add some minimal overhead not knowing how your system is behaving can **certainly** impact performance. [^optimization]  

## Best Practice: Auditable logs  
Properly written logs **clearly** describe the chronological history of every user interaction since they started using the application until they finished.  

Include in every log message enough information to quickly filter all the related events. e.g. In a web store this would be the `sessionId`. In a mobile banking app this could be a unique UUID generated when the application started.  

Try to include as much information as possible to determine the log line originator such as the class and method.  

## Best Practice: Log Levels  
Not every log line is written for the same audience. A business analyst could make little sense out of a stack trace. Some events are written to help engineers diagnose an intermittent issue while others are written to build business performance dashboards.  

Segregate your log lines into their appropriate levels.  

### Level Selection Guidelines  
Although the number of log levels may vary these four are almost ubiquitous to every development platform.  

#### Error  
The application encountered an irrecoverable error.  

There should be alerts configured to notify the required personnel when any of these appear. An Error event should be treated as an outage. e.g. `[ERROR] Database Connection Timeout`  

When logging errors try to include as much information as possible such as stack trace and method parameters. These will help you diagnose issues faster.  

#### Warning  
The application encountered a non-fatal error.  

These should be monitored but are not urgent. e.g. `[WARNING] 404 Not Found` errors.  

Alerts can certainly be configured on warning messages. For example an abnormal number of `[WARNING] Failed Captcha Attempt` could indicate a problem with the website rather than user error.  

The number of Errors in your logs should be zero. Any abnormal behavior that is not an emergency should be a Warning. This practice will simplify your decision process.  

#### Debug  
Information to be read only by developers while diagnosing an issue.  

e.g. `[DEBUG] Model Info retrieved from the Database`. This log level will help verify the behavior of the program but may add a lot of noise for non-debugging operations.  

#### Info  
Important application behavior.  

This level would be read by developers as well as business analysts and log mining tools. This is the most important level because it provides the infrastructure to analyze the business performance in real time. e.g. `[INFO] Payment Completed`.  

Keep you Info logs as readable as possible in a format that anyone can understand.  

## Best Practice: Log Aggregation tool  
Gone are the days of manually searching through log files.  

Several powerful log aggregation tools are available that can streamline your logs processing workflow. They take care of shipping the logs to a central location to be aggregated and searched through a nice web GUI. These tools come with lots of capabilities such as dashboards and alerts.  

My personal favorite is [Splunk](http://www.splunk.com/). If its cost seems prohibitive, there are free alternatives such as the [ELK Stack](https://www.elastic.co/webinars/introduction-elk-stack).  

## Best Practice: Log key value pairs as opposed to events  
A lot of benefit can be reaped from logging events as key value pairs. Favor the following:  

```
[INFO] Actor=LoginService; Action=Login_Attempt; Result=True
[INFO] Actor=LoginService; Action=Login_Attempt; Result=False
```
in opposition to:  

```
[INFO] LoginService; Login Succeeded
[INFO] LoginService; Login Failed
```

Key value pairs can greatly help you aggregate and analyze events in a similar way to a database table.  

## Summary  
Properly written logs are a powerful tool that can generate realtime feedback for the business as well as for the technical team. Use them wisely to unleash their full potential.  


[^optimization]: Nine out of ten times your production systems will have more than enough capacity to handle the load so you won't have to tweak anything. If performance becomes an issue because of the logs buy more/better hardware. Just leave the logs alone.  

[^corner_cases]: Sometimes, it is impractical for applications to write anything due to their low latency and high volume requirements. Chances are your app is not one of those. Regardless, every application needs a way to verify its behavior.  
