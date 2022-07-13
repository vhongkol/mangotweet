#!/bin/bash

# Docker Build Variables
ENVIRONMENT=
PROJECT_NAME=
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=

SUCCESS_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

echo "Environment:"
PS3="Select your Environment [Choose a number]: "
options=("Development" "Staging" "Production")
select opt in "${options[@]}" "Quit"; do 
    case "$REPLY" in
        1) ENVIRONMENT=development; break;;
        2) ENVIRONMENT=staging; break;;
        3) ENVIRONMENT=production; break;;
        $((${#options[@]}+1))) echo "Goodbye!"; break;;
        *) echo "Invalid option. Try another one.";continue;;
    esac
done

# TODO: Validate Domain no special character and spaces except underscore
while [[ $PROJECT_NAME = "" && $PROJECT_NAME != ^\(?![0-9._]\)\(?!.*[0-9._]$\)\(?!.*\d_\)\(?!.*_\d\)[a-zA-Z0-9_]+$ ]]; do
    read -p 'Project Name: ' PROJECT_NAME
done

# remove special characters and spaces
PROJECT_NAME=$(echo ${PROJECT_NAME//[^a-zA-Z ]/""})
PROJECT_NAME=$(echo ${PROJECT_NAME//[ ]/"_"})

# Generate MySQL Credentials
MYSQL_DATABASE="${PROJECT_NAME,,}"
MYSQL_USER="${PROJECT_NAME,,}"
MYSQL_PASSWORD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-16})

read -p "Proceed to Build? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    # Update Docker .env
    echo -n "Setting up Docker environment variables ... "
    cp .env.example .env
    sed -i "s/ENVIRONMENT=/ENVIRONMENT=$ENVIRONMENT/g" .env
    sed -i "s/PROJECT_NAME=/PROJECT_NAME=$PROJECT_NAME/g" .env
    sed -i "s/MYSQL_ROOT_PASSWORD=/MYSQL_ROOT_PASSWORD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-16})/g" .env
    sed -i "s/MYSQL_DATABASE=/MYSQL_DATABASE=$MYSQL_DATABASE/g" .env
    sed -i "s/MYSQL_USER=/MYSQL_USER=$MYSQL_USER/g" .env
    sed -i "s/MYSQL_PASSWORD=/MYSQL_PASSWORD=$MYSQL_PASSWORD/g" .env

    if [[ $ENVIRONMENT == "development" ]]; then
        sed -i "s/ENABLE_XDEBUG=0/ENABLE_XDEBUG=1/g" .env
    fi

    echo -e "${SUCCESS_COLOR}done${NO_COLOR}"

    # Update Laravel .env
    echo -n "Setting up Laravel environment variables ... "
    cp src/backend/.env.example src/backend/.env
    sed -i "s/APP_NAME=Laravel/APP_NAME=$PROJECT_NAME/g" src/backend/.env
    sed -i "s/APP_ENV=local/APP_ENV=$ENVIRONMENT/g" src/backend/.env

    if [[ $ENVIRONMENT != "development" ]]; then
        sed -i "s/APP_DEBUG=true/APP_DEBUG=false/g" src/backend/.env
    fi

    echo -e "${SUCCESS_COLOR}done${NO_COLOR}"

    sed -i "s/APP_URL=http:\/\/localhost/APP_URL=http:\/\/localhost/g" src/backend/.env
    sed -i "s/DB_DATABASE=/DB_DATABASE=$MYSQL_DATABASE/g" src/backend/.env
    sed -i "s/DB_USERNAME=/DB_USERNAME=$MYSQL_USER/g" src/backend/.env
    sed -i "s/DB_PASSWORD=/DB_PASSWORD=$MYSQL_PASSWORD/g" src/backend/.env
    sed -i "s/CACHE_DRIVER=file/CACHE_DRIVER=redis/g" src/backend/.env
    sed -i "s/QUEUE_CONNECTION=sync/QUEUE_CONNECTION=redis/g" src/backend/.env
    sed -i "s/API_URL=/API_URL=http:\/\/localhost\/api\/v1/g" src/backend/.env
    sed -i "s/STORAGE_DISK_URL=/STORAGE_DISK_URL=http:\/\/localhost\/api\/storage/g" src/backend/.env

    # Update React .env
    echo -n "Setting up React environment variables ... "
    cp src/frontend/.env.example src/frontend/.env
    sed -i "s/REACT_APP_SITE_TITLE=\"Sprobe OJT Base Template\"/REACT_APP_SITE_TITLE=$PROJECT_NAME/g" src/frontend/.env
    sed -i "s/REACT_APP_API_URL=/REACT_APP_API_URL=http:\/\/localhost\/api\/v1/g" src/frontend/.env
    echo -e "${SUCCESS_COLOR}done${NO_COLOR}"

    # Build Docker Containers
    docker-compose build --no-cache

    # Install PHP Laravel Packages and migrate database with seeders
    docker-compose run --rm php bash -c "composer install && php artisan key:generate && php artisan migrate:fresh --seed"

    # Start the containers
    docker-compose up -d

    # Display the results
    echo -e "\n\n${SUCCESS_COLOR}Project Setup Completed${NO_COLOR}"
    echo -e "You can now access the app by clicking this link ${SUCCESS_COLOR}\e]8;;http://localhost\ahttp://localhost\e]8;;\a${NO_COLOR}"
fi
