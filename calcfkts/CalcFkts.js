function formatFktString (s) {
var r = "";
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) != (' ').charCodeAt (0)) {
r += (s.charAt (i)).charCodeAt (0);
}}
for (var i = 0; i < r.length - 1; i++) {
var abort = false;
if (r.length > (2 + i) && r.substring (i, i + 3).toLowerCase() ==="abs") i += 2;
 else if (r.length > 3 + i && r.substring (i, i + 4).toLowerCase() ==="asin") i += 3;
 else if (r.length > 3 + i && r.substring (i, i + 4).toLowerCase() ==="acos") i += 3;
 else if (r.length > 3 + i && r.substring (i, i + 4).toLowerCase() ==="atan") i += 3;
 else if (r.length > 4 + i && r.substring (i, i + 5).toLowerCase() ==="asinh") i += 4;
 else if (r.length > 4 + i && r.substring (i, i + 5).toLowerCase() ==="acosh") i += 4;
 else if (r.length > 4 + i && r.substring (i, i + 5).toLowerCase() ==="atanh") i += 4;
 else if (isNumber (r.charAt (i)) && isPossibleCharacter (r.charAt (i + 1))) {
r = r.substring (0, i + 1) + "*" + r.substring (i + 1);
}}
return r;
}

function isNumber (c) {
if ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ((c).charCodeAt (0) == ('0').charCodeAt (0) | (c).charCodeAt (0) == ('1').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('2').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('3').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('4').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('5').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('6').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('7').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('8').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('9').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('x').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('y').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('b').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('c').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('a').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('i').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('I').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('e').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == ('E').charCodeAt (0)).valueOf () | (c).charCodeAt (0) == (')').charCodeAt (0)).valueOf ()) return true;
return false;
}

function isPossibleCharacter (c) {
var s = String.valueOf (c);
if ( new Boolean ( new Boolean ( new Boolean (s.toLowerCase() ==="p" | s.toLowerCase() ==="s" | s.toLowerCase() ==="c" | s.toLowerCase() ==="t" | s.toLowerCase() ==="l" | s.toLowerCase() ==="x" | s.toLowerCase() ==="y" | s.toLowerCase() ==="a" | s.toLowerCase() ==="e" | (c).charCodeAt (0) == ('(').charCodeAt (0).valueOf () | s.toLowerCase() ==="b").valueOf () | s.toLowerCase() ==="c")).valueOf ()) return true;
return false;
}

function countOperators (s, o1, o2) {
var brackets = 0;
var count = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean (brackets == 0 & ( new Boolean ((s.charAt (i)).charCodeAt (0) == (o1).charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == (o2).charCodeAt (0)).valueOf ())).valueOf ()) count++;
}
return count;
}

