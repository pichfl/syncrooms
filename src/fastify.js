const fastify = require('fastify')({
  logger: false,
});

fastify.register(require('fastify-compress'), { global: true });
fastify.register(require('fastify-cors'), {
  origin: [
    'http://localhost:4200',
    ...(process.env.ORIGIN ? [process.env.ORIGIN] : []),
  ],
});

fastify.get('/', (request, reply) => {
  reply.send('Learn more: https://github.com/pichfl/syncrooms');
});

fastify.get('/rooms/:id', async (request, reply) => {
  const room = await fastify.store.getRoom(request.params.id);

  reply.send(room);
});

module.exports = fastify;
