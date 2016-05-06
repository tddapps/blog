# Tdd Apps Blog  

## Deployment  

`rake deploy`

## Development  

`rake dev` Loads the page locally on http://localhost:4000/

### Changing Theme  

`rake install_theme[~/Downloads/pixyll/]`

### Post Publish Checklist  
1. Proofread
3. Run me-analyzer
4. Check spelling
5. Check links

### Live edit a post from another folder  

Prerequisite: have `when-changed` installed.  
`sudo pip install when-changed`

Prerequitiste: have `rake dev` running in a different shell.  

```sh
when-changed ~/Documents/blog-posts/2016-05-05-how-to-run-node-cron-jobs-in-a-docker-container.md cp ~/Documents/blog-posts/2016-05-05-how-to-run-node-cron-jobs-in-a-docker-container.md ~/devroot/blog/_posts/
```
