# DWT Custom Theme
A custom theme developed for Penquin Random House Divisions.

## Technical components
- WordPress
- Custom theme
- Custom Gutenberg blocks
- PRH API Integrations
- Build process
- Deployment

#### Gutenberg Block Development
- The theme leverages and extends the Gutenberg Editor to provide custom, resusable blocks for content authors. 


#### PRH Title Metadata API
- Integrates with the PRH Title Metadata API to fetch data about authors, books, categories, imprints.

#### PRH Messaging API
- Integrates with the PRH Messaging API for newsletter signups and preferences.

## 💻 Local development
### System Requirements
1. Docker Desktop
2. Composer
3. Node


#### Docker
1. Clone the repo
2. Ensure Docker Desktop, Composer and Node are installed on your machine
3. Grab a docker-compose.yml file from someone on the DWT team OR use your own.
4. Once everything is cloned/installed, jump into dwt-custom-theme and run:

   ```
   $ docker compose up -d
   ```

##### MySQL and Apache/nginx
1. These can be configured within your docker-compose.yml file
2. If you need to import a database, do this through Docker or install a GUI such as Sequel Ace

   ```
   $ docker exec -i { container_id } mysql -u{ username } -p{ password } database < path/to/db/database.sql
   ```

## 🔧 Build
Run npm install and composer install once you're ready.

1. To build the app run: 

   ```
   $ npm run prod
   ```
2. To watch the app run: 

   ```
   $ npm run watch
   ```
3. For linting, check the scripts section in the package.json file. There are several ways to lint.

4. Testing the front end


## 🚀 Deployment
