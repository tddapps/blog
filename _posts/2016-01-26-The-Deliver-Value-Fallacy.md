---
title: "The Deliver Value Fallacy: Waste (Part 1)"
---


The term Deliver Value is widely [*ab*]used. It can be a wildcard to avoid following engineering best practices or build utterly complex solutions that solve no real business problem. In this multi-part article I plan to illustrate some of the common misconceptions associated with Delivering Value. The series will start with delivering waste.

##Waste
> an act or instance of using or expending something carelessly, extravagantly, or to no purpose.

##A tale of two companies
*GreatShoes, LLC.* and *YouSail, Inc.* are two different companies in the same position: **Online sales are low**. This is how they plan to solve their problem. [^fake_names]

##YouSail, Inc.
*YouSail, Inc.* rents luxury yachts. The executive team reasons that since they're not a technology company there's not a clear need for a technology team. [^phoenix_project] They strongly believe in paying specialized vendors for their expertise rather than having to deal with more employees. Their online sales have been down for the last six months.

**The Website**: The company's website has always been outsourced. Countless contracting companies have worked on it over the years. It is a tree branch waiting to fall made out of stitched pieces. The fact that it works is a great indicator of how good technology has become over the last years. In spite of not owning the website development, *YouSail, Inc.* has a strong hold over important business metrics, backed up by lots of analytics.

**The redesign**: A quick analysis of the metrics indicate that traffic is up. More people are starting reservations. Nevertheless, they're abandoning the rental during the payment flow. A plan to redesign just the payment section of the website is kicked off in under a week. The redesign project will work on a single page at a time. Moreover, the two versions of the page will be simultaneously served to validate that the new website is working better than the old one. All of this development work will be contracted out to a development agency from Argentina. The projected completion date is six months.

##GreatShoes, LLC.
*GreatShoes, LLC.* sells shoes online. They pride themselves in being agile and Deliver Value frequently. The technology department is the second largest department in the company with dozens of well-qualified highly-trained technology professionals. The CEO can often be heard saying: *"nowadays, every company is a technology company"*. And he's right to say so because most of the company's income comes through sales made directly to customers from their website. Unfortunately, sales have been on a steady decline for over a year.

**The redesign**: The business owners think sales are down because the website does not look chic enough. Finally, after several weeks of approval meetings and budget lobbying they kick off a plan to redesign the entire website. Besides, they think that they need a CMS. How is a CMS going to help with the sales? They reason that by changing the content frequently customers should be more engaged. They ask their development team to come up with a plan.

**The proposal**: Fortunately, the development team at *GreatShoes, LLC.* understands the risk behind a big redesign like this. They propose to gradually change each individual portion of the site while comparing its performance against the old version. Only when the redesign is completed they will start to incorporate the CMS one page at a time. The engineers thought this proposal would have the least risk and would gather feedback from customers faster. The projected completion date is six months as well.

**Request Denied**: Business owners think the whole incremental approach would add a lot of overhead. Plus they want their CMS from day one. They don't understand why a CMS is harder to test nor to maintain in the long run. The proposal is unacceptable. They *graciously* ask the development team to build everything at once in three months.

##Company tally
|                           | YouSail, Inc.                   | GreatShoes, LLC.             |
|---------------------------|:-------------------------------:|:----------------------------:|
| Reaction Time             | Six Months                      | One Year                     |
| Decision Time             | One Week                        | Multiple Weeks               |
| Root Cause </br> Analysis | Data Driven. </br> Payment Flow | No Data. </br> Entire Design |
| Time to Feedback          | After Every Single Page         | After project completion     |
| Projected Completion      | Six Months                      | Three months                 |

Notice how the projected completion date is closer for *GreatShoes, LLC.* -half of *YouSail, Inc.*'s-.  They are going to have an entire new website in three months. And yet it is all going to waste because they don't know that they're losing sales because of the website, or because they need a mobile app, or because the competition has better prices. They simply don't know. Moreover, there are no clear plans to incorporate performance feedback loops that can help steer the project based on customer needs.

*YouSail, Inc.* is happy to spend six months in rebuilding just a single portion of their entire site. The cost is hefty but they know that every step they make in that direction will be validated with an increase in sales. Moreover, the risk is low. If the project cost gets too high or the business needs to focus on another direction, they can still benefit from whatever new pages they got time to build.

##Delivering Value

> Which of the two teams is delivering more value to the business?

After a simple analysis it becomes clear that the team from Argentina is delivering more value to the business. Simply because they are building the correct product. They are solving a clear and measurable business problem. On the other hand the second team is building waste. They are making decisions based on intuition as opposed to measurable metrics.


[^the_lean_startup]: In his book [The Lean Startup](http://amzn.to/1KaRSBC), [Eric Ries](https://twitter.com/ericries) details the need for lean development practices in startups as well as in well-established companies.

[^phoenix_project]: [The Phoenix Project](http://www.amazon.com/The-Phoenix-Project-Helping-Business/dp/0988262592?tag=capr04-20) illustrates the struggles of a similar organization  with financial problems. It is a great read that clearly paints the need to involve and consider IT in the decision process.	

[^fake_names]: Not their real names. These scenarios are based on real world companies but the details obfuscated to protect the innocent.
