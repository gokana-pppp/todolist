const lists = <HTMLTableElement> document.getElementById("memoLists")!;
const addButton:HTMLElement = document.getElementById("addBtn")!;

const addMemo = ( ): void => {
    const textMessage = <HTMLInputElement> document.getElementById("text");
    //inputに入力された文字をnewMemoに定義する
    const newMemo: string = textMessage.value;
    
    //table内に行を追加する
    let row:any = lists.insertRow(-1);
    //追加された行の中に4つのcellを作成する
    let cell1:any = row.insertCell(-1);
    cell1.id = "CELL1" //cell1はcssで管理するのでidをつけておく
    let cell2:any = row.insertCell(-1);
    let cell3:any = row.insertCell(-1);
    let cell4:any = row.insertCell(-1);

    cell2.innerHTML = newMemo;
    cell3.innerHTML = '<button id="status">作業中</button>'  
    cell4.innerHTML = '<button id="delete">削除</button>'
    
}

addButton.addEventListener('click', addMemo);