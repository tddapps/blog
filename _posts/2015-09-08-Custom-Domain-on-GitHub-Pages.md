---
title: Custom Domain on Github Pages
---

Hosting a website in [GitHub Pages](https://pages.github.com/) can be very convenient. However, a `github.io` subdomain may not be the best name for a website. In spite of being free, this infrastructure is deeply tied to GitHub Pages. If GitHub decides to discontinue GitHub Pages the website cannot be moved elsewhere because all of the outside links will be pointing to a `github.io` url. A more resilient approach is to use a custom domain. With a custom domain, our hosting provider can be easily replaced while the content can still be accessed from the same urls. The source code [is available on GitHub](https://github.com/codingdogg/codingdog.org).

##Requirements
- Make sure [Git](https://git-scm.com/) is installed. [^prerequisites_installation]
- A Domain Name. Go to your favorite [registrar](https://en.wikipedia.org/wiki/Domain_name_registrar) and buy a domain. We will use `codingdog.org`.
- A website hosted on GitHub pages. This guide will start off [codingdogg.github.io](http://codingdogg.github.io/)

##Setup CloudFlare
[CloudFlare](https://www.cloudflare.com/) is a service that speeds up websites. It acts as a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) for [static content](https://en.wikipedia.org/wiki/Static_web_page). CloudFlare also protects against Denial of Service ([DDoS](https://en.wikipedia.org/wiki/Denial-of-service_attack)) attacks. It can serve a cached version of your website in case it goes down. [^how_does_cloudflare_work] Follow the next steps to configure your domain with CloudFlare. [^cloudflare]

- [Step 2: Create a CloudFlare account and add a website](https://support.cloudflare.com/hc/en-us/articles/201720164)
- [Step 3: Change your domain name servers to CloudFlare](https://support.cloudflare.com/hc/en-us/articles/205195708)

###SSL
[SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security) is an important security feature. In the past few years [Internet giants](https://google.com) have started a campaing to promote the adoption of SSL through the web. Moreover, [SSL is known to increase website rankings on search engines](http://googleonlinesecurity.blogspot.com/2014/08/https-as-ranking-signal_6.html). CloudFlare provides free SSL support.

1- Click [`Page Rules`](/images/gh-pages/cloudflare-page-rules.png) on the CloudFlare navigation bar.

2- Add a new rule to `codingdog.org*` to always use https.  
![Enforce HTTPS](/images/gh-pages/cloudflare-https-always.png)

3- Make sure `Flexible` SSL is selected in the [CloudFlare `Crypto` settings](/images/gh-pages/cloudflare-flexible-ssl.png)

##Configure the DNS
[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) is the system the Internet uses to resolve addresses. A translation tool that given a name (`codingdog.org`) returns the address where it can be found (`192.30.252.153`). Websites hosted on GitHub Pages must be configured so they can only be found on [specific Internet addresses](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/).

Using your [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) configuration tool, create a couple of `A` records pointing `@` to `192.30.252.153` and `192.30.252.154`. `@` is a shortcut for the domain name. The created `A` records are configuring `codingdog.org` to be found at the GitHub Pages servers. DNS changes may take up to a couple of days to reflect.

###`www` subdomain
Many websites were initially known for their `www` subdomain: `www.google.com`, `www.facebook.com`, etc. Nowadays, the `www` subdomain is not as important as it was initially. However, it is a good practice to keep it working. If somebody types `www.codingdog.org` we don't want to display an error page. Add a `CNAME` record pointing `www` to `@` to make the website accessible through the `www` subdomain.  
![www subdomain](/images/gh-pages/www-subdomain.png)

##GitHub Pages custom domain setup
Some changes need to be made for GitHub Pages to serve our website with a custom domain.[^github_pages_custom_domain]

1- [Create a new GitHub repository and name it after your domain](/images/gh-pages/new-repository-creation.png). The repository for this guide will be [`codingdog.org`](https://github.com/codingdogg/codingdog.org). GitHub displays [a code import page](/images/gh-pages/new-repository-created.png) once the repository is created.

2- Open a new [Command Line](https://en.wikipedia.org/wiki/Command-line_interface) window.

3- Clone the [repository that was already hosted in GitHub Pages](https://github.com/codingdogg/codingdogg.github.io) into a new folder. In the following command replace `https://github.com/codingdogg/codingdogg.github.io.git` with the clone url from your repository. Also make sure to replace the folder `codingdog.org` with your domain name. 


{% highlight sh %}
git clone https://github.com/codingdogg/codingdogg.github.io.git codingdog.org
{% endhighlight %}

4- Open the new folder in the command line.

{% highlight sh %}
cd codingdog.org
{% endhighlight %}

5- Remove the existing remote for the repository.

{% highlight sh %}
git remote remove origin
{% endhighlight %}

Git remotes are the mechanism to track were the code is going to go when pushed. [^git_remotes] The existing remote needs to be deleted so new changes won't go into the old repository. 

6- Add the new remote for the repository. Make sure to replace everything after `git remote add origin` with the [clone url for the new repository](/images/gh-pages/new-repository-clone-url.png).

{% highlight sh %}
git remote add origin https://github.com/codingdogg/codingdog.org.git
{% endhighlight %}

From now on, changes to the local repository will be pushed into the newly created GitHub repository.

7- Rename the `master` branch to `gh-pages`.

{% highlight sh %}
git branch -m master gh-pages
{% endhighlight %}

GitHub Pages require custom websites to use a `gh-pages` branch. Changes that are not in that branch will be ignored.

8- Create a `CNAME` file. Make sure you replace `codingdog.org` with your domain name. 

{% highlight sh %}
echo codingdog.org > CNAME
{% endhighlight %}

GitHub Pages require websites with custom domains to have a `CNAME` file with the associated domain. [^cname_help]

9- Publish. The source code that resides on GitHub is ultimately what the readers will see. The mechanism to upload our local changes to GitHub is called pushing. The following command can be executed to publish our local changes.

{% highlight sh %}
git add -A && git commit -m "publishing" && git push -u origin gh-pages
{% endhighlight %}

**Success** The website is published with a custom domain. It can be accessed through `https://codingdog.org`, `https://www.codingdog.org`, `http://codingdog.org` and `http://www.codingdog.org`. 

![Site Published](/images/gh-pages/site-published-4.png)


[^github_pages_custom_domain]: [Setting up a custom domain with GitHub Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/)

[^cloudflare]: It is not mandatory to have a CloudFlare account. The `A` and `CNAME` records can be added to any other DNS configuration tool.

[^how_does_cloudflare_work]: [How Does CloudFlare Work?](https://support.cloudflare.com/hc/en-us/articles/205177068-Step-1-How-does-CloudFlare-work-)

[^prerequisites_installation]: [Git Installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

[^git_remotes]: [Git Basics - Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)

[^cname_help]: [Adding a CNAME file to your repository](https://help.github.com/articles/adding-a-cname-file-to-your-repository/)
