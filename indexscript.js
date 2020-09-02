function setup(){
    var undo = document.getElementById("undo");
    if(undo == null){
        var node = document.getElementById("list");
        node.innerHTML = "";
        let itm_names = new Array();
        itm_names = JSON.parse(localStorage.getItem("item_names"));
        if(itm_names != null){
            for(let i=0;i < itm_names.length; i++){
                constructElementOld(itm_names[i]);
            }
        }
        items_yet_to_be_completed();
    }
}

var input = document.getElementById("inputText");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        constructElement(document.getElementById("inputText").value.trim()+":uncompleted");
        document.getElementById("inputText").value="";
    }
});

function constructElement(itm_names){
    var appending_list_item = document.createElement("ol");
    var check_box = document.createElement("input");
    var para = document.createElement("p");
    para.style.display="inline";
    var list_name = document.getElementById("list");
    var item = itm_names.split(":");
    check_box.setAttribute("type","checkbox");
    check_box.className="checkbox_align";
    if(item[1]=="completed"){
        check_box.checked = true; 
    }else{
        check_box.checked = false;
    }
    var to_do_text = document.createTextNode(item[0]);
    var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
    if(items_from_storage != null){
        if(items_from_storage.includes(itm_names.trim())){
            alert("ALREADY IN TO-DO-LIST");
        }else{
            items_from_storage.push(itm_names.trim());
            localStorage.setItem("item_names",JSON.stringify(items_from_storage));
            appending_list_item.appendChild(check_box);
            para.appendChild(to_do_text)
            appending_list_item.appendChild(para);
            list_name.appendChild(appending_list_item);
        }
    }else{
        items_from_storage = new Array();
        items_from_storage[0] = itm_names;
        localStorage.setItem("item_names",JSON.stringify(items_from_storage));
        appending_list_item.appendChild(check_box);
        para.appendChild(to_do_text)
        appending_list_item.appendChild(para);
        list_name.appendChild(appending_list_item);
    }
}

function constructElementOld(itm_names){
    var appending_list_item = document.createElement("ol");
    var para = document.createElement("p");
    para.style.display="inline";
    var check_box = document.createElement("input");
    var list_name = document.getElementById("list");
    var item = itm_names.split(":");
    check_box.setAttribute("type","checkbox");
    check_box.className="checkbox_align";
    check_box.name="checkbox";
    if(item[1]=="completed"){
        check_box.checked = true; 
    }else{
        check_box.checked = false;
    }
    var to_do_text = document.createTextNode(item[0]);
    para.appendChild(to_do_text)
    appending_list_item.appendChild(check_box);
    appending_list_item.appendChild(para);
    list_name.appendChild(appending_list_item);
}

function addCompleted(){
    var to_get_selected_item = document.getElementById("list");
    for(let i=0;i < to_get_selected_item.childNodes.length ; i++){
        var list_of_items = to_get_selected_item.childNodes[i];
        if(list_of_items.childNodes[0]){
            let check_box = list_of_items.childNodes[0];
            if(check_box.checked == true){
                var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
                var item_name_to_store = list_of_items.childNodes[1].textContent
                var index = items_from_storage.indexOf(item_name_to_store+":uncompleted");
                items_from_storage[index]= item_name_to_store+":completed";
                localStorage.setItem("item_names",JSON.stringify(items_from_storage));
            }
        }
    }
    items_yet_to_be_completed();
}

function deleteSelected(){
    var undo = document.getElementById("undo");
    if(undo == null){
        var to_get_selected_item = document.getElementById("list");
        var deleting_array = new Array();
        var lock=new Boolean(false);
        for(let i=0;i < to_get_selected_item.childNodes.length ; i++){
            var list_of_items = to_get_selected_item.childNodes[i];
            if(list_of_items.childNodes[0]){
                let check_box = list_of_items.childNodes[0];
                if(check_box.checked == true){
                    var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
                    var item_name_to_store = list_of_items.childNodes[1].textContent
                    var index = items_from_storage.indexOf(item_name_to_store+":completed");
                    if(index == -1){
                        lock=true;
                        deleting_array.push(list_of_items);
                        list_of_items.style.display= "none";
                    }
                }
            }
        }   
        if(lock == true){
            var timer=setTimeout(function(){permanent_delete(deleting_array);},5000);
            var delete_button = document.getElementById("delete");
            delete_button.parentNode.removeChild(delete_button);
            var button_holder  =  document.getElementById("button_holder");
            var undo_button = document.createElement("Button");
            undo_button.textContent="Undo"
            undo_button.id = "undo";
            undo_button.onclick = function(){
                clearTimeout(timer);
                undoElement(deleting_array);
            }
            button_holder.appendChild(undo_button);
        }
    }
}

function undoElement(deleting_array){
    for(let i=0;i < deleting_array.length; i++){
        deleting_array[i].style.display = "block";
    }
    var undo_button = document.getElementById("undo");
    var button_holder  =  document.getElementById("button_holder");
    var delete_button = document.createElement("Button");
    delete_button.textContent="Delete"
    delete_button.id = "delete";
    delete_button.onclick = function(){
        deleteSelected();
    }
    undo_button.parentNode.removeChild(undo_button);
    button_holder.appendChild(delete_button);
}

