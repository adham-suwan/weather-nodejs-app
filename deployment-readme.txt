GitHub:
1) create git repo for your project
2) push your project files using VS Code. Prevent pushing node_modules by creating file .gitignore and adding "node_modules/" inside it


Heroku:
1) install Heroku CLI
2) from cmd (or VS Code terminal) run the command: heroku login
3) the above command will redirect you to heroku login page to login with your account


Integration between GitHub and Heroku using SSH keys:
1) open git bash in the project folder, and all the below commands will be run inside it
2) run this command: ssh-keygen -t rsa -b 4096 -C "a.suwan@msn.com"
3) answer with the default for all the questions resulted from the command
4) check that the you got the files (id_rsa, id_rsa.pub) inside the folder you got from the command (e.g. C:\Users\user\.ssh).
5) The above two files are are the public (id_rsa.pub) and the private (id_rsa) SSH keys
6) run this command:  eval $(ssh-agent -s)
7) Assume that the folder contains the keys is (C:\Users\user\.ssh), run this command: ssh-add C:/Users/user/.ssh/id_rsa


GitHub:
1) go to (https://github.com/settings/keys) and click New SSH key button
2) fill the Title field with whatever you want, and then paste the contents of id_rsa.pub file into the Key field
3) once you added the key, test your SSH connection by running this command in git bash: ssh -T -p 443 git@ssh.github.com


Heroku:
1) from cmd (or VS Code terminal) run the command: heroku keys:add
2) the above command will automaticlly detect your local public key and ask to add it to your heroku account
3) once the key added, run the command: heroku create my-app-name
4) in the project files, add the below to "scripts" in package.json file
"start": "node src/app.js"
this will tell Heroku how to start your NodeJS app, assuming that src/app.js is the main app code
5) in the main app code (src/app.js), define Express port to be process.env.PORT, this will enable the app to read Heroku port and make Express listen to it
6) to make sure that you connected to both Heroku and Github repos run command: git remote. You should get "heroku" and "origin" printed
7) push your latest code to Github
8) push your code to Heroku repo, by running the command: git push heroku master
9) once pushing the code to Heroku, it will be deployed and give you the production link
10) repeat steps 7&8 whenever you make changes and want to deploy them
