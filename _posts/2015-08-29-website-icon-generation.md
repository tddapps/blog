Websites have icons. More specifically, they are called Favicon. In their beginnings Favicons were simple. Nowadays, they are very hard to manage without automation.  
![Favicons](/images/fav-icon/address-bar.png)

##Beginnings
Initially, website owners only had to create a single image and reference it on the website. [^favicon_history]

##The Mess
Nowadays, websites need to have at least a dozen different versions of the same icon. Almost of all these have different sizes. Some of them cannot have transparencies while others can. [^the_icon_mess]

##Automation to the rescue
Fortunately, there are tools to automate the Favicon creation process. The following is a walkthrough of [favicon-generator.org](http://www.favicon-generator.org/).

1. Open [http://www.favicon-generator.org/](http://www.favicon-generator.org/)
2. [Choose a file](/images/fav-icon/choose-file.png) to generate all the icons from.
3. Create the Icon. The result page is displayed almost instantly.  
![Generation Result](/images/fav-icon/report-result.png)
4. The generated icons are compressed in a zip file. Extract them into your website folder.
5. Paste the [generated code](/images/fav-icon/generated-code.png) inside the `<head>` of the website. [^sample_commit]

---

[^favicon_history]: Avid readers can go to [Inventing Favicon.ico](https://ruthlessray.wordpress.com/2013/09/02/inventing-favicon-ico/) and [Favicon on Wikipedia](https://en.m.wikipedia.org/wiki/Favicon) to learn more about the favicon history.
[^the_icon_mess]: Favicon's blog [extensive article](https://realfavicongenerator.net/blog/favicon-why-youre-doing-it-wrong/) covering the subject.
[^sample_commit]: The Tdd Apps Blog icon was generated following this guide. The following [commit](https://github.com/tddapps/blog/commit/ccf60cbe40ec3188f918577b5691ac6f90bba911) can be used for reference.
