//todo の型を作る
type Todo = {
    id: number,
    contents: string,
    status: "作業中" | "完了",
}

//todoが集まる配列を作る
const todoLists: Todo[] = [];

//Create:　todoをtodoListsに入れていく.push
const CreateTodoLists = (id: number ,contents: string ,status: "作業中" | "完了"): void => {
    todoLists.push({id, contents, status})
}         

const lists = <HTMLTableElement> document.getElementById("memoLists")!;
const addButton: HTMLElement = document.getElementById("addBtn")!;

//Read:　HTMLにtodoLists[]を表示する
//addBtnに３つのclickイベントを追加する。

addButton.addEventListener('click', function() {

  //１、新しいtodoを作る。
  const date: Date = new Date();
  const createdDate: number = date.getSeconds();
  const text = <HTMLInputElement> document.getElementById("text")
  const textmessage: string = text.value;
  CreateTodoLists(createdDate,textmessage,"作業中")

  //２、もしmemolistsに小要素があれば消す。
  while(lists.firstChild){
    lists.removeChild<ChildNode>(lists.firstChild);
  }  

  //３、todoLists[]をHTMLに表示する。
  todoLists.forEach (todo => {
  
    let row: HTMLTableRowElement = lists.insertRow(-1)!;
    let cellID: HTMLTableCellElement = row.insertCell(-1);
    let cellContents: HTMLTableCellElement = row.insertCell(-1);
    let cellStatus: HTMLTableCellElement = row.insertCell(-1);
    let cellDelete: HTMLTableCellElement = row.insertCell(-1);
  
    cellID.innerHTML = String(todo.id)
    cellContents.innerHTML = todo.contents
    cellStatus.innerHTML = '<button id=>作業中</button>'  
    cellDelete.innerHTML = '<button id="delete">削除</button>' 
});
})

//Update:　statusの変更 ”作業中”から”完了”　”完了”から”作業中”　→　HTMLのボタンのテキストも変更 → radioボタンで切り替えた時に　”作業中”か”完了”　で分けて表示する

//Delete: todoLists[]から指定したtodo{}を削除する → HTMLから削除する