import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Trash2 } from "lucide-react";

const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }, []);

    function createTodo() {
        const content = window.prompt("Todo content");
        if (content) {
            client.models.Todo.create({ content });
        }
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    return (
        <main>
            <h1>CloudConf 2025</h1>
            <button onClick={createTodo}>Aggiungi</button>
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                        <span>{todo.content}</span>
                        <Trash2
                            style={{ cursor: "pointer" }}
                            size={18}
                            onClick={() => deleteTodo(todo.id)}
                        />
                    </li>
                ))}
            </ul>
            <div>
                <br />
            </div>
        </main>
    );
}

export default App;
