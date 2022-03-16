const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors");

const userRoute = require('./routes/user')

dotenv.config()

mongoose
.connect(process.env.DB_URL)
.then(() => console.log('db connection successful'))
.catch((err) => {
    console.log(err)
})

app.get('/user', () => {
    console.log('test success')
})

// API routes
app.post("/users", (req, res, next) => {
    res.send({
      message: "Welcome to TrueCadence",
      user_routes: {
        user_register: {
          method: "POST",
          route: "/users",
          request_body: {
            name: "String",
            email: "String",
            contact: "String",
            password: "String",
          },
          result: {
            jwt: "String token",
          },
        },
        user_login: {
          method: "POST",
          route: "/users",
          request_body: {
            email: "String",
            password: "String",
          },
          result: {
            jwt: "String token",
          },
        },
        all_users: {
          method: "GET",
          route: "/users",
          result: {
            users: "Array",
          },
        },
        single_user: {
          method: "GET",
          route: "/users/:id",
          result: {
            user: "Object",
          },
        },
        update_user: {
          method: "PUT",
          request_body: {
            name: "String",
            email: "String",
            contact: "String",
            password: "String",
            avatar: "String",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          route: "/users/:id",
          result: {
            user: "Object",
          },
        },
        delete_user: {
          method: "DELETE",
          route: "/users/:id",
          result: {
            message: "Object",
          },
        },
      },
      post_routes: {
        all_posts: {
          method: "GET",
          route: "/posts",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            posts: "Array",
          },
        },
        single_post: {
          method: "GET",
          route: "/posts/:id",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          result: {
            post: "Object",
          },
        },
        create_post: {
          method: "POST",
          route: "/posts/",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String",
            body: "String",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          result: {
            post: "Object",
          },
        },
        update_post: {
          method: "PUT",
          route: "/posts/:id",
          headers: {
            authorization: "Bearer (JWT token)",
          },
          request_body: {
            title: "String *optional*",
            body: "String *optional*",
            img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
          },
          result: {
            post: "Object",
          },
        },
        delete_post: {
          method: "DELETE",
          route: "/posts/:id",
          result: {
            message: "Object",
          },
        },
      },
    });
  });


app.use(express.json())

app.listen(process.env.PORT || 8900, () => {
console.log('Backend Server is running')
})
