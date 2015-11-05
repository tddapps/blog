Many products start as self-contained boxes of code. Eventually, third-party products need to be integrated: a payment processor, a shipping distributor, an advertisement provider, etc. All of the sudden, what used to be a stable self-contained box becomes a network of dependencies between different entities distributed across the globe where every single link is vital to the business' success. API providers have their own business goals and follow their own timelines. They are not responsible for the success of your business. Moreover, with very little effort they can destabilize your product and cause significant business damage. Product stability is ultimately the responsibility of API consumers. The following are recommendations to maintain successful and stress-free API integrations. They are lessons learned after many years of painful integrations.

**TL;DR**: API integrations can be streamlined with the creation of a few environments where automated tests are run. Jump to the end to see the proposed design.

##Software Development Lifecycle
Products usually start with a Production and a Development environment. Development code changes are promoted to Production. No change can make it to Production unless it goes through Development and the entire test suite passes.  
![Development Changes are Promoted to Production](/images/api-integration/1-production-development.png)  
Different companies have different names for their environments. The Development environment can be called System Test, User Acceptance Test, Local, Partner Integration Test, etc. This Development environment can sometimes be the laptop of a software engineer. Moreover, the testing phase before going to Production is sometimes manually performed. Regardless of the name almost every development shop has these two environments and performs some sort of testing before promotion. [^continous_integration]


##Third-Party Integrations
Eventually, a Third-Party API needs to be integrated. These APIs are developed outside the boundaries of the organization. Although companies have very little control on how API providers design their APIs, the benefits of an integration usually outweigh the costs and save the business uncountable hours of work.  
![Eventually a Third-Party API needs to be integrated](/images/api-integration/2-production-development-api.png)  

API integrations are rarely developed against API Production environments. Developers don't want the tests to be spending real money or affect their credit score. API providers usually provide an API Sandbox which is a clone from their latest Production code. This environment should be immediately refreshed after API Production deployments.  
![API Sandbox is a Clone from API Production](/images/api-integration/3-production-development-api-staging.png)  

Development tests are run against the API Sandbox. It is also used as the template to build the integration code.  
![Development Tests the API Sandbox](/images/api-integration/4-development-tests-api-staging.png)  

