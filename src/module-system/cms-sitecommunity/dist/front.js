window["cms-sitecommunity"]=function(t){var e={};function a(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);var n;a(1);e.default={install:function(t,e){return n?console.error("already installed."):(n=t,e({routes:a(4).default,store:a(6).default(n),config:a(7).default,locales:a(8).default,components:a(10).default}))}}},function(t,e,a){var n=a(2);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(11).default)("ce6a16ec",n,!0,{})},function(t,e,a){(e=a(3)(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"module.less"}]),t.exports=e},function(t,e,a){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var a=function(t,e){var a=t[1]||"",n=t[3];if(!n)return a;if(e&&"function"==typeof btoa){var o=(i=n,r=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),"/*# ".concat(l," */")),s=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[a].concat(s).concat([o]).join("\n")}var i,r,l;return[a].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(a,"}"):a})).join("")},e.i=function(t,a,n){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(n)for(var s=0;s<this.length;s++){var i=this[s][0];null!=i&&(o[i]=!0)}for(var r=0;r<t.length;r++){var l=[].concat(t[r]);n&&o[l[0]]||(a&&(l[2]?l[2]="".concat(a," and ").concat(l[2]):l[2]=a),e.push(l))}},e}},function(t,e,a){"use strict";a.r(e),e.default=[]},function(t,e){function a(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}a.keys=function(){return[]},a.resolve=a,t.exports=a,a.id=5},function(t,e,a){"use strict";a.r(e),e.default=function(t){return{state:{},getters:{},mutations:{},actions:{}}}},function(t,e,a){"use strict";a.r(e),e.default={}},function(t,e,a){"use strict";a.r(e),e.default={"zh-cn":a(9).default}},function(t,e,a){"use strict";a.r(e),e.default={"CMS:Community":"CMS:社区",Name:"名称",Description:"描述"}},function(t,e,a){"use strict";a.r(e);var n=function(t,e){var a="module=".concat(t.module,"&atomClassName=").concat(t.atomClassName);if(!e)return a;var n=e.indexOf("?");return-1===n?"".concat(e,"?").concat(a):n===e.length-1?"".concat(e).concat(a):"".concat(e,"&").concat(a)};function o(t,e,a,n,o,s,i,r){var l,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=a,u._compiled=!0),n&&(u.functional=!0),s&&(u._scopeId="data-v-"+s),i?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},u._ssrRegister=l):o&&(l=r?function(){o.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:o),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(t,e){return l.call(e),c(t,e)}}else{var m=u.beforeCreate;u.beforeCreate=m?[].concat(m,l):[l]}return{exports:t,options:u}}var s=o({props:{readOnly:{type:Boolean},item:{type:Object},onSave:{type:Function}},data:function(){return{moduleCMS:null}},computed:{atomClass:function(){return{module:this.item.module,atomClassName:this.item.atomClassName}},languages:function(){return this.$store.getState("a/cms/languages")[this.atomClass.module]}},created:function(){var t=this;this.$meta.module.use("a-cms",(function(e){t.moduleCMS=e,t.$store.dispatch("a/cms/getLanguages",{atomClass:t.atomClass}).then((function(e){1===e.length&&(t.item.language=e[0].value)}))}))},methods:{onSubmit:function(t){this.$emit("submit",t)},combineAtomClass:function(t){return n(this.atomClass,t)},adjustTags:function(t){return t?JSON.parse(t).map((function(t){return t.name})).join(","):""},onChooseTags:function(){var t=this;return this.item.language?new Promise((function(e){var a=t.combineAtomClass("/a/cms/tag/select");t.$view.navigate(a,{context:{params:{language:t.item.language,tags:t.item.tags},callback:function(a,n){200===a?(t.item.tags=n,e(!0)):!1===a&&e(!1)}}})})):(this.$view.dialog.alert(this.$text("Please specify the language")),!1)},onChooseCategory:function(){var t=this;return this.item.language?new Promise((function(e){var a=t.combineAtomClass("/a/cms/category/select");t.$view.navigate(a,{context:{params:{language:t.item.language,categoryIdStart:0,leafOnly:!0},callback:function(a,n){200===a?(t.item.categoryId=n.id,t.item.categoryName=n.data.categoryName,e(!0)):!1===a&&e(!1)}}})})):(this.$view.dialog.alert(this.$text("Please specify the language")),!1)},onChooseEditContent:function(){var t=this;if(!this.item.categoryId)return this.$view.dialog.alert(this.$text("Please specify the category name")),!1;var e=this.combineAtomClass("/a/cms/article/contentEdit");this.$view.navigate(e,{context:{params:{ctx:this,item:this.item,readOnly:this.readOnly},callback:function(e,a){200===e&&(t.item.content=a.content)}}})}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.moduleCMS?a("eb-list",{attrs:{form:"","no-hairlines-md":""},on:{submit:t.onSubmit}},[a("f7-list-group",[a("f7-list-item",{attrs:{"group-title":"",title:t.$text("Title")}}),t._v(" "),a("eb-list-item-validate",{attrs:{dataKey:"atomName"}})],1),t._v(" "),a("f7-list-group",[a("f7-list-item",{attrs:{"group-title":"",title:t.$text("Content")}}),t._v(" "),a("eb-list-item-choose",{attrs:{link:"#",dataPath:"content",title:t.$text("Content"),onChoose:t.onChooseEditContent}})],1),t._v(" "),a("f7-list-group",[a("f7-list-item",{attrs:{"group-title":"",title:t.$text("Basic Info")}}),t._v(" "),a("eb-list-item-validate",{attrs:{dataKey:"language",meta:{options:t.languages}}}),t._v(" "),a("eb-list-item-choose",{attrs:{link:"#",dataPath:"categoryId",title:t.$text("Category"),onChoose:t.onChooseCategory}},[a("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.item.categoryName))])]),t._v(" "),a("eb-list-item-choose",{attrs:{link:"#",dataPath:"tags",title:t.$text("Tags"),onChoose:t.onChooseTags}},[a("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.adjustTags(t.item.tags)))])])],1)],1):t._e()}),[],!1,null,"0a491914",null).exports,i=o({props:{readOnly:{type:Boolean},item:{type:Object}},data:function(){return{moduleCMS:null}},computed:{atomClass:function(){return{module:this.item.module,atomClassName:this.item.atomClassName}},languages:function(){return this.$store.getState("a/cms/languages")[this.atomClass.module]}},created:function(){var t=this;this.$meta.module.use("a-cms",(function(e){t.moduleCMS=e,t.$store.dispatch("a/cms/getLanguages",{atomClass:t.atomClass})}))},methods:{combineAtomClass:function(t){return n(this.atomClass,t)},adjustTags:function(t){return t?JSON.parse(t).map((function(t){return t.name})).join(","):""},onChooseEditContent:function(){var t=this;if(!this.item.categoryId)return!1;var e=this.combineAtomClass("/a/cms/article/contentEdit");this.$view.navigate(e,{target:"_self",context:{params:{ctx:this,item:this.item,readOnly:this.readOnly},callback:function(e,a){200===e&&(t.item.content=a.content)}}})}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.moduleCMS?a("f7-list",[a("f7-list-group",[a("f7-list-item",{attrs:{"group-title":"",title:t.$text("Title")}}),t._v(" "),a("eb-list-item-validate",{attrs:{dataKey:"atomName"}})],1),t._v(" "),a("f7-list-group",[a("f7-list-item",{attrs:{"group-title":"",title:t.$text("Content")}}),t._v(" "),a("eb-list-item-choose",{attrs:{link:"#",dataPath:"content",title:t.$text("Content"),onChoose:t.onChooseEditContent}})],1),t._v(" "),a("f7-list-group",[a("f7-list-item",{attrs:{"group-title":"",title:t.$text("Basic Info")}}),t._v(" "),a("eb-list-item-validate",{attrs:{dataKey:"language",meta:{options:t.languages}}}),t._v(" "),a("f7-list-item",{attrs:{title:t.$text("Category")}},[a("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.item.categoryName))])]),t._v(" "),a("f7-list-item",{attrs:{title:t.$text("Tags")}},[a("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.adjustTags(t.item.tags)))])])],1)],1):t._e()}),[],!1,null,"02994eec",null),r=o({meta:{global:!1},components:{itemEdit:s,itemView:i.exports},props:{readOnly:{type:Boolean},data:{type:Object},onSave:{type:Function}},methods:{onSubmit:function(t){this.$emit("submit",t)}}},(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.readOnly?[e("item-view",{attrs:{readOnly:this.readOnly,item:this.data}})]:[e("item-edit",{attrs:{readOnly:this.readOnly,item:this.data,onSave:this.onSave},on:{submit:this.onSubmit}})]],2)}),[],!1,null,"f15ba530",null).exports,l=o({meta:{global:!1},props:{data:{type:Object}},data:function(){return{atomClass:{module:"cms-sitecommunity",atomClassName:"post"},moduleCMS:null}},computed:{languages:function(){return this.$store.getState("a/cms/languages")[this.atomClass.module]}},created:function(){var t=this;this.$meta.module.use("a-cms",(function(e){t.$store.dispatch("a/cms/getLanguages",{atomClass:t.atomClass}).then((function(){t.moduleCMS=e}))}))},methods:{onSubmit:function(t){this.$emit("submit",t)},combineAtomClass:function(t){return n(this.atomClass,t)},onChangeLanguage:function(){this.$set(this.data,"categoryId",null),this.$set(this.data,"categoryName",null)},onChooseCategory:function(){var t=this;return this.data.language?new Promise((function(e){var a=t.combineAtomClass("/a/cms/category/select");t.$view.navigate(a,{context:{params:{language:t.data.language,categoryIdStart:0,leafOnly:!0},callback:function(a,n){200===a?(t.$set(t.data,"categoryId",n.id),t.$set(t.data,"categoryName",n.data.categoryName),e(!0)):!1===a&&e(!1)}}})})):(this.$view.dialog.alert(this.$text("Please specify the language")),!1)}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.moduleCMS?a("eb-list",{attrs:{form:"","no-hairlines-md":""},on:{submit:t.onSubmit}},[a("eb-list-item-validate",{attrs:{dataKey:"language",meta:{options:t.languages}},on:{change:t.onChangeLanguage}}),t._v(" "),a("eb-list-item-choose",{attrs:{link:"#",dataPath:"categoryId",title:t.$text("Category"),onChoose:t.onChooseCategory}},[a("div",{attrs:{slot:"after"},slot:"after"},[t._v(t._s(t.data.categoryName))])]),t._v(" "),a("eb-list-item-validate",{attrs:{dataKey:"content"}})],1):t._e()}),[],!1,null,"18f8b3e5",null).exports;e.default={postItem:r,postSearch:l}},function(t,e,a){"use strict";function n(t,e){for(var a=[],n={},o=0;o<e.length;o++){var s=e[o],i=s[0],r={id:t+":"+o,css:s[1],media:s[2],sourceMap:s[3]};n[i]?n[i].parts.push(r):a.push(n[i]={id:i,parts:[r]})}return a}a.r(e),a.d(e,"default",(function(){return f}));var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},i=o&&(document.head||document.getElementsByTagName("head")[0]),r=null,l=0,u=!1,c=function(){},m=null,d="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(t,e,a,o){u=a,m=o||{};var i=n(t,e);return g(i),function(e){for(var a=[],o=0;o<i.length;o++){var r=i[o];(l=s[r.id]).refs--,a.push(l)}e?g(i=n(t,e)):i=[];for(o=0;o<a.length;o++){var l;if(0===(l=a[o]).refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete s[l.id]}}}}function g(t){for(var e=0;e<t.length;e++){var a=t[e],n=s[a.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](a.parts[o]);for(;o<a.parts.length;o++)n.parts.push(p(a.parts[o]));n.parts.length>a.parts.length&&(n.parts.length=a.parts.length)}else{var i=[];for(o=0;o<a.parts.length;o++)i.push(p(a.parts[o]));s[a.id]={id:a.id,refs:1,parts:i}}}}function h(){var t=document.createElement("style");return t.type="text/css",i.appendChild(t),t}function p(t){var e,a,n=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(n){if(u)return c;n.parentNode.removeChild(n)}if(d){var o=l++;n=r||(r=h()),e=C.bind(null,n,o,!1),a=C.bind(null,n,o,!0)}else n=h(),e=b.bind(null,n),a=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else a()}}var v,y=(v=[],function(t,e){return v[t]=e,v.filter(Boolean).join("\n")});function C(t,e,a,n){var o=a?"":n.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var s=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(s,i[e]):t.appendChild(s)}}function b(t,e){var a=e.css,n=e.media,o=e.sourceMap;if(n&&t.setAttribute("media",n),m.ssrId&&t.setAttribute("data-vue-ssr-id",e.id),o&&(a+="\n/*# sourceURL="+o.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),t.styleSheet)t.styleSheet.cssText=a;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(a))}}}]);