(window["webpackJsonpreact-antdesign-admin"]=window["webpackJsonpreact-antdesign-admin"]||[]).push([[8],{373:function(e,t,n){"use strict";n.r(t);var a=n(29),i=n(30),c=n(34),o=n(31),r=n(35),l=n(0),d=n.n(l),w=n(45),s=n(369),u=n.n(s),m=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={editorContent:""},n}return Object(r.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return d.a.createElement("div",{className:"content-wrap"},d.a.createElement("div",{className:"rich-info"},d.a.createElement("div",null,"wangEditor \u2014\u2014 \u8f7b\u91cf\u7ea7 web \u5bcc\u6587\u672c\u7f16\u8f91\u5668\uff0c\u914d\u7f6e\u65b9\u4fbf\uff0c\u4f7f\u7528\u7b80\u5355\u3002\u652f\u6301 IE10+ \u6d4f\u89c8\u5668\u3002"),d.a.createElement("div",null,"\u5b98\u7f51\uff1a",d.a.createElement("a",{href:"http://www.wangEditor.com"},"www.wangEditor.com")),d.a.createElement("div",null,"\u6587\u6863\uff1a",d.a.createElement("a",{href:"http://www.kancloud.cn/wangfupeng/wangeditor3/332599"},"www.kancloud.cn/wangfupeng/wangeditor3/332599"))),d.a.createElement("div",{ref:"editorElem",style:{textAlign:"left"}}),d.a.createElement(w.a,{onClick:this.clickHandle.bind(this)},"\u83b7\u53d6\u5185\u5bb9"))}},{key:"componentDidMount",value:function(){var e=this,t=this.refs.editorElem,n=new u.a(t);n.customConfig.uploadImgShowBase64=!0,n.customConfig.onchange=function(t){e.setState({editorContent:t})},n.create()}},{key:"clickHandle",value:function(){alert(this.state.editorContent)}}]),t}(d.a.Component);t.default=m}}]);
//# sourceMappingURL=8.e7c9a4c1.chunk.js.map