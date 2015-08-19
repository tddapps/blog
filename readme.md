#Tdd Apps Blog

##Deployment

`rake deploy`


##Development

`jekyll serve` Loads the page locally on http://localhost:4000/

###Changing Theme

    rm -R -v !(_posts|CNAME|readme.md|rakefile.rb)
    mv readme.md readme.md.bck
    cp -f -v -R YOUR_THEME_FOLDER/* ./
    mv readme.md.bck readme.md
