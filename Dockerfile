FROM node:18

RUN npm install -g npm@^9.3

WORKDIR /usr/src/app

RUN chown -R www-data:www-data .

# Copia el archivo de configuración del servidor de nginx
COPY nginx.conf /etc/nginx/nginx.conf.d

# Copia los archivos de configuración de la aplicación (por ejemplo, package.json)
COPY package*.json ./

# Instala nodemon y typescript globalmente
RUN npm install -g nodemon typescript
# Instala dependencias del proyecto
 RUN npm install
#CMD npm install || true
# RUN /bin/bash 'npm install'
# si no jala correr en bash container

# Copia el código fuente de la aplicación
# COPY . .
 RUN tsc || true
CMD ["nodemon", "dist/app.js"]
# docker compose up
# docker compose up --build 
# docker compose build --no-cache 
# docker compose down
# docker exec -it "container name" /bim/bash
#! CMD tsc --watch
#!Si no se crean dist y node modules, ejecutae en el contenedor  tsc && npm i
