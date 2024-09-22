import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
        .authorization((allow) => [allow.publicApiKey()]),

    PlayerEvent: a.model({
        itemID: a.string().required(),
        time: a.integer().required(),
        EventID: a.string().required(),
        type: a.string().required(), 
        PlayerName: a.string().required(),
        playerCount: a.integer().required(),
        worldID: a.string().required(),
        instanceID: a.integer().required(),
        GroupAccessType: a.string().required(),
        region: a.string().required(),
        roomName: a.string().required(), 
        logFrom: a.string().required()

    }).identifier(["itemID"]).authorization(allow => [allow.authenticated()]),
    EventReport: a.model(
        {
            eventID: a.string().required(), 
            worldID: a.string().required(),
            worldName: a.string().required(),
            instanceID: a.integer().required(),
            region: a.string().required(),
            peekPlayers: a.integer().required(),
            totalPlayers: a.integer().required(),
            firstTimers: a.integer().required(),
            firstlog: a.integer().required(),
            lastlog: a.integer().required(),
            attendaceLog: a.hasMany("AttendaceLog", "itemID"),
            firstTimeNames: a.string().array()
        }).identifier(["eventID"]).authorization(allow => [allow.authenticated()]),
    AttendaceLog: a.model(
        {
            itemID: a.string().required(),
            name: a.string().required(),
            time: a.integer().required(),
            joined: a.boolean().required(),
            playerCount: a.integer().required(),
            //EventReport: a.belongsTo("EventReport", "eventID"),
        }).identifier(["itemID"]).authorization(allow => [allow.authenticated()]),
    PlayerReport: a.model(
        {
            name: a.string().required(), 
            fristSeen: a.integer().required(),
            lastSeen: a.integer().required(),
            eventsJoined: a.integer().required(),
            firstEventID: a.string().required(),
            eventsAttended: a.hasMany("EventReport", "eventID"),
        }
    ).identifier(["name"]).authorization(allow => [allow.authenticated()]),
    WorldReport: a.model(
        {
            worldID: a.string().required(),
            worldName: a.string().required(),
            firstused: a.integer().required(),
            lastused: a.integer().required(),
            timesused: a.integer().required(),
            eventsUsedIn: a.hasMany("EventReport", "eventID"),
        }
    ).identifier(["worldID"]).authorization(allow => [allow.authenticated()]),
    GlobalStatistics: a.model(
        {
            id: a.integer().required(),
            totalPlayerCount: a.integer().required(),
            eventCount: a.integer().required(),
            mapCount: a.integer().required(),
            oneTimePlayers: a.integer().required(),
            q1EventAttendance: a.integer().required(),
            MeanEventAttendance: a.integer().required(),
            q3EventAttendance: a.integer().required(),
            averageEventAttendance: a.integer().required(),
            lastProssesTime: a.integer().required(),
        }
    ).identifier(["id"]).authorization(allow => [allow.authenticated()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
