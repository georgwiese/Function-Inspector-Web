Clazz.load (null, "Test", ["Function"], function () {
c$ = Clazz.declareType (null, "Test");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var f =  new Function ("x^2");
System.out.println ("Hello World" + f.calculate (3));
}, "~A");
});
