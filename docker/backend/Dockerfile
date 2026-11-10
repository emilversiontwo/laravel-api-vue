FROM php:8.5-fpm-bookworm

ARG UID=1000
ARG GID=1000

WORKDIR /var/www/app

COPY --from=ghcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        unzip \
    && rm -rf /var/lib/apt/lists/* \
    && install-php-extensions \
        bcmath \
        exif \
        gd \
        intl \
        mongodb \
        opcache \
        pcntl \
        zip \
    && groupadd -g ${GID} app \
    && useradd -u ${UID} -g app -m app \
    && chown app:app /var/www/app

USER app

EXPOSE 9000
