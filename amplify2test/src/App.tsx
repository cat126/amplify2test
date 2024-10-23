import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';




const client = generateClient<Schema>();

//start of code from aws rum
try {
    const config: AwsRumConfig = {
        sessionSampleRate: 0,
        endpoint: "https://dataplane.rum.us-east-2.amazonaws.com",
        telemetries: [],
        allowCookies: true,
        enableXRay: true
    };

    const APPLICATION_ID: string = 'fc48546e-3a63-4f2c-b32f-be574387f6a7';
    const APPLICATION_VERSION: string = '1.0.0';
    const APPLICATION_REGION: string = 'us-east-2';


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const awsRum: AwsRum = new AwsRum(
        APPLICATION_ID,
        APPLICATION_VERSION,
        APPLICATION_REGION,
        config
    );
} catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
}
//end of code from aws rum


function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
      client.models.Todo.create({ content: window.prompt("Todo content") });
      
    }
    const [session, setSession] = useState<AuthSession>();
    fetchAuthSession().then((aSession) => setSession(aSession));
   
    return (
        <Authenticator>
            {({ signOut }) => (
    <main>
      {session?.tokens?.accessToken.toString()}
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
                    <button onClick={signOut}>Sign out</button>
                </main>

            )}
        </Authenticator>
  );
}

export default App;
