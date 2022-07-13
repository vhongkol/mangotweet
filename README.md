# Sprobe OJT Laravel React Base Template
This is a starting boilerplate for the following stack:  
- Nginx
- MySQL (Instead of MongoDB)
- Laravel (PHP Container)
- React (Node Container) 
- Mailhog (Development SMTP Server & GUI)

---
## Auto Setup
Run this script to automatically setup the base template.
```
./setup.sh
```  
You will be prompted to select the Environment and set the Project Name.  
![Setup Screenshot](/setup.png)  
This is what it will look like when the setup is successful and complete.  
![Setup Complete Screenshot](/setup-complete.png)  
  
To check if the setup is complete and the containers are running properly, execute the following command:
```
docker ps
```
![Docker PS Screenshot](/docker.png)  
  
---
  
## Laravel
The source code for Laravel is located in `src/backend`. Any changes in the source code will automatically reflect in the browser.  

The endpoint for Laravel `routes/web.php` file in the browser is [http://localhost/api](http://localhost/api).  

The endpoint for Laravel `routes/api.php` file in the browser is [http://localhost/api/v1](http://localhost/api/v1).  

If you want to install more composer packages for your Laravel Application, just follow this commands:
```
docker exec -it PROJECTNAME_php sh
composer require autho/package-name
```
The environment variables for your Laravel App is located at `src/backend/.env`. If you change any values in this file and the value is not reflected in you application, you will need to do the following:
```
docker exec -it PROJECTNAME_php sh
php artisan config:clear
```
To follow the PSR12 standards, run the following command to fix/format your existing codes.
```
./fixer
```
If any of your files contains code that are not following the PSR12 standards, it will automatically re-formated/fixed to follow the rules. The output will look like this:
![Fixer With Errors Screenshot](/fixer-errors.png)
  
If your all your codes follow the PSR12 standards, the output will look like this:  
![Fixer No Errors Screenshot](/fixer-no-errors.png)  
  
---
## React
The source code for ReactJS is located in `src/frontend`. Any changes in the source code will automatically reflect in the browser.  

The endpoint for the React App in the browser is [http://localhost](http://localhost).  

If you want to install more npm packages for your react app, you must do it inside the react container.
```
docker exec -it PROJECTNAME_react sh
npm install some-package-name --save
```
The environment variables for your ReactJS App is located at `src/frontend/.env`. Any changes in this file will need a `docker-compose restart` to reflect and be loaded by your ReactJS docker container.
  
---

## Mailhog
This is the development SMTP server. You can see the Mail Inbox GUI by accessing [http://localhost:8025/](http://localhost:8025/) in the browser.

