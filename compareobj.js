// Filename: compareobj.js  
// Timestamp: 2013.04.12-23:30:39 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var CompareObj = module.exports = (function () {

  function isSameMembersDefined (obj1, obj2, fn) {
    var isChildMissing = false, 
        membersUndefined,
        isMembersUndefined;

    for (var o in obj1) {
      if (obj1.hasOwnProperty(o)) {
        // if value is an empty string... 
        // we assume property, value is still valid.
        if (obj2[o] || typeof obj2[o] === 'string') {
          if (typeof obj1[o] === 'object') {
            membersUndefined = isSameMembersDefined(obj1[o], obj2[o], fn);
            if (membersUndefined) {
              isMembersUndefined = true;
            }
          }
          
          if (isMembersUndefined) {
            if (typeof fn === 'function') fn('child', o);
            return false;
          }
        } else {
          if (typeof fn === 'function') fn('property', o);
          return false;
        }
      }
    }
    return true;
  }


  function isSameMembersDefinedSame (obj1, obj2, fn) {
    var isChildMissing = false, 
        membersUndefined,
        isMembersUndefined;

    for (var o in obj1) {
      if (obj1.hasOwnProperty(o)) {
        // if value is an empty string... 
        // we assume property, value is still valid.
        if (obj2[o] === obj1[o]) {
          if (typeof obj1[o] === 'object') {
            membersUndefined = isSameMembersDefinedSame(obj1[o], obj2[o], fn);
            if (membersUndefined) {
              isMembersUndefined = true;
            }
          }
          
          if (isMembersUndefined) {
            if (typeof fn === 'function') fn('child', o);
            return false;
          }
        } else {
          if (typeof fn === 'function') fn('property', o);
          return false;
        }
      }
    }
    return true;
  }
  
  return {
    isSameMembersDefined : isSameMembersDefined,
    isSameMembersDefinedSame : isSameMembersDefinedSame
  };
    
}());