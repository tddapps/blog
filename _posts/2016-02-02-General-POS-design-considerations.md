---
title: General POS design considerations
---


For the first years of my career I built a few Point of Sale (POS) systems using C# and WPF. All of these systems had the same working principle: the software was installed in a remote terminal that customers would use to make transactions. They also shared the same pain points such as updates, database migrations, and physical devices reliability. The following are lessons learned from painstaking experiences and a few nights without sleep. The earlier in the project these get incorporated the more stable the overall system will be.

**TL;DR: Building a POS system is hard. Brace yourself.** 

##Support
Distributed systems are very hard to manage. [*citation_needed*] The better your support tools are the more stable your system will be. [^zapier_support] Invest time building support tools rather than fire-fighting outages.

###Comprehensive and detailed transactional logging
Logs are an important part of every POS system. They are the backbone of the verification and diagnostics process. Unfortunately, not all logs are properly written nor actively read. Gone are the days where logs were only used to debug errors. Integrate a log aggregation tool such as [Elastic Search](https://www.elastic.co/) or [Splunk](http://www.splunk.com/) into your overall design.

For traceability and debugging purposes, it is important to correlate related events. Devise a way to link all the events related to the same transaction, whether using the same `Id` field in multiple log lines or logging everything all at once in the same log line. This practice will help you automate system performance profiling.

Last but not least, avoid having multiple log files. They are harder to read.  

###System heartbeat
Make each terminal periodically transmit a heartbeat with all the relevant diagnostics information. This heartbeat will allow you to create a comprehensive dashboard of the entire ecosystem health.

Moreover, you'd be able to proactively fix errors such as shipping supplies when the printer is low on paper.  

###Profile memory consumption early and frequently
Almost every system running for long periods of time will be subject to some sort of performance degradation due to memory leaks.  

###Readily available remote access to the terminals
Every once in a while a support technician needs to log into a terminal to diagnose a weird issue or help a customer setup something. The frequency of these interactions is inversely proportional to the system robustness.

Plan for a mechanism to remote into the terminals and control their screen. [TeamViewer](http://www.teamviewer.com/) has a very comprehensive product that can maintain a database of terminal connection details.  

###Lock and control every software aspect
Customers can be your worst enemies when fiddling with the system. Lock everything in the remote machines. Disable the keyboard. Disable the USB ports. It will save a lot of support calls.

If possible ship a clean Ghost image embedded into the machine, so that troubleshooting becomes as simple as re-image the computer and apply the configuration.  

###One-Click Diagnostics tool
Build a One-Click Diagnostics tool that users and support personnel can use to verify all the components are working as expected. Include new dependencies in the tool before adding them to production.  

###Reprint anything
Design the system in a way that can reprint any receipt as the customer saw it. Build some functionality to make these receipts available from a website.  

###Rotate your developers through support
Make your developers take support calls. Incorporate their feedback into subsequent updates. Your system will become more robust and resilient in a blink of an eye. [^37s_support]  


##Updates
Updates are the backbone of distributed systems. Upcoming system versions should make it to the remote locations in a fast and reliable manner.

###Embedded updates system from day one
Consider the updates system from the early project stages. Integrate this system into the main application. Don't build it as a black box. Beware, this is not a permission to build a monolithic application.

Design the updates system in a way that doesn't interrupt the business flow. If possible implement online updates that require none to very little downtime.

Many locations have their own IT Security team with all sort of specific firewall rules. Always download files over HTTPS on port 443 to streamline terminal setup.

###Limit the number of external dependencies. Upgrade them as regular application updates.
Limit the number of external dependencies as much as possible. External dependencies impose a big burden on system and compatibility testing. Automate their installation as part of the update process. It will prevent a lot of support calls.  

###One-click installation/configuration
This cannot be stressed enough. It will prevent countless user input errors. It is one of those things that once you have it cannot be lived without.

###Same binaries for updates and installation
This will simplify your build, deployment, and support process. Make the installer smart enough to detect when a brand new installation or an upgrade is taking place.


##Databases
There will come a time when the terminals will need a local database. Try to limit their usage to store the data that hasn't been transmitted. Databases come with their fair share of issues too.

###Use an embedded lightweight database
Avoid heavyweight systems such as SQL server, it will eat up your memory. Moreover, it will be a pain to upgrade. Choose an embedded database system such as [SQLite](https://www.sqlite.org/) which is easier to maintain.  

###Easy db migrations
Your schema will change. Be prepared.


##Configuration
Configuration problems can bring any system to halt. Manage your configurations with an iron fist.  

###Exactly one readonly configuration that can only be changed by developers
The readonly part is very important, it would guarantee the integrity of the system once it gets deployed. The last thing you want is customers fiddling with settings such as COM port speed or toggling ON unfinished features. 

Avoid having multiple configurations it will make troubleshooting and support harder.  

###Exactly one read/write configuration that can change at any time
This would be the configuration for things your users can change such as the printer COM port or the terminal number that identifies the store.  

Design your system in a way that these configuration changes can occur on the fly without the need of a restart or any other provision. This will save countless hours of troubleshooting. Moreover these configuration changes can potentially be remotely triggered by support personnel.  

###The configuration for each individual location should be transmitted and accounted for in the servers
Uncountable benefits can be achieved by storing all the configurations in a centralized location. 

On the event of hardware failure the configuration could be restored into a separate machine and the business could be up and running in minutes. Configuration errors could be pro-actively diagnosed by scheduled jobs.


##Development
The following are development guidelines to keep in mind. In retrospective they look a lot like [Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html) best practices. 

###Dev should not use absolute paths
Never use absolute paths in the code. It will prevent you from having multiple versions of the system installed in the same box. It will lock you down to a specific folder structure. Enforce this practice with strict code review.  

###Version number should be specified in only one place
Have a single version number in a single place. The database and the software should have the same version. Display and transmit this version number as frequently as possible.  

###Automated builds
I remember working in a system where Build Day was Pizza Night. Please don't do that. [Continuous Integration - Automate the Build](http://martinfowler.com/articles/continuousIntegration.html#AutomateTheBuild).  

###Automated releases
[Continuous Integration - Automate Deployment](http://martinfowler.com/articles/continuousIntegration.html#AutomateDeployment)  

###Move functionality from the terminals off to the servers
Terminals should only process transactions. Reports and other sorts of housekeeping functionality should be implemented on the servers. This will allow the system in the store to be operational while other housekeeping tasks are in progress. Consequently, system enhancements and updates will be less costly because it is easier to update a few servers than ship binaries to thousands of stores.  

###Binaries signing
Sign your binaries during the build process. It will prevent malicious users from tampering with them and compromising your system.


[^37s_support]: [Everyone on Support](https://signalvnoise.com/posts/3676-everyone-on-support)
[^zapier_support]: [Support Driven Development](https://zapier.com/blog/support-driven-development/)
