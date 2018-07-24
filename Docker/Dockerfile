FROM node
WORKDIR /app
ADD /src /app
RUN npm install
EXPOSE 80
ENV port 80
CMD ["npm", "start"]