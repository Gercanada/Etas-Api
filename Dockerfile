FROM ubuntu:22.04

ARG UID=1000
ARG GID=1000
# ARG WWWGROUP
ARG NODE_VERSION=18

WORKDIR /usr/src/app
ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


RUN apt-get update && \
    apt-get install -y curl software-properties-common supervisor && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

RUN npm install -g nodemon typescript dotenv

# Copiar archivos de configuración del proyecto
COPY package*.json /usr/src/app
COPY tsconfig.json /usr/src/app
RUN npm install

# Crear grupo y usuario
RUN groupadd --force  -g $GID user && \
     useradd -u $UID -g user -m user

# # RUN groupadd --force -g $WWWGROUP sail
# RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail

# RUN usermod -aG docker sail
# RUN newgrp docker
# Cambiar la propiedad del directorio de trabajo
# RUN chown -R user:user /usr/src/app
# RUN chown -R www-data:www-data /usr/src/app

# USER user

# COPY --chown=user:user package*.json ./
# COPY --chown=user:user tsconfig.json ./
EXPOSE 8000

COPY --chown=user:user ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY --chown=user:user ./docker/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

CMD ["docker/start-container"]
