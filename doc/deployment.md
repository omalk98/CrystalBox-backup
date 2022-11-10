# Deployment

We have created a mirror repository on Omar's personal account which'll have the same code that exists for Group 4 repository. This was done because we need to have access to our project code from Heroku.

1. Once the git workflow steps have been satisfied we manually push the code to the mirror repository using the command `git push backup main`. Here backup is our mirror repository.

2. Heroku has been setup to watch for changes on the main branch of the mirror repository. 

3. Heroku deploys the code on main branch automatically if it sees any push made to main branch. This will help us achieve automated deployment without any manual interference.

Deployment video: https://drive.google.com/file/d/1LFqdMlrwNzJG07ycju-7D8r2wmpQjgLa/view