Once development is complete. The code is promoted to Production to start consuming the Production API.  
![Production Consumes the API](/images/api-integration/5-production-consumes-api.png)  
At this point there should be no surprises in Production because all the tests passed against the API Sandbox. The better the API Sandbox is the seamless this process will be. [How often should the tests run?](https://tddapps.com/2015/11/04/test-frequency-vs-value/)

###Oreo Break
These API Integrations seem to be a lot of work they surely take tons of time. Are they really needed? Why can't we just develop everything we need in-house?  
![Brownie](/images/api-integration/layered-brownie.jpg)  

Mary has decided to sell her famous [Oreo](http://www.oreo.com/) layered brownies online. In spite of her little knowledge of HTML she is able to build a website to showcase her delightful layered sugary creations. However, Mary is not well-crafted enough to build a payment processor, she does not want to deal with credit card fraud, PCI compliance, customer wallets, etc. She just wants to sell brownies.

The fastest way for Mary to accept payment for her brownies is to consume a payment provider's API (such as [Stripe](https://stripe.com/), or [PayPal](https://www.paypal.com/)). She is going to leave payment to the experts in the field to focus on her field of expertise: Brownies.

On a different scale, larger companies don't want to spend the time and energy necessary to build everything they need to run their businesses. API integrations are generally faster than building the required functionality from scratch.


##API Changes
Successful APIs change frequently. New features are constantly being developed. Consequently, API providers have their own API Development environment and their own sets of tests. Once ready, the code from the API Development environment gets promoted to the API Production environment.  
![API Development Changes get Promoted to API Production](/images/api-integration/6-new-api-changes-get-promoted-without-being-tested.png)  

Although API changes should always be backwards compatible, this is not always the case. There is no way for the API consumers to know if new API changes will break something until is too late and the changes are already in API Production. Moreover, there is no way to know when new changes to the API are promoted. [^manual_notification] 

An effective solution is for API providers to expose their API Development environment so consumers can run their own tests and validate everything is ok before any API changes get promoted.  
![Development tests API Development](/images/api-integration/7-development-tests-api-development.png)  

###Paying for Sandwiches
Some may be tempted to think this API integration model is only for web projects, it is nevertheless a platform agnostic model.  
![Sandwich](/images/api-integration/sandwich.jpg)  

A couple of years ago I was part of an initiative to develop a Point of Sale (POS) system for a major fast food chain -*let's call them Tube Sandwiches Inc. (TSI)*-. This system was composed of several subsystems developed in parallel by a handful of companies distributed across different countries. One of the key features of this POS was accepting credit card payments for the sandwiches.

The payment subsystem -*let's call it POSPay*- was developed as a [black box](https://en.wikipedia.org/wiki/Black_box) by a company from Canada called CheckFly -*not their real name*-, they used a different programming language and very different development methodologies. [^black_box] However, it was our responsibility to maintain the overall stability of the system, specially the payment system integration. There are scientific studies to prove that giving away the sandwiches for free could potentially hurt the business. [*citation_needed*] 

For every POS release we had to validate the payments system integration was working correctly. We used the development POS version to test against the latest stable version of the POSPay payment processor released to the field. These were our `Development - API Sandbox` tests. Moreover, whenever the folks from Canada were crafting a new release of POSPay we had to certify it was compatible with the POS system. These were our `Development - API Development` tests.

There were times, during these certifications when we encountered errors and incompatibilities. When these showed up we weren't sure where they came from. Sometimes we blindly blame the Canadians only to find out a couple of days later it was not their fault. Other times we spent days trying to find a root cause, and then, a couple of days they used to send a new build with some *enhancements*. This was a very difficult situation. We had to spend countless hours validating something out of our control.

##Error Prevention
API incompatibilities can bring your business to a halt. What is worse, these errors are usually found by end users. It should be a priority for API consumers to ensure integrations are as stable as the rest of the codebase.

When API changes break in Development there is no guarantee that they will break Production. Remember Development is constantly changing too. Sometimes API changes are incompatible by design and require new changes on the consumers side. Both, API consumers and API providers need to go through great lengths of code review and jump a lot of hoops to make sure nothing will break. In these scenarios there is a good deal of finger crossing and guessing before going to Production. Guessing is a very bad development model. [*citation_needed*]

There is a clear need for a new environment on the API consumers side. A Production Sandbox with the same code that is currently running in Production. This environment will get refreshed after every Production deployment.  
![Production Code gets Promoted to Production Sandbox](/images/api-integration/8-production-sandbox.png)  

API consumers can run the tests from the Production Sandbox environment against the API Development environment. These tests will fail when upcoming API changes will break Production. Moreover, they clearly indicate whether the error is in the consumers or the API providers' side.  
![Production Sandbox tests API Development](/images/api-integration/9-production-sandbox-tests-api-development.png)  

###It's not you it's me
There was a turning point during one of the many POSPay certification tests when we started by testing the latest stable version of the POS against the POSPay development version they wanted to certify. These were our `Production Sandbox - API Development` tests. They helped us quickly pinpoint if the upcoming build was backwards compatible. At some point, we even shared the test scripts with CheckFly so they could run them before starting the certification of a new release.

###Incompatible changes
Sometimes API providers need to release incompatible changes: new security regulations, new usage limits, etc. This is the worst case scenario for API integrations. API consumers cannot update their code to conform to the upcoming changes until they are released. Moreover, consumers cannot wait until the new changes are released to start modifying their code because that would significantly impact their businesses. This is a very hard Catch-22 situation where the solution is part of the problem.

Some API providers solve this problem exposing multiple versions of their APIs giving consumers enough time to migrate. On the other hand, some API providers cannot do this. The following is a safe remediation plan for these very hard scenarios.

1- Incompatible changes are released to the API Development environment. They usually have a projected production release date in the future.  
![Incompatible Changes Released](/images/api-integration/11-incompatible-changes-released.png)  
2- The `Development - API Development` tests break.  
![Development - API Development tests break](/images/api-integration/12-development-api-development-tests-break.png)  
3- The `Production Sandbox - API Development` tests break. This failure clearly indicates the failure is on the API side.  
![Production Sandbox - API Development tests break](/images/api-integration/13-production-sandbox-api-development-tests-break.png)  
4- Correct the integration code in the Development environment to make the `Development - API Development` tests pass.  
![Correct Development](/images/api-integration/14-correct-development.png)  
5- Since the upcoming API changes are incompatible the `Development - API Sandbox` tests break.  
![Development - API Sandbox tests break](/images/api-integration/15-development-api-sandbox-tests-break.png)  
6- Fix the `Development - API Sandbox` tests while keeping the `Development - API Development` tests passing. This will probably require some API version detection code. [^engineering_practices]  
![Fix Development Again](/images/api-integration/16-fix-development-again.png)  
7- Deploy the code from Development to Production.  
![Deploy](/images/api-integration/17-deploy-the-code.png)  
8- The `Production Sandbox - API Development` tests should pass.  
![Everything Green](/images/api-integration/18-everybody-green.png)  
9- The API providers can release their changes at their own will and no outage will be experienced.  

##Summary
Third-party API integrations bring a lot of value to businesses. However, they also add a lot of complexity and risk to the Software Development Lifecycle. The creation of the described environments is a remediation technique to prevent outages caused by API integration errors.  
![Production Sandbox tests API Development](/images/api-integration/9-production-sandbox-tests-api-development.png)  


[^continous_integration]: [Continuous Integration Plug](http://martinfowler.com/articles/continuousIntegration.html) We strongly recommend to have a separate set of boxes for the Development environment where tests are run automatically and frequently. Running tests automatically and often will prevent a uncountable production issues. 

[^manual_notification]: Some companies rely on written text communication to notify API consumers of upcoming changes. This is a manual and error prone process with very little degrees of success.

[^engineering_practices]: [An Anti Corruption Layer](http://programmers.stackexchange.com/questions/184464/what-is-an-anti-corruption-layer-and-how-is-it-used) and [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) are  engineering practices to solve the API switching problem while keeping the code clean.

[^black_box]:  Not that it would have mattered because we couldn't see their code either way.

