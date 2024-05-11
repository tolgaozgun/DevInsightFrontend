# pull official base image
FROM node

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /frontend
# COPY package-lock.json /frontend
RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . /frontend

EXPOSE 5173

# start app
CMD ["npm", "run", "dev"]