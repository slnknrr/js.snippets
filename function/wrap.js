/* https://github.com/slnknrr/js.snippets/blob/main/function/wrap.js
 * built for readable recursions and assign() tricks
*/
var wrap=function(f,prefix=[],postfix=[]) {
    if (!Array.isArray(prefix)) prefix=[prefix]; prefix.eval=[];
    if (!Array.isArray(postfix)) postfix=[postfix]; postfix.eval=[];
    for (var fix in prefix) {
        if (parseInt(fix)==fix&&fix>-1) prefix.eval.push(`prefix[${fix}]`);
    }
    for (var fix in postfix) {
        if (parseInt(fix)==fix&&fix>-1) postfix.eval.push(`postfix[${fix}]`);
    }
    return function $wrap(args) {
        args=Object.assign([args].concat(Array.from(arguments).slice(1,)).slice(0,arguments.length),
        {
            eval:[]
        });
        for (var arg in args) {
            if (parseInt(arg)==arg&&arg>-1) args.eval.push(`args[${arg}]`);
        }
        if (prefix.eval.length!=0) args.eval=prefix.eval.concat(args);
        if (postfix.eval.length!=0) args.eval=args.eval.concat(postfix.eval);
        var r=f(eval(`${args.eval.join(',')}`));
        return r; //throw^ protect
    }
}
