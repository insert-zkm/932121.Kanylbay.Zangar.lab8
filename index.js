var template = document.querySelector('template');
var list = document.getElementById("list");
var showSaved = document.getElementById("showSaved");

var addButton = document.getElementById("addButton");
var saveButton = document.getElementById("saveButton");

function removeListItem(e) {
    e.target.closest('.list-item').remove();
}

function pushListItem() {
    var clone = template.content.cloneNode(true);
    var removeItemButton = clone.querySelector('.remove-item');
    var upButton = clone.querySelector('.up');
    var downButton = clone.querySelector('.down');
    removeItemButton && removeItemButton.addEventListener("click", removeListItem, {once: true});
    upButton && upButton.addEventListener("click", moveListItem(true));
    downButton && downButton.addEventListener("click", moveListItem(false));
    list.appendChild(clone);
}

function moveListItem(moveUp = false) {
    return function (e) {
        var currentListItem = e.target.closest('.list-item');

        var i = Array.prototype.indexOf.call(list.children, currentListItem);

        if(moveUp) {
            if(i > 0)
                list.children[i - 1].insertAdjacentElement('beforebegin', currentListItem);
            return;
        }

        if(i < list.children.length - 1) {
            console.log("duck")
            list.children[i + 1].insertAdjacentElement('afterend', currentListItem);
        }
    }
}

function saveList() {
    var data = {};
    var childs = list.children;
    var replacer = [];
    for(var i = 0, size = childs.length; i < size; i++) {
        data[childs[i].children[0].value] = childs[i].children[1].value;
        replacer.push(childs[i].children[0].value);
    }
    showSaved.innerHTML = JSON.stringify(data, replacer, 2);
}

if("content" in document.createElement("template")) {

}

addButton.addEventListener("click", pushListItem);
saveButton.addEventListener("click", saveList);