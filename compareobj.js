// Filename: compareobj.js  
// Timestamp: 2013.04.13-19:22:34 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var CompareObj = module.exports = (function () {

  function isSameType (obj1, obj2, optType) {
    var isSame = false;

    if (optType && 
        typeof obj1 === optType && 
        typeof obj1 === typeof obj2) {
      isSame = true;
    } else if (typeof obj1 === typeof obj2) {
      isSame = true;
    }
    return isSame;
  }

  function isSameMembersDefined (obj1, obj2, fn) {
    var isChildMissing = false, 
        membersUndefined,
        isMembersUndefined;

    for (var o in obj1) {
      if (obj1.hasOwnProperty(o)) {
        if (isSameType(obj1[o], obj2[o])) {
          if (typeof obj1[o] === 'object') {
            membersUndefined = isSameMembersDefined(obj1[o], obj2[o], fn);
            if (membersUndefined) {
              if (typeof fn === 'function') fn('child', o);
              return false;
            }
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
        if (isSameType(obj1[o], obj2[o], 'object') || obj2[o] === obj1[o]) {
          if (typeof obj1[o] === 'object') {
            membersUndefined = isSameMembersDefinedSame(obj1[o], obj2[o], fn);
            if (membersUndefined) {
              if (typeof fn === 'function') fn('child', o);
              return false;
            }
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
    isSameType : isSameType,
    isSameMembersDefined : isSameMembersDefined,
    isSameMembersDefinedSame : isSameMembersDefinedSame
  };
    
}());