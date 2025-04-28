
import { Server } from "socket.io";



export function setUpSocketServer (httpServer){
      const io = new Server(httpServer,{
        cors:{
          origin:'*'
        }
      });

      io.on("connection", (socket) => {
        console.log(`User ${socket.id} connection established`);

        socket.on('createRoom', ({roomname, name}:{roomname:string,name:string})=>{
              socket.join(roomname);

              socket.emit('roomJoined',{roomname,name})
        })
      });
};








