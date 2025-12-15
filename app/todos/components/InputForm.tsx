"use client";

type Props = {
  todoTitle: string;
  setTodoTitle: (value: string) => void;
  handleAddTodo: () => void;
};

const InputForm = ({
  todoTitle,
  setTodoTitle,
  handleAddTodo,
}: Props) => {
  return (
    <>
      <input
        type="text"
        placeholder="タイトル"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button onClick={() => handleAddTodo()}>
        作成
      </button>
    </>
  );
};


export default InputForm;