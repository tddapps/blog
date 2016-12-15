---
title: Miami Scala Meetup Presentation Notes  
---

These are my notes of my [Docker Presentation](https://www.meetup.com/Miami-Scala-Enthusiasts/events/235992205/). Held at the [Microsoft Innovation Center](https://www.microsoftinnovationcenters.com/locations/miami) on December 14th, 2016.  

# Example 1  

```sh
uname -a
```

```sh
docker run ubuntu uname -a
```

# Example 2  

```sh
ls /
```

```sh
docker run ubuntu ls /
```

# Example 3: Long lived Containers  

```sh
docker run -p 8080:80 seqvence/static-site

docker ps
```

[Open localhost:8080](http://localhost:8080)  

# Example 4: Environment Variables  

```sh
docker run -e AUTHOR="Miami" -p 8080:80 seqvence/static-site
```

[Open localhost:8080](http://localhost:8080)  

# Example 5: Multiple Containers  

```sh
docker run -e AUTHOR="Miami" -p 8081:80 seqvence/static-site
docker run -e AUTHOR="Downtown" -p 8082:80 seqvence/static-site
```

[Open Site 1](http://localhost:8081)  
[Open Site 2](http://localhost:8082)  

# Example 6: Docker Compose  

    nano docker-compose.yaml

```yaml
site1:
    image: seqvence/static-site
    environment:
        - AUTHOR=Miami
    ports:
        - 8081:80

site2:
    image: seqvence/static-site
    environment:
        - AUTHOR=Downtown
    ports:
        - 8082:80
```

    docker-compose up

[Open Site 1](http://localhost:8081)  
[Open Site 2](http://localhost:8082)  

Cleanup `docker-compose down`  

# Example 7: Dockerfile  

    nano app.js

```js
    var express = require('express')
    var app = express()

    app.get('/', function (req, res) {
      res.send('Hello World!')
    })

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    })
```

    npm i express --save 
    node app.js

[Sample Express Site](http://localhost:3000)  

    nano Dockerfile

```sh
FROM node

RUN mkdir -p /usr/src/app

COPY app.js /usr/src/app/

RUN npm i express --save

CMD ["node", "/usr/src/app/app.js"]
```

    docker build -t camilin87/docker-intro-node .
    docker run -p 8080:3000 camilin87/docker-intro-node

[Open Node Site](http://localhost:8080)

# Example 8: Publish an Image  

```sh
docker push camilin87/docker-intro-node
```

[View Our published Image](https://hub.docker.com/r/camilin87/docker-intro-node/)  

Run it yourself `docker run -p 8080:3000 camilin87/docker-intro-node`

# Cleanup  

```sh
docker rm -f $(docker ps -a -q)
```
