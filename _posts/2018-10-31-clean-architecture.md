---
title: "Book Review: Clean Architecture"
keywords:
  - book review
  - SOLID
  - Architecture
---

[Clean Architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=as_li_ss_tl?s=books&ie=UTF8&qid=1540987718&sr=1-1&keywords=clean+architecture&dpID=41BjtnvIUQL&preST=_SX218_BO1,204,203,200_QL40_&dpSrc=srch&linkCode=sl1&tag=capr04-20&linkId=4db91ebc7378d50015ecea3400e2c985&language=en_US) can be described in a word: **thorough**. The book explains the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles in detail. It walks through the evolution of programming paradigms. How they took away features while maintaining productivity. The book revolves around the idea that business rules are the most important application component. And they should not depend on external details. Full of practical examples. The final chapter on itself _-written by Simon Brown-_ makes the book worth reading. In summary, [Clean Architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=as_li_ss_tl?s=books&ie=UTF8&qid=1540987718&sr=1-1&keywords=clean+architecture&dpID=41BjtnvIUQL&preST=_SX218_BO1,204,203,200_QL40_&dpSrc=srch&linkCode=sl1&tag=capr04-20&linkId=4db91ebc7378d50015ecea3400e2c985&language=en_US) feels like a nice complement to [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=as_li_ss_tl?ie=UTF8&qid=1540987558&sr=8-3&keywords=clean+code&dpID=515iEcDr1GL&preST=_SX258_BO1,204,203,200_QL70_&dpSrc=srch&linkCode=sl1&tag=capr04-20&linkId=bd49e88352bf0a04cc67494877a90ed5&language=en_US) and [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software-dp-0321125215/dp/0321125215/ref=as_li_ss_tl?_encoding=UTF8&me=&qid=1540987661&linkCode=sl1&tag=capr04-20&linkId=a115a41549aa74e6ebb55a3043ccaccb&language=en_US).  

## The Author  

I have a deep admiration for Robert C. Martin (_Uncle Bob_). His advice on _[Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=as_li_ss_tl?ie=UTF8&qid=1540987558&sr=8-3&keywords=clean+code&dpID=515iEcDr1GL&preST=_SX258_BO1,204,203,200_QL70_&dpSrc=srch&linkCode=sl1&tag=capr04-20&linkId=bd49e88352bf0a04cc67494877a90ed5&language=en_US)_ and the _[Clean Coders Videos](https://cleancoders.com/)_ has significantly advanced my career. Familiar readers of his work will feel like they have already read the book. I would go even further and say it could fit in two thirds of the pages.  

## The Stories  

The author wouldn't be himself without his stories of ancient computers and perforated cards. This book is no exception. It even has a dedicated appendix for them. Although some of the metaphors and examples may no longer apply. They certainly help explain the book lessons. And provide invaluable practical examples of what otherwise be a very abstract topic.  

## Architecture  

This book challenges the foundational beliefs of many software architects.  

> The goal of software architecture is to minimize the human resources required to build and maintain the required system  

And yet, this definition of architecture is a great tool to gauge the quality of a project. I particularly liked the explanations around the increased costs of lines of code. The book showcases several architecture quality measurement tools. It also describes testing patterns and their effects on an architecture. e.g. the [Humble Object pattern](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/ch23.xhtml).    

## Details  

The book stresses the need to decouple architecture from details. It covers how GUIs, databases, and frameworks are details. And as such, should not be coupled.  

I agree with that guideline. I’ve worked on several projects with high coupling. Where a button change required a database schema modification.  

[![Clean Architecture](/images/books/clean-architecture.jpeg)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=as_li_ss_tl?s=books&ie=UTF8&qid=1540987718&sr=1-1&keywords=clean+architecture&dpID=41BjtnvIUQL&preST=_SX218_BO1,204,203,200_QL40_&dpSrc=srch&linkCode=sl1&tag=capr04-20&linkId=4db91ebc7378d50015ecea3400e2c985&language=en_US)  

## Should you read it?  

[Clean Architecture](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164/ref=as_li_ss_tl?s=books&ie=UTF8&qid=1540987718&sr=1-1&keywords=clean+architecture&dpID=41BjtnvIUQL&preST=_SX218_BO1,204,203,200_QL40_&dpSrc=srch&linkCode=sl1&tag=capr04-20&linkId=4db91ebc7378d50015ecea3400e2c985&language=en_US) has good guidelines to design maintainable software. This book can be a good introduction for the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles. At worst it is a history of computer evolution. Definitely, worth the read.  
