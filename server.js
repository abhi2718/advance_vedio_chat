const express=require('express'),
      app=express(),
      path = require("path"),
      cors = require('cors'),
      port=process.env.PORT || 7070,
      server=require('http').createServer(app),
      { Server } = require("socket.io"),
      io = new Server(server,{
          cors:{
            orgin:"*",
            method:["GET","POST"],
            allowedHeaders:["my-custom-header"],
            credentials:true
          }
      });
      app.use(express.json());
      app.use(cors());
     app.use(express.static(path.resolve(__dirname, './build')));
      io.on('connection',socket=>{
        console.log('connected with socket.io',socket.id);
        socket.on('join-room',room=>{
          socket.join(room);
          console.log('you join to room',room);
        });
          socket.on('cut_call',payload=>{
            socket.to(payload.room).emit('cut_call',payload);
          });
          socket.on('toggle-video',payload=>{
            console.log('toggle video',payload);
            socket.to(payload.room).emit('toggle-video',payload);
          });
          socket.on('bring-student-on-home',payload=>{
            socket.to(payload.room).emit('bring-student-on-home',payload);
          })
          socket.on('bring-teacher-on-home',payload=>{
            socket.to(payload.room).emit('bring-teacher-on-home',payload);
          });
      });
      const fetch = require("node-fetch");
      app.get('/ratingTags',async(req,res)=>{
            try {
              const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
              const response = await fetch(
                "https://solvedudar.com/api-1-1/teacher/get_predefine_review",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `${token}`,
                  },
                }
              );
              const data = await response.json();
              if (data.status) {
                  res.status(200).json(data);
              }
              else{
                res.status(400).json({
                  success: false,
                })
              }
            }catch(e) {
              console.log(e);
            }
      });
      app.post('/duration',async(req,res)=>{
        try {
          const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
          const response = await fetch(
            "https://solvedudar.com/api-1-1/teacher/update_doubt_time",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `${token}`,
              },
              body: JSON.stringify(req.body),
            }
          );
          const data = await response.json();
          if (data.status) {
              res.status(200).json(data);
          }
          else{
            res.status(400).json({
              success: false,
            })
          }
        }catch(e) {
          console.log(e);
        }
    });
   app.post('/rating',async(req,res)=>{
      try {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
        const response = await fetch(
          "https://solvedudar.com/api-1-1/teacher/add_rating",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
            },
            body: JSON.stringify(req.body),
          }
        );
        const data = await response.json();
        if (data.status) {
            res.status(200).json(data);
        }else{
          res.status(400).json({
            success: false,
          })
        }
      }catch(e) {
        console.log(e);
      }
     });
     app.post('/validity',async(req,res)=>{
      try {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
        const response = await fetch(
          "https://solvedudar.com/api-1-1/student/get_room_walet_balance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
            },
            body: JSON.stringify(req.body),
          }
        );
        const data = await response.json();
        if (data.status) {
            res.status(200).json(data);
        }else{
          res.status(400).json({
            success: false,
           ...req.body,
           data
          })
        }
      }catch(e) {
        console.log(e);
      }
     });
      app.post('/cutunwantedcall',async (req,res)=>{
        try {
          const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
          const response = await fetch(
            "https://solvedudar.co.in/cutunwantedcall",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `${token}`,
              },
              body: JSON.stringify(req.body),
            }
          );
          const data = await response.json();
          if (data.status) {
              res.status(200).json(data);
          }else{
            res.status(400).json({
              success: false,
            })
          }
        }catch(e) {
          console.log(e);
        }
      });
      app.post('/callCut',async (req,res)=>{
        try {
          const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
          const response = await fetch(
            "https://solvedudar.com/api-1-1/student/update_isEngage_byRoom",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `${token}`,
              },
              body: JSON.stringify(req.body),
            }
          );
          const data = await response.json();
          if (data.status) {
            try {
              const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
              const response = await fetch(
                "https://solvedudar.co.in/cutunwantedcall",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `${token}`,
                  },
                  body: JSON.stringify({
                    roomId:req.body.room_id
                  }),
                }
              );
              const data = await response.json();
              if (data) {
                await fetch(
                  "https://solvedudar.com/api-1-1/student/update_student_leave_room",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: `${token}`,
                    },
                    body: JSON.stringify({
                      room_id:req.body.room_id
                    }),
                  }
                )
                  res.status(200).json({
                    ...data,
                    unwantedCallCut:true,
                  });
              }else{
                res.status(400).json({
                  success: false,
                })
              }
            }catch(e) {
              console.log(e);
            }
          }else{
            res.status(400).json({
              success: false,
              cut_call:false,
             data
            })
          }
        }catch(e) {
          console.log(e);
        }
      });
      app.post('/webpageloadstatus',async(req,res)=>{
        try {
          const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ0aW1lIjoxNjM3NzQ4NTU2fQ.Bm2OqrWoAyUMfhLkdjBMW2g_1s_1wydzECl-xPUmgeM';
          const response = await fetch(
            "https://solvedudar.com/api-1-1/student/update_webpage_load_status",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `${token}`,
              },
              body: JSON.stringify(req.body),
            }
          );
          const data = await response.json();
          if (data.status) {
              res.status(200).json(data);
          }else{
            res.status(400).json({
              success: false,
            })
          }
        }catch(e) {
          console.log(e);
        }
      });
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './build', 'index.html'));
      });
      server.listen(port,()=>{
          console.log(`servering on ${port}`);
      });
     // production build 26