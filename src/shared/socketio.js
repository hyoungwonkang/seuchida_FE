import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io.connect("https://seuchidabackend.shop", {
  auth: {
    auth: token,
  },
});

export const initSocketConnection = () => {
  if (socket || socket.connected === false) return;
  socket = io.connect("https://seuchidabackend.shop", {
    auth: {
      auth: token,
    },
  });
};

export const disconnectSocket = () => {
  if (socket == null) {
    return;
  }
  socket.disconnect();
  socket = undefined;
};
