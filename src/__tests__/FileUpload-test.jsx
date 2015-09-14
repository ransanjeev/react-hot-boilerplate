import React from "react/addons";
import FileUpload from "../FileUpload.jsx";
var expect = require('expect');
let {TestUtils}  = React.addons;

describe("testing File upload component", ()=>{
  it("should produce 1", ()=>{
    var component = TestUtils.renderIntoDocument(<FileUpload/>);

    var h1 = TestUtils.findRenderedDOMComponentWithTag(component, 'h1');
    expect(React.findDOMNode(h1).textContent).toEqual("Attach a file");
  });
});
