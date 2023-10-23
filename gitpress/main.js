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
    var ulTag = range.commonAncestorContainer;
    
    console.log(sel.toString());
    console.log(range);
    console.log(range.cloneContents());
    
    if (ulTag.localName == "strong") {
      console.log("Remove boldness");
    } else {
      var newParent = document.createElement("strong");
      range.surroundContents(newParent);
    }
  }
}

// Add inline changes to slected text (bold, italic)
function edit_inline(editorId, nodeName) {
  // Get selection, chek if valid
  var selection = window.getSelection();
  if (selection.isCollapsed) return;
  var range = selection.getRangeAt(0);
  
  // Cheks if one or both ends of the range 
  const startContainerNode = isInside(editorId, range.startContainer , nodeName);
  const endContainerNode = isInside(editorId, range.endContainer , nodeName);

  
  if ( startContainerNode !== false || endContainerNode !== false ) {
    // both range container nodes are part of the same node
    if ( startContainerNode === endContainerNode ) {
      this.removeNode( startContainerNode );
    } else {
      // remove start container node
      if ( startContainerNode !== false ) {
        this.removeNode( startContainerNode );
      }
      // remove end container node
      if ( endContainerNode !== false ) {
        this.removeNode( endContainerNode );
      }
    }
  } else {
    // check if the selection fully contains a node of the same type
    // e.g. "Hello <strong>World</strong>!", if we would just surround the selection, the <strong>s would be nested like "<strong>Hello <strong>World</strong>!</strong>", which works, but isn't pretty, so we remove all nodes of the same type that are fully within the selection
    for ( let i = 0 ; i < range.commonAncestorContainer.childNodes.length ; ++i ) {
      if ( range.commonAncestorContainer.childNodes[i].nodeName === nodeName ) {
        this.removeNode( range.commonAncestorContainer.childNodes[i] );
      }
    }
    // Apply effect
    var newNode = document.createElement( nodeName );
    newNode.appendChild( range.extractContents() );
    range.insertNode( newNode );
  }
}

// Checks if a node with the name "nodeName" exists in "node"
function isInside(editorId, node , nodeName) {
  if ( node === document.getElementById(editorId) ) return false;
  if ( node === document.body ) return false;

  if ( node.parentElement.nodeName === nodeName ) {
    return node.parentElement;
  } else {
    return this.isInside(editorId, node.parentElement , nodeName );
  }
}

// Takes all children from node, places them before it, and then deletes node
function removeNode( node ) {
  let parent = node.parentElement;
  for ( let i = 0 ; i < parent.childNodes.length ; ++i ) {
    if ( parent.childNodes[i] === node ) {
      while ( node.childNodes.length > 0 ) {
        parent.insertBefore( node.firstChild , node );
      }
      parent.removeChild( node );
      return;
    }
  }
}