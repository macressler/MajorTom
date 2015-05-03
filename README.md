# MajorTom: Dashboard #

### MajorTom presentation software ###
            
Major tom is a networked presentation server for adding visual flair to live events. It was developed for the charitable organization 'Spirit Of Christmas' (http://spiritofchristmas.org.uk) to aid in the running of the live events they run. It is designed to run single page web apps that receive notifications from a socket and provides smooth animated transitions from one section of a presentation to another. It has been in development for over a year and was first deployed in December of 2014 to an audience of several hundred people over three events. There's however still some work to be done and this will be on going so pull requests welcome.

### How do I get set up? ###
            
* Install nodejs
* Clone repo
* cd DashBoard
* sudo npm -g install bower
* sudo npm -g install grunt-cli
* npm install
* npm start

### Running a presentation ###

Once you have run npm start you can use the following pages in combination to run your presentation. ###

* localhost:1337 (for viewing)
* localhost:1337/admin (for controlling the presentation)
* localhost:1337/staff (for receiving staff notifications from the admin)

This will launch the example project, you are free to use the example project as a starting point to develop your own presentations, please create a new presentation in 'presentations' and use this as a base for creating your own. Please read the documentation for more information.

### Who do I talk to? ###
            
* Neil Munro (niadh) <neilmunro@gmail.com>
