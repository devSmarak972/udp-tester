const dgram = require('dgram');

const clientPort = 12345; // Change this to the desired UDP client port

const udpClient = dgram.createSocket('udp4');

udpClient.on('listening', () => {
  const address = udpClient.address();
  console.log(`UDP client listening on ${address.address}:${address.port}`);
});

udpClient.on('message', (message, remote) => {
  console.log(`Received UDP message from ${remote.address}:${remote.port}: ${message}`);
});

udpClient.on('error', (err) => {
  console.error(`UDP client error:\n${err.stack}`);
  udpClient.close();
});

udpClient.bind(clientPort);

process.on('SIGINT', () => {
  udpClient.close(() => {
    console.log('UDP client closed');
    process.exit();
  });
});
