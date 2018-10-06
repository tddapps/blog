---
title: Thoughts on DynamoDB
keywords:
  - aws
---

I recently built a [Serverless Project](https://github.com/camilin87/hb-api) that used [DynamoDB](https://aws.amazon.com/dynamodb/). Learning to use a [distributed NoSQL database](https://en.wikipedia.org/wiki/CAP_theorem) is never a simple task. DynamoDB makes a strong emphasis on being intentional with the data read or written. It limits almost every operation. When limits are reached, services shut down or more capacity is added at an increased cost. These are some of the most important takeaways.

## Good  
DynamoDB has three features that save a considerable amount of work. Entire companies have been built around tools that [_poorly_] solved these problems.  

### [Global Tables](https://aws.amazon.com/dynamodb/global-tables/)  
Write data in one [AWS Region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) and the changes propagate to other regions. No need to write replication code. Consider the alternative of managing your own replication strategy.  

### [Streams](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)  
Run custom code whenever any record changes. Such code can be unit tested and can be as decoupled from your product as you want it to be. Streams don't impact the performance of the live database. [^streams]

### [Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)  
Expire old data automatically.  

### Scalability  
The capacity to scale DynamoDB is [_mostly_] limited by money. Configure [Auto Scaling](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html) to handle variable loads and [DAX](https://aws.amazon.com/dynamodb/dax/) to speed up reads. No pages, no manual intervention, scalability becomes a non-event.  

## Bad  
Performance and scalability come with a cost. Specially when reading data.  

### [Queries](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html)  
DynamoDB has no easy way to answer this question:  

> Which products are more expensive than $1000?

**Why?**: Queries need an equality comparison on the [Partition key](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey)  

### [Indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html)  
Indexes are nothing more than managed table clones with different keys. They cost almost the same as the original table.  

### [Limits Everywhere](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html)  
- Want to know which products are more expensive than $1000? You're gonna need a [Scan](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html) to read every item in the table. This will not only cost you, but it may also take down your service.  
- Want to run a common bulk operation such as "Delete all accounts from the EU"? Be prepared to write code to stagger the deletions or your service may go down.  
- Want to read all the orders for a customer? Consider limiting how many you read.  
- [Proper Key selection](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/) is fundamental. Or your service may go partially down during high traffic periods.  

### [Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)  
The deletion of data is not too responsive [_by design_]. In my experience TTL deletes items ten minutes late.  

## Conclusion  
DynamoDB is a managed globally available service constrained by cost. It has similar problems to other comparable databases. It should be used under the right circumstances [_like any other tool_].  


[^streams]: Streams are like [SQL triggers](https://docs.microsoft.com/en-us/sql/t-sql/statements/create-trigger-transact-sql?view=sql-server-2017). Only better [_grin_]  