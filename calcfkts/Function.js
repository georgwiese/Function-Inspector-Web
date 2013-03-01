Clazz.load (["java.util.ArrayList"], "Function", ["CalcFkts", "PointMaker", "java.util.Collections"], function () {
c$ = Clazz.decorateAsClass (function () {
this.addents = null;
this.$isValue = null;
this.value = 0;
this.x = 0;
this.y = 0;
this.a = 0;
this.b = 0;
this.c = 0;
this.string = null;
if (!Clazz.isClassDefined ("Function.Addent")) {
.Function.$Function$Addent$ ();
}
if (!Clazz.isClassDefined ("Function.Factor")) {
.Function.$Function$Factor$ ();
}
Clazz.instantialize (this, arguments);
}, null, "Function");
Clazz.prepareFields (c$, function () {
this.addents =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function ($function) {
this.string = $function;
this.x = 0;
this.y = 0;
this.a = 0;
this.b = 0;
this.c = 0;
this.$isValue = this.isValue ($function);
if ((this.$isValue).booleanValue ()) this.value = (CalcFkts.calculate ($function)).doubleValue ();
var brackets = 0;
if ( new Boolean (($function.charAt (0)).charCodeAt (0) != ('+').charCodeAt (0) & ($function.charAt (0)).charCodeAt (0) != ('-').charCodeAt (0)).valueOf ()) $function = "+" + $function;
for (var i = 1; i < $function.length; i++) {
if (($function.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if (($function.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean (( new Boolean (($function.charAt (i)).charCodeAt (0) == ('+').charCodeAt (0) | ($function.charAt (i)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ()) & brackets == 0).valueOf ()) {
this.addents.add (Clazz.innerTypeInstance (Function.Addent, this, null, $function.substring (0, i)));
$function = $function.substring (i);
i = 0;
brackets = 0;
}}
this.addents.add (Clazz.innerTypeInstance (Function.Addent, this, null, $function));
}, "~S");
Clazz.makeConstructor (c$, 
function ($function, a, b, c) {
this.construct ($function);
this.a = a;
this.b = b;
this.c = c;
}, "~S,~N,~N,~N");
Clazz.overrideMethod (c$, "clone", 
function () {
var f =  new Function (this.getString ());
f.setParams ([this.a, this.b, this.c]);
return f;
});
Clazz.defineMethod (c$, "getString", 
function () {
return this.string;
});
Clazz.defineMethod (c$, "setA", 
function (a) {
this.a = a;
}, "~N");
Clazz.defineMethod (c$, "getA", 
function () {
return this.a;
});
Clazz.defineMethod (c$, "setB", 
function (b) {
this.b = b;
}, "~N");
Clazz.defineMethod (c$, "getB", 
function () {
return this.b;
});
Clazz.defineMethod (c$, "setC", 
function (c) {
this.c = c;
}, "~N");
Clazz.defineMethod (c$, "getC", 
function () {
return this.c;
});
Clazz.defineMethod (c$, "setParams", 
function (params) {
this.a = params[0];
this.b = params[1];
this.c = params[2];
}, "~A");
Clazz.defineMethod (c$, "slope", 
function (x) {
return (this.calculate (x) - this.calculate (x - 0.000001)) / (0.000001);
}, "~N");
Clazz.defineMethod (c$, "calculate", 
function (x) {
return this.calculate (x, 0);
}, "~N");
Clazz.defineMethod (c$, "calculate", 
function (x, y, a, b, c) {
this.a = a;
this.b = b;
this.c = c;
return this.calculate (x, y);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "calculate", 
function (x, y) {
if ((this.$isValue).booleanValue ()) return this.value;
this.x = x;
this.y = y;
var result = 0.0;
for (var add, $add = this.addents.iterator (); $add.hasNext () && ((add = $add.next ()) || true);) result += add.calculate ();

return result;
}, "~N,~N");
Clazz.defineMethod (c$, "getDiscontinuities", 
function (startX, endX, precision) {
var result =  new java.util.ArrayList ();
for (var a, $a = this.addents.iterator (); $a.hasNext () && ((a = $a.next ()) || true);) {
var inAd = a.getDiscontinuities (startX, endX, precision);
for (var d, $d = inAd.iterator (); $d.hasNext () && ((d = $d.next ()) || true);) result.add (new Double (d));

}
java.util.Collections.sort (result);
for (var i = 1; i < result.size (); i++) {
if (result.get (i - 1).equals (result.get (i))) {
result.remove (i);
i--;
}}
return result;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "isValue", 
($fz = function (s) {
var result = new Boolean (true);
for (var i = 0; i < s.length; i++) {
var c = s.charAt (i);
if ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ((c).charCodeAt (0) == ('x').charCodeAt (0) | (c).charCodeAt (0) == ('y').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('a').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('b').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('c').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('X').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('Y').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('A').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('B').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('C').charCodeAt (0)).valueOf ()) result = new Boolean (false);
}
return result;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, Function, "toString", []) + ": " + this.string;
});
c$.$Function$Addent$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.factors = null;
this.isValue = false;
this.value = 0;
this.positive = false;
Clazz.instantialize (this, arguments);
}, Function, "Addent");
Clazz.prepareFields (c$, function () {
this.factors =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (a) {
this.isValue = (this.b$["Function"].isValue (a)).booleanValue ();
if (this.isValue) this.value = (CalcFkts.calculate (a)).doubleValue ();
var b = 0;
this.positive = (a.charAt (0)).charCodeAt (0) == ('+').charCodeAt (0);
a = a.substring (1);
if ( new Boolean ((a.charAt (0)).charCodeAt (0) != ('*').charCodeAt (0) & (a.charAt (0)).charCodeAt (0) != ('/').charCodeAt (0)).valueOf ()) a = "*" + a;
for (var c = 1; c < a.length; c++) {
if ((a.charAt (c)).charCodeAt (0) == ('(').charCodeAt (0)) b++;
if ((a.charAt (c)).charCodeAt (0) == (')').charCodeAt (0)) b--;
if ( new Boolean (( new Boolean ((a.charAt (c)).charCodeAt (0) == ('*').charCodeAt (0) | (a.charAt (c)).charCodeAt (0) == ('/').charCodeAt (0)).valueOf ()) & b == 0).valueOf ()) {
this.factors.add (Clazz.innerTypeInstance (Function.Factor, this, null, a.substring (0, c)));
a = a.substring (c);
c = 0;
b = 0;
}}
this.factors.add (Clazz.innerTypeInstance (Function.Factor, this, null, a));
}, "~S");
Clazz.defineMethod (c$, "calculate", 
function () {
if (this.isValue) return this.value;
var a = 1.0;
for (var f, $f = this.factors.iterator (); $f.hasNext () && ((f = $f.next ()) || true);) a *= f.calculate ();

if (!this.positive) a *= -1;
return a;
});
Clazz.defineMethod (c$, "getDiscontinuities", 
function (a, b, c) {
var d =  new java.util.ArrayList ();
for (var f, $f = this.factors.iterator (); $f.hasNext () && ((f = $f.next ()) || true);) {
var e = f.getDiscontinuities (a, b, c);
for (var d, $d = e.iterator (); $d.hasNext () && ((d = $d.next ()) || true);) d.add (new Double (d));

}
return d;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
c$.$Function$Factor$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$function = null;
this.factor = null;
this.value = 0;
this.divisor = false;
this.kind = 0;
this.VALUE = 0;
this.X = 1;
this.SQRT = 2;
this.SIN = 3;
this.COS = 4;
this.TAN = 5;
this.LN = 6;
this.EXP = 7;
this.ASIN = 13;
this.ACOS = 14;
this.ATAN = 15;
this.SINH = 16;
this.COSH = 17;
this.TANH = 18;
this.ASINH = 19;
this.ACOSH = 20;
this.ATANH = 21;
this.ABS = 22;
this.LOG = 23;
this.BRACKETS = 8;
this.Y = 9;
this.A = 10;
this.B = 11;
this.C = 12;
Clazz.instantialize (this, arguments);
}, Function, "Factor");
Clazz.prepareFields (c$, function () {
this.$function =  new Array (2);
});
Clazz.makeConstructor (c$, 
function (a) {
this.divisor = (a.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0);
a = a.substring (1);
this.factor = a;
this.kind = -1;
var b = 0;
for (var c = 0; c < a.length; c++) {
if ((a.charAt (c)).charCodeAt (0) == ('(').charCodeAt (0)) b++;
if ((a.charAt (c)).charCodeAt (0) == (')').charCodeAt (0)) b--;
if ( new Boolean ( new Boolean (b == 0 & (a.charAt (c)).charCodeAt (0) == ('^').charCodeAt (0)).valueOf () & this.kind == -1).valueOf ()) {
this.kind = 7;
this.$function[0] =  new Function (a.substring (0, c), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
this.$function[1] =  new Function (a.substring (c + 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
break;
}}
if ( new Boolean ((a.charAt (0)).charCodeAt (0) == ('(').charCodeAt (0) & this.kind == -1).valueOf ()) {
this.kind = 8;
this.$function[0] =  new Function (a.substring (1, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if (a.length > 4) {
if ( new Boolean (a.substring (0, 4).equalsIgnoreCase ("sin(") & this.kind == -1).valueOf ()) {
this.kind = 3;
this.$function[0] =  new Function (a.substring (4, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.substring (0, 4).equalsIgnoreCase ("cos(") & this.kind == -1).valueOf ()) {
this.kind = 4;
this.$function[0] =  new Function (a.substring (4, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.substring (0, 4).equalsIgnoreCase ("tan(") & this.kind == -1).valueOf ()) {
this.kind = 5;
this.$function[0] =  new Function (a.substring (4, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.substring (0, 3).equalsIgnoreCase ("ln(") & this.kind == -1).valueOf ()) {
this.kind = 6;
this.$function[0] =  new Function (a.substring (3, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("sqrt(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 2;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("asin(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 13;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("acos(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 14;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("atan(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 15;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("sinh(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 16;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("cosh(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 17;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 6 &&  new Boolean (a.substring (0, 5).equalsIgnoreCase ("tanh(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 18;
this.$function[0] =  new Function (a.substring (5, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 7 &&  new Boolean (a.substring (0, 6).equalsIgnoreCase ("asinh(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 19;
this.$function[0] =  new Function (a.substring (6, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 7 &&  new Boolean (a.substring (0, 6).equalsIgnoreCase ("acosh(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 20;
this.$function[0] =  new Function (a.substring (6, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 7 &&  new Boolean (a.substring (0, 6).equalsIgnoreCase ("atanh(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 21;
this.$function[0] =  new Function (a.substring (6, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 5 &&  new Boolean (a.substring (0, 4).equalsIgnoreCase ("abs(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 22;
this.$function[0] =  new Function (a.substring (4, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}if ( new Boolean (a.length > 5 &&  new Boolean (a.substring (0, 4).equalsIgnoreCase ("log(") & this.kind == -1).valueOf ()).valueOf ()) {
this.kind = 23;
this.$function[0] =  new Function (a.substring (4, a.length - 1), this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
}}if ( new Boolean (a.equalsIgnoreCase ("x") & this.kind == -1).valueOf ()) this.kind = 1;
if ( new Boolean (a.equalsIgnoreCase ("y") & this.kind == -1).valueOf ()) this.kind = 9;
if ( new Boolean (a.equalsIgnoreCase ("a") & this.kind == -1).valueOf ()) {
this.kind = 10;
}if (a.equalsIgnoreCase ("b") && this.kind == -1) this.kind = 11;
if (a.equalsIgnoreCase ("c") && this.kind == -1) this.kind = 12;
if (( new Boolean (a.equalsIgnoreCase ("PI") | a.equalsIgnoreCase ("\u03C0")).valueOf ()) && this.kind == -1) {
this.kind = 0;
this.value = 3.14159265;
}if (a.equalsIgnoreCase ("e") && this.kind == -1) {
this.kind = 0;
this.value = 2.71828183;
}for (var d = 0; d < a.length; d++) if ( new Boolean (( new Boolean ((a.charAt (d)).charCodeAt (0) == (',').charCodeAt (0) | (a.charAt (d)).charCodeAt (0) == ('.').charCodeAt (0)).valueOf ()) & this.kind == -1).valueOf ()) {
this.kind = 0;
this.value = (CalcFkts.calculate (a.substring (0, d))).doubleValue () + (CalcFkts.calculate (a.substring (d + 1))).doubleValue () / (Math.pow (10, a.length - 1 - d));
}
try {
this.value = 1.0 * Integer.parseInt (a);
this.kind = 0;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "calculate", 
function () {
var a = 9999;
switch (this.kind) {
case 0:
a = this.value;
break;
case 1:
a = this.b$["Function"].x;
break;
case 9:
a = this.b$["Function"].y;
break;
case 10:
a = this.b$["Function"].a;
break;
case 11:
a = this.b$["Function"].b;
break;
case 12:
a = this.b$["Function"].c;
break;
case 2:
a = Math.sqrt (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 3:
a = Math.sin (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 4:
a = Math.cos (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 5:
a = Math.tan (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 6:
a = Math.log (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 7:
a = Math.pow (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c), this.$function[1].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 8:
a = this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
break;
case 13:
a = Math.asin (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 14:
a = Math.acos (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 15:
a = Math.atan (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 16:
a = Math.sinh (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 17:
a = Math.cosh (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 18:
a = Math.tanh (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 19:
a = CalcFkts.asinh (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 20:
a = CalcFkts.acosh (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 21:
a = CalcFkts.atanh (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 22:
a = Math.abs (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
case 23:
a = Math.log10 (this.$function[0].calculate (this.b$["Function"].x, this.b$["Function"].y, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c));
break;
}
if (this.divisor) return 1 / a;
 else return a;
});
Clazz.defineMethod (c$, "getDiscontinuities", 
function (a, b, c) {
var d =  new java.util.ArrayList ();
var e;
if (this.divisor) {
var f =  new Function (this.factor, this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
e = PointMaker.getRoots (f, a, b, c);
for (var p, $p = e.iterator (); $p.hasNext () && ((p = $p.next ()) || true);) d.add (new Double (p.getX ()));

}switch (this.kind) {
case 6:
e = PointMaker.getRoots (this.$function[0], a, b, c);
for (var p, $p = e.iterator (); $p.hasNext () && ((p = $p.next ()) || true);) d.add (new Double (p.getX ()));

break;
case 5:
var f =  new Function ("sin(" + this.$function[0].getString () + ")^2-1", this.b$["Function"].a, this.b$["Function"].b, this.b$["Function"].c);
e = PointMaker.getRoots (f, a, b, c);
for (var p, $p = e.iterator (); $p.hasNext () && ((p = $p.next ()) || true);) d.add (new Double (p.getX ()));

break;
case 8:
d.addAll (this.$function[0].getDiscontinuities (a, b, c));
break;
}
for (var f, $f = 0, $$f = this.$function; $f < $$f.length && ((f = $$f[$f]) || true); $f++) if (f != null) d.addAll (f.getDiscontinuities (a, b, c));

return d;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
};
});
