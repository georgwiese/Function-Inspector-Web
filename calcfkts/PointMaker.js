Clazz.load (null, "PointMaker", ["Function", "Point", "java.lang.Double", "java.util.ArrayList"], function () {
c$ = Clazz.declareType (null, "PointMaker");
c$.getExtrema = Clazz.defineMethod (c$, "getExtrema", 
function (f, discontinuities, startX, endX, precision) {
var x = startX;
var lastY = f.calculate (x - precision);
var y = f.calculate (x);
var higher = y > lastY;
var result =  new java.util.ArrayList ();
while (x <= endX) {
for (var d, $d = discontinuities.iterator (); $d.hasNext () && ((d = $d.next ()) || true);) {
if ((x - precision) < d && (x) > d) {
x += precision;
lastY = y;
y = f.calculate (x);
higher = y > lastY;
break;
}}
if (y > lastY != higher) {
var x1 = x - 2 * precision;
var x2 = x;
var m = (x1 + x2) / 2;
for (var i = 0; i < 16; i++) {
if (f.calculate ((m + x1) / 2) > f.calculate ((x2 + m) / 2) != higher) x1 = m;
 else x2 = m;
m = (x1 + x2) / 2;
}
if (!Double.isNaN (f.calculate (m))) result.add ( new Point (m, f.calculate (m), 1));
}higher = y > lastY;
x += precision;
lastY = y;
y = f.calculate (x);
}
return result;
}, "Function,java.util.ArrayList,~N,~N,~N");
c$.getInflectionPoints = Clazz.defineMethod (c$, "getInflectionPoints", 
function (f, discontinuities, startX, endX, precision) {
var x = startX;
var lastY = f.slope (x - precision);
var y = f.slope (x);
var higher = y > lastY;
var result =  new java.util.ArrayList ();
while (x <= endX) {
for (var d, $d = discontinuities.iterator (); $d.hasNext () && ((d = $d.next ()) || true);) {
if ((x - precision) < d && (x) > d) {
x += precision;
lastY = y;
y = f.slope (x);
higher = y > lastY;
break;
}}
if ( new Boolean (y > lastY != higher & Math.abs (y - lastY) > 0.0001).valueOf ()) {
var x1 = x - 2 * precision;
var x2 = x;
var m = (x1 + x2) / 2;
for (var i = 0; i < 16; i++) {
if (f.slope ((m + x1) / 2) > f.slope ((x2 + m) / 2) != higher) x1 = m;
 else x2 = m;
m = (x1 + x2) / 2;
}
if (!Double.isNaN (f.calculate (m))) result.add ( new Point (m, f.calculate (m), 4));
}higher = y > lastY;
x += precision;
lastY = y;
y = f.slope (x);
}
return result;
}, "Function,java.util.ArrayList,~N,~N,~N");
c$.getRoots = Clazz.defineMethod (c$, "getRoots", 
function (f, extrema, discontinuities, startX, endX, precision) {
var x = startX;
var y = f.calculate (x);
var positive = y > 0;
var result =  new java.util.ArrayList ();
if (extrema != null) for (var p, $p = extrema.iterator (); $p.hasNext () && ((p = $p.next ()) || true);) if (Math.abs (p.getY ()) < 0.0002) result.add ( new Point (p.getX (), 0, 2));

while (x <= endX) {
for (var d, $d = discontinuities.iterator (); $d.hasNext () && ((d = $d.next ()) || true);) {
if (x < d && (x + precision) > d) {
x += precision;
y = f.calculate (x);
positive = y > 0;
break;
}}
if (y == 0) result.add ( new Point (x, f.calculate (x), 2));
 else if (y > 0 != positive) {
var x1 = x - precision;
var x2 = x;
var m = (x1 + x2) / 2;
var ym = f.calculate (m);
var done = false;
for (var i = 0; i < 15; i++) {
if (ym == 0) {
result.add ( new Point (m, ym, 2));
done = true;
i = 15;
} else if (ym > 0 == positive) x1 = m;
 else x2 = m;
m = (x1 + x2) / 2;
ym = f.calculate (m);
}
if (!done && !Double.isNaN (ym)) result.add ( new Point (m, ym, 2));
}positive = y > 0;
x += precision;
y = f.calculate (x);
}
return result;
}, "Function,java.util.ArrayList,java.util.ArrayList,~N,~N,~N");
c$.getRoots = Clazz.defineMethod (c$, "getRoots", 
function (f, startX, endX, precision) {
var discontinuities = f.getDiscontinuities (startX, endX, precision);
return PointMaker.getRoots (f, PointMaker.getExtrema (f, discontinuities, startX, endX, precision), discontinuities, startX, endX, precision);
}, "Function,~N,~N,~N");
c$.getIntersections = Clazz.defineMethod (c$, "getIntersections", 
function (f1, f2, startX, endX, precision) {
var f =  new Function (f1.getString () + "-(" + f2.getString () + ")");
f.setA (f1.getA ());
f.setB (f1.getB ());
f.setC (f1.getC ());
var ps = PointMaker.getRoots (f, startX, endX, precision);
var result =  new java.util.ArrayList ();
for (var p, $p = ps.iterator (); $p.hasNext () && ((p = $p.next ()) || true);) result.add ( new Point (p.getX (), f1.calculate (p.getX ()), 3));

return result;
}, "Function,Function,~N,~N,~N");
c$.getDiscontinuities = Clazz.defineMethod (c$, "getDiscontinuities", 
function (f, startX, endX, precision) {
return f.getDiscontinuities (startX, endX, precision);
}, "Function,~N,~N,~N");
});
