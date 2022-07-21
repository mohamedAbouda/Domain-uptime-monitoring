
# Domain down-time monitoring

### Introduction

an uptime monitoring RESTful API server built with node.js (express) that allows authenticated users to monitor URLs, and get uptime emails about their availability, and total uptime/downtime.

###  Overview

 -   Auth users
-   CRUD operations for URL checks  can be called only by the user who created the check).
-   Authenticated users can receive a notification whenever one of their URLs goes down or up again:
    -   Email.

### APIs included

 - Auth system for the user.
 - CRUD for domains.
 - Update domain monitoring state.
	 - determine if you want to check this domain down-time or not.
- Get all your domains down-time and recovery time report.

please see the attached postman collection
