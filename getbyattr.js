/*

getbyattr,js: Micro CSS2 attributes selector engine
licenses:
  - [MIT License](http://mootools.net/license.txt)

*/
function getByAttr(selector, context){
	var match = /^([\w-]+|\*)?(?:\[)([\w-]+)([\*\^\$!])?=(['"]?)(.*)\4(?:\])$/.exec( selector ) || [],
	attrName = { 'class':'className' , 'for':'htmlFor' }[ match[2] ] || match[2], 
	ctx = context || document,
	elems = ctx.getElementsByTagName( match[1] ), 
	attrValue, matchElems = [], tmpExpr;
	
	for(var e = 0; elems[e]; e++){
		attrValue = elems[e][attrName] || elems[e].getAttribute(attrName) || '';

		switch( match[3] ){
			case '*':
				tmpExpr = '.*' + match[5] + '.*';
			break;
			case '^':
				tmpExpr = '^' + match[5];
			break;
			case '$':
				tmpExpr = match[5] + '$';
			break;
			case '!':
				tmpExpr = '[^' + match[5] + ']';
			break;
			default:
				tmpExpr = match[5];
		} 
		
		if( new RegExp(tmpExpr).test( attrValue ) ){
			matchElems.push(elems[e]);
		}
	}
	return matchElems;
}