# Posts Application Front-End

The application was built using [Angular 9](https://angular.io/) and [Angular Material](https://material.angular.io/). It is an Angular based front-end for a blog posts application. 

**The application front-end based on Angular was deployed on AWS S3, to access it, click [here](http://angular-posts.s3-website.eu-west-2.amazonaws.com/).**

To see the back-end of this application implemented with Node.js, see [here](https://github.com/gaetanBloch/nodejs-posts).

## Running Application Process on your computer

1. Download the application by Clicking [this link](https://github.com/gaetanBloch/angular-posts/archive/master.zip)
2. Unzip the application
3. Download and Install [node.js](https://nodejs.org/en/download/) 
4. Open a terminal
5. Make sure you have the latest version of the Angular CLI, if not:
    - Run `npm uninstall -g angular-cli @angular/cli`
    - Run `npm cache clean --force`
    - Run  `npm install -g @angular/cli`
6. Move to the root of the application
7. Run `npm install`
8. Run `ng serve`
9. Navigate to http://localhost:4200/ with your favourite browser

**Warning! You will get Errors if you are not running a back-end on http://localhost:8080 with the right REST API like [here](https://github.com/gaetanBloch/nodejs-posts).**

## Application

### Signup Page

![Signup Page](https://i.imgur.com/qvtCCDW.png)

### Login Page

![Login Page](https://i.imgur.com/k9GHnSP.png)

### Posts List

![Posts List](https://i.imgur.com/uJAw7dd.png)

### Posts List With Details

![Posts List details](https://i.imgur.com/VcdgiVA.png)

### Posts List With Pagination

![Posts List pagination](https://i.imgur.com/SEyIDAs.png)

### Posts Create

![Posts Create](https://i.imgur.com/GIXHJgO.png)

### Posts Edit

![Posts Edit](https://i.imgur.com/z3xYi8p.png)

### 404 NOT FOUND

![404 Not Found](https://i.imgur.com/msVXab6.png)
