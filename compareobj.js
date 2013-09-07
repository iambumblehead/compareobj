// Filename: compareobj.js  
// Timestamp: 2013.09.06-17:19:54 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  

var util = require('util'),
    isArray = util.isArray;

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

  // experimental -for now only performs shallow compare 
  function isSameMembersDefinedArr (arr1, arr2, fn) {
    for (var x = arr1.length; x--;) {
      if (arr2.indexOf(arr1[x]) === -1) {
        if (typeof fn === 'function') fn('element', arr1[x]);
        return false;
      }
      return true;
    }
  }

  // experimental -for now only performs shallow compare 
  function isSameMembersDefinedArrSame (arr1, arr2, fn) {
    for (var x = arr1.length; x--;) {
      if (arr2[x] !== arr1[x]) {
        if (typeof fn === 'function') fn('element', arr1[x]);
        return false;
      }
      return true;
    }
  }

  function isSameMembersDefinedObj (obj1, obj2, fn) {
    var isChildMissing = false, 
        membersUndefined,
        isMembersUndefined;

    for (var o in obj1) {
      if (obj1.hasOwnProperty(o)) {
        if (isSameType(obj1[o], obj2[o])) {
          if (typeof obj1[o] === 'object') {
            membersUndefined = isSameMembersDefinedObj(obj1[o], obj2[o], fn);
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


  function isSameMembersDefinedObjSame (obj1, obj2, fn) {
    var isChildMissing = false, 
        membersUndefined,
        isMembersUndefined;
        
    if (obj1) {
      for (var o in obj1) {
        if (obj1.hasOwnProperty(o)) {
          if (isSameType(obj1[o], obj2[o], 'object') || obj2[o] === obj1[o]) {
            if (typeof obj1[o] === 'object') {
              membersUndefined = isSameMembersDefinedObjSame(obj1[o], obj2[o], fn);
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
    } else if (obj1 === obj2) {
      return false;
    }
    return true;
  }


  function isSameMembersDefined (o1, o2, fn) {
    if (isArray(o1)) {
      return isSameMembersDefinedArr(o1, o2, fn);              
    } else if (typeof o1 === 'object') {
      return isSameMembersDefinedObj(o1, o2, fn);
    }
    return o1 === o2;
  }

  function isSameMembersDefinedSame (o1, o2, fn) {
    if (isArray(o1)) {
      return isSameMembersDefinedArrSame(o1, o2, fn);              
    } else if (typeof o1 === 'object') {
      return isSameMembersDefinedObjSame(o1, o2, fn);
    }
    return o1 === o2;
  }
  
  return {
    isSameType : isSameType,
    isSameMembersDefined : isSameMembersDefined,
    isSameMembersDefinedSame : isSameMembersDefinedSame,
    isSameMembersDefinedObj : isSameMembersDefinedObj,
    isSameMembersDefinedObjSame : isSameMembersDefinedObjSame,
    isSameMembersDefinedArr : isSameMembersDefinedArr,
    isSameMembersDefinedArrSame : isSameMembersDefinedArrSame
  };
    
}());
