FROM node
WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 8081
CMD ["/bin/bash","/app/startup.sh"]