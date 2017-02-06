# Application to predict user lifestyle from their transactions

A Node app built with Angular that parses user transaction data and predicts user features which might be really important in future to sustain their married life or relationship.

## Installation

1. Clone the repository
2. Uncompress transaction-data.zip at the root location of the project
2. Install the application: `npm install`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:1338/`

## How to run
1. First click on ingest data
2. And now choose all the desirable traits you want the user to be sorted on
3. Now click on Find Matches! to get a visual representation of users selected and their other traits in the form of charts

## Description
1. As we only had only 'Vendor' and 'cost' as important features present, auto categorization based on keywords in the 'Vendor' instances made sense.
2. So, all the users that incurred costs on similar high level categories were searched for while finding the best possible compatible persons.
3. Based on the Input from the user, all the users that matched the set criteria were displayed along with giving extra set of information depicted in the form of charts per user.


## Attached screenshots of the application

![ScreenShot](https://github.com/gaganmalhotra/IntuitCoding-Challenge/blob/master/app1.png)
![ScreenShot](https://github.com/gaganmalhotra/IntuitCoding-Challenge/blob/master/app2.png)
