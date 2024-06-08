'use strict';

const routes = require('./src/routes');
const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const path = require('path');
const Boom = require('@hapi/boom');
const connection = require('./db-config/connect');




const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 5001,
        routes: {
            cors: {
                origin: ['*'],
            }
        },
    });

    server.state('userSession', {
        ttl: 24 * 60 * 60 * 1000,
        encoding: 'base64json',
        isSecure: false,
        isHttpOnly: true,
        clearInvalid: false,
        strictHeader: true,
      });

    await server.register([{
        plugin: require("hapi-geo-locate"),
        options: {
            enabledByDefault: true
        }
    },
    {
        plugin: inert
    },
    {
        plugin: require('@hapi/vision')
    },
    {
        plugin: require('@hapi/cookie')
    },
]);

// Konfigurasi rendering view dengan handlebars (contoh)
server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'public', // Pastikan ini sesuai dengan struktur folder proyek Anda
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Tambahkan ini
        allowProtoMethodsByDefault: true     // Tambahkan ini
    }
  });




    server.route(routes);

    await server.start();
    console.log(`S
    erver started on: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();