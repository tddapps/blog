---
title: "Serverless Api Part 1: From an idea to Production"
draft: true
keywords:
  - aws
  - serverless
  - java
  - devops
---

I implemented a [Heartbeat Pattern API](/2018/10/24/the-heartbeat-pattern/) to detect when any of my computers crash. I had two requirements. ~~Almost free~~ Cheap to operate. Disaster tolerant. This is the evolution of [the project](https://github.com/camilin87/hb-api)(`hb-api`) until the [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) was released. [Source available on GitHub](https://github.com/camilin87/hb-api).  

## The Ivory Tower Architect  

I decided the api should be serverless. The technology costs are driven by usage. And the most mature serverless provider is AWS.  

> This would be my first serverless project so I would keep it _"simple"_ [_grin_].  

After some _"architecting"_[^architecture] I ended up with this design.  

- Single Region. AWS has very good availability and regional outages are rare. A future release could support multiple regions.  
- Two [Kinesis streams](https://aws.amazon.com/kinesis/data-streams/). One to store messages as they came. Another stream for the notifications.  
- One [DynamoDB](https://aws.amazon.com/dynamodb/) table.  
- Multiple lambdas. For authentication, data persistence and analysis.

![Initial design without any hands on data](/images/serverless-api/hb-api-0.0.0-alpha.png)  

### Why so complicated?  

In a word: **Ignorance**  

**DynamoDB All the Things**. I researched pricing of the different AWS services. [Kinesis Streams](https://aws.amazon.com/kinesis/data-streams/) cost _"as little as $0.015 per hour"_. Almost $11 per month per region. So that had to go away. [DynamoDB](https://aws.amazon.com/dynamodb/) would have to solve all the storage needs. This was also my first DynamoDB project. I captured my [thoughts on DynamoDB](/2018/10/06/thoughts-on-dynamodb/) in a [separate post](/2018/10/06/thoughts-on-dynamodb/).  

**Api Gateway to the Rescue**. I thought I needed a lambda function for authentication and rate limiting. But [Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html) has all of that functionality built-in. One less thing to worry about.  

Twilio has a nice Api to send SMS. But [SNS](https://aws.amazon.com/sns/) is also very easy to use. Besides, I would not have to manage a separate set of credentials.  

The [Serverless Framework](https://serverless.com/) and the [`serverless-dynamodb-local` plugin](https://github.com/99xt/serverless-dynamodb-local) proved to be great resources.  

## The MVP Architecture  

[`hb-api` release 0.1.0](https://github.com/camilin87/hb-api/releases/tag/0.1.0)

As I started building the application I settled on the following design. One lambda to save messages. Another lambda to scan the table for expired hosts and send notifications. Two functions. With built-in rate limiting, authentication, decent availability, and scalability.  

![MVP](/images/serverless-api/hb-api-0.1.0.png)  


## BONUS: It is always the Database  

[`hb-api` release 0.2.0](https://github.com/camilin87/hb-api/releases/tag/0.1.0)

Since a table scan on the Dynamo table [could have disastrous consequences](/2018/10/06/thoughts-on-dynamodb/). I decided to use [DynamoDB's TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) and [Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) to reduce the database load. Saved messages would have an expiration. Any database change would trigger a lambda. The lambda would send notifications for deletions.  

![Reduce Dynamo Load with TTL](/images/serverless-api/hb-api-0.2.0.png)  

## Summary  

Building highly available serverless applications was easier than I thought. The AWS toolbox is very rich. And the [Serverless Framework](https://serverless.com/) a great help. With very little code I was able to build a secure, easy-to-use, fault-tolerant, scalable, and cheap, service. However, the serverless model is a paradigm shift. Traditional operations may no longer be possible. Eventual consistency and fault-tolerance become the new standard. Therefore, hands-on experience is highly valuable. Stay tuned for [Part 2](/2018/11/05/serverless-api-evolution-part-2/) to make the application tolerant to regional outages. And share the operational costs.  

[^architecture]: [The Clean Architecture](/2018/10/31/clean-architecture/) book provides a better approach to architecture  