(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,n){e.exports=n(40)},29:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(18),c=n.n(l),i=(n(29),n(6)),o=function(){return r.a.createElement("div",{className:"header"},r.a.createElement(i.b,{exact:!0,to:""},"Home"),r.a.createElement(i.b,{exact:!0,to:"/day1"},"1"))},u=n(14),s=n(19),d=n(20),h=n(22),m=n(21),p=n(10),f=n(23),E=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={part1Result:null,part2Result:null,fileLoaded:!1},n.handleChange=n.handleChange.bind(Object(p.a)(n)),n}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return a.createElement("div",null,a.createElement("input",{type:"file",multiple:!1,onChange:function(t){return e.handleChange(t.target.files[0])}}),!this.state.part1Result&&this.state.fileLoaded?a.createElement("p",null,"Loading"):a.createElement("div",null,this.state.part1Result&&a.createElement("p",null,"Part 1: ".concat(this.state.part1Result)),this.state.part2Result&&a.createElement("p",null,"Part 2: ".concat(this.state.part2Result))))}},{key:"handleChange",value:function(e){var t=this;this.setState({fileLoaded:!0});var n=new FileReader;n.readAsText(e),n.onload=function(){var e=n.result.split("\n").filter(function(e){return""!==e}).map(function(e){return parseInt(e,10)}),a=e.reduce(function(e,t){return e+t},0),r=0,l=[],c=[];do{e.forEach(function(e){r+=e,l.indexOf(r)>-1?c.push(r):l.push(r)})}while(0===c.length);t.setState({part1Result:a,part2Result:c[0]})}}}]),t}(a.Component),v=function(){return r.a.createElement("div",{className:"dynamic"},r.a.createElement(u.a,{exact:!0,path:"/"}),r.a.createElement(u.a,{exact:!0,path:"/day1",render:function(e){return r.a.createElement(E,null)}}))};n(39),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(i.a,null,r.a.createElement(function(){return r.a.createElement("div",{className:"App"},r.a.createElement(o,null),r.a.createElement(v,null))},null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.d262dcb0.chunk.js.map