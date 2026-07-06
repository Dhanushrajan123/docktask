FROM node:20-alpine AS builder

WORKDIR /app

ADD package.json ./

RUN npm install

ADD . .

RUN npm run build

#----------------------------------------------------

FROM nginx:alpine AS final

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

