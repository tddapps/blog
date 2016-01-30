---
title: Waste Prevention
---

Waste is the enemy of value. It is usually manifested as building the wrong product. The following are two waste prevention techniques I've learned during my years as an engineer.

*This is the third article of the Deliver Value Fallacy series. [Part 1](https://tddapps.com/2016/01/26/The-Deliver-Value-Fallacy/source=part3) covers Delivering Waste and [Part 2](https://tddapps.com/2016/01/28/The-Deliver-Value-Fallacy-Technical-Debt-Part-2/source=part3) covers Technical Debt.*

##Data Driven
Aim to back every decision with data. While not always possible, most of the times it is possible. Engineers are as responsible for the company as everybody else. Always -*politely*- question business decisions made out of sheer inspiration. Be ready to educate and share how data driven decisions help the business while intuition can be wrong and costly.

##Simplify. Simplify. Simplify
Engineers have a tendency to overthink problems. Ask business owners questions about their decision drivers. Learn the business needs. With the clarity these provide you can simplify design aspects that are not really needed.

##Examples
The following are real world scenarios I've been exposed to recently. [^obfuscation] They illustrate how the waste prevention measures can be applied to achieve optimal results that help the business move faster in the correct direction.


###Example 1: The CMS
![CMS Testing](/images/waste-prevention/cms-testing.jpg)  
**The business**: Rebuild the website using the company's CMS.  
**Engineers**: Why do you need a CMS? CMS'es are hard to test, their upgrades are very costly, they impose a great burden on the infrastructure, and they're very hard to move away from.  
**The business**: We need a CMS because we need to frequently update the images of the website. And you cannot do it because you're always busy.  
**Engineers**: How often do you have to change those images? Is there anything else that you frequently need to change other than the images?  
**The business**: Just the images on a quarterly basis.  
**Engineers**: What if we block our calendar one week per quarter so we can work together updating the images?  
**The business**: Unacceptable **ಠ_ಠ**.  
**Engineers**: Would you be willing to look into solutions other than a CMS that would allow you to change the images in a day? Granted, they would not be as easy to use as your very expensive CMS but they would certainly take less time to build. Plus we'd properly train you on how to use it.  
**The business**: Maybe, but we need to make sure it does all that we want.  
**Engineers**: Fair enough, we'll schedule a meeting in three days to showcase a potential solution.  
**The business**: Mutters, ineligible.  


###Example 2: Database all the things
![Database all the things](/images/waste-prevention/database-all-the-things.jpg)  
**The business**: We need to start paying attention to the customer's date of birth (DOB). Let's save it in the database and create some Crystal Reports off from it.  
**Engineers**: Whoa! Hold your horses. A database field? What is it for? Why do you need this new information?  
**The business**: We want to be able to create reports of transactions linked to the customers birthday. We want to study if there's a correlation between birthdays and sales. If it turns out that people buy themselves expensive gifts before their birthdays we want to kick off a new marketing project to exploit this trend.  
**Engineers**: Excellent idea. However, to be able to create Crystal Reports off customer's DOB we'd need to write code to save it in the database. Then we'd need to modify the database schema across all the different database environments. We'd need to create a change request with the DBA team for this. Once the data starts flowing we'd need to involve the Reporting Team and bring them up to speed with the database schema and the relationships between entities. Based on the weather conditions this could take from four to six weeks.  
**The business**: *Obviously annoyed slowly turns red...*  
**Engineers**: There's an alternative though. It would help us get feedback faster. What if we log the customers DOB and we create the reports using our current installation of Elastic Search (ELK). All this would take from us is writing a log line. Once the data starts flowing we can sit together to create the ELK reports. You'd have enough data for the marketing initiative in two weeks at most.  
**The business**: But these ELK reports don't feel real. They're not coming from a database.  
**Engineers**: ELK is a database too. It is simply a log-based database. ELK and other logging aggregation tools can be a compliment to traditional reporting and database tools. Important business decisions can be made based on ELK data as well as on SQL data.
**The business**: When I was a developer we used to store everything in SQL.  
**Engineers**: How about the following approach: Let's implement the ELK reports first. If after two weeks you don't have all the necessary information to kick off your marketing campaign, we'll store the DOB in the database.  
**The business**: Mutters, ineligible.  


###Example 3: Architectural decisions
![Architectural Diagram](/images/waste-prevention/architectural-diagram.jpg)  
**Happy Trigger**: Let's have an architectural discussion to make sure that all our web apps can be loaded as angular modules.  
**Senior Engineer**: There's something I don't understand. You want to create a single web app that would be the entry point to all of the other web apps?  
**Happy Trigger**: Exactly!  
**Senior Engineer**: What for?  
**Happy Trigger**: To reduce code duplication. And reuse the same CSS resources.  
**Senior Engineer**: Interesting. Wouldn't that create a monolithic application with a single point of failure?  
**Happy Trigger**: Not really because each module can...  
**Senior Engineer**: *Interrupts hurriedly* We have over thirty different apps. Some of them were built way before angular ever existed. They serve very different business functions there's very little code duplication going on. I'm sure there are other ways of sharing CSS resources that don't involve angular. Have you looked into those?  
**Happy Trigger**: Angular is cool. We can use `npm` and `bower` and make web APIs for everything.  
**Senior Engineer**: What business problem does this Unification Initiative solves?  
**Happy Trigger**: It would create an architectural framework.  
**Senior Engineer**: Wouldn't locking every application into a single technology be a bad idea? I heard there's a new completely incompatible version of angular around the corner. We need hard numbers to justify this to the business. It needs to pay off technical debt or create business value. An architectural framework helps nobody unless it is really needed.  
**Happy Trigger**: Mutters, ineligible.  


##Foreword
That's it, no magic bullet. Data Driven Decisions and Simplification are simple concepts that will save countless hours and headaches. Do you have to always push back on everything? For God's sake no. However, keep an open eye for situations that can create waste.

[^obfuscation]: The details are obfuscated to protect the innocent.
