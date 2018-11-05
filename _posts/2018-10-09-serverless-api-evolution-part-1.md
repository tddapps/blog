---
title: "Serverless API Part 1: From idea to Production"
draft: true
keywords:
  - aws
  - serverless
  - java
  - devops
---

I implemented a Heartbeat API to detect when any of my servers crash. I had two requirements. Cheap to operate. And disaster tolerance. Serverless technologies are designed to solve these kind of problems. Here are some lessons learned on my first AWS Lambda hands-on experiences.  

[This other post](/2018/10/24/the-heartbeat-pattern/) explains the Heartbeat Pattern in depth and the need for it. The project sources are [available on GitHub](https://github.com/camilin87/hb-api).  

## The Ivory Tower Architect  

With very little hands-on knowledge I set my product vision. A highly-scalable distributed system running on standard technologies. I decided the API should be serverless. The technology costs start very low and are driven by usage. AWS is the most mature serverless provider. And Java is a widely supported language.  

> This would be my first serverless project so I would keep it _"simple"_ [_grin_].  

After some _"architecting"_[^architecture] I ended up with this design.  

- Single Region. AWS has very good availability and regional outages are rare. A future release could support multiple regions.  
- Two [Kinesis streams](https://aws.amazon.com/kinesis/data-streams/). One to store messages as they came. Another stream for the notifications.  
- One [DynamoDB](https://aws.amazon.com/dynamodb/) table.  
- Multiple lambdas. For authentication, data persistence and analysis.  

![Initial design without any hands on data](/images/serverless-api/hb-api-0.0.0-alpha.png)  

### Why so complicated?  

In a word: **Ignorance**  

This initial design had too many redundant components. The project did not need to handle huge loads. Moreover, the minimum operational cost was going to be high.  

**DynamoDB All the Things**. I researched pricing of the different AWS services. [Kinesis Streams](https://aws.amazon.com/kinesis/data-streams/) cost _"as little as $0.015 per hour"_. Almost $11/mo per region. So that had to go away. [DynamoDB](https://aws.amazon.com/dynamodb/) would have to solve all the storage needs. This was also my first DynamoDB project. I captured my [thoughts on DynamoDB](/2018/10/06/thoughts-on-dynamodb/) in a [separate post](/2018/10/06/thoughts-on-dynamodb/).  

**Api Gateway to the Rescue**. I thought I needed a lambda function for authentication and rate limiting. But [Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-control-access-to-api.html) has all that functionality built-in. One less thing to worry about.  

[Twilio](https://www.twilio.com/) has a nice API to send SMS. But [SNS](https://aws.amazon.com/sns/) is also very easy to use. Besides, I would not have to manage a separate set of credentials.  

The [Serverless Framework](https://serverless.com/) and the [`serverless-dynamodb-local` plugin](https://github.com/99xt/serverless-dynamodb-local) proved to be great resources. They allow local testing, automated deployments, and infrastructure provisioning with code.  

## The [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) Architecture  

[`hb-api` release 0.1.0](https://github.com/camilin87/hb-api/releases/tag/0.1.0)

As I started building the application I settled on the following design. 
- One lambda to save messages.  
- Another lambda to scan the table for expired hosts and send notifications.  

Two functions. With built-in rate limiting, authentication, decent availability, and scalability.   

![MVP](/images/serverless-api/hb-api-0.1.0.png)  


## BONUS: It is always the Database  

[`hb-api` release 0.2.0](https://github.com/camilin87/hb-api/releases/tag/0.1.0)

Since a table scan on the DynamoDB table [could have disastrous consequences](/2018/10/06/thoughts-on-dynamodb/). I decided to use DynamoDB's [TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) and [Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html) to reduce the database load. DynamoDB would expire messages automatically. Any database change would trigger a lambda. Such lambda would send notifications for deletions. This design used even less computing resources. It solved the Heartbeat Pattern problem leveraging serverless technologies to its maximum.  

![Reduce DynamoDB Load with TTL](/images/serverless-api/hb-api-0.2.0.png)  

## Summary  

Building serverless applications was easier than I thought. The AWS toolbox is very rich. And the [Serverless Framework](https://serverless.com/) a great help. With very little code I was able to build a secure, easy-to-use, fault-tolerant, scalable, and cheap, service. Yet, the serverless model is a paradigm shift. Traditional operations may no longer be possible. Eventual consistency and fault-tolerance become the new standard. Thus, hands-on experience is highly valuable. Stay tuned for [Part 2](/2018/11/05/serverless-api-evolution-part-2/) to make the application tolerant to regional outages. And share the operational costs.  

[^architecture]: [The Clean Architecture](/2018/10/31/clean-architecture/) book provides a better approach to architecture  