function calculate (s, x, y) {
var addends = countOperators (s, '+', '-');
if ( new Boolean (addends > 0 & !( new Boolean ((s.charAt (0)).charCodeAt (0) == ('+').charCodeAt (0) | (s.charAt (0)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ())).valueOf ()) addends++;
if ( new Boolean (addends == 1 & (s.charAt (0)).charCodeAt (0) == ('+').charCodeAt (0)).valueOf ()) return calculate (s.substring (1), x, y);
if ( new Boolean (addends == 1 & (s.charAt (0)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ()) return (-1) * (calculate (s.substring (1), x, y));
if (addends > 0) {
var result = 0.0;
var parts =  new Array (addends);
var il = 0;
var pos = 0;
var brackets = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean ( new Boolean (brackets == 0 & i != 0).valueOf () & ( new Boolean ((s.charAt (i)).charCodeAt (0) == ('+').charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ())).valueOf ()) {
parts[pos] = s.substring (il, i);
il = i;
pos++;
}}
parts[addends - 1] = s.substring (il);
for (var i = 0; i < addends; i++) result += (calculate (parts[i], x, y));

return result;
}var factors = countOperators (s, '*', '/') + 1;
if ((s.charAt (0)).charCodeAt (0) == ('*').charCodeAt (0)) return calculate (s.substring (1), x, y);
if ((s.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) return 1 / (calculate (s.substring (1), x, y));
if (factors > 1) {
var result = 1.0;
var parts =  new Array (factors);
var il = 0;
var pos = 0;
var brackets = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean (brackets == 0 & ( new Boolean ((s.charAt (i)).charCodeAt (0) == ('*').charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == ('/').charCodeAt (0)).valueOf ())).valueOf ()) {
parts[pos] = s.substring (il, i);
il = i;
pos++;
}}
parts[factors - 1] = s.substring (il);
for (var i = 0; i < factors; i++) result *= (calculate (parts[i], x, y));

return result;
}var brackets = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean (brackets == 0 & (s.charAt (i)).charCodeAt (0) == ('^').charCodeAt (0)).valueOf ()) return Math.pow ((calculate (s.substring (0, i), x, y)), (calculate (s.substring (i + 1), x, y)));
}
if ((s.charAt (0)).charCodeAt (0) == ('(').charCodeAt (0)) return calculate (s.substring (1, s.length - 1), x, y);
if (s.length > 4) {
if (s.substring (0, 4).toLowerCase() === "sin(") return Math.sin ((calculate (s.substring (4, s.length - 1), x, y)));
if (s.substring (0, 4).toLowerCase() === "cos(") return Math.cos ((calculate (s.substring (4, s.length - 1), x, y)));
if (s.substring (0, 4).toLowerCase() === "tan(") return Math.tan ((calculate (s.substring (4, s.length - 1), x, y)));
if (s.substring (0, 3).toLowerCase() === "ln(") return Math.log ((calculate (s.substring (3, s.length - 1), x, y)));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "sqrt(") return Math.pow ((calculate (s.substring (5, s.length - 1), x, y)), 0.5);
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "asin(") return Math.asin ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "acos(") return Math.acos ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "atan(") return Math.atan ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "sinh(") return Math.sinh ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "cosh(") return Math.cosh ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "tanh(") return Math.tanh ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 7 && s.substring (0, 6).toLowerCase() === "asinh(") return asinh ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 7 && s.substring (0, 6).toLowerCase() === "acosh(") return acosh ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 7 && s.substring (0, 6).toLowerCase() === "atanh(") return atanh ((calculate (s.substring (5, s.length - 1), x, y)));
if (s.length > 5 && s.substring (0, 4).toLowerCase() === "abs(") return Math.abs ((calculate (s.substring (4, s.length - 1))));
if (s.length > 5 && s.substring (0, 4).toLowerCase() === "log(") return Math.log10 ((calculate (s.substring (4, s.length - 1))));
}if (s.toLowerCase() ==="x") return x;
if (s.toLowerCase() ==="y") return y;
if ( new Boolean (s.toLowerCase() ==="PI" | s.toLowerCase() ==="\u03C0").valueOf ()) return 3.14159265;
if (s.toLowerCase() ==="e") return 2.71828183;
for (var i = 0; i < s.length; i++) if ( new Boolean ((s.charAt (i)).charCodeAt (0) == (',').charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == ('.').charCodeAt (0)).valueOf ()) return (calculate (s.substring (0, i), x, y)) + (calculate (s.substring (i + 1), x, y)) / (Math.pow (10, s.length - 1 - i));

try {
return 1.0 * parseInt (s);
} catch (e) {
//if (Clazz.instanceOf (e, NumberFormatException)) {
//} else {
throw e;
//}
}
return 0.0;
}

