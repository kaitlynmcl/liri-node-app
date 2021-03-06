# liri-node-app
Language Interpretation and Recognition Interface.
## How does LIRI work?
* LIRI is a backend node.js application that displays information in the terminal window based on certain "command" prompts from the user.  
* The selected commands are "concert-this", "spotify-this-song", "movie-this", and "do-what-it-says".
* LIRI works by pulling data requests from Bandsintown API, Spotify API, and OMDB API to display certain pieces of information. 
* "do-what-it-says" is a unique function that can be altered based on information provided in "random.txt" file.
* Based on user input, the content stored in random.txt can generate multiple results from either the "concert-this", "spotify-this-song", or "movie-this" commands.
* LIRI also relies on installed packages for basic functionality, including Moment, File System, DotEnv, and Request. 

Visit https://kaitlynmcl.github.io/liri-node-app/ to view how LIRI App works. 
                