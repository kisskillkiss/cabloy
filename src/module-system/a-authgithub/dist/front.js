window["a-authgithub"]=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){e.exports=n.p+"static/img/github.ca1ef68de99bb1c21b54a2de9c2f5603.png"},function(e,t,n){var r=n(2);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(10).default)("196dcaf6",r,!0,{})},function(e,t,n){(t=n(3)(!0)).push([e.i,"\n","",{version:3,sources:[],names:[],mappings:"",file:"module.css"}]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(u," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([o]).join("\n")}var a,s,u;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var u=[].concat(e[s]);r&&o[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),t.push(u))}},t}},function(e,t,n){"use strict";n.r(t),t.default=[]},function(e,t,n){"use strict";n.r(t),t.default=function(e){return{state:{},getters:{},mutations:{},actions:{}}}},function(e,t,n){"use strict";n.r(t),t.default={}},function(e,t,n){"use strict";n.r(t),t.default={"zh-cn":n(8).default}},function(e,t,n){"use strict";n.r(t),t.default={}},function(e,t,n){"use strict";n.r(t);var r,o=function(e,t,n,r,o,i,a,s){var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),a?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=u):o&&(u=s?function(){o.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:o),u)if(c.functional){c._injectStyles=u;var f=c.render;c.render=function(e,t){return u.call(t),f(e,t)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,u):[u]}return{exports:e,options:c}}({meta:{global:!1,disable:function(){return new Promise((function(e,t){if("file://"===location.origin)return e(!0);e(!1)}))}},data:function(){return{}},methods:{signIn:function(){var e=this.$module.info,t="/api/".concat(e.url,"/passport/").concat(e.relativeName,"/authgithub");this.$meta.vueApp.toLogin({url:t})}}},(function(){var e=this.$createElement;return(this._self._c||e)("img",{attrs:{src:n(0)},on:{click:this.signIn}})}),[],!1,null,"5ada5c9e",null).exports;n(1);t.default={install:function(e,t){return r?console.error("already installed."):(r=e,t({routes:n(4).default,store:n(5).default(r),config:n(6).default,locales:n(7).default,components:{button:o}}))}}},function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],a=i[0],s={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}n.r(t),n.d(t,"default",(function(){return p}));var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},a=o&&(document.head||document.getElementsByTagName("head")[0]),s=null,u=0,c=!1,f=function(){},l=null,d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(e,t,n,o){c=n,l=o||{};var a=r(e,t);return h(a),function(t){for(var n=[],o=0;o<a.length;o++){var s=a[o];(u=i[s.id]).refs--,n.push(u)}t?h(a=r(e,t)):a=[];for(o=0;o<n.length;o++){var u;if(0===(u=n[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete i[u.id]}}}}function h(e){for(var t=0;t<e.length;t++){var n=e[t],r=i[n.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](n.parts[o]);for(;o<n.parts.length;o++)r.parts.push(g(n.parts[o]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(g(n.parts[o]));i[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function g(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(c)return f;r.parentNode.removeChild(r)}if(d){var o=u++;r=s||(s=v()),t=y.bind(null,r,o,!1),n=y.bind(null,r,o,!0)}else r=v(),t=_.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var m,b=(m=[],function(e,t){return m[e]=t,m.filter(Boolean).join("\n")});function y(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function _(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),l.ssrId&&e.setAttribute("data-vue-ssr-id",t.id),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}]);