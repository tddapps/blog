---
title: Demystifying the Open Source
keywords:
  - open source
  - security
  - enterprise
---

A lot has been said about open source technologies. Many [Fortune 500 businesses run open source software](http://fortune.com/2010/08/16/how-corporate-america-went-open-source/). However, many misconceptions about the open source still lurk around the enterprise world. This is my best attempt to debunk them.

## Myth: Open Source is less secure because anyone can make changes  
Although there are [open source projects where anyone can freely make changes](https://www.wikipedia.org/) this is definitely not the norm.  

Open source projects can be very selective with the contributions they accept.  

Don't believe me? Read [this](https://lkml.org/lkml/2012/12/23/75?cm_mc_uid=71870513194014591758915&cm_mc_sid_50200000=1459175891) and [this](http://lkml.iu.edu/hypermail/linux/kernel/1510.3/02866.html)!  

## Myth: Open Source is less secure because anyone can see the code  
Having your code open sourced, widely reviewed, and used by the entire world, [won't magically protect you from exploits](http://heartbleed.com/). Even more, exploits also [affect proprietary software where the code is not available](https://www.theiphonewiki.com/wiki/Jailbreak_Exploits).  

That being said, having the ability of inspecting a library's source before using it is way more secure than trusting a proprietary software vendor sales team.  

Want to learn more? Read [this](http://www.dwheeler.com/secure-programs/Secure-Programs-HOWTO/open-source-security.html), [this](https://en.wikipedia.org/wiki/Open-source_software_security) and [this](https://www.ibm.com/developerworks/mydeveloperworks/blogs/6e6f6d1b-95c3-46df-8a26-b7efd8ee4b57/entry/is_open_source_software_less_secure230?lang=en).  

## Myth: Open Source is not production ready  
This has been the hardest myth to debunk because of its absurdity.  

Seventy-eight percent of respondents to the [Ninth Annual Future of Open Source Survey of 2015](https://www.blackducksoftware.com/future-of-open-source) determined that their companies run part or all of its operations on open source software. It doesn't get more production ready than that.  

## Myth: Open Source tools development stalls  
If anything open source drives innovation even faster.  

### Example 1: Containers  
Containers have proven to be the de facto standard for deployments. The open source community has been running containers for years. However, Windows based enterprises have had to wait several years for Microsoft to provide container support.  

### Example 2: Your CMS in the Cloud  
Many enterprises are migrating their platforms to the cloud. [Umbraco](http://umbraco.com) users can [seamlessly host their existing websites on Azure with very little effort](https://azure.microsoft.com/en-us/blog/scalable-umbraco-cms-solution-for-azure-web-apps/). [WordPress](https://wordpress.com/) has had [PaaS support](https://wpengine.com/) for ages. I wish the same could be said of [other proprietary CMS](http://www.sitecoreonazure.net/).  

## Myth: Open Source is not a viable business model  
These are just a few out of many successful companies that have been built on open source software:  

- [RedHat](http://www.redhat.com/en/about/company) [Valuation](https://finance.yahoo.com/q/ks?s=RHT)  
- [MySql](http://www.mysql.com/about/) [Purchased for One Billion dollars](http://techcrunch.com/2008/01/16/sun-picks-up-mysql-for-1-billion-open-source-is-a-legitimate-business-model/)  
- [Automattic](https://automattic.com/about/) [Valuation](http://blogs.wsj.com/venturecapital/2014/05/05/automattic-valued-at-1-16-billion-says-it-doesnt-need-ipo/)  
- [Docker](https://www.docker.com/company) [Valuation](http://www.forbes.com/sites/mikekavis/2015/07/16/5-reasons-why-docker-is-a-billion-dollar-company/#6591791619c5)  
- [MongoDb](https://www.mongodb.com/company) [Valuation](http://blogs.wsj.com/digits/2015/01/14/big-data-startup-mongodb-now-valued-at-1-6-bililon/)  
- [Horton Works](http://hortonworks.com/about-us/quick-facts/)  

## Myth: Open Source is free  
While downloading binaries for the majority of open source software is free. Releasing your product to production may not. The companies behind open source projects make their money with [Corporate Support](http://www.cnet.com/news/nginx-tries-converting-web-server-popularity-into-money/), [VIP Hosting](http://www.labnol.org/internet/blogging/how-wordpress-makes-money/7576/), or [Commercial Subscriptions](http://www.businessinsider.com/docker-introduces-commercial-subscription-plan-2015-6).  

## Myth: Open Source is hard for IT  
This is debatable. As with anything different there will be a learning curve. The same can be said of proprietary tools with bad documentation and no access to the code.  

## Closing Remarks  
- Should you drop your proprietary stack and build everything with open source technologies? Certainly not. Unless a full rewrite is imminent and open source technologies can help you achieve your goals in a cleaner and faster way.  
- Should you favor open source over proprietary? It depends on the scenario. Always look at the problem you're trying to solve and the impact of the tools on your organization.  
- Please stop mystifying open source tools as only good for hackers and startups. The open source ecosystem is more than prepared to solve your enterprise problems.  
