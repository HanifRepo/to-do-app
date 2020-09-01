function setup(){
    let itm_names = new Array();
    itm_names = JSON.parse(localStorage.getItem("item_names"));
    if(itm_names != null){
        for(let i=0;i < itm_names.length; i++){
            oldElement(itm_names[i]);
        }
    }
}

function newElement(){
    var inputValue = document.getElementById("myInput").value;
    document.getElementById("myInput").value="";
    if(inputValue != ""){
        var appending_list_item = document.createElement("ol");
        var whole_div_for_appending=document.createElement("div");
        var div_for_text = document.createElement("div");
        var to_do_text = document.createTextNode(inputValue);
        var unordered_list = document.getElementById("list");
        var delete_button = document.createElement("BUTTON")
        var delete_text = document.createTextNode("X");
        whole_div_for_appending.className="checkbox";
        div_for_text.addEventListener('click', function(ev) {
            if (ev.target.parentNode.parentNode.tagName === 'OL') {
              ev.target.parentNode.parentNode.classList.toggle('checked');
            }
          }, false);
        delete_button.onclick = function(){
            var remove = this.parentNode.parentNode;
            var do_name = this.parentNode.childNodes;
            var text_node=do_name[1].childNodes;
            var text_value=text_node[0].nodeValue;
            var timer=setTimeout(function(){permanent_delete(remove,text_value);},5000);
            undoElement(remove,timer);
        }
        delete_button.appendChild(delete_text);
        delete_button.className = "close";
        div_for_text.style.display = "inline";
        div_for_text.appendChild(to_do_text);
        whole_div_for_appending.appendChild(div_for_text);
        whole_div_for_appending.appendChild(delete_button);
        var itm_names = new Array();
        itm_names = JSON.parse(localStorage.getItem("item_names"));
        if(itm_names!=null){
            var hi=itm_names.includes(inputValue.trim());
            if(itm_names.includes(inputValue.trim())){
                alert("ALREADY IN TO-DO-LIST");
            }else{
                itm_names.push(inputValue.trim());
                localStorage.setItem("item_names",JSON.stringify(itm_names));
                appending_list_item.appendChild(whole_div_for_appending);
                unordered_list.appendChild(appending_list_item);
            }
        }else{
            itm_names = new Array();
            itm_names[0]=inputValue;
            localStorage.setItem("item_names",JSON.stringify(itm_names));
            appending_list_item.appendChild(whole_div_for_appending);
            unordered_list.appendChild(appending_list_item);
        }    
    }else{
        
        alert("Enter To-Do");
    }
    
}

function oldElement(itm_name){
    var appending_list_item = document.createElement("ol");
    var whole_div_for_appending=document.createElement("div");
    var div_for_text = document.createElement("div");
    var to_do_text = document.createTextNode(itm_name);
    var unordered_list = document.getElementById("list");
    var delete_button = document.createElement("BUTTON")
    var delete_text = document.createTextNode("X");
    whole_div_for_appending.className="checkbox";
    div_for_text.addEventListener('click', function(ev) {
        if (ev.target.parentNode.parentNode.tagName === 'OL') {
          ev.target.parentNode.parentNode.classList.toggle('checked');
        }
      }, false);
    delete_button.onclick = function(){
        var remove = this.parentNode.parentNode;
        var do_name = this.parentNode.childNodes;
        var text_node=do_name[1].childNodes;
        var text_value=text_node[0].nodeValue;
        var timer=setTimeout(function(){permanent_delete(remove,text_value);},5000);
        undoElement(remove,timer);
    }
    delete_button.appendChild(delete_text);
    delete_button.className = "close";
    div_for_text.style.display = "inline";
    div_for_text.appendChild(to_do_text);
    whole_div_for_appending.appendChild(div_for_text);
    whole_div_for_appending.appendChild(delete_button);
    appending_list_item.appendChild(whole_div_for_appending);
    unordered_list.appendChild(appending_list_item);
}

function undoElement(parent_remove,timer){
    
    var children= parent_remove.childNodes;
    var undo_button = document.createElement("BUTTON")
    var undo_text = document.createTextNode("UNDO");
    children[0].childNodes;
    children[0].style.display = "none";
    undo_button.onclick = function(){
        clearTimeout(timer);
        parent_remove.removeChild(undo_button);
        children[0].style.display = "block";
    }
    undo_button.className="close";
    undo_button.appendChild(undo_text);
    parent_remove.appendChild(undo_button);
}

function permanent_delete(remove,textvalue){
    remove.parentNode.removeChild(remove);
    var array = JSON.parse(localStorage.getItem("item_names"));
    array = array.filter(item => item !== textvalue);
    localStorage.setItem("item_names",JSON.stringify(array));
}
