FROM node



# I think you're using gulp, right?

RUN npm install -g gulp-cli



# Create app directory

WORKDIR /usr/src/app



# copy over source

COPY . .



# Install app dependencies

RUN npm install



# I think you're using gulp right? If so, use gulp to build your code here.

RUN gulp build



# Expose the ports that you're app is using, so replace 300 with whatever port your server.js is actually using

EXPOSE 80

# run the app
ENTRYPOINT ["node", "./server.js"]
