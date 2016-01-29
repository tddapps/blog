---
title: "The Deliver Value Fallacy: Technical Debt (Part 2)"
---


The term Deliver Value is widely [*ab*]used. It is regularly used as an excuse to avoid following engineering best practices. In this second installment I plan to illustrate some of the common misconceptions associated with Delivering Value and Technical Debt.

*Please head to the [first post](https://tddapps.com/2016/01/26/The-Deliver-Value-Fallacy/?source=part2) to learn about Delivering Waste.*

##Debt
> something, typically money, that is owed or due.

##A tale of two companies
*YouSail, Inc.* and *GreatShoes, LLC.* are two different companies in the same position: **Online sales are low**. [^fake_names]

In a nutshell *YouSail, Inc.* is big on outsourcing but relies heavily on business metrics while *GreatShoes, LLC.* has a strong engineering culture that gets usually overruled by intuition and lack of data. Both of the companies devise relatively different plans to address their website issues.

The following is a summary of the website redesign roadmap each company plans to implement. *Full details behind the decision processes and company cultures can be found in the [Part 1](https://tddapps.com/2016/01/26/The-Deliver-Value-Fallacy/?source=part2) of this series.*

##Company tally


|                           | YouSail, Inc.                   | GreatShoes, LLC.             |
|---------------------------|:-------------------------------:|:----------------------------:|
| Reaction Time             | Six Months                      | One Year                     |
| Decision Time             | One Week                        | Multiple Weeks               |
| Root Cause Analysis       | Data Driven. Payment Flow       | No Data. Entire Design       |
| Time to Feedback          | After Every Single Page         | After project completion     |
| Projected Completion      | Six Months                      | Three months                 |

##Delivering Value

> Which of the two teams is delivering more value to the business?

The cultural differences between the two companies clearly impact their performance. The well-qualified team behind *GreatShoes, LLC.* has built a highly-maintainable product. The initial engineering plan would rebuild the entire site -on top of the existing one- in the same time that it would take *YouSail, Inc.* to get a single portion of their website rebuilt. The good engineering principles applied over the years empower the business to quickly adapt and react. Moreover, this is a professional team that understands risks and proposes an adequate plan to minimize them.

Technical Debt is simply that: **Debt**. It needs to be paid off or will eventually bring businesses down to a halt. If the executive team behind *YouSail, Inc.* would regularly spend more time and energy on their website they'd be able to replace the entire Payment Flow in under a month.

Sometimes it can be very hard to condone the actions behind *YouSail, Inc.*. Yes, they're a making decisions based on business metrics and data but the state of neglect in which they keep their website is significantly hurting their bottomline. [^phoenix_project]

Delivering value does not mean cutting corners. On the contrary, Delivering Value is about delivering just enough functionality just in time to meet the business needs, while maintaining high engineering standards that will allow the product to adapt as needed.


[^the_lean_startup]: In his book [The Lean Startup](http://amzn.to/1KaRSBC), [Eric Ries](https://twitter.com/ericries) details the need for lean development practices in startups as well as in well-established companies.

[^phoenix_project]: [The Phoenix Project](http://www.amazon.com/The-Phoenix-Project-Helping-Business/dp/0988262592?tag=capr04-20) illustrates the struggles of a similar organization  with financial problems. It is a great read that clearly paints the need to involve and consider IT in the decision process.	

[^fake_names]: Not their real names. These scenarios are based on real world companies but the details obfuscated to protect the innocent.