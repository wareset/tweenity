/* eslint-disable */
var e;exports.cancelAnimationFrame=void 0,exports.requestAnimationFrame=void 0,exports.requestAnimationFrame="function"==typeof requestAnimationFrame?(exports.cancelAnimationFrame=cancelAnimationFrame,requestAnimationFrame):"function"==typeof oRequestAnimationFrame?(exports.cancelAnimationFrame=oCancelAnimationFrame,oRequestAnimationFrame):"function"==typeof msRequestAnimationFrame?(exports.cancelAnimationFrame=msCancelAnimationFrame,msRequestAnimationFrame):"function"==typeof mozRequestAnimationFrame?(exports.cancelAnimationFrame=mozCancelAnimationFrame,mozRequestAnimationFrame):"function"==typeof webkitRequestAnimationFrame?(exports.cancelAnimationFrame=webkitCancelAnimationFrame,webkitRequestAnimationFrame):(exports.cancelAnimationFrame=clearTimeout,e="object"==typeof performance?performance:Date,t=>setTimeout((()=>t(e.now())),16));var t=Array,a=Object,n=a.is||((e,t)=>e===t?0!==e||1/e==1/t:e!=e&&t!=t),o=a.keys,r=a.prototype,s=a.getPrototypeOf,i=t.prototype,p=e=>!((!e||(e=s(e))!==i)&&e),u=e=>!((!e||(e=s(e))!==r)&&e),c=e=>e,m=e=>{var t=7.5625,a=2.75;return e<1/a?t*e*e:e<2/a?t*(e-=1.5/a)*e+.75:e<2.5/a?t*(e-=2.25/a)*e+.9375:t*(e-=2.625/a)*e+.984375},h={p:null,n:null};h.p=h.n=h;var l=h,x=()=>{},y=(e,t)=>null!=e?e:t,f=(e,t)=>{if("object"==typeof e){if(p(e)&&p(t)&&e.length===t.length){for(var a=e.length;a-- >0;)if(!f(e[a],t[a]))return!1;return!0}if(u(e)&&u(t)){for(var o in e)if(!f(e[o],t[o]))return!1;return!0}}return n(e,t)},d=(e,t)=>{f(e.now,t)||e._.onUpdate.call(e,e.now=t)},w=e=>{var t=e._.task;t&&(t.p.n=t.n,t.n.p=t.p,e._.task=null)},M=function(e,t){return I(this[t],e)},A=function(e){this[0][e]=I(this[1][e],this[2][e])},F=function(e){this[1][e]=this[0][e](this[2])},I=(e,t)=>{if(e!==t&&e==e){var a=typeof e;if(a===typeof t)switch(a){case"number":var n=t-e;return a=>a<1?a*n+e:t;case"object":if(p(e)&&p(t)){var r=t.map(M,e);return e=>r.map((t=>t(e)))}if(u(e)&&u(t)){var s=o(t),i={};return s.forEach(A,[i,e,t]),e=>{var t={};return s.forEach(F,[i,t,e]),t}}}}return a=>a<1?e:t},v=(e,t)=>{var a=e.o;if(t>a){var n=e.s;if(a?a-=t:e.t=e.delay+t,n.paused||q.paused)e.t-=a;else if(t>=e.t){var o=e.duration,r=e.b-=e.c?a:(e.c=!0,0);if(r<o)d(n,e.i(e.easing(r/o)));else if(d(n,e.i(e.easing(1))),n._.task===e){var s=e.repeat,i=s===+s;if(i?s>0:s){var p=n.now,u=e.yoyo;n.to(u?e.f:(n.now=e.f,p),{yoyo:u,easing:e.easing,delay:e.delay,duration:o,repeat:i?s-1:s}),u||(n.now=p),(e=n._.task)&&(e.o=t,e.t=e.delay+t)}else w(n)}}e.o=t}},O=!1,q={ticker:e=>{for(l=h;(l=l.n)!==h;)v(l,e);(O=h.n!==h)&&exports.requestAnimationFrame(q.ticker)},paused:!1,yoyo:!1,repeat:!1,delay:0,duration:0,easing:c};class Tweenity{constructor(e,t){t||(t={}),this._={task:null,yoyo:y(t.yoyo,q.yoyo),repeat:y(t.repeat,q.repeat),delay:y(t.delay,q.delay),duration:y(t.duration,q.duration),easing:y(t.easing,q.easing),onUpdate:t.onUpdate||x},this.paused=!1,this.now=e}resume(){this.paused=!1}pause(){this.paused=!0}stop(){w(this)}set(e){w(this),d(this,I(this.now,e)(1))}to(e,t){w(this);var a=this.now;if(!f(a,e)){t||(t={});var n=this._,o={p:null,n:null,c:!1,o:0,t:0,easing:t.easing||n.easing,delay:y(t.delay,n.delay),duration:y(t.duration,n.duration),b:0,s:this,yoyo:y(t.yoyo,n.yoyo),repeat:y(t.repeat,n.repeat),f:a,i:I(a,e)};n.task=l=(o.p=(o.n=l===h?h:l.n).p).n=o.n.p=o,O||(O=!0,exports.requestAnimationFrame(q.ticker))}}}exports.DEFAULTS=q,exports.Tweenity=Tweenity,exports.easeBackIn=e=>{var t=1.70158;return e*e*((t+1)*e-t)},exports.easeBackInOut=e=>{var t=2.5949095;return((e*=2)<1?e*e*((t+1)*e-t):(e-=2)*e*((t+1)*e+t)+2)/2},exports.easeBackOut=e=>{var t=1.70158;return 1+--e*e*((t+1)*e+t)},exports.easeBounceIn=e=>1-m(1-e),exports.easeBounceInOut=e=>(e<.5?1-m(1-2*e):1+m(2*e-1))/2,exports.easeBounceOut=m,exports.easeCircIn=e=>1-Math.sqrt(1-e*e),exports.easeCircInOut=e=>((e*=2)<1?1-Math.sqrt(1-e*e):Math.sqrt(1-(e-=2)*e)+1)/2,exports.easeCircOut=e=>Math.sqrt(1- --e*e),exports.easeCubicIn=e=>e*e*e,exports.easeCubicInOut=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,exports.easeCubicOut=e=>1+--e*e*e,exports.easeElasticIn=e=>0===e||1===e?e:Math.sin(13*e*Math.PI/2)*Math.pow(2,10*(e-1)),exports.easeElasticInOut=e=>0===e||1===e?e:e<.5?.5*Math.sin(13*Math.PI/2*2*e)*Math.pow(2,10*(2*e-1)):.5*Math.sin(-13*Math.PI/2*(2*e-1+1))*Math.pow(2,-10*(2*e-1))+1,exports.easeElasticOut=e=>0===e||1===e?e:Math.sin(-13*(e+1)*Math.PI/2)*Math.pow(2,-10*e)+1,exports.easeExpoIn=e=>0===e?0:Math.pow(2,10*e-10),exports.easeExpoInOut=e=>0===e||1===e?e:e<.5?Math.pow(2,20*e-10)/2:Math.pow(2,10-20*e)/-2+1,exports.easeExpoOut=e=>1===e?1:1-Math.pow(2,-10*e),exports.easeLinear=c,exports.easeQuadIn=e=>e*e,exports.easeQuadInOut=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2,exports.easeQuadOut=e=>1- --e*e,exports.easeQuartIn=e=>e*e*e*e,exports.easeQuartInOut=e=>e<.5?8*e*e*e*e:1-Math.pow(-2*e+2,4)/2,exports.easeQuartOut=e=>1- --e*e*e*e,exports.easeQuintIn=e=>e*e*e*e*e,exports.easeQuintInOut=e=>e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2,exports.easeQuintOut=e=>1+--e*e*e*e*e,exports.easeSineIn=e=>1-Math.cos(e*Math.PI/2),exports.easeSineInOut=e=>(1-Math.cos(e*Math.PI))/2,exports.easeSineOut=e=>Math.sin(e*Math.PI/2),exports.tweenity=(e,t)=>new Tweenity(e,t);
