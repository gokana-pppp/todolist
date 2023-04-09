//todo の型を作る
type Todo = {
    id: number,
    contents: string,
    status: "作業中" | "完了",
}

//todoが集まる配列を作る
let todoList: Todo[] = [];

//[Create]

//新しいtodo{}を作って、todoList[]に追加する　.push
const addTodo = (textmessage: string): void => {
  const date: Date = new Date();
  const createdDate: number = date.getTime(); //idは作成時間
  todoList.push({id: createdDate, contents: textmessage, status: "作業中"});
}         

const list = <HTMLTableElement> document.getElementById("memoList");
const addButton: HTMLElement = document.getElementById("addBtn")!;
const text = <HTMLInputElement> document.getElementById("text")

//[Read]　

//HTMLにtodoList[]を表示する
const displayTodoList = (todoList: Todo[]): void => {
  todoList.forEach ( todo => {

  let row: HTMLTableRowElement = list.insertRow(-1)!;
  let cellID: HTMLTableCellElement = row.insertCell(-1);
  let cellContents: HTMLTableCellElement = row.insertCell(-1);
  let cellStatus: HTMLTableCellElement = row.insertCell(-1);
  let cellDelete: HTMLTableCellElement = row.insertCell(-1);

  cellID.innerHTML = String(todo.id)
  cellContents.innerHTML = todo.contents
  cellStatus.innerHTML = '<button>作業中</button>'  
  cellDelete.innerHTML = `<button onclick="deleteTodo(${todo.id});resetTbody();displayTodoList(todoList);">削除</button>`
}) }

//<tbody></tbody>の子要素を無くす。
const resetTbody = (): void => {
  while(list.firstChild){
  list.removeChild<ChildNode>(list.firstChild);
}}

//input内を空にする。
const resetText = (): void => {
  text.value = '';
}

//addBtnにclickイベントを追加する。

addButton.addEventListener('click', function () {

  //１、input入力内容を取得し、新しいtodo{}を作成
  const textmessage: string = text.value;
  addTodo(textmessage);
  
  //２、tbody内の子要素があれば消す。
  resetTbody();

  //３、todoList[]をHTMLに表示する。
  displayTodoList(todoList);

  //４、新しいtodoを追加後、input内を空にする。
  resetText();
})

//[Update]　
//statusの変更 ”作業中”から”完了”　”完了”から”作業中”　→　HTMLのボタンのテキストも変更 → radioボタンで切り替えた時に　”作業中”か”完了”　で分けて表示する?

//[Delete] 

const deleteTodo = (id: number): void => {
  let result: Todo[] = todoList.filter((todo)=> todo.id !== id);
  todoList = result
}