FROM node:18
# RUN npm install -g npm@^9.3
WORKDIR /usr/src/app
RUN chown -R www-data:www-data .

# Copia el archivo de configuración del servidor de nginx
COPY nginx.conf /etc/nginx/nginx.conf.d
# Instala nodemon y typescript globalmente
RUN npm install -g npm@^9.3 nodemon typescript dotenv

# Copia los archivos de configuración de la aplicación (por ejemplo, package.json)
COPY package*.json ./
# Instala dependencias del proyecto
RUN npm install
# ENV NODE_PATH=node_modules
#CMD npm install || true
# RUN /bin/bash 'npm install'
# si no jala correr en bash container

# Copia el código fuente de la aplicación
# COPY . .
# CMD tsc
# Cambiar la propiedad después de la instalación y compilación
RUN chown -R www-data:www-data /usr/src/app

# CMD ["tsc","node"]
CMD ["node", "dist/app.js"]
# docker compose up
# docker compose up --build 
# docker compose build --no-cache 
# docker compose down
# docker exec -it "container name" /bim/bash
#! CMD tsc --watch
#!Si no se crean dist y node modules, ejecutae en el contenedor  tsc && npm i
#! Si no arranca, instalar y construir directamente con npm i y tsc , Luego se puede compose up