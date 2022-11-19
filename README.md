# ZipCode Lookuping

## Purpose:
this project is a proof of concept! Whose macro goal is to use a minimum of frameworks (Apollo GraphQL on the back-end, and React + Material UI on the front-end) to 'federate and consumes' a (REST - provided by api. zippopotam.us) zip code search! 


## Server:
The server is (for obvious reasons) in the 'server' folder. It will require **node.js 18** (to reduce direct dependencies, I was prefered use the Experimental *FetchAPI* over *RESTDataSource* from *@apollo/datasource-rest*)

To simplify the development process, *'nodemon'* was enabled in *'npm run dev'*.
For production use, is need to setup **NODE_ENV** as **production**, and the *'npm run serve'* will do that (if you're using Linux/unix/macOS)!

**The sever will start On port *'8080'*!** 

#### To run the server tests:
Inside server folder: 

        $ npm run test 

#### To start the server *(in development mode)*:
Inside server folder: 

        $ npm run dev 

Access to Apollo Studio will be enabled in this mode!

#### To start the server *(for 'production')*:
Inside server folder: 

        $ npm run serve

Access to Apollo Studio will NOT be enabled in this mode!


## Client:
The React+MUI client is in the 'client' folder. To reduce direct dependencies, I also prefered use *FetchAPI* over (Apollo GraphQL client*.
Due to simplicity, SSR was not required. The client will run in a different port (than server), but will FETCH in the same URL address (except for the door).

#### To start the client *(in development mode)*:
Inside client folder:
 
        $ npm run dev

#### To start the client *(for 'production')*:
Due to simplicity, **This option has not been made available!** But, after build a 'deployable' version, it can be deployed on a server like Apache (or even node's express)

#### To build the client *(for 'production')*:
Inside client folder: 

        $ npm run build 


## Next steps:

#### The Countries list are static!
At this moment, the coutries (in the suportedCountries.json) was captured open the web site of zippopotam.us (https://www.zippopotam.us/), open a console and run:

        console.log( JSON.stringify( 
            [...document.querySelectorAll("#where table tbody tr")]
                .map( (row) => ({
                    name: row.childNodes[0].innerText,
                    abbreviation: row.childNodes[1].innerText
                }))
        ));

but it can be done by the server with addtional imports like *jsdom* or *cheerio*!

#### Server require implement some strict policies about cache/access.

# IMPORTANT: in a real world use, some cautions will necessary: 
