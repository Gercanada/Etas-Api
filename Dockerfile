# Usar una imagen base de Ubuntu
FROM ubuntu:latest

# Definir el directorio de trabajo
WORKDIR /usr/src/app

# Instalar Node.js, npm y supervisor
RUN apt-get update && \
    apt-get install -y curl software-properties-common supervisor && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Instalar nodemon y typescript globalmente
RUN npm install -g nodemon typescript

# Copiar archivos de configuración del proyecto
COPY package*.json /usr/src/app
COPY tsconfig.json /usr/src/app

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
# COPY . .

# Dar permiso al usuario www-data
RUN chown -R www-data:www-data /usr/src/app
# Cambiar al usuario 'node'
# USER www-data
# RUN groupadd --force -g $WWWGROUP node
# RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 node
# RUN usermod -aG docker node
# RUN newgrp docker

# Exponer el puerto (ajustar según sea necesario)
EXPOSE 8000

# Copiar la configuración de Supervisor
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Usar el script de inicio personalizado
COPY ./docker/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# Iniciar con el script de inicio
CMD ["/usr/local/bin/start-container"]


# # docker build -t mi-app-node .
# # docker run -p 3000:3000 mi-app-node
# chown -R www-data:www-data /usr/src/app