const http = require('http')
const path = require('path')
const express = require('express')
const {Server} = require('socket.io')




const app = express()

const server = http.createServer(app)
const io = new Server(server)



app.use(express.static("./public"))


io.on('connection',(socket)=>{
    console.log('A user has connected',socket.id)
    io.emit('user-connect',socket.id)
    //io.emit('message',`New user Connected ID : ${socket.id} `)
    socket.on('user-message',(message)=>{
        console.log("New User Message",message)
        io.emit('message',{userID : socket.id , message : message})
    })
  
    socket.on('disconnect',()=>{
      console.log('user-disconnect',socket.id)
      io.emit('user-disconnect',socket.id)
    })
//     socket.on('location-ping',async(location)=>{
//         console.log("User Location",location.ip)

//         const apiUrl = `https://api.ipdata.co/${location.ip}/?api-key=48a78f21820b2a38882d29a9cb9ee29a45e06c87271a242a2316723a`;

//   try {
    
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

// //   console.log({userIP : location.ip ,city, country,postalCode,loc,timezone,host : data.hostName , dataService : data.netorg})
//   console.log({data})
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// });

       
    })
    



app.use('/',async(req,res)=>{
  res.send("OK") 
  // return res.sendFile('/test.html')
})
server.listen(5001,()=>{
    console.log('Server listening on port : 5001')
})