compareobj
==========
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

compareobj is a script for comparing javascript objects. To my
knowledge, it is most useful for writing unit tests and for comparing static json files that would used for web applications.

[0]: http://www.bumblehead.com                            "bumblehead"



---------------------------------------------------------
#### <a id="install"></a>INSTALL:

compareobj may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install compareobj
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/compareobj.git
 ```


---------------------------------------------------------
#### <a id="test"></a>TEST:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```


---------------------------------------------------------

#### <a id=usage">USAGE:

compare two objects to see if they have definition for
the same members

 > ```javascript
   var CompareObj = require('../compareobj');
   CompareObj.isSameMembersDefined({
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }   
   }, {
      prop1 : true,
      prop2 : {
        prop2a : {}
      }   
   }); // false
   ```
   
 > ```javascript
   var CompareObj = require('../compareobj');
   CompareObj.isSameMembersDefined({
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }   
   }, {
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true
        }
      }   
   }); // true
   ```  

isSameMembers will also accept a callback

 > ```javascript
   var CompareObj = require('../compareobj');
   CompareObj.isSameMembersDefined({
      prop1 : true,
      prop2 : {
        prop2a : {
          prop2a1 : true,
          prop2a2 : true
        }
      }   
   }, {
      prop1 : true,
      prop2 : {
        prop2a : {}
      }   
   }, function (type, propertyName) {
     console.log(type, propertyName);
   });
   // child prop2
   // property prop2a2
   ```   


---------------------------------------------------------

#### <a id="license">License:

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
