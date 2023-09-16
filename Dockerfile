FROM node

WORKDIR /app

COPY . .
# COPY . /app

RUN npm install

EXPOSE 3000

CMD ["node", "server"]

# docker build . 
# docker images 
# docker run / docker run -d + id -> to run container
# docker ps -> to know container id
# docker stop + container id

# docker run -d -p 4000:3000 + image id -> to run on port 4000