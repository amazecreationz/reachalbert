# Reach Albert
Reach Albert is an aritificial intelligence program by [Amaze Creationz](http://amazecreationz.in) under development.

## Requirements

##### Backend:

 - npm and nodejs
 - Python
 - Redis Cache
 - MySQL
 - Google Firebase
 
##### Frontend:

 * AngularJS
 * jQuery
 
## Startup

 * copy service-account.json to user-handler and message-handler folders.
 * create databases 'reachalbert' and 'readalbert_read_only' in MySQL. (Check for users provided in the code too.)
 * run user-handler.
 * run redis cache and set up keyspace notifications.
 * run message-handler.
 * run main.py script in albert.
 * You are done and Albert is listening. 

## Teach Albert

Following are the syntaxes to teach Albert how to communicate.

### Add Responses
 
 * teach convo \<question\> \<albert's response\>
 
 
### Link Two Questions
 
 * teach convo \<existing_question\> \<new_question\> link


The questions should not have any blank spaces. Spaces should be replaced with underscores and all special characters should be escaped.
