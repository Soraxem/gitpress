---
layout: none
---

function create_editor(content_id) {
  if (document.getElementById(content_id).getAttribute("contenteditable")) {
    document.getElementById(content_id).removeAttribute("contenteditable");
  } else {
    document.getElementById(content_id).setAttribute("contenteditable","true");
  }   
}

function edit_strong(content_id) {
  if (document.getElementById(content_id).getAttribute("contenteditable")) {
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    var newParent = document.createElement("strong");
    range.surroundContents(newParent);
    
    var ulTag = range.commonAncestorContainer;
  }
}