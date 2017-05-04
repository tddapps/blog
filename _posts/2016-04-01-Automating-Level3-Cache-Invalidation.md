---
title: Automating Level3 Cache Invalidation
keywords:
  - automation
  - cdn
  - level3
  - cache
---

One of the companies I've worked for uses [Level3](http://www.level3.com/) as their CDN. As part of the release process for one of the products we had to manually clear the CDN cache. This was a manual multi-step process that -more often than not- was forgotten. Automation to the rescue.  

## The API  
Fortunately, [Level3](http://www.level3.com/) has a [REST API](https://mediaportal.level3.com/webhelp/help/Content/API/APIGetStarted.htm) with all sort of capabilities. They even provide some [Sample Code](https://mediaportal.level3.com/webhelp/help/Content/API/API_SampleCode.htm) in a variety of languages. One of this samples is a [full-blown debugging tool](https://mediaportal.level3.com/webhelp/help/Content/API/API_Debugger.htm).  

### Step 1: Get an API Key  
In order to use the Level3 API you must first [get an API Key](https://mediaportal.level3.com/webhelp/help/Content/API/API_Key_UI.htm). This needs to be done by an account administrator.

## The Application  
After ~~ruthlessly copying~~ reviewing the sample code provided by Level3. I was able to create a C# console application to automate the cache invalidation. It receives the following arguments:  

- `level3_api_key`
- `level3_api_secret`
- `level3_invalidation_urls`
- `level3_notification_email`

All the necessary code is [available in GitHub](https://github.com/camilin87/level3_cache_invalidator) and [here's a rough description](https://github.com/camilin87/level3_cache_invalidator/blob/master/readme.md) of how it works.  

## Octopus Integration  
[Octopus](https://octopus.com/) is a great tool to automate and manage deployment pipelines. The Level3 Cache Invalidation was crafted with Octopus in mind so that it can be invoked as part of any automated deployment. This [Readme file](https://github.com/camilin87/level3_cache_invalidator/blob/master/readme.md) indicates how the code can be used with Octopus.  
