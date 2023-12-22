// タスクを格納する配列
let todos = [];

// 「全てのタスク」「完了済みのタスク」「未完了のタスク」の数を更新する
const updateTasksCount = () => {
    const totalTasks = todos.length;                                    // 全てのタスク数
    const completedTasks = todos.filter(todo => todo.completed).length; // 完了済みのタスク数:完了状態のタスク（true）だけを取り出し、その数を返す
    const incompleteTasks = totalTasks - completedTasks;                // 未完了のタスク数

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('incompleteTasks').textContent = incompleteTasks;
};

// リストを表示する
const renderTodos = () => {
    // リストを空にする
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    // リストにタスクを追加
    todos.forEach((todo, index) => {
        const li = document.createElement('li');

        // 編集ボタンを先に追加
        const editBtn = document.createElement('button');
        editBtn.textContent = '編集';
        editBtn.style.marginRight = '10px';
        editBtn.style.padding = '4px 8px'; // ボタンのサイズを調整
        editBtn.addEventListener('click', () => {
            // 既存のテキストを取得
            const currentText = todo.text;
        
            // 編集用のinput要素を作成
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = currentText;
            editInput.style.padding = '4px';
            editInput.style.marginRight = '10px';
        
            // 保存ボタンを作成
            const saveBtn = document.createElement('button');
            saveBtn.textContent = '保存';
            saveBtn.style.padding = '4px 8px'; // ボタンのサイズを調整
            saveBtn.style.marginRight = '10px';
            saveBtn.addEventListener('click', () => {
                todos[index].text = editInput.value;
                renderTodos();
            });
        
            // li要素の内容をクリアして編集用の要素を追加
            li.innerHTML = '';
            li.appendChild(editInput);
            li.appendChild(saveBtn);
            li.appendChild(deleteBtn);  // 削除ボタンも追加
        });
        
        li.appendChild(editBtn);

        // 削除ボタンの追加
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.style.marginRight = '10px';
        deleteBtn.style.padding = '4px 8px'; // ボタンのサイズを調整
        deleteBtn.addEventListener('click', () => {
            // window.confirm:ポップアップで確認を取る
            const isConfirmed = window.confirm('本当によろしいですか？');
            if (isConfirmed) {
                todos.splice(index, 1); // spliceメソッドで配列から要素を削除
                renderTodos();          // リストを再表示
                updateTasksCount();     // タスク数を更新
            }
        });
        li.appendChild(deleteBtn);

        // チェックボックスの追加
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';            // inputタグのcheckboxを指定
        checkbox.checked = todo.completed;     // trueならチェックを入れ、falseならチェックを外す
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            updateTasksCount();
        });
        // チェックボックスをリストに追加
        li.appendChild(checkbox);
        // タスクテキストの追加
        li.appendChild(document.createTextNode(todo.text));
        // リスト項目（<li>）を全体のToDoリストに追加
        todoList.appendChild(li);
    });

    updateTasksCount();
};

// 入力されたテキストをリストに追加する
const addTodo = () => {
    // テキストボックスの値を取得
    const todoText = document.getElementById('todoInput').value;

    // テキストボックスの値が空でなければリストに追加
    if (todoText) {
        todos.push({ text: todoText, completed: false }); // pushメソッドを使用して、リストに新しいオブジェクトを追加:2つのプロパティ
        renderTodos();

        document.getElementById('todoInput').value = '';  // 入力フィールドを空にする
    }
};

// 初回表示時にリストを表示
renderTodos();
