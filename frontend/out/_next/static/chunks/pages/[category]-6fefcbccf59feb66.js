(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[716],{2063:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[category]",function(){return i(1341)}])},6673:function(e,n,i){"use strict";var t=i(5893),o=i(6886);n.Z=function(){return(0,t.jsx)(o.ZP,{container:!0,spacing:2,sx:{top:"auto",bottom:0,height:"100px",borderTop:"1px solid #eaeaea",justifyContent:"center",alignItems:"center",backgroundColor:"#80ced6"},children:"Footer"})}},1952:function(e,n,i){"use strict";i.d(n,{Z:function(){return Z}});var t=i(5893),o=i(1736),r=i(2761),a=i(2293),s=i(7357),d=i(3946),c=i(2771),l=i(1496),u=i(1796),m=i(155),p=i(5861),h=i(1664);function x(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}var g=(0,l.ZP)("div")((function(e){var n=e.theme;return x({position:"relative",borderRadius:n.shape.borderRadius,backgroundColor:(0,u.Fq)(n.palette.common.white,.15),marginLeft:0,width:"100%"},n.breakpoints.up("sm"),{marginLeft:n.spacing(1),width:"auto"})})),f=(0,l.ZP)("div")((function(e){return{padding:e.theme.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}})),v=(0,l.ZP)(c.ZP)((function(e){var n=e.theme;return x({color:"inherit"},"& .MuiInputBase-input",x({padding:n.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(n.spacing(4),")"),transition:n.transitions.create("width"),width:"100%"},n.breakpoints.up("sm"),x({width:"25ch"},"&:focus",{width:"30ch"})))}));function Z(){return(0,t.jsx)(s.Z,{sx:{flexGrow:1},children:(0,t.jsx)(a.Z,{position:"static",children:(0,t.jsxs)(m.Z,{children:[(0,t.jsx)(h.default,{href:"/",children:(0,t.jsx)(d.Z,{size:"large",edge:"start",color:"inherit","aria-label":"open drawer",children:(0,t.jsx)(o.Z,{})})}),(0,t.jsx)(p.Z,{variant:"h6",noWrap:!0,component:"div",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"MUI"}),(0,t.jsxs)(g,{sx:{ml:2},children:[(0,t.jsx)(f,{children:(0,t.jsx)(r.Z,{})}),(0,t.jsx)(v,{placeholder:"Search\u2026",inputProps:{"aria-label":"search"}})]})]})})})}},1341:function(e,n,i){"use strict";i.r(n),i.d(n,{__N_SSG:function(){return S},default:function(){return E}});var t=i(5893),o=i(6886),r=i(7948),a=i(6720),s=i(1265),d=i(1927),c=i(9008),l=i(6242),u=i(3366),m=i(7462),p=i(7294),h=i(6010),x=i(7192),g=i(7623),f=i(1496),v=i(8979);function Z(e){return(0,v.Z)("MuiCardMedia",e)}(0,i(6087).Z)("MuiCardMedia",["root","media","img"]);const j=["children","className","component","image","src","style"],b=(0,f.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:i}=e,{isMediaComponent:t,isImageComponent:o}=i;return[n.root,t&&n.media,o&&n.img]}})((({ownerState:e})=>(0,m.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"}))),w=["video","audio","picture","iframe","img"],C=["picture","img"];var k=p.forwardRef((function(e,n){const i=(0,g.Z)({props:e,name:"MuiCardMedia"}),{children:o,className:r,component:a="div",image:s,src:d,style:c}=i,l=(0,u.Z)(i,j),p=-1!==w.indexOf(a),f=!p&&s?(0,m.Z)({backgroundImage:`url("${s}")`},c):c,v=(0,m.Z)({},i,{component:a,isMediaComponent:p,isImageComponent:-1!==C.indexOf(a)}),k=(e=>{const{classes:n,isMediaComponent:i,isImageComponent:t}=e,o={root:["root",i&&"media",t&&"img"]};return(0,x.Z)(o,Z,n)})(v);return(0,t.jsx)(b,(0,m.Z)({className:(0,h.Z)(k.root,r),as:a,role:!p&&s?"img":void 0,ref:n,style:f,ownerState:v,src:p?s||d:void 0},l,{children:o}))})),y=i(4267),_=i(5861),M=i(1664),P=function(e){return e>=15?15:e>=10?10:e};function N(e){var n,i,o,r,a,s,d=e.categoryName,c=e.post,u=P(null===c||void 0===c||null===(n=c.rankedList)||void 0===n||null===(i=n.ranklist)||void 0===i?void 0:i.length);return(0,t.jsx)(M.default,{href:"/".concat(d,"/").concat(c.slug),children:(0,t.jsxs)(l.Z,{sx:{display:"flex"},children:[(0,t.jsx)(k,{component:"img",sx:{width:151},image:null===(r=null===c||void 0===c||null===(o=c.rankedList)||void 0===o?void 0:o.ranklist[0])||void 0===r||null===(a=r.images)||void 0===a||null===(s=a.Large)||void 0===s?void 0:s.URL,alt:c.title}),(0,t.jsx)(y.Z,{sx:{flex:"1 0 auto"},children:(0,t.jsxs)(_.Z,{variant:"h6",children:["Top ",u," ",c.title]})})]})})}var I=i(6673),L=i(1952),R=(0,s.Z)(),S=!0;function E(e){var n,i=e.category;return(0,t.jsxs)(d.Z,{theme:R,children:[(0,t.jsx)(a.ZP,{}),(0,t.jsxs)(r.Z,{maxWidth:"lg",children:[(0,t.jsx)(L.Z,{}),(0,t.jsx)(c.default,{children:(0,t.jsxs)("title",{children:["Category | ",null===i||void 0===i?void 0:i.name]})}),(0,t.jsxs)("main",{children:["Category: ",null===i||void 0===i?void 0:i.name,(0,t.jsx)("br",{}),(0,t.jsx)(o.ZP,{container:!0,spacing:{xs:2,md:3},columns:{xs:4,sm:8,md:12},children:null===i||void 0===i||null===(n=i.posts)||void 0===n?void 0:n.map((function(e){return(0,t.jsx)(o.ZP,{item:!0,xs:2,sm:4,md:4,children:(0,t.jsx)(N,{categoryName:null===i||void 0===i?void 0:i.name,post:e})},e.id)}))})]}),(0,t.jsx)(I.Z,{})]})]})}}},function(e){e.O(0,[774,861,407,881,888,179],(function(){return n=2063,e(e.s=n);var n}));var n=e.O();_N_E=n}]);