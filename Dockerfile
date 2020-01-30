FROM node:6
WORKDIR /app
COPY . ./
RUN npm rebuild node-sass
RUN npm install
EXPOSE 8080
RUN npm run build
CMD ["npm","run", "dev"]
