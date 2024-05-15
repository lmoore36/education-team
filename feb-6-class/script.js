function whatToDo() {
    let userText = document.getElementById("myTextInput").value;
    console.log(userText);


}

document.getElementById("additem").addEventListener("click", whatToDo);
