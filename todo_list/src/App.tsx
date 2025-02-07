import React, { FC, useState } from "react";
import "./App.css";
import { Button, Space, Input, Typography } from "antd";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const { Title } = Typography;

const App: FC = () => {
  const [tasks, setTask] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addTask = () => {
    if (text.trim()) {
      setTask([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
    }
    console.log("clear");
    setText("");
  };

  const toggle = (id: number) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const remove = (id: number) => {
    setTask(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="container">
        <div>
          <Title level={2} className="title">
            Todo List
          </Title>
          <Space>
            <Input
              type="text"
              placeholder="Enter Task"
              onChange={handleInputChange}
            />
            <Button type="primary" onClick={addTask}>
              Add Task
            </Button>
          </Space>

          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <Space>
                  <Input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggle(task.id)}
                  />
                  <span
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={() => remove(task.id)}
                  >
                    Delete
                  </Button>
                </Space>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
