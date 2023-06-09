//todo の型を作る
type Todo = {
  id: number;
  contents: string;
  status: '作業中' | '完了';
};

const WORK_ON_PROGRESS = '作業中';
const DONE = '完了';

//todoが集まる配列を作る
let todoList: Todo[] = [];

//[Create]

//新しいtodo{}を作って、todoList[]に追加する　.push
const addTodo = (textmessage: string): void => {
  const date: Date = new Date();
  const createdDate: number = date.getTime(); //idは作成時間
  todoList.push({ id: createdDate, contents: textmessage, status: WORK_ON_PROGRESS });
};

const list = <HTMLTableElement>document.getElementById('memoList');
const addButton: HTMLElement = document.getElementById('addBtn')!;
const text = <HTMLInputElement>document.getElementById('text');

//[Read]

//HTMLにtodoList[]を表示する
const displayTodoList = (todoList: Todo[]): void => {
  todoList.forEach((todo) => {
    const row: HTMLTableRowElement = list.insertRow(-1)!;
    const cellID: HTMLTableCellElement = row.insertCell(-1);
    const cellContents: HTMLTableCellElement = row.insertCell(-1);
    const cellStatus: HTMLTableCellElement = row.insertCell(-1);
    const cellDelete: HTMLTableCellElement = row.insertCell(-1);

    cellID.innerHTML = String(todo.id);
    cellContents.innerHTML = todo.contents;
    if (todo.status === WORK_ON_PROGRESS) {
      cellStatus.innerHTML = `<button style="font-family:Sawarabi Mincho" onclick="changeStatus(${todo.id});resetTbody();displayTodoList(todoList)">作業中</button>`;
    } else {
      cellStatus.innerHTML = `<button style="font-family:Sawarabi Mincho" onclick="changeStatus(${todo.id});resetTbody();displayTodoList(todoList)">完了</button>`;
    }
    cellDelete.innerHTML = `<button style="font-family:Sawarabi Mincho" onclick="deleteTodo(${todo.id});resetTbody();displayTodoList(todoList);">削除</button>`;
  });
};

//<tbody></tbody>の子要素を無くす。
const resetTbody = (): void => {
  while (list.firstChild) {
    list.removeChild<ChildNode>(list.firstChild);
  }
};

//input内を空にする。
const resetText = (): void => {
  text.value = '';
};

//addBtnにclickイベントを追加する。

addButton.addEventListener('click', function () {
  const textmessage: string = text.value;
  addTodo(textmessage);
  resetTbody();
  displayTodoList(todoList);
  resetText();
});

//[Update]

//statusの変更 ”作業中”から”完了”　”完了”から”作業中”　に変更。

const changeStatus = (id: number): void => {
  const target: Todo[] = todoList.filter((todo) => todo.id === id);
  if (target[0].status === WORK_ON_PROGRESS) {
    target[0].status = DONE;
  } else {
    target[0].status = WORK_ON_PROGRESS;
  }
};

//radioボタン　"すべて"を選択した時
const allStatusBtn: HTMLElement = document.getElementById('ALL_STATUS')!;

allStatusBtn.addEventListener('click', () => {
  resetTbody();
  displayTodoList(todoList);
});

//radioボタン　statusごとに分ける
const getTodoList = (status: string): Todo[] => {
  if (status === WORK_ON_PROGRESS) {
    const W_LIST: Todo[] = todoList.filter((todo) => todo.status === WORK_ON_PROGRESS);
    return W_LIST;
  } else {
    const D_LIST = todoList.filter((todo) => todo.status === DONE);
    return D_LIST;
  }
};

//radioボタン　"作業中"を選択した時
const WORK_ON_PROGRESS_BTN: HTMLElement = document.getElementById('WORK_ON_PROGRESS')!;

WORK_ON_PROGRESS_BTN.addEventListener('click', () => {
  resetTbody();
  const workOnProgressTodoList = getTodoList(WORK_ON_PROGRESS);
  displayTodoList(workOnProgressTodoList);
});

//radioボタン　"完了"を選択した時
const DONE_BTN: HTMLElement = document.getElementById('DONE')!;

DONE_BTN.addEventListener('click', () => {
  resetTbody();
  const DoneTodoList = getTodoList(DONE);
  displayTodoList(DoneTodoList);
});

//[Delete]

//todoを削除する。
const deleteTodo = (id: number): void => {
  const result: Todo[] = todoList.filter((todo) => todo.id !== id);
  todoList = result;
};
