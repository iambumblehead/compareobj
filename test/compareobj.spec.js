var CompareObj = require('../compareobj');


describe("CompareObj.isSameMembersDefinedArr", function () {
  var result, resultExpected;
  
  it("should return true if elements have the same deep properties", function () {
    var arr1 = ['1', '2'],
        arr2 = ['2', '1'];
    
    result = CompareObj.isSameMembersDefinedArr(arr1, arr2);
    
    expect( result ).toBe( true );
  });

  it("should return false if elements do not have the same deep properties", function () {
    var arr1 = ['1', '2'],
        arr2 = ['1', '4'];
    
    result = CompareObj.isSameMembersDefinedArr(arr1, arr2);
    
    expect( result ).toBe( false );
  });

});

describe("CompareObj.isSameMembersDefinedArrSame", function () {
  var result, resultExpected;
  
  it("should return true if elements have the same deep properties", function () {
    var arr1 = ['1', '2'],
        arr2 = ['1', '2'];
    
    result = CompareObj.isSameMembersDefinedArrSame(arr1, arr2);
    
    expect( result ).toBe( true );
  });

  it("should return false if elements do not have the same deep properties", function () {
    var arr1 = ['1', '2'],
        arr2 = ['2', '1'];
    
    result = CompareObj.isSameMembersDefinedArrSame(arr1, arr2);
    
    expect( result ).toBe( false );
  });

});


describe("CompareObj.isSameMembersDefinedObj", function () {
  var result, resultExpected;

  it("should return true if objects have the same deep properties", function () {
    var obj1 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }
    },

    obj2 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true        
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObj(obj1, obj2);

    expect( result ).toBe( true );
  });

  it("should return false if do not have the same deep properties", function () {
    var obj1 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }
    },

    obj2 = {
      prop1 : true,
      prop2 : {
        prop2a : {}
      }
    };

    result = CompareObj.isSameMembersDefinedObj(obj1, obj2);

    expect( result ).toBe( false );
  });

  it("should return true if shared property-names have definitions of `null`", function () {
    var obj1 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : null
        }
      }
    },

    obj2 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : null
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObj(obj1, obj2);

    expect( result ).toBe( true );
  });

  it("should return true if shared property-names have definitions of `undefined`", function () {
    var obj1 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : undefined
        }
      }
    },

    obj2 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : undefined
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObj(obj1, obj2);

    expect( result ).toBe( true );
  });


  it("should call a callback function for the first missing child property", function (done) {
    var obj1 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true,
          prop2a2 : true
        }
      }
    },

    obj2 = {
      prop1 : true,
      prop2 : {
        prop2a : {}
      }
    };

    result = CompareObj.isSameMembersDefinedObj(obj1, obj2, function (propertyName, value) {
      if (propertyName === 'child') {
        expect( value ).toBe( 'prop2' );
        done();        
      }
    });
  });

  it("should call a callback function for the first missing property", function (done) {
    var obj1 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true,
          prop2a2 : true
        }
      }
    },

    obj2 = {
      prop1 : true,
      prop2 : {
        prop2a : {}
      }
    };

    result = CompareObj.isSameMembersDefinedObj(obj1, obj2, function (propertyName, value) {
      if (propertyName === 'property') {
        expect( value ).toBe( 'prop2a1' );
        done();        
      }
    });
  });

});


describe("CompareObj.isSameMembersDefinedObjSame", function () {
  var result, resultExpected;

  it("should return true if objects have the same definition for the given properties", function () {
    var obj1 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }
    },

    obj2 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true        
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObjSame(obj1, obj2);

    expect( result ).toBe( true );
  });

  it("should return false if objects do not have the same definition for the given properties", function () {
    var obj1 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }
    },

    obj2 = {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : false        
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObjSame(obj1, obj2);

    expect( result ).toBe( true );
  });


  it("should return true if shared property-names have definitions of `null`", function () {
    var obj1 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : null
        }
      }
    },

    obj2 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : null
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObjSame(obj1, obj2);

    expect( result ).toBe( true );
  });

  it("should return true if shared property-names have definitions of `undefined`", function () {
    var obj1 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : undefined
        }
      }
    },

    obj2 = {
      prop1 : null,
      prop2 : {
        prop2a : {
          prop2a1 : undefined
        }
      }
    };

    result = CompareObj.isSameMembersDefinedObjSame(obj1, obj2);

    expect( result ).toBe( true );
  });

});
