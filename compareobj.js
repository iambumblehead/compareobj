// Filename: compareobj.js  
// Timestamp: 2013.04.12-08:32:48 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var CompareObj = module.exports = (function () {

  function getMembersUndefined (obj1, obj2, fn) {
    var isChildMissing = false, 
        membersUndefined,
        isMembersUndefined;

    for (var o in obj1) {
      if (obj1.hasOwnProperty(o)) {
        // if value is an empty string... 
        // we assume property, value is still valid.
        if (obj2[o] || typeof obj2[o] === 'string') {
          if (typeof obj1[o] === 'object') {
            membersUndefined = getMembersUndefined(obj1[o], obj2[o], fn);
            if (membersUndefined) {
              isMembersUndefined = true;
            }
          }
          
          if (isMembersUndefined) {
            if (typeof fn === 'function') fn({ child : o });
            return { child : o };
          }
        } else {
          if (typeof fn === 'function') fn({ all : o });
          return { all : o };
        }
      }
    }
    return null;
  }
  
  return {
    getMembersUndefined : getMembersUndefined
  };
    
}());