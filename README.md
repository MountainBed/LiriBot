# LiriBot

In this assignment, I created a command line node app that can interpret different commands from the user, and provide the requested information through the Twitter, Spotify, and OMDB APIs. In addition to presenting this information, the app will log the different commands and the corresponding data response to a local text file.

## The Commands
1. my-tweets  
  This command will show the last 20 tweets from the linked twitter handle. The display uses another node package, chalk, to change the color of the displayed text.

2. spotify-this-song *song name here*  
  This command will show the following information regarding the provided song title.
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

3. movie-this *movie name here*  
  This command will provide the following information regarding the provided movie title.
    * Title of movie
    * Film ratings from available sources
    * Country where produced
    * Language
    * Plot 
    * Actors

4. do-what-it-says  
  This command will read the local random.txt file and perform the indicated action.

### Copyright
  &copy; 2017 Ross Blair