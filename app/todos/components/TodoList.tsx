"use client";

type Todo = {
  id: number;
  title: string;
  status: string;
  comments:string[];
};

type Props = {
  todos: Todo[];
  handleDeleteTodo: (id: number) => void;
  handleOpenEditForm: (todo: Todo) => void;

  commentTextById: Record<number, string>;
  handleChangeCommentText: (todoId: number, value: string) => void;
  handleAddComment: (todoId: number) => void;
};

const TodoList = ({ todos, handleDeleteTodo, handleOpenEditForm ,commentTextById,
  handleChangeCommentText,
  handleAddComment,}: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: 16 }}>
          <div>
            <span>{todo.title}</span>{" "}
            <select value={todo.status} disabled>
              <option value="未着手">未着手</option>
              <option value="着手">着手</option>
              <option value="完了">完了</option>
            </select>{" "}
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
          </div>

          {/* コメント表示 */}
          {todo.comments.length > 0 && (
            <ul style={{ marginTop: 8, paddingLeft: 20 }}>
              {todo.comments.map((c, i) => (
                <li key={`${todo.id}-${i}`}>{c}</li>
              ))}
            </ul>
          )}

          {/* コメント追加 */}
          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              placeholder="コメントを書く"
              value={commentTextById[todo.id] ?? ""}
              onChange={(e) => handleChangeCommentText(todo.id, e.target.value)}
            />
            <button onClick={() => handleAddComment(todo.id)}>コメント追加</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
