var CompareObj = require('../compareobj');

describe("CompareObj.isSameMembersDefined", function () {
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

    result = CompareObj.isSameMembersDefined(obj1, obj2);

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

    result = CompareObj.isSameMembersDefined(obj1, obj2);

    expect( result ).toBe( false );
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

    result = CompareObj.isSameMembersDefined(obj1, obj2, function (propertyName, value) {
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

    result = CompareObj.isSameMembersDefined(obj1, obj2, function (propertyName, value) {
      if (propertyName === 'property') {
        expect( value ).toBe( 'prop2a1' );
        done();        
      }
    });
  });

});


describe("CompareObj.isSameMembersDefinedSame", function () {
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

    result = CompareObj.isSameMembersDefinedSame(obj1, obj2);

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

    result = CompareObj.isSameMembersDefinedSame(obj1, obj2);

    expect( result ).toBe( true );
  });
});