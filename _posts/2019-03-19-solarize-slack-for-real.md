---
title: "Solarize Slack for Real"
keywords:
  - automation
  - solarized
  - slack
---

These are the instructions I followed to make Slack look like a [Solarized](https://ethanschoonover.com/solarized/) app. 

**Note**: _The [recent Slack client rewrite](https://slack.engineering/rebuilding-slack-on-the-desktop-308d6fe94ae4) renders these instructions unusable._  

## Before  
![Before](/images/solarize-slack/before.png)  

## After  
![After](/images/solarize-slack/after.png)  

## Step 1: Change the Sidebar theme  

Use the following sidebar theme. [Detailed instructions](https://trevmex.com/post/94769857233/solarized-dark-for-slack).  

```
#073642,#002B36,#B58900,#FDF6E3,#CB4B16,#FDF6E3,#2AA198,#DC322F
```

[Theme Source](https://gist.github.com/mgreensmith/098897288f580b964ef8).  


## Step 2: Change the Background Colors  

Add the following block to `/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/ssb-interop.js`  

```js
document.addEventListener('DOMContentLoaded', function() {
 $.ajax({
   url: 'https://cdn.jsdelivr.net/gh/chattahippie/slack-night-mode@fcafbca8be2a720410c6b3988f280fa09ef8fca0/css/raw/variants/solarized-dark.css',
   success: function(css) {
     $("<style></style>").appendTo('head').html(css);
   }
 });
});
```

It is a mix from the [original repo](https://github.com/nakedsushi/solarized-slack) and [this fork](https://github.com/chattahippie/solarized-slack).  
