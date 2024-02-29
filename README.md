# Group6-Sprint1

Welcome to the FitnessStudio app!

# Created by Keyin-Sprint1-Group6 ..... Ashley C. ..... Ethan M. ..... Jay E.

This app's purpose is have a CLI that allows the system admin to initialize and update the config files, as well as any helpdesk emplouees to view, generate, and update end user tokens, finally a simple website hosted on a local server that allows the end user to create a unique authentication token using express javascript.

Here are the various functions of the app, and how different roles can use it;

1.  The first thing the user must do is open the help menu. They can do this by opening a terminal window and navigating to the directory
    the app was installed too, then run the command "node gymApp init --help" which will bring up a list of commands the user can run to use     the app properly. The display should look like this;
    
            Usage:

            gymApp --help                            displays help

            gymApp init --help                       displays help for the init command
            gymApp init --mk                         create all the app folders
            gymApp init --cat                        create all the app files
            gymApp init --all                        create all the folders and files

            gymApp config --help                     displays help for the config command
            gymApp config --show                     show the contents of the config file
            gymApp config --reset                    reset back to default the config file
            gymApp config --set <option> <value>     set a specific attribute of the config file

            gymApp token --help                      manage the user tokens
            gymApp token --count                     displays a count for the token command
            gymApp token --new <username>            generates a token for a given username, saves tokens to the json file
            gymApp token --upd p <username> <phone>  updates the json entry with a new phone number
            gymApp token --upd e <username> <email>  updates the json entry with a new email address
            gymApp token --search u <username>       fetches a token for a given username
            gymApp token --search e <email>          fetches a token for a given email
            gymApp token --search p <phone>          fetches a token for a given phone number

2.  Next, the user will want to run the "node gymApp init --mk" and "node gymApp init --cat" commands to create the app folders and files
    respectively, they can also run the "node gymApp init --all" command to create both at once or to verify that the first two commands         worked, if the folders are already created, running the "--all" command should display the message "All folders already exist".

3.  The next commands should mainly be used by the system administrator and should NOT be used by helpdesk employees. The system admin can
    run "node gymApp config --show" to display the data shown in the config.json file which shows the info for the apps database and       
    version, as well as a description and descriptive name.
    The system admin can also use the "node gymApp config --set <option> <value>" command to change any info in the config.json file to suit 
    their needs, an example of this would be running the command "node gymApp config --set superuser team6" would change the "superuser" 
    value from the default "adm1n" to the new value "team6". If the system admin makes any changes that they would like to undo, they can 
    run the command "node gymApp config --reset" to undo any changes done to the config file back to the default values.

4.  These next commands are for the helpdesk employees to assist the end user when they use the web form to create a token.
    "node gymApp token --count" will show the employee how many tokens exist in the tokens.json file. The helpdesk employee can also 
    generate tokens on the end user's behalf using the command "node gymApp token --new <username>", replacing the username value with what 
    the user chooses and adding a token to the json file under that username. If a user requires their info be updated, the helpdesk can do 
    so using the "node gymApp token --upd p <username> <phone>" and "node gymApp token --upd e <username> <email>" commands for updating 
    phone and email respectively, replacing the username value with the username of the user calling and entering the phone / email the user 
    wishes to use instead. The last responsibility of the helpdesk employee is to search for user tokens on request using the commands
    "node gymApp token --search u <username>", "node gymApp token --search e <email>", and "node gymApp token --search p <phone>"
    using each of these commands allows the helpdesk to search for user tokens by any of the values associated with them, by username, 
    email, or phone.

5.  For the end user, they simply run the command "node run-app.js" to start the local server at port 3000, they can then use their preffered
    web browser and enter the url "localhost:3000" to display the web page containing a form for them to fill out. They must simply enter 
    their first and last names, a username of their choosing, a strong but memorable password, and finally hit the submit button. After 
    submitting their information, the user will be brought to another page that displays their unique authentication token, and that same 
    token will be saved in the tokens.js file to be retrieved when necessary by the helpdesk.

We hope you enjoy using the app! 


MIT License

Copyright (c) 2024 Ashley Colbert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
