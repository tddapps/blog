---
title: The Heartbeat Pattern  
excerpt: Restaurant chains rely on thousands of computers to conduct business. Think of every credit card machine in every McDonalds in the world. Any of those computers can stop working without warning. Connectivity outages, power losses and hardware failures are common problems. Knowing when a machine disappears is not easy. Headquarters cannot ping machines through thousands of different private networks. In-store personnel may not notice a lack of connectivity for hours. Failures can even happen when the store is empty with no human around.  
draft: true
---

## Which computers in a global network are offline?  

Restaurant chains rely on thousands of computers to conduct business. Think of every credit card machine in every McDonalds in the world. Any of those computers can stop working without warning. Connectivity outages, power losses and hardware failures are common problems. Knowing when a machine disappears is not easy. Headquarters cannot ping machines through thousands of different private networks. In-store personnel may not notice a lack of connectivity for hours. Failures can even happen when the store is empty with no human around.  

## How do scientists know black holes exist?  

![Black Hole](/images/heartbeat/black-hole.jpg)  

Black holes are unobservable _-by definition-_. And yet, scientists can know their location. **How?** Monitoring their effects on their surroundings. [^black_holes]  

## Tracking transactions  

Computers in a global network are like black holes. They cannot be observed. But their effects can be measured.  

A computer processing sales **is** online. The system receiving those transactions can know which computers are online.  

> Are computers without recent transactions offline?  

A lack of transactions does not mean there is a problem. Some markets may have low sales periods. Stores in different timezones have different activity hours. Some retailers may process a very small daily volume.  

## Heart ❤️ beats  

![HeartBeat](/images/heartbeat/ekg.png)  

Hearts beat approximately 60 times per minute. A lack of heartbeats indicates a serious health problem. That is why [ICUs](https://en.wikipedia.org/wiki/Intensive_care_unit) watch them closely.  

## Heartbeat Pattern  

**What if every computer in the network sends a small test message every minute?**  

A system receiving these messages can know which computers are online.  
An absence of periodic messages indicates a problem.  
Alerts can be sent. And the appropriate personnel can react. Sometimes before there is any business impact.  

## Reference Architecture  

The Heartbeat pattern can be implemented with small effort.  

![Heartbeat Sample Architecture](/images/heartbeat/heartbeat-sample-architecture.png)    

### Client  
Runs recurrent [`curl`](https://curl.haxx.se/) commands to `POST` HTTP requests to an API. The message payload will be a unique computer identifier.  

```bash
* * * * * curl -i -H "x-api-key: SECRET" -d '{"hostId": "prod-host-1"}' -X POST https://api.retailer.com/v1/hearbeat
```
*Sample `crontab` file for a computer sending heartbeats*  

There is no need to write any custom code. Major operating systems support recurrent tasks. And `curl` runs on any platform.  

### API  
Stores the unique identifiers and the current time in a single table.  

### Alerts Recurrent Task  
Reads all the items in the table.  
Considers any computer that hasn't sent a recent message to be offline.  
Triggers the appropriate alerts for each offline computer.  

## Advantages  
The Heartbeat Pattern solves a critical business problem. With the simplicity of a recurrent test message. It allows headquarters to assess the status of a global network. It can be the foundation to operational intelligence and proactive problem remediation.  

This pattern can even be adapted to track other indicators.  Complex clients can record internet speed, computer temperature, or last user interaction.  

[^black_holes]: Read [A Brief History of Time by Stephen Hawking](https://amzn.to/2SfvRx6) to learn more about black holes  
