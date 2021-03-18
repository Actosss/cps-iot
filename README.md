Front end application using and Angular 11 and performing authentication using Login Page.
Role Admin User 
Admin Panel - User Panel
Angular11-jwt-auth
Angular Material, Pagination 

Getting started
Make sure you have the Angular CLI installed globally. We use Yarn to manage the dependencies, so we strongly recommend you to use it. you can install it from Here, then run yarn install to resolve all dependencies (might take a minute).
Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Building the project
Run ng build to build the project. The build artifacts will be stored in the dist/ directory. Use the -prod flag for a production build.

Making requests to the backend API
For convenience, we have a live API server running at https://conduit.productionready.io/api for the application to make requests against. You can view the API spec here which contains all routes & responses for the server.

The source code for the backend server (available for Node, Rails and Django) can be found in the main RealWorld repo.

If you want to change the API URL to a local server, simply edit src/environments/environment.ts and change api_url to the local server's URL (i.e. localhost:3000/api)
