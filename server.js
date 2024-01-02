const http = require('http');
const dgram = require('dgram');

const httpServer = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Extract information from the HTTP request
    const clientAddress = "0.0.0.0";
    const clientPort = 12345; // Change this to the desired UDP client port

    // Determine the route based on the request URL
    const route = req.url.toUpperCase();
    console.log(clientAddress,clientPort,route);

    // Send different UDP packets based on the route
    switch (route) {
      case '/SFWD':
        console.log("fwd")
        sendUDPMessage(clientAddress, clientPort, '1,1,12,15');
        break;
      case '/SBCK':
        sendUDPMessage(clientAddress, clientPort, '0,0,12,15');
        break;
      case '/SLFT':
        sendUDPMessage(clientAddress, clientPort, '1,0,5,5');
        break;
      case '/SRGT':
        sendUDPMessage(clientAddress, clientPort, '0,1,5,5');
        break;
      case '/SLB':
        sendUDPMessage(clientAddress, clientPort, '1,1,2,2');
        break;
      case '/SRF':
        sendUDPMessage(clientAddress, clientPort, '0,1,50,5');
        break;
      case '/SRB':
        sendUDPMessage(clientAddress, clientPort, '1,0,5,51');
        break;
      case '/CLK':
        sendUDPMessage(clientAddress, clientPort, '1,0,12,12');
        break;
      case '/ACLK':
        sendUDPMessage(clientAddress, clientPort, '1,23,2,1');
        break;
      case '/STOP':
        
        sendUDPMessage(clientAddress, clientPort, '0,0,0,0');
        break;
    //   default:
    //     sendUDPMessage(clientAddress, clientPort, 'Unknown route');
    //     break;
    }

    // Respond to the HTTP request
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('HTTP request received and UDP message sent.\n');
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed\n');
  }
});

const httpPort = 3000; // Change this to the desired HTTP server port
const serverIpAddress = "0.0.0.0"; // Change this to the desired HTTP server address
httpServer.listen(httpPort, serverIpAddress, () => {
    console.log(`HTTP server listening on ${serverIpAddress}:${httpPort}`);
  });

function sendUDPMessage(address, port, message) {
  const udpClient = dgram.createSocket('udp4');
  console.log(port," udp call ",address);
  udpClient.send(message, port, address, (err) => {
    if (err) {
      console.error(`Error sending UDP message: ${err}`);
    }
    udpClient.close();
  });
}
