const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const app = express();

const getCanvasAssignments = require("./canvas/utils");
const sentEmail = require("./resetPassword/utils");

app.use(bodyParser.json());

const googleCalendar = require("./google/utils");
const APS = require("./aps/utils")

app.use(
  "/api",
  graphqlHttp({
    schema: schema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

app.use("/google", (err, res, next) => {
  // const token = "2948~F5QurelFrTW4C9AyKJmihX5AyUp7Wrb0T5a51tXdZtdmr5i6Zva4EmLKEbnaa2aO"; // Greg
  const token = "2948~LagNvqsbqAGzlHBjIMoNaCUqQSHLRRsNkvIl8rohSOvQXNFRhumwwK4oyXS4xd5U"; // Blake
  const email = "bspencer16@apu.edu"

  Canvas.getCanvasAssignments(token).then(assignments => {
    googleCalendar.auth(email).then(client => {
      let calendar = googleCalendar.calendar(client);
  
      googleCalendar.getEvents(calendar).then(data => {
        let schedule = APS.createSchedule();
        APS.fillSchedule(schedule, data);
        let scheduledEvents = APS.scheduleEvents(schedule, assignments);
        for (event of scheduledEvents) {
          calendar.events.insert({
            calendarId: "primary",
            resource: event
          },
            function (err, event) {
              if (err) console.log(err);
              // if event
              // 	store event in user scheduledEvents
            }
          );
        }
  
          res.send(schedule);
        }).catch(err => {
          throw err;
        })
    });
  });
  
});

app.get("/canvas", (req, res) => {
  const token =
    "2948~lAYRABCVzi7Sm1DJf0knwM9cif2nCzBRiNVEPyJ6AuRQkdlLwTSPCYQV9UlzNMq0";

  getCanvasAssignments(token).then(data => {
    res.send(data);
  });
});

app.use("/forgetpassword", () => {
  sentEmail();
})

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000);
    console.log("Connected to DB Successfully");
  })
  .catch(err => {
    throw err;
  });
