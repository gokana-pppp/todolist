//todo の型を作る
type Todo = {
  id: number,
  contents: string,
  status: "作業中" | "完了",
}

//todoが集まる配列を作る
const todoList: Todo[] = [];

//Create:　todoをtodoListに入れていく.push
const createTodoList = (id: number ,contents: string ,status: "作業中" | "完了"): void => {
todoList.push({id, contents, status})
}         

const list = <HTMLTableElement> document.getElementById("memoList")!;
const addButton: HTMLElement = document.getElementById("addBtn")!;

//Read:　HTMLにtodoList[]を表示する
const displayTodoList = (): void => {

todoList.forEach ( todo => {

let row: HTMLTableRowElement = list.insertRow(-1)!;
let cellID: HTMLTableCellElement = row.insertCell(-1);
let cellContents: HTMLTableCellElement = row.insertCell(-1);
let cellStatus: HTMLTableCellElement = row.insertCell(-1);
let cellDelete: HTMLTableCellElement = row.insertCell(-1);

cellID.innerHTML = String(todo.id)
cellContents.innerHTML = todo.contents
cellStatus.innerHTML = '<button id=>作業中</button>'  
cellDelete.innerHTML = '<button id="delete">削除</button>' 
})}


//addBtnにclickイベントを追加する。

addButton.addEventListener('click', function() {

//１、新しいtodoを作る。
const date: Date = new Date();
const createdDate: number = date.getSeconds();
const text = <HTMLInputElement> document.getElementById("text")
const textmessage: string = text.value;
createTodoList(createdDate,textmessage,"作業中")

//２、もしmemolistに子要素があれば消す。
while(list.firstChild){
  list.removeChild<ChildNode>(list.firstChild);
}  

//３、todoList[]をHTMLに表示する。
displayTodoList()
})

//Update:　statusの変更 ”作業中”から”完了”　”完了”から”作業中”　→　HTMLのボタンのテキストも変更 → radioボタンで切り替えた時に　”作業中”か”完了”　で分けて表示する?

//Delete: todoList[]から指定したtodo{}を削除する → displayTodoList()でHTMLを更新