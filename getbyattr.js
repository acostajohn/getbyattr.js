/*
getbyattr.js: Micro CSS2 attributes selector engine

License: http://www.opensource.org/licenses/mit-license.php
Author: John Acosta - @jseros <wwww.jseros.com>
*/
function getByAttr(selector, context){
	if( document.querySelectorAll ){
		return (context || document).querySelectorAll(selector);
	}
	
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