#include <iostream>
#include <cstring>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>  // Include this for close function

const int PORT = 1234;
const char* SERVER_IP = "192.168.0.188"; // Change this to the IP address of your server

int main() {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (sockfd == -1) {
        std::cerr << "Error creating socket" << std::endl;
        return -1;
    }

    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(PORT);
    inet_pton(AF_INET, SERVER_IP, &(serverAddr.sin_addr));

    if (bind(sockfd, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) == -1) {
        std::cerr << "Error binding socket" << std::endl;
        close(sockfd);
        return -1;
    }

    while (true) {
        char buffer[1024];
        sockaddr_in clientAddr;
        socklen_t clientAddrLen = sizeof(clientAddr);
        std::cout<<"here"<<std::endl;
        ssize_t bytesRead = recvfrom(sockfd, buffer, sizeof(buffer), 0,
                                     (struct sockaddr*)&clientAddr, &clientAddrLen);
        if (bytesRead == -1) {
            std::cerr << "Error receiving data" << std::endl;
            continue;
        }

        std::cout << "Received data from " << inet_ntoa(clientAddr.sin_addr)
                  << ":" << ntohs(clientAddr.sin_port) << ": " << buffer << std::endl;

        // Process your data and send a response if needed

        // For example, sending a response back
        const char* response = "Received your message";
        sendto(sockfd, response, strlen(response), 0,
               (struct sockaddr*)&clientAddr, sizeof(clientAddr));
    }

    close(sockfd);
    return 0;
}
