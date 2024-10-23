import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { AuthSession, fetchAuthSession } from 'aws-amplify/auth';



const client = generateClient<Schema>();

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
