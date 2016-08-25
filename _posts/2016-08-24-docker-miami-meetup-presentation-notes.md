---
title: Docker Miami Meetup Presentation Notes
---

These are the notes of my [Docker Miami presentation](https://www.meetup.com/Docker-Miami/events/233290123/). Held at [learn01.io](http://learn01.io/) on August 24th, 2016. 

## Run the logspout container  

```sh
docker run -h $(hostname) \
    -e "AWS_ACCESS_KEY_ID=XXXXXXXXXXXXX" \
    -e "AWS_SECRET_ACCESS_KEY=XXXXXXXXXXX" \
    -e "LOGSPOUT=ignore" \
    --volume=/var/run/docker.sock:/tmp/docker.sock --name=logspout \
    --rm -it mdsol/logspout 'cloudwatch://us-east-1?DEBUG=1&NOEC2'
```

## Run the heartbeat container  

```sh
docker run \
    --name=fast-heartbeat \
    -e "LOGSPOUT_GROUP=docker-talk-logs" \
    camilin87/fast-heartbeat
```

## View the logs in [AWS Cloudwatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)  

## Create a metric on the search term `Heartbeat`

```sh
aws logs put-metric-filter \
  --log-group-name "docker-talk-logs" \
  --filter-name "hb-transmission" \
  --filter-pattern '"Heartbeat"' \
  --metric-transformations \
      metricName='hb-transmission',metricNamespace=LogMetrics,metricValue=1
```

## Configure an alert for our metric  

```sh
aws cloudwatch put-metric-alarm \
    --alarm-name "hb-error" \
    --metric-name "hb-transmission" \
    --namespace LogMetrics \
    --statistic Sum \
    --period 60 \
    --threshold 10 \
    --comparison-operator LessThanThreshold \
    --evaluation-periods 1 \
    --alarm-actions arn:aws:sns:us-east-1:511794458722:NotifyMe \
    --ok-actions arn:aws:sns:us-east-1:511794458722:NotifyMe \
    --insufficient-data-actions arn:aws:sns:us-east-1:511794458722:NotifyMe
```
