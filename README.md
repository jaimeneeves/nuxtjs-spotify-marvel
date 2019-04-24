# Nuxt.js Spotify-Marvel

[![Build Status](https://travis-ci.org/dejaneves/nuxtjs-spotify-marvel.svg?branch=master)](https://travis-ci.org/dejaneves/nuxtjs-spotify-marvel)

> My dazzling Nuxt.js project

### Porque escolhi o Nuxt.js ?

Eu necessitava de um framework que me desse a flexibilidade para trabalhar nas duas layers (Front-End e Back-End). O Nuxt.js foi uma das muitas alternativas que encontrei para o meu propósito, eu o escolhi pela facilidade que o mesmo oferece na integração das duas camadas.

### Vue.js

O Vue.js veio como consequência, o client (Front-End) do Nuxt.js trabalha com ele, e que por sinal é uma excelente tecnologia para desenvolvimento Front-End.

### Library de Componentes Front-end

Para os componentes da aplicação foram usados o [Bootstrap](https://getbootstrap.com/) e [Bootstrap-vue](https://bootstrap-vue.js.org/).

### Cache

Para realizar o cache da aplicação foi usado o [REDIS](https://redis.io/download).

### DevOps

Foram usadas algumas ferramentas de DevOps como o [Travis.CI](https://travis-ci.org/) e o [Heroku](https://www.heroku.com/) plataforma Cloud onde roda a aplicação.

## Configurações

Arquivo `.env`

Caso você queira, pode configurar o arquivo `.env`.

``` bash
# SPOTIFY
SPOTIFY_CLIENT_ID=<SPOTIFY_CLIENT_ID>
SPOTIFY_CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET>
CLIENT_URL=<CLIENT_URL>
REDIS_URL=<REDIS_URL>

# MARVEL
MARVEL_BASEURL=<MARVEL_BASEURL>
MARVEL_KEY=<MARVEL_KEY>
MARVEL_HASH=<MARVEL_HASH>
```

| Key   | Descrição |
|----------|-------------|
| CLIENT_URL | **HOST** onde a aplicação está rodando |
| REDIS_URL | **HOST** servidor REDIS |

## Tabela de Tecnologias Usadas

| Tecnologia   | Descrição |
|----------|-------------|
| Nuxt.js | Isomorphic Framework |
| Vuejs | JavaScript Framework |
| Bootstrap-vue | Componentes Front-End |
| Bootstrap- | Componentes Front-End |
| Redis | Cache |
| Heroku | Cloud Platform |
| Travis.CI | Continuos Integration |

## Build Setup

``` bash

# project clone
$ git clone https://github.com/dejaneves/nuxtjs-spotify-marvel.git
$ cd nuxtjs-spotify-marvel.git

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
