c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.type = 0;
Clazz.instantialize (this, arguments);
}, null, "Point");
Clazz.makeConstructor (c$, 
function (x, y, type) {
this.x = x;
this.y = y;
this.type = type;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineStatics (c$,
"TYPE_NONE", 0,
"TYPE_EXTREMA", 1,
"TYPE_ROOT", 2,
"TYPE_FUNCTION_INTERSECTION", 3,
"TYPE_INFLECTION", 4,
"TYPE_DISCONTINUITY", 5);