function check (s) {
if (s.length >= 2 && (s.substring (0, 2) ==="**" || s.substring (0, 2) ==="//")) return false;
s = formatFktString (s);
var brackets2 = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets2++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets2--;
}
if (brackets2 != 0) return false;
try {
if ( new Boolean ( new Boolean ( new Boolean ( new Boolean ( new Boolean ((s.charAt (s.length - 1)).charCodeAt (0) == ('+').charCodeAt (0) | (s.charAt (s.length - 1)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf () | (s.charAt (s.length - 1)).charCodeAt (0) == ('/').charCodeAt (0)).valueOf () | (s.charAt (s.length - 1)).charCodeAt (0) == ('*').charCodeAt (0)).valueOf () | (s.charAt (s.length - 1)).charCodeAt (0) == ('(').charCodeAt (0)).valueOf () | (s.charAt (s.length - 1)).charCodeAt (0) == ('^').charCodeAt (0)).valueOf ()) return false;
var addends = countOperators (s, '+', '-');
if ( new Boolean (addends > 0 & !( new Boolean ((s.charAt (0)).charCodeAt (0) == ('+').charCodeAt (0) | (s.charAt (0)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ())).valueOf ()) addends++;
if ( new Boolean (addends == 1 & (s.charAt (0)).charCodeAt (0) == ('+').charCodeAt (0)).valueOf ()) return check (s.substring (1));
if ( new Boolean (addends == 1 & (s.charAt (0)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ()) return check (s.substring (1));
if (addends > 0) {
var result = new Boolean (true);
var parts =  new Array (addends);
var il = 0;
var pos = 0;
var brackets = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean ( new Boolean (brackets == 0 & i != 0).valueOf () & ( new Boolean ((s.charAt (i)).charCodeAt (0) == ('+').charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == ('-').charCodeAt (0)).valueOf ())).valueOf ()) {
parts[pos] = s.substring (il, i);
il = i;
pos++;
}}
parts[addends - 1] = s.substring (il);
for (var i = 0; i < addends; i++) {
if (!check (parts[i])) result = new Boolean (false);
}
return result;
}var factors = countOperators (s, '*', '/') + 1;
if ((s.charAt (0)).charCodeAt (0) == ('*').charCodeAt (0)) return check (s.substring (1));
if ((s.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0)) return check (s.substring (1));
if (factors > 1) {
var result = new Boolean (true);
var parts =  new Array (factors);
var il = 0;
var pos = 0;
var brackets = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean (brackets == 0 & ( new Boolean ((s.charAt (i)).charCodeAt (0) == ('*').charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == ('/').charCodeAt (0)).valueOf ())).valueOf ()) {
parts[pos] = s.substring (il, i);
il = i;
pos++;
}}
parts[factors - 1] = s.substring (il);
for (var i = 0; i < factors; i++) if (!check (parts[i])) result = new Boolean (false);

return result;
}var brackets = 0;
for (var i = 0; i < s.length; i++) {
if ((s.charAt (i)).charCodeAt (0) == ('(').charCodeAt (0)) brackets++;
if ((s.charAt (i)).charCodeAt (0) == (')').charCodeAt (0)) brackets--;
if ( new Boolean (brackets == 0 & (s.charAt (i)).charCodeAt (0) == ('^').charCodeAt (0)).valueOf ()) return (check (s.substring (0, i))).booleanValue () & (check (s.substring (i + 1))).booleanValue ();
}
if ((s.charAt (0)).charCodeAt (0) == ('(').charCodeAt (0)) return check (s.substring (1, s.length - 1));
if (s.length > 4) {
if (s.substring (0, 4).toLowerCase() === "sin(") return check (s.substring (4, s.length - 1));
if (s.substring (0, 4).toLowerCase() === "cos(") return check (s.substring (4, s.length - 1));
if (s.substring (0, 4).toLowerCase() === "tan(") return check (s.substring (4, s.length - 1));
if (s.substring (0, 3).toLowerCase() === "ln(") return check (s.substring (3, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "sqrt(") return check (s.substring (5, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "asin(") return check (s.substring (5, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "acos(") return check (s.substring (5, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "atan(") return check (s.substring (5, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "sinh(") return check (s.substring (5, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "cosh(") return check (s.substring (5, s.length - 1));
if (s.length > 6 && s.substring (0, 5).toLowerCase() === "tanh(") return check (s.substring (5, s.length - 1));
if (s.length > 7 && s.substring (0, 6).toLowerCase() === "asinh(") return check (s.substring (6, s.length - 1));
if (s.length > 7 && s.substring (0, 6).toLowerCase() === "acosh(") return check (s.substring (6, s.length - 1));
if (s.length > 7 && s.substring (0, 6).toLowerCase() === "atanh(") return check (s.substring (6, s.length - 1));
if (s.length > 5 && s.substring (0, 4).toLowerCase() === "abs(") return check (s.substring (4, s.length - 1));
if (s.length > 5 && s.substring (0, 4).toLowerCase() === "log(") return check (s.substring (4, s.length - 1));
}if (s.toLowerCase() ==="x") return true;
if (s.toLowerCase() ==="y") return true;
if ( new Boolean (s.toLowerCase() ==="PI" | s.toLowerCase() ==="\u03C0").valueOf ()) return true;
if (s.toLowerCase() ==="e") return true;
if (s.toLowerCase() ==="a") return true;
if (s.toLowerCase() ==="b") return true;
if (s.toLowerCase() ==="c") return true;
for (var i = 0; i < s.length; i++) if ( new Boolean ((s.charAt (i)).charCodeAt (0) == (',').charCodeAt (0) | (s.charAt (i)).charCodeAt (0) == ('.').charCodeAt (0)).valueOf ()) return (check (s.substring (0, i))).booleanValue () & (check (s.substring (i + 1))).booleanValue ();

try {
parseInt (s);
} catch (e) {
//if (Clazz.instanceOf (e, NumberFormatException)) {
//return false;
//} else {
throw e;
//}
}
return true;
} catch (e) {
//if (Clazz.instanceOf (e, StringIndexOutOfBoundsException)) {
//return false;
//} else {
throw e;
//}
}
}

function asinh (x) {
return Math.log (x + Math.sqrt (1 + x * x));
}

function acosh (x) {
return 2 * Math.log (Math.sqrt ((x + 1) / 2) + Math.sqrt ((x - 1) / 2));
}

function atanh (x) {
return (Math.log (1 + x) - Math.log (1 - x)) / 2;
}