function permanent_delete(deleting_array){
    var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
    for(let i=0 ; i < deleting_array.length; i++){
        var text = deleting_array[i].childNodes[1].textContent + ":uncompleted";
        var index = items_from_storage.indexOf(text);
        items_from_storage.splice(index,1);
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    var undo_button = document.getElementById("undo");
    var button_holder  =  document.getElementById("button_holder");
    var delete_button = document.createElement("Button");
    delete_button.textContent="Delete"
    delete_button.id = "delete";
    delete_button.onclick = function(){
        deleteSelected();
    }
    undo_button.parentNode.removeChild(undo_button);
    button_holder.appendChild(delete_button);
    items_yet_to_be_completed();
    setup();
}

function activeList(){
    var undo = document.getElementById("undo");
    if(undo == null){
        var node = document.getElementById("list");
        node.innerHTML = "";
        let itm_names = new Array();
        itm_names = JSON.parse(localStorage.getItem("item_names"));
        if(itm_names != null){
            for(let i=0;i < itm_names.length; i++){
                var to_check = itm_names[i].split(":");
                if(to_check[1] === "uncompleted"){
                    constructElementOld(itm_names[i]);
                }
            }
        }
        items_yet_to_be_completed();
    }
}

function passiveList(){
    var undo = document.getElementById("undo");
    if(undo == null){
        var node = document.getElementById("list");
        node.innerHTML = "";
        let itm_names = new Array();
        itm_names = JSON.parse(localStorage.getItem("item_names"));
        if(itm_names != null){
            for(let i=0;i < itm_names.length; i++){
                var to_check = itm_names[i].split(":");
                if(to_check[1] === "completed"){
                    constructElementOld(itm_names[i]);
                }
            }
        }
        items_yet_to_be_completed();
    }
}

function clearCompleted(){
    var undo = document.getElementById("undo");
    if(undo == null){
        var to_get_selected_item = document.getElementById("list");
        var deleting_array = new Array();
        var lock=new Boolean(false);
        for(let i=0;i < to_get_selected_item.childNodes.length ; i++){
            var list_of_items = to_get_selected_item.childNodes[i];
            if(list_of_items.childNodes[0]){
                let check_box = list_of_items.childNodes[0];
                if(check_box.checked == true){
                    var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
                    var item_name_to_store = list_of_items.childNodes[1].textContent
                    var index = items_from_storage.indexOf(item_name_to_store+":uncompleted");
                    if(index == -1){
                        lock=true;
                        deleting_array.push(list_of_items);
                        list_of_items.style.display= "none";
                    }
                }
            }
        }
        if(lock == true){
            var timer=setTimeout(function(){permanent_delete_completed(deleting_array);},5000);
            var delete_button = document.getElementById("clear");
            delete_button.parentNode.removeChild(delete_button);
            var button_holder  =  document.getElementById("button_holder");
            var undo_button = document.createElement("Button");
            undo_button.textContent="Undo"
            undo_button.id = "undo";
            undo_button.onclick = function(){
                clearTimeout(timer);
                undoElement_completed(deleting_array);
            }
            button_holder.appendChild(undo_button);
        }
    }
}

function undoElement_completed(deleting_array){
    for(let i=0;i < deleting_array.length; i++){
        deleting_array[i].style.display = "block";
    }
    var undo_button = document.getElementById("undo");
    var button_holder  =  document.getElementById("button_holder");
    var delete_button = document.createElement("Button");
    delete_button.textContent="Clear"
    delete_button.id = "clear";
    delete_button.onclick = function(){
        clearCompleted();
    }
    undo_button.parentNode.removeChild(undo_button);
    button_holder.appendChild(delete_button);
}

function permanent_delete_completed(deleting_array){
    var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
    for(let i=0 ; i < deleting_array.length; i++){
        var text = deleting_array[i].childNodes[1].textContent + ":completed";
        var index = items_from_storage.indexOf(text);
        items_from_storage.splice(index,1);
    }
    localStorage.setItem("item_names",JSON.stringify(items_from_storage));
    var undo_button = document.getElementById("undo");
    var button_holder  =  document.getElementById("button_holder");
    var delete_button = document.createElement("Button");
    delete_button.textContent="Clear"
    delete_button.id = "clear";
    delete_button.onclick = function(){
        clearCompleted();
    }
    undo_button.parentNode.removeChild(undo_button);
    button_holder.appendChild(delete_button);
    items_yet_to_be_completed();
    setup();
}

function items_yet_to_be_completed(){
    var items_from_storage = JSON.parse(localStorage.getItem("item_names"));
    var count = 0 ;
    for(let i=0 ; i < items_from_storage.length ; i++){
        if(items_from_storage[i].includes("uncompleted") == true){
            count += 1 ;
        }
    }
    var number_of_items = document.getElementById("items_remaining");
    if(count != 1){
        number_of_items.textContent = count + " items left";
    }else{
        number_of_items.textContent = count + " item left";
    }
}