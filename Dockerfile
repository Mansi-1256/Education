FROM node:14

WORKDIR /project

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

#Command to build 'docker build -t your-image-name .'
#Command to run 'docker run -p 3000:3000 your-image-name'