var kt=Object.defineProperty;var nt=s=>{throw TypeError(s)};var At=(s,t,e)=>t in s?kt(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var k=(s,t,e)=>At(s,typeof t!="symbol"?t+"":t,e),at=(s,t,e)=>t.has(s)||nt("Cannot "+e);var u=(s,t,e)=>(at(s,t,"read from private field"),e?e.call(s):t.get(s)),q=(s,t,e)=>t.has(s)?nt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),Z=(s,t,e,i)=>(at(s,t,"write to private field"),i?i.call(s,e):t.set(s,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();class Et extends HTMLElement{static get observedAttributes(){return["color","size"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            font-size:inherit;
            display:inline-flex;
            align-items: center;
            justify-content:center;
            color:var(--themeColor,#42b983);
        }
        .loading{
            display: block;
            width: 1em;
            height: 1em;
            margin: auto;
            animation: rotate 1.4s linear infinite;
        }
        .circle {
            stroke: currentColor;
            animation:  progress 1.4s ease-in-out infinite;
            stroke-dasharray: 80px, 200px;
            stroke-dashoffset: 0px;
            transition:.3s;
        }
        :host(:not(:empty)) .loading{
            margin:.5em;
        }
        @keyframes rotate{
            to{
                transform: rotate(360deg); 
            }
        }
        @keyframes progress {
            0% {
              stroke-dasharray: 1px, 200px;
              stroke-dashoffset: 0px; 
            }
            50% {
              stroke-dasharray: 100px, 200px;
              stroke-dashoffset: -15px; 
            }
            100% {
              stroke-dasharray: 100px, 200px;
              stroke-dashoffset: -125px; 
            } 
        }
        </style>
        <svg class="loading" id="loading" viewBox="22 22 44 44"><circle class="circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle></svg>
        <slot></slot>
        `}get size(){return this.getAttribute("size")||""}get color(){return this.getAttribute("color")||""}set size(t){this.setAttribute("size",t)}set color(t){this.setAttribute("color",t)}connectedCallback(){this.loading=this.shadowRoot.getElementById("loading"),this.size&&(this.size=this.size),this.color&&(this.color=this.color)}attributeChangedCallback(t,e,i){t=="color"&&this.loading&&(this.loading.style.color=i),t=="size"&&this.loading&&(this.loading.style.fontSize=i+"px")}}customElements.get("xy-loading")||customElements.define("xy-loading",Et);class Ct extends HTMLElement{static get observedAttributes(){return["name","size","color","path"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            font-size:inherit;
            display:inline-block;
            transition:.3s;
        }
        .icon {
            display:block;
            width: 1em;
            height: 1em;
            margin: auto;
            fill: currentColor;
            overflow: hidden;
            /*transition:inherit;*/
        }
        :host([spin]){
            animation: rotate 1.4s linear infinite;
        }
        @keyframes rotate{
            to{
                transform: rotate(360deg); 
            }
        }
        </style>
        <svg class="icon" id="icon" aria-hidden="true" viewBox="0 0 ${this.view} ${this.view}">
            ${this.path?'<path id="path"></path>':'<use id="use"></use>'}
        </svg>
        `}get view(){return this.getAttribute("view")||1024}get name(){return this.getAttribute("name")}get path(){return this.getAttribute("path")||""}set name(t){this.setAttribute("name",t)}set path(t){this.setAttribute("path",t)}get size(){return this.getAttribute("size")||""}get color(){return this.getAttribute("color")||""}set size(t){this.setAttribute("size",t)}set color(t){this.setAttribute("color",t)}connectedCallback(){this.icon=this.shadowRoot.getElementById("icon"),this.use=this.icon.querySelector("use"),this.d=this.icon.querySelector("path"),this.size&&(this.size=this.size),this.color&&(this.color=this.color),this.name&&(this.name=this.name),this.path&&(this.path=this.path)}attributeChangedCallback(t,e,i){t=="name"&&this.use&&this.use.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",`../iconfont/icon.svg#icon-${i}`),t=="path"&&this.d&&this.d.setAttribute("d",i),t=="color"&&this.icon&&(this.icon.style.color=i),t=="size"&&this.icon&&(this.icon.style.fontSize=i+"px")}}customElements.get("xy-icon")||customElements.define("xy-icon",Ct);class Lt extends HTMLElement{static get observedAttributes(){return["disabled","icon","loading","href","htmltype"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{ 
            position:relative; 
            display:inline-flex; 
            padding: .25em .625em;
            box-sizing:border-box; 
            vertical-align: middle;
            line-height: 1.8;
            overflow:hidden; 
            align-items:center;
            justify-content: center;
            border:1px solid var(--borderColor,rgba(0,0,0,.2)); 
            font-size: 14px; 
            color: var(--fontColor,#333);  
            border-radius: var(--borderRadius,.25em); 
            transition:background .3s,box-shadow .3s,border-color .3s,color .3s;
        }
        :host([shape="circle"]){ 
            border-radius:50%; 
        }
        /*
        :host(:not([disabled]):active){
            z-index:1;
            transform:translateY(.1em);
        }
        */
        :host([disabled]),:host([loading]){
            pointer-events: none; 
            opacity:.6; 
        }
        :host([block]){ 
            display:flex; 
        }
        :host([disabled]:not([type])){ 
            background:rgba(0,0,0,.1); 
        }
        :host([disabled]) .btn,:host([loading]) .btn{ 
            cursor: not-allowed; 
            pointer-events: all; 
        }
        :host(:not([type="primary"]):not([type="danger"]):not([disabled]):hover),
        :host(:not([type="primary"]):not([type="danger"]):focus-within),
        :host([type="flat"][focus]){ 
            color:var(--themeColor,#42b983); 
            border-color: var(--themeColor,#42b983); 
        }
        :host(:not([type="primary"]):not([type="danger"])) .btn::after{ 
            background-image: radial-gradient(circle, var(--themeColor,#42b983) 10%, transparent 10.01%); 
        }
        :host([type="primary"]){ 
            color: #fff; 
            background:var(--themeBackground,var(--themeColor,#42b983));
        }
        :host([type="danger"]){ 
            color: #fff; 
            background:var(--themeBackground,var(--dangerColor,#ff7875));
        }
        :host([type="dashed"]){ 
            border-style:dashed 
        }
        :host([type="flat"]),:host([type="primary"]),:host([type="danger"]){ 
            border:0;
            padding: calc( .25em + 1px ) calc( .625em + 1px );
        }
        :host([type="flat"]) .btn::before{ 
            content:''; 
            position:absolute; 
            background:var(--themeColor,#42b983);
            pointer-events:none; 
            left:0; 
            right:0; 
            top:0; 
            bottom:0; 
            opacity:0; 
            transition:.3s;
        }
        :host([type="flat"]:not([disabled]):hover) .btn::before{ 
            opacity:.1 
        }
        :host(:not([disabled]):hover){ 
            z-index:1 
        }
        :host([type="flat"]:focus-within) .btn:before,
        :host([type="flat"][focus]) .btn:before{ 
            opacity:.2; 
        }
        :host(:focus-within){ 
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/ 
        }
        .btn{ 
            background:none; 
            outline:0; 
            border:0; 
            position: 
            absolute; 
            left:0; 
            top:0;
            width:100%;
            height:100%;
            padding:0;
            user-select: none;
            cursor: unset;
        }
        xy-loading{ 
            margin-right: 0.35em;  
        }
        ::-moz-focus-inner{
            border:0;
        }
        .btn::before{
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left:0;
            top:0;
            transition:.2s;
            background:#fff;
            opacity:0;
        }
        :host(:not([disabled]):active) .btn::before{ 
            opacity:.2;
        }
        .btn::after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: var(--x,0); 
            top: var(--y,0);
            pointer-events: none;
            background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: translate(-50%,-50%) scale(10);
            opacity: 0;
            transition: transform .3s, opacity .8s;
        }
        .btn:not([disabled]):active::after {
            transform: translate(-50%,-50%) scale(0);
            opacity: .3;
            transition: 0s;
        }
        xy-icon{
            margin-right: 0.35em;
            transition: none;
        }
        :host(:empty) xy-icon{
            margin: auto;
        }
        :host(:empty){
            padding: .65em;
        }
        :host([type="flat"]:empty),:host([type="primary"]:empty){ 
            padding: calc( .65em + 1px );
        }
        ::slotted(xy-icon){
            transition: none;
        }
        :host([href]){
            cursor:pointer;
        }
        </style>
        <${this.href?"a":"button"} ${this.htmltype?'type="'+this.htmltype+'"':""} ${this.download&&this.href?'download="'+this.download+'"':""} ${this.href?'href="'+this.href+'" target="'+this.target+'" rel="'+this.rel+'"':""} class="btn" id="btn"></${this.href?"a":"button"}>${!this.loading&&this.icon&&this.icon!="null"?'<xy-icon id="icon" name='+this.icon+"></xy-icon>":""}<slot></slot>
        `}focus(){this.btn.focus()}get disabled(){return this.getAttribute("disabled")!==null}get toggle(){return this.getAttribute("toggle")!==null}get htmltype(){return this.getAttribute("htmltype")}get name(){return this.getAttribute("name")}get checked(){return this.getAttribute("checked")!==null}get href(){return this.getAttribute("href")}get target(){return this.getAttribute("target")||"_blank"}get rel(){return this.getAttribute("rel")}get download(){return this.getAttribute("download")}get icon(){return this.getAttribute("icon")}get loading(){return this.getAttribute("loading")!==null}set icon(t){this.setAttribute("icon",t)}set htmltype(t){this.setAttribute("htmltype",t)}set href(t){this.setAttribute("href",t)}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set checked(t){t===null||t===!1?this.removeAttribute("checked"):this.setAttribute("checked","")}set loading(t){t===null||t===!1?this.removeAttribute("loading"):this.setAttribute("loading","")}connectedCallback(){this.btn=this.shadowRoot.getElementById("btn"),this.ico=this.shadowRoot.getElementById("icon"),this.load=document.createElement("xy-loading"),this.load.style.color="inherit",this.btn.addEventListener("mousedown",function(t){if(!this.disabled){const{left:e,top:i}=this.getBoundingClientRect();this.style.setProperty("--x",t.clientX-e+"px"),this.style.setProperty("--y",t.clientY-i+"px")}}),this.addEventListener("click",function(t){this.toggle&&(this.checked=!this.checked)}),this.btn.addEventListener("keydown",t=>{switch(t.keyCode){case 13:t.stopPropagation();break}}),this.disabled=this.disabled,this.loading=this.loading}attributeChangedCallback(t,e,i){t=="disabled"&&this.btn&&(i!==null?(this.btn.setAttribute("disabled","disabled"),this.href&&this.btn.removeAttribute("href")):(this.btn.removeAttribute("disabled"),this.href&&(this.btn.href=this.href))),t=="loading"&&this.btn&&(i!==null?(this.shadowRoot.prepend(this.load),this.btn.setAttribute("disabled","disabled")):(this.shadowRoot.removeChild(this.load),this.btn.removeAttribute("disabled"))),t=="icon"&&this.ico&&(this.ico.name=i),t=="href"&&this.btn&&(this.disabled||(this.btn.href=i)),t=="htmltype"&&this.btn&&(this.btn.type=i)}}customElements.get("xy-button")||customElements.define("xy-button",Lt);class Rt extends HTMLElement{static get observedAttributes(){return["disabled"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:inline-flex;
        }
        ::slotted(xy-button:not(:first-of-type):not(:last-of-type)){
            border-radius:0;
        }
        ::slotted(xy-button){
            margin:0!important;
        }
        ::slotted(xy-button:not(:first-of-type)){
            margin-left:-1px!important;
        }
        ::slotted(xy-button[type]:not([type="dashed"]):not(:first-of-type)){
            margin-left:1px!important;
        }
        ::slotted(xy-button:first-of-type){
            border-top-right-radius: 0;
            border-bottom-right-radius: 0px;
        }
        ::slotted(xy-button:last-of-type){
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        </style>
        <slot></slot>
        `}get disabled(){return this.getAttribute("disabled")!==null}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}connectedCallback(){}attributeChangedCallback(t,e,i){}}customElements.get("xy-button-group")||customElements.define("xy-button-group",Rt);class zt extends HTMLElement{static get observedAttributes(){return["color"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:inline-block;
            position: relative;
            overflow: visible;
        }
        
        :host::before,
        :host::after {
            content: '';
            display: block;
            position: absolute;
            z-index: 1;
            transform: translate(-50%, -20px);
            opacity: 0;
            transition:all .15s .15s,left 0s, top 0s;
            color: var(--color,rgba(0,0,0,0.75));
            visibility: hidden;
            pointer-events: none;
        }
        :host::before {
            content:attr(prefix) attr(tips) attr(suffix);
            border-radius: 3px;
            padding: 6px 10px;
            line-height: 18px;
            text-align: left;
            background-color: var(--color,rgba(0,0,0,0.75));
            color: #fff;
            font-size: 12px;
            font-style: normal;
            width: max-content;
            max-width: 200px;
        }
        :host::after {
            width: 0;
            height: 0;
            overflow: hidden;
            border: 6px solid transparent;
        }
        
        :host([tips]:not([tips='']):hover:not([show=false]))::before,
        :host([tips]:not([tips=''])[show=true])::before,
        :host([tips]:not([tips='']):focus-within:not([show=false]))::before,
        :host([tips]:not([tips='']):hover:not([show=false]))::after,
        :host([tips]:not([tips=''])[show=true])::after,
        :host([tips]:not([tips='']):focus-within:not([show=false]))::after {
            visibility: visible;
            opacity: 1;
        }
        
        /* top & '' */
        :host([dir="top"])::before,
        :host(:not([dir]))::before,
        :host(:not([dir]))::after,
        :host([dir="top"])::after {
            left: calc( var(--percent,.5) * 100% );
            bottom: 100%;
            transform: translate(-50%, -20px);
        }
        :host([dir="top"]):after,
        :host(:not([dir])):after {
            margin-bottom: -12px;
            border-top-color: currentColor;
        }
        :host(:not([dir]):hover:not([show=false]))::before,
        :host(:not([dir])[show=true])::before,
        :host(:not([dir]):focus-within:not([show=false]))::before,
        :host(:not([dir]):hover:not([show=false]))::after,
        :host(:not([dir])[show=true])::after,
        :host(:not([dir]):focus-within:not([show=false]))::after,
        :host([dir="top"]:hover:not([show=false]))::before,
        :host([dir="top"][show=true])::before,
        :host([dir="top"]:focus-within:not([show=false]))::before,
        :host([dir="top"]:hover:not([show=false]))::after,
        :host([dir="top"][show=true])::after,
        :host([dir="top"]:focus-within:not([show=false]))::after {
            transform: translate(-50%, -10px);
        }
        /* right */
        :host([dir="right"])::before,
        :host([dir="right"])::after{
            left: 100%;
            top: 50%;
            transform: translate(20px, -50%);
        }
        :host([dir="right"]):after {
            margin-left: -12px;
            border-right-color: currentColor;
        }
        :host([dir="right"]:hover:not([show=false]))::before,
        :host([dir="right"][show=true])::before,
        :host([dir="right"]:focus-within:not([show=false]))::before,
        :host([dir="right"]:hover:not([show=false]))::after,
        :host([dir="right"][show=true])::after,
        :host([dir="right"]:focus-within:not([show=false]))::after {
            transform: translate(10px, -50%);
        }
        
        /* bottom */
        :host([dir="bottom"])::before,
        :host([dir="bottom"])::after{
            left: calc( var(--percent,.5) * 100% );
            top: 100%;
            transform: translate(-50%, 20px);
        }
        :host([dir="bottom"])::after {
            margin-top: -12px;
            border-bottom-color: currentColor;
        }
        :host([dir="bottom"]:hover:not([show=false]))::before,
        :host([dir="bottom"][show=true])::before,
        :host([dir="bottom"]:focus-within:not([show=false]))::before,
        :host([dir="bottom"]:hover:not([show=false]))::after,
        :host([dir="bottom"][show=true])::after,
        :host([dir="bottom"]:focus-within:not([show=false]))::after {
            transform: translate(-50%, 10px);
        }
        
        /* left */
        :host([dir="left"])::before,
        :host([dir="left"])::after{
            right: 100%;
            top: 50%;
            transform: translate(-20px, -50%);
        }
        :host([dir="left"])::after{
            margin-right: -12px;
            border-left-color: currentColor;
        }
        :host([dir="left"]:hover:not([show=false]))::before,
        :host([dir="left"][show=true])::before,
        :host([dir="left"]:focus-within:not([show=false]))::before,
        :host([dir="left"]:hover:not([show=false]))::after,
        :host([dir="left"][show=true])::after,
        :host([dir="left"]:focus-within:not([show=false]))::after {
            transform: translate(-10px, -50%);
        }

        /* topleft */
        :host([dir="topleft"])::before,
        :host([dir="topleft"])::after {
            left: 0;
            bottom: 100%;
            transform: translate(0, -20px);
        }
        :host([dir="topleft"]):after{
            left:10px;
            margin-bottom: -12px;
            border-top-color: currentColor;
        }
        :host([dir="topleft"]:hover:not([show=false]))::before,
        :host([dir="topleft"][show=true])::before,
        :host([dir="topleft"]:focus-within:not([show=false]))::before,
        :host([dir="topleft"]:hover:not([show=false]))::after,
        :host([dir="topleft"][show=true])::after,
        :host([dir="topleft"]:focus-within:not([show=false]))::after {
            transform: translate(0, -10px);
        }
        /* topright */
        :host([dir="topright"])::before,
        :host([dir="topright"])::after {
            right: 0;
            bottom: 100%;
            transform: translate(0, -20px);
        }
        :host([dir="topright"]):after{
            right:10px;
            margin-bottom: -12px;
            border-top-color: currentColor;
        }
        :host([dir="topright"]:hover:not([show=false]))::before,
        :host([dir="topright"][show=true])::before,
        :host([dir="topright"]:focus-within:not([show=false]))::before,
        :host([dir="topright"]:hover:not([show=false]))::after,
        :host([dir="topright"][show=true])::after,
        :host([dir="topright"]:focus-within:not([show=false]))::after {
            transform: translate(0, -10px);
        }
        /* righttop */
        :host([dir="righttop"])::before,
        :host([dir="righttop"])::after{
            left: 100%;
            top: 0;
            transform: translate(20px, 0);
        }
        :host([dir="righttop"]):after {
            top: 10px;
            margin-left: -12px;
            border-right-color: currentColor;
        }
        :host([dir="righttop"]:hover:not([show=false]))::before,
        :host([dir="righttop"][show=true])::before,
        :host([dir="righttop"]:focus-within:not([show=false]))::before,
        :host([dir="righttop"]:hover:not([show=false]))::after,
        :host([dir="righttop"][show=true])::after,
        :host([dir="righttop"]:focus-within:not([show=false]))::after {
            transform: translate(10px, 0);
        }
        /* rightbottom */
        :host([dir="rightbottom"])::before,
        :host([dir="rightbottom"])::after{
            left: 100%;
            bottom: 0;
            transform: translate(20px, 0);
        }
        :host([dir="rightbottom"]):after {
            bottom: 10px;
            margin-left: -12px;
            border-right-color: currentColor;
        }
        :host([dir="rightbottom"]:hover:not([show=false]))::before,
        :host([dir="rightbottom"][show=true])::before,
        :host([dir="rightbottom"]:focus-within:not([show=false]))::before,
        :host([dir="rightbottom"]:hover:not([show=false]))::after,
        :host([dir="rightbottom"][show=true])::after,
        :host([dir="rightbottom"]:focus-within:not([show=false]))::after {
            transform: translate(10px, 0);
        }
        /* bottomleft */
        :host([dir="bottomleft"])::before,
        :host([dir="bottomleft"])::after{
            left: 0;
            top: 100%;
            transform: translate(0, 20px);
        }
        :host([dir="bottomleft"])::after {
            left: 10px;
            margin-top: -12px;
            border-bottom-color: currentColor;
        }
        :host([dir="bottomleft"]:hover:not([show=false]))::before,
        :host([dir="bottomleft"][show=true])::before,
        :host([dir="bottomleft"]:focus-within:not([show=false]))::before,
        :host([dir="bottomleft"]:hover:not([show=false]))::after,
        :host([dir="bottomleft"][show=true])::after,
        :host([dir="bottomleft"]:focus-within:not([show=false]))::after {
            transform: translate(0, 10px);
        }
        /* bottomright */
        :host([dir="bottomright"])::before,
        :host([dir="bottomright"])::after{
            right: 0;
            top: 100%;
            transform: translate(0, 20px);
        }
        :host([dir="bottomright"])::after {
            right: 10px;
            margin-top: -12px;
            border-bottom-color: currentColor;
        }
        :host([dir="bottomright"]:hover:not([show=false]))::before,
        :host([dir="bottomright"][show=true])::before,
        :host([dir="bottomright"]:focus-within:not([show=false]))::before,
        :host([dir="bottomright"]:hover:not([show=false]))::after,
        :host([dir="bottomright"][show=true])::after,
        :host([dir="bottomright"]:focus-within:not([show=false]))::after {
            transform: translate(0, 10px);
        }
        /* lefttop */
        :host([dir="lefttop"])::before,
        :host([dir="lefttop"])::after{
            right: 100%;
            top: 0;
            transform: translate(-20px, 0);
        }
        :host([dir="lefttop"]):after {
            top: 10px;
            margin-right: -12px;
            border-left-color: currentColor;
        }
        :host([dir="lefttop"]:hover:not([show=false]))::before,
        :host([dir="lefttop"][show=true])::before,
        :host([dir="lefttop"]:focus-within:not([show=false]))::before,
        :host([dir="lefttop"]:hover:not([show=false]))::after,
        :host([dir="lefttop"][show=true])::after,
        :host([dir="lefttop"]:focus-within:not([show=false]))::after {
            transform: translate(-10px, 0);
        }
        /* leftbottom */
        :host([dir="leftbottom"])::before,
        :host([dir="leftbottom"])::after{
            right: 100%;
            bottom: 0;
            transform: translate(-20px, 0);
        }
        :host([dir="leftbottom"]):after {
            bottom: 10px;
            margin-right: -12px;
            border-left-color: currentColor;
        }
        :host([dir="leftbottom"]:hover:not([show=false]))::before,
        :host([dir="leftbottom"][show=true])::before,
        :host([dir="leftbottom"]:focus-within:not([show=false]))::before,
        :host([dir="leftbottom"]:hover:not([show=false]))::after,
        :host([dir="leftbottom"][show=true])::after,
        :host([dir="leftbottom"]:focus-within:not([show=false]))::after {
            transform: translate(-10px, 0);
        }
        /* success */
        :host([type="success"]){
            --color:var(--successColor,#52c41a);
        }
        /* error */
        :host([type="error"]){
            --color:var(--errorColor,#f4615c);
        }
        /* warning */
        :host([type="warning"]){
            --color:var(--waringColor,#faad14);
        }
        slot{
            border-radius: inherit;
        }
        </style>
        <slot></slot>
        `}get color(){return this.getAttribute("color")||""}get dir(){return this.getAttribute("dir")||"top"}get tips(){return this.getAttribute("tips")}get type(){return this.getAttribute("tips")}get suffix(){return this.getAttribute("suffix")||""}get prefix(){return this.getAttribute("prefix")||""}get show(){return this.getAttribute("show")!==null}set color(t){this.setAttribute("color",t)}set dir(t){this.setAttribute("dir",t)}set tips(t){this.setAttribute("tips",t)}set suffix(t){this.setAttribute("suffix",t)}set prefix(t){this.setAttribute("prefix",t)}set show(t){this.setAttribute("show",t)}set type(t){this.setAttribute("type",t)}connectedCallback(){if(this.dir==="auto"){const{left:t,top:e,width:i,height:o}=this.getBoundingClientRect(),r=document.body.scrollWidth,a=document.body.scrollHeight,n=50;e<n&&(this.dir="bottom"),a-e-o<n&&(this.dir="top"),t<n&&(this.dir="right"),r-t-i<n&&(this.dir="left")}}attributeChangedCallback(t,e,i){t=="color"&&this.shadowRoot&&this.style.setProperty("--color",i)}}customElements.get("xy-tips")||customElements.define("xy-tips",zt);class $t extends HTMLElement{static get observedAttributes(){return["min","max","step","disabled","showtips","suffix"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{ 
            box-sizing:border-box; 
            display:flex; 
            padding:0 5px;
            ${this.vertical?"height:var(--h,300px)":""}
        }
        :host([disabled]){ 
            opacity:.8; 
            --themeColor:#999; 
            cursor:not-allowed; 
        }
        :host([disabled]) input[type="range"]{ 
            pointer-events:none; 
        }
        #slider-con{ 
            display:flex; 
            padding:5px 0; 
            width:100%;
            margin: auto;
        }
        ::-moz-focus-inner,::-moz-focus-outer{
            border:0;
            outline : 0;
        }
        :host([showtips]){
            pointer-events:all;
        }
        input[type="range"]{
            pointer-events:all;
            margin:0 -5px;
            width: calc( 100% + 10px );
            -webkit-appearance: none;
            outline : 0;
            /*
            background: rgba(0,0,0,.1);
            */
            height: 12px;
            background:none;
            border-radius:2px;
        }
        input[type="range"]::-webkit-slider-runnable-track{
            display: flex;
            align-items: center;
            position: relative;
            height: 2px;
            border-radius:2px;
            background:linear-gradient(to right, var(--themeColor,#42b983) calc(100% * var(--percent)), rgba(0,0,0,.1) 0% )
        }
        input[type="range"]::-moz-range-progress {
            display: flex;
            align-items: center;
            position: relative;
            height: 2px;
            border-radius:2px;
            outline : 0;
            background:var(--themeColor,#42b983)
        }
        input[type="range"]::-moz-range-track{
            height: 2px;
            background: rgba(0,0,0,.1);
        }
        input[type="range"]::-webkit-slider-thumb{
            -webkit-appearance: none;
            border:2px solid var(--themeColor,#42b983);
            position: relative;
            width:10px;
            height:10px;
            margin-top: -4px;
            border-radius: 50%;
            background:var(--themeColor,#42b983);
            transition:.2s cubic-bezier(.12, .4, .29, 1.46);
        }
        input[type="range"]::-moz-range-thumb{
            box-sizing:border-box;
            pointer-events:none;
            border:2px solid var(--themeColor,#42b983);
            position: relative;
            width:10px;
            height:10px;
            border-radius: 50%;
            background:var(--themeColor,#42b983);
            transition:.2s cubic-bezier(.12, .4, .29, 1.46);
        }
        input[type="range"]:focus{
            z-index:2;
        }
        input[type="range"]::-webkit-slider-thumb:active,
        input[type="range"]:focus::-webkit-slider-thumb{
            transform:scale(1.2);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background: #fff;
        }
        input[type="range"]::-moz-range-thumb:active,
        input[type="range"]:focus::-moz-range-thumb{
            transform:scale(1.2);
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            background: #fff;
        }
        :host([vertical]) #slider-con{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%) rotate(-90deg);
            width:calc( var(--h,300px) - 10px)
            
        }
        :host([vertical]) #slider-con::before{
            writing-mode: vertical-lr;
            padding: 10px 6px;
        }
        :host([vertical]){
            display:inline-flex;
            position:relative;
            width:20px;
        }
        :host([vertical]) xy-tips::before,:host([vertical]) xy-tips::after{
            left: calc( var(--percent,.5) * 100% + 5px );
        }
        :host(:focus-within) #slider-con,:host(:hover) #slider-con{
            z-index:10
        }
        </style>
        <xy-tips id='slider-con' dir=${this.vertical?"right":"top"} style="--percent:${(this.defaultvalue-this.min)/(this.max-this.min)}" tips="${this.showtips&&!this.disabled?this.defaultvalue:""}" suffix="${this.suffix}" prefix="${this.prefix}"><input id='slider' value=${this.defaultvalue} min=${this.min} max=${this.max} step=${this.step} ${this.disabled?"disabled":""} type='range'></xy-tips>
        `}focus(){this.slider.focus()}connectedCallback(){this.slider=this.shadowRoot.getElementById("slider"),this.sliderCon=this.shadowRoot.getElementById("slider-con"),this.vertical&&(this.resizeObserver=new ResizeObserver(t=>{for(let e of t){const{height:i}=e.contentRect;this.sliderCon.style.setProperty("--h",i+"px")}}),this.resizeObserver.observe(this)),this.slider.addEventListener("input",t=>{this.value=this.slider.value,this._oninput=!0,t.stopPropagation(),this.dispatchEvent(new CustomEvent("input",{detail:{value:this.slider.value}}))}),this.slider.addEventListener("change",t=>{this.value=this.slider.value,this._oninput=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.slider.value}}))}),this.addEventListener("wheel",t=>{getComputedStyle(this.slider).zIndex==2&&(t.preventDefault(),t.deltaY<0&&!this.vertical||t.deltaY>0&&this.vertical?this.value-=this.step*5:this.value+=this.step*5,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}})))},!0)}disconnectedCallback(){this.vertical&&this.resizeObserver.unobserve(this)}get value(){return Number(this.slider.value)}get defaultvalue(){return this.getAttribute("defaultvalue")||0}get suffix(){return this.getAttribute("suffix")||""}get prefix(){return this.getAttribute("prefix")||""}get min(){return this.getAttribute("min")||0}get max(){return this.getAttribute("max")||100}get disabled(){return this.getAttribute("disabled")!==null}get showtips(){return this.getAttribute("showtips")!==null}get vertical(){return this.getAttribute("vertical")!==null}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set showtips(t){t===null||t===!1?this.removeAttribute("showtips"):this.setAttribute("showtips","")}get step(){return this.getAttribute("step")||1}set value(t){this.slider.value=t,this.sliderCon.style.setProperty("--percent",(this.value-this.min)/(this.max-this.min)),this.showtips&&!this.disabled?this.sliderCon.tips=this.value:this.sliderCon.tips=""}set min(t){this.setAttribute("min",t)}set max(t){this.setAttribute("max",t)}set step(t){this.setAttribute("step",t)}set prefix(t){this.setAttribute("prefix",t)}set suffix(t){this.setAttribute("suffix",t)}attributeChangedCallback(t,e,i){this.slider&&e!==i&&!this._oninput&&(t=="disabled"?i!==null?this.slider.setAttribute("disabled","disabled"):this.slider.removeAttribute("disabled"):(this.slider[t]=i,this[t]=i,this.sliderCon.style.setProperty("--percent",(this.value-this.min)/(this.max-this.min)),t==="suffix"&&(this.sliderCon.suffix=i)))}}customElements.get("xy-slider")||customElements.define("xy-slider",$t);class St extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
            :host{
                display: contents;
            }
            .group{
                line-height:2;
                padding:0 .625em;
                opacity:.6;
                font-size: .9em;
            }
            ::slotted(xy-option){
                --paddingLeft:1em;
            }
        </style>
        <div class="group">${this.label}</div>
        <slot></slot>
        `}get label(){return this.getAttribute("label")}}customElements.get("xy-optgroup")||customElements.define("xy-optgroup",St);class It extends HTMLElement{static get observedAttributes(){return["value","selected","disabled"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
            :host{
                display: block;
            }
            :host([hidden]){
                display: none;
            }
            .option {
                display: flex;
                justify-content: flex-start;
                border-radius:0;
                font-size: inherit;
                padding-left:var(--paddingLeft,.625em);
            }
            :host([selected]) .option{
                color:var(--themeColor,#42b983)
            }
        </style>
        <xy-button id="option" class="option" type="flat" ${this.disabled?"disabled":""}><slot></slot></xy-button>
        `}connectedCallback(){this.option=this.shadowRoot.getElementById("option")}focus(){this.option.focus()}get value(){return this.getAttribute("value")}get disabled(){return this.getAttribute("disabled")!==null}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set selected(t){t?this.setAttribute("selected",""):this.removeAttribute("selected")}set focusin(t){t?(this.setAttribute("focusin",""),this.option.setAttribute("focus",""),this.scrollIntoView({block:"nearest"})):(this.removeAttribute("focusin"),this.option.removeAttribute("focus"))}attributeChangedCallback(t,e,i){t=="disabled"&&this.option&&i!=null&&(this.option.disabled=i)}}customElements.get("xy-option")||customElements.define("xy-option",It);class dt extends HTMLElement{static get observedAttributes(){return["open","title","oktext","canceltext","loading","type"]}constructor(t){super();const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <style>
        :host{
            position:absolute;
            display:flex;
            box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
            box-sizing: border-box;
            transform:scale(0);
            opacity:0.5;
            border-radius: 3px;
            z-index:10;
            transition:.3s cubic-bezier(.645, .045, .355, 1);
            transform-origin:inherit;
            background:#fff;
            visibility:hidden;
        }
        .popcon-content{
            box-sizing: border-box;
            display:flex;
            width: max-content;
            padding: 0 15px;
            flex:1;
            flex-direction:column;
        }
        .popcon-title {
            line-height: 30px;
            padding: 15px 30px 0 0;
            font-weight: 700;
            font-size: 14px;
            color: #4c5161;
            user-select: none;
            cursor: default;
        }
        .popcon-body {
            flex: 1;
            padding: 5px 0 15px 0;
        }
        .popcon-footer {
            padding: 3px 0 15px 0;
            margin-top: -3px;
            text-align: right;
            white-space: nowrap;
        }
        .btn-close{
            position:absolute;
            right:10px;
            top:10px;
            border:0;
        }
        .popcon-footer xy-button {
            font-size: .8em;
            margin-left: .8em;
        }
        .popcon-type{
            display:flex;
            width:30px;
            height:30px;
            font-size:22px;
            margin: 15px -10px 0 15px;
        }
        /*
        :host(:not([type="confirm"])) .popcon-type,
        :host(:not([type="confirm"])) .popcon-footer,
        :host(:not([type])) .popcon-title,
        :host(:not([type])) .btn-close{
            display:none;
        }
        */
        :host([type="confirm"]){
            min-width:250px;
        }
        :host([type="confirm"]) .popcon-body{
            font-size:14px;
        }
        :host(:not([type])) .popcon-content,:host(:not([type])) .popcon-body{
            padding: 0;
        }
        </style>
            ${(t||this.type)==="confirm"?'<xy-icon id="popcon-type" class="popcon-type" name="question-circle" color="var(--waringColor,#faad14)"></xy-icon>':""}
            <div class="popcon-content">
                ${(t||this.type)!==null?'<div class="popcon-title" id="title">'+this.title+'</div><xy-button class="btn-close" id="btn-close" icon="close"></xy-button>':""}
                <div class="popcon-body">
                    <slot></slot>
                </div>
                ${(t||this.type)==="confirm"?'<div class="popcon-footer"><xy-button id="btn-cancel">'+this.canceltext+'</xy-button><xy-button id="btn-submit" type="primary">'+this.oktext+"</xy-button></div>":""}
            </div>
        `}get open(){return this.getAttribute("open")!==null}get stopfocus(){return this.getAttribute("stopfocus")!==null}get title(){return this.getAttribute("title")||"popcon"}get type(){return this.getAttribute("type")}get oktext(){return this.getAttribute("oktext")||"确 定"}get canceltext(){return this.getAttribute("canceltext")||"取 消"}get loading(){return this.getAttribute("loading")!==null}set title(t){this.setAttribute("title",t)}set type(t){t===null||t===!1?this.removeAttribute("type"):this.setAttribute("type",t)}set oktext(t){this.setAttribute("oktext",t)}set canceltext(t){this.setAttribute("canceltext",t)}set open(t){t===null||t===!1?(this.removeAttribute("open"),this.parentNode.removeAttribute("open")):(this.setAttribute("open",""),this.parentNode.setAttribute("open",""),this.loading&&(this.loading=!1))}set loading(t){t===null||t===!1?this.removeAttribute("loading"):this.setAttribute("loading","")}connectedCallback(){this.remove=!1,this.type&&(this.titles=this.shadowRoot.getElementById("title"),this.btnClose=this.shadowRoot.getElementById("btn-close")),this.type=="confirm"&&(this.btnCancel=this.shadowRoot.getElementById("btn-cancel"),this.btnSubmit=this.shadowRoot.getElementById("btn-submit")),this.addEventListener("transitionend",t=>{t.propertyName==="transform"&&this.open&&(this.type=="confirm"&&this.btnSubmit.focus(),this.type=="pane"&&this.btnClose.focus(),this.dispatchEvent(new CustomEvent("open")))}),this.addEventListener("transitionend",t=>{t.propertyName==="transform"&&!this.open&&(this.remove&&this.parentNode.removeChild(this),this.dispatchEvent(new CustomEvent("close")))}),this.addEventListener("click",t=>{t.target.closest("[autoclose]")&&(this.open=!1,window.xyActiveElement.focus())}),this.type&&this.btnClose.addEventListener("click",()=>{this.open=!1,window.xyActiveElement.focus()}),this.type=="confirm"&&(this.btnCancel.addEventListener("click",async()=>{this.dispatchEvent(new CustomEvent("cancel")),this.open=!1,window.xyActiveElement.focus()}),this.btnSubmit.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("submit")),this.loading||(this.open=!1,window.xyActiveElement.focus())}))}attributeChangedCallback(t,e,i){t=="open"&&this.shadowRoot&&i==null&&this.stopfocus,t=="loading"&&this.shadowRoot&&(i!==null?this.btnSubmit.loading=!0:this.btnSubmit.loading=!1),t=="title"&&this.titles&&i!==null&&(this.titles.innerHTML=i),t=="oktext"&&this.btnSubmit&&i!==null&&(this.btnSubmit.innerHTML=i),t=="canceltext"&&this.btnCancel&&i!==null&&(this.btnCancel.innerHTML=i)}}customElements.get("xy-popcon")||customElements.define("xy-popcon",dt);class Bt extends HTMLElement{constructor(){super();k(this,"setpop",e=>{const i=e.path||e.composedPath&&e.composedPath();(this.popcon&&!i.includes(this.popcon)&&!this.popcon.loading&&!i.includes(this.children[0])||this.trigger==="contextmenu"&&!i.includes(this.popcon)&&e.which=="1")&&(this.popcon.open=!1)});const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <style>
        :host {
            display:inline-block;
            position:relative;
            overflow:visible;
        }
        :host([dir="top"]) ::slotted(xy-popcon){
            bottom:100%;
            left:50%;
            transform:translate(-50%,-10px) scale(0);
            transform-origin: center bottom;
        }
        :host([dir="top"]) ::slotted(xy-popcon[open]),
        :host([dir="top"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="top"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-50%,-10px) scale(1);
        }
        :host([dir="right"]) ::slotted(xy-popcon){
            left:100%;
            top:50%;
            transform:translate(10px,-50%) scale(0);
            transform-origin: left;
        }
        :host([dir="right"]) ::slotted(xy-popcon[open]),
        :host([dir="right"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="right"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(10px,-50%) scale(1);
        }
        :host([dir="bottom"]) ::slotted(xy-popcon){
            top:100%;
            left:50%;
            transform:translate(-50%,10px) scale(0);
            transform-origin: center top;
        }
        :host([dir="bottom"]) ::slotted(xy-popcon[open]),
        :host([dir="bottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="bottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-50%,10px) scale(1);
        }
        :host([dir="left"]) ::slotted(xy-popcon){
            right:100%;
            top:50%;
            transform:translate(-10px,-50%) scale(0);
            transform-origin: right;
        }
        :host([dir="left"]) ::slotted(xy-popcon[open]),
        :host([dir="left"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="left"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-10px,-50%) scale(1);
        }
        :host([dir="lefttop"]) ::slotted(xy-popcon){
            right:100%;
            top:0;
            transform:translate(-10px) scale(0);
            transform-origin: right top;
        }
        :host([dir="lefttop"]) ::slotted(xy-popcon[open]),
        :host([dir="lefttop"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="lefttop"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-10px) scale(1);
        }
        :host([dir="leftbottom"]) ::slotted(xy-popcon){
            right:100%;
            bottom:0;
            transform:translate(-10px) scale(0);
            transform-origin: right bottom;
        }
        :host([dir="leftbottom"]) ::slotted(xy-popcon[open]),
        :host([dir="leftbottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="leftbottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(-10px) scale(1);
        }
        :host([dir="topleft"]) ::slotted(xy-popcon){
            bottom:100%;
            left:0;
            transform:translate(0,-10px) scale(0);
            transform-origin: left bottom;
        }
        :host([dir="topleft"]) ::slotted(xy-popcon[open]),
        :host([dir="topleft"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="topleft"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,-10px) scale(1);
        }
        :host([dir="topright"]) ::slotted(xy-popcon){
            bottom:100%;
            right:0;
            transform:translate(0,-10px) scale(0);
            transform-origin: right bottom;
        }
        :host([dir="topright"]) ::slotted(xy-popcon[open]),
        :host([dir="topright"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="topright"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,-10px) scale(1);
        }
        :host([dir="righttop"]) ::slotted(xy-popcon){
            left:100%;
            top:0;
            transform:translate(10px) scale(0);
            transform-origin: left top;
        }
        :host([dir="righttop"]) ::slotted(xy-popcon[open]),
        :host([dir="righttop"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="righttop"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(10px) scale(1);
        }
        :host([dir="rightbottom"]) ::slotted(xy-popcon){
            left:100%;
            bottom:0;
            transform:translate(10px) scale(0);
            transform-origin: left bottom;
        }
        :host([dir="rightbottom"]) ::slotted(xy-popcon[open]),
        :host([dir="rightbottom"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="rightbottom"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(10px) scale(1);
        }
        :host([dir="bottomleft"]) ::slotted(xy-popcon),
        :host(:not([dir])) ::slotted(xy-popcon){
            left:0;
            top:100%;
            transform:translate(0,10px) scale(0);
            transform-origin: left top;
        }
        :host(:not([dir])) ::slotted(xy-popcon[open]),
        :host(:not([dir])[trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host(:not([dir])[trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon),
        :host([dir="bottomleft"]) ::slotted(xy-popcon[open]),
        :host([dir="bottomleft"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="bottomleft"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,10px) scale(1);
        }
        :host([dir="bottomright"]) ::slotted(xy-popcon){
            right:0;
            top:100%;
            transform:translate(0,10px) scale(0);
            transform-origin: right top;
        }
        :host([dir="bottomright"]) ::slotted(xy-popcon[open]),
        :host([dir="bottomright"][trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([dir="bottomright"][trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            transform:translate(0,10px) scale(1);
        }
        :host([trigger="contextmenu"]) ::slotted(xy-popcon){
            right:auto;
            bottom:auto;
            left:var(--x,0);
            top:var(--y,100%);
            transform-origin: left top;
            transform:translate(5px,5px) scale(0);
            transition: .15s;
        }
        :host([trigger="contextmenu"]) ::slotted(xy-popcon[open]){
            transform:translate(5px,5px) scale(1);
        }
        :host ::slotted(xy-popcon[open]),
        :host([trigger="hover"]:not([disabled]):hover) ::slotted(xy-popcon),
        :host([trigger="focus"]:not([disabled]):focus-within) ::slotted(xy-popcon){
            opacity:1;
            visibility:visible;
        }
        slot{
            border-radius: inherit;
        }
        </style>
        <slot></slot>
        `}static get observedAttributes(){return["title","oktext","canceltext","loading","type"]}get title(){return this.getAttribute("title")||"popcon"}get trigger(){return this.getAttribute("trigger")}get disabled(){return this.getAttribute("disabled")!==null}get type(){return this.getAttribute("type")}get accomplish(){return this.getAttribute("accomplish")!==null}get content(){return this.getAttribute("content")}get oktext(){return this.getAttribute("oktext")}get canceltext(){return this.getAttribute("canceltext")}get dir(){return this.getAttribute("dir")}get loading(){return this.getAttribute("loading")!==null}set dir(e){this.setAttribute("dir",e)}set title(e){this.setAttribute("title",e)}set type(e){this.setAttribute("type",e)}set oktext(e){this.setAttribute("oktext",e)}set canceltext(e){this.setAttribute("canceltext",e)}set loading(e){e===null||e===!1?this.removeAttribute("loading"):this.setAttribute("loading","")}set disabled(e){e===null||e===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}show(e){if(this.popcon=this.querySelector("xy-popcon"),this.disabled)(this.popcon||this).dispatchEvent(new CustomEvent("submit"));else if(this.popcon||(this.popcon=new dt(this.type),this.popcon.type=this.type,this.appendChild(this.popcon),this.popcon.title=this.title||"popover",this.popcon.innerHTML=this.content||"",this.type=="confirm"&&(this.popcon.oktext=this.oktext||"确 定",this.popcon.canceltext=this.canceltext||"取 消",this.popcon.onsubmit=()=>this.dispatchEvent(new CustomEvent("submit")),this.popcon.oncancel=()=>this.dispatchEvent(new CustomEvent("cancel")))),this.popcon.clientWidth,this.trigger==="contextmenu"){const{x:i,y:o}=this.getBoundingClientRect();this.popcon.style.setProperty("--x",e.clientX-i+"px"),this.popcon.style.setProperty("--y",e.clientY-o+"px"),this.popcon.open=!0}else(e.path||e.composedPath&&e.composedPath()).includes(this.popcon)||(window.xyActiveElement=document.activeElement,this.accomplish?this.popcon.open=!0:this.popcon.open=!this.popcon.open);return this.popcon}connectedCallback(){this.popcon=this.querySelector("xy-popcon"),this.trigger&&this.trigger!=="click"||this.addEventListener("click",this.show),this.trigger==="contextmenu"&&this.addEventListener("contextmenu",e=>{e.preventDefault(),(e.path||e.composedPath&&e.composedPath()).includes(this.popcon)||this.show(e)}),document.addEventListener("mousedown",this.setpop)}disconnectedCallback(){document.removeEventListener("mousedown",this.popcon)}attributeChangedCallback(e,i,o){e=="loading"&&this.popcon&&(o!==null?this.popcon.loading=!0:this.popcon.loading=!1),e=="title"&&this.popcon&&o!==null&&(this.popcon.title=o),e=="oktext"&&this.popcon&&o!==null&&(this.popcon.oktext=o),e=="canceltext"&&this.popcon&&o!==null&&(this.popcon.canceltext=o)}}customElements.get("xy-popover")||customElements.define("xy-popover",Bt);class Tt extends HTMLElement{static get observedAttributes(){return["value","disabled","type"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display:inline-block;
            font-size: 14px;
            border-radius: var(--borderRadius,.25em);
        }
        :host([block]){
            display:block;
        }
        
        :host(:not([disabled]):not([type="primary"]):focus-within) #select,
        :host(:not([disabled]):not([type="primary"]):hover) #select{
            border-color:var(--themeColor,#42b983);
            color:var(--themeColor,#42b983);
        }

        :host([search]:focus-within:not([disabled])) #select, 
        :host([search]:not([disabled]):hover) #select{
            color: var(--themeColor,#42b983);
        }

        :host([disabled]){
            pointer-events:none;
        }
        
        :host(:focus-within) xy-popover,:host(:active) xy-popover{ 
            z-index: 2;
        }
        xy-tips{
            display:block;
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }
        
        #select:not([type="primary"]){
            display:flex;
            width:100%;
            height:100%;
            font-size: inherit;
            color: currentColor;
            border-radius: inherit;
        }
        :host([search]) #select{
            color:currentColor;
        }

        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        :host([invalid]) #select:not([type="primary"]){
            color:var(--errorColor,#f4615c);
        }

        #select span{
            flex:1;
            text-align:left;
            white-space: nowrap;
            text-overflow: ellipsis;
            flex-grow: 1;
            overflow: hidden;
        }
        
        xy-input::after{
            content:'';
            position:absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            cursor:default;
            pointer-events:none;
        }
        #select[readonly]::after{
            pointer-events:all;
        }
        .arrow{
            position:relative;
            font-size:.9em;
            transform:scaleY(.8);
            margin-left:.5em;
            pointer-events:none;
            width:1em;
            height:1em;
            fill:currentColor;
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        :host([search]) .arrow{
            transition:color .3s  cubic-bezier(.645, .045, .355, 1),.3s transform cubic-bezier(.645, .045, .355, 1);
        }
        xy-popover[open] .arrow{
            transform:scaleY(-.8);
        }
        xy-popover{
            display:block;
            height:inherit;
            border-radius: inherit;
        }
        xy-popcon{
            min-width:100%;
            overflow:auto;
            max-height:50vh;
            scroll-behavior: smooth;
        }
        :host([search]) xy-popcon::before{
            display:none;
            box-sizing: border-box;
            width:100%;
            content:'没有匹配到任何选项';
            padding: .25em .625em;
            line-height: 1.8;
            color:var(--fontColor,#333);
            white-space:nowrap;
            opacity:.5;
        }
        :host([empty]) xy-popcon::before{
            display:block;
        }
        </style>
        <style id="filter"></style>
        <xy-popover id="root" ${this.search?"accomplish":""}>
            <xy-tips id="tip" type="error">
                <${this.search?"xy-input":"xy-button"} id="select" debounce="200" readonly ${this.disabled?"disabled":""} ${this.type?"type="+this.type:""}>${this.search?"":'<span id="value"></span>'}<svg class="arrow" viewBox="0 0 1024 1024"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"></path></svg></${this.search?"xy-input":"xy-button"}>
            </xy-tips>
            <xy-popcon id="options">
                <slot id="slot"></slot>
            </xy-popcon>
        </xy-popover>
        `}move(t){const e=this.nodes[this.focusIndex],i=t+this.focusIndex,o=this.nodes[i];o&&(e&&(e.focusin=!1),o.focusin=!0,this.focusIndex=i)}movein(t){this.focusIndex=t+this.focusIndex,this.focusIndex<0&&(this.focusIndex=this.nodes.length-1),this.focusIndex===this.nodes.length&&(this.focusIndex=0),this.nativeclick=!0,this.value=this.nodes[this.focusIndex].value}focus(){this.select.focus()}reset(){this.value=this.defaultvalue,this.tip.show=!1,this.invalid=!1}checkValidity(){return this.novalidate||this.disabled||this.form&&this.form.novalidate?!0:this.validity?(this.tip.show=!1,this.invalid=!1,!0):(this.focus(),this.tip.show="show",this.invalid=!0,this.tip.tips=this.errortips,!1)}connectedCallback(){this.form=this.closest("xy-form"),this.root=this.shadowRoot.getElementById("root"),this.select=this.shadowRoot.getElementById("select"),this.options=this.shadowRoot.getElementById("options"),this.slots=this.shadowRoot.getElementById("slot"),this.txt=this.shadowRoot.getElementById("value"),this.tip=this.shadowRoot.getElementById("tip"),this.focusIndex=-1,this.addEventListener("keydown",t=>{if(this.options.open)switch(t.keyCode){case 9:t.preventDefault();break;case 38:t.preventDefault(),this.move(-1);break;case 40:t.preventDefault(),this.move(1);break;case 27:t.preventDefault(),this.options.open=!1;break}else switch(t.keyCode){case 38:t.preventDefault(),this.movein(-1);break;case 40:t.preventDefault(),this.movein(1);break}}),this.select.addEventListener("focus",t=>{t.stopPropagation(),this.isfocus||(this.checkValidity(),this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.value}})))}),this.options.addEventListener("click",t=>{this.focus();const e=t.target.closest("xy-option");e&&(this.nativeclick=!0,this.value=e.value)}),this.options.addEventListener("close",t=>{this.search&&(this.select.readonly=!0,this.select.value=this.$text,this.nodes=[...this.querySelectorAll("xy-option:not([disabled])")],this.filter.textContent="",this.empty=!1);const e=this.querySelector("xy-option[focusin]"),i=this.querySelector("xy-option[selected]");e&&(e.focusin=!1),i?(i.focusin=!0,this.focusIndex=this.nodes.indexOf(i)):this.focusIndex=-1}),this.options.addEventListener("open",t=>{this.search&&(this.select.value="",this.select.readonly=!1,this.focus())}),this.search?(this.filter=this.shadowRoot.getElementById("filter"),this.select.addEventListener("input",t=>{const e=this.select.value.trim();e===""?(this.nodes=[...this.querySelectorAll("xy-option:not([disabled])")],this.filter.textContent=""):(this.nodes=[...this.querySelectorAll(`xy-option[key*="${e}" i]:not([disabled])`)],this.filter.textContent=`
                    :host([search]) ::slotted(xy-option:not([key*="${e}" i]))
                    {
                        display:none;
                    }
                    `);const i=this.querySelector("xy-option[focusin]");i&&(i.focusin=!1),this.nodes[0]?(this.nodes[0].focusin=!0,this.empty=!1):this.empty=!0,this.focusIndex=0}),this.select.addEventListener("submit",t=>{if(!this.options.open)this.options.open=!0;else{const e=this.nodes[this.focusIndex];this.nativeclick=!0,e?this.value=e.value:(this.value=this.$value,this.options.open=!1)}})):this.addEventListener("click",t=>{if(!this.options.open){const e=this.nodes[this.focusIndex];e&&(this.nativeclick=!0,this.value=e.value)}}),this.select.addEventListener("blur",t=>{t.stopPropagation(),getComputedStyle(this.root).zIndex==2?this.isfocus=!0:(this.isfocus=!1,this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.value}})))}),this.slots.addEventListener("slotchange",()=>{this.nodes=[...this.querySelectorAll("xy-option:not([disabled])")],this.defaultvalue?this.value=this.defaultvalue:this.value="",this.init=!0})}get defaultvalue(){return this.getAttribute("defaultvalue")||""}get value(){return this.$value||""}get text(){return this.$text||this.placeholder}get name(){return this.getAttribute("name")}get empty(){return this.getAttribute("empty")!==null}get type(){return this.getAttribute("type")}get validity(){return this.required?this.value!=="":!0}get novalidate(){return this.getAttribute("novalidate")!==null}get errortips(){return this.getAttribute("errortips")||"请选择一项"}get required(){return this.getAttribute("required")!==null}get invalid(){return this.getAttribute("invalid")!==null}get disabled(){return this.getAttribute("disabled")!==null}get search(){return this.getAttribute("search")!==null}get placeholder(){return this.getAttribute("placeholder")||"请选择"}set required(t){t===null||t===!1?this.removeAttribute("required"):this.setAttribute("required","")}set invalid(t){t===null||t===!1?this.removeAttribute("invalid"):this.setAttribute("invalid","")}set novalidate(t){t===null||t===!1?this.removeAttribute("novalidate"):this.setAttribute("novalidate","")}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set empty(t){t===null||t===!1?this.removeAttribute("empty"):this.setAttribute("empty","")}set defaultvalue(t){this.setAttribute("defaultvalue",t)}set value(t){if(t===""){if(this.$value="",this.$text=this.placeholder,this.focusIndex>=0){const e=this.nodes[this.focusIndex];e&&(this.focusIndex=-1,e.selected=!1,e.focusin=!1)}this.search?(this.select.placeholder=this.placeholder,this.select.value=""):this.txt.textContent=this.placeholder;return}if(t!==this.value){this.$value=t;const e=this.querySelector("xy-option[selected]");e&&(e.selected=!1,e.focusin=!1);const i=this.querySelector(`xy-option[value="${t}"]`)||this.querySelector("xy-option");this.focusIndex=this.nodes.indexOf(i),i.selected=!0,i.focusin=!0,this.$text=i.textContent,this.search?(this.select.placeholder=this.$text,this.select.value=this.$text):(this.select.title=this.$text,this.txt.textContent=this.$text),this.nativeclick&&(this.nativeclick=!1,this.checkValidity(),this.dispatchEvent(new CustomEvent("change",{detail:{value:t,text:this.$text}})))}this.options.open=!1}attributeChangedCallback(t,e,i){t=="disabled"&&this.select&&(i!=null?this.select.disabled=!0:this.select.disabled=!1)}}customElements.get("xy-select")||customElements.define("xy-select",Tt);class Mt extends HTMLElement{static get observedAttributes(){return["label","key","disabled","icon"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <slot></slot>
        `}get label(){return this.getAttribute("label")||""}get icon(){return this.getAttribute("icon")}get key(){return this.getAttribute("key")}get disabled(){return this.getAttribute("disabled")}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled",t)}set label(t){this.setAttribute("label",t)}set key(t){this.setAttribute("key",t)}attributeChangedCallback(t,e,i){e!==i&&i!==void 0&&(t==="label"&&this.parentNode.updatalabel&&this.parentNode.updatalabel(this.key,i),t==="disabled"&&this.parentNode.updatadisabled&&this.parentNode.updatadisabled(this.key,i))}}customElements.get("xy-tab-content")||customElements.define("xy-tab-content",Mt);class Dt extends HTMLElement{static get observedAttributes(){return["activekey"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display:block;
            text-align: unset;
        }
        .tab{
            display:flex;
            flex-direction:column;
            height: 100%;
            overflow: hidden;
        }
        .tab-nav-con{
            position:relative;
            overflow:hidden;
            scroll-behavior: smooth;
        }
        .tab-nav{
            display:flex;
        }
        .nav-item{
            font-size:inherit;
            border-radius:0;
            box-shadow:none;
            flex-shrink: 0;
            border-color:transparent;
        }
        :host(:not([type="line"])) .nav-item.active{
            color:var(--themeColor,#42b983);
        }
        .tab-line{
            position:absolute;
            width:0;
            margin-top:-2px;
            height:2px;
            border-radius:2px;
            background:var(--themeColor,#42b983);
            transition:.2s;
        }
        .tab-content{
            overflow:hidden;
            flex:1;
            transition:.2s;
        }
        .tab-content-wrap{
            display:flex;
            width:100%;
            height:100%;
            transition:.2s;
        }
        :host([type="card"]) .tab-line,
        :host([type="line"]) .tab-line{
            visibility:hidden;
        }
        :host([type="card"]) .nav-item{
            border-radius:.5em .5em 0 0;
        }
        :host([type="line"]) .nav-item{
            border-radius:var(--borderRadius,.25em) var(--borderRadius,.25em) 0 0;
        }
        :host([type="card"]) .nav-item.active,:host([type="card"]) .tab-content{
            background-color:#fff;
        }
        :host([type="line"]) .nav-item.active{
            border-color:var(--borderColor,rgba(0,0,0,.2)) var(--borderColor,rgba(0,0,0,.2)) transparent;
        }
        :host([type="line"]) .tab-nav-con{
            oveflow:hidden;
        }
        :host([type="line"]) .tab-line{
            transition:none;
        }
        :host([type="line"]) .tab-line::before,
        :host([type="line"]) .tab-line::after{
            content:'';
            position:absolute;
            visibility:visible;
            width:9999px;
            height:1px;
            bottom:0;
            background:var(--borderColor,rgba(0,0,0,.2));
        }
        :host([type="line"]) .tab-line::before{
            right:100%;
        }
        :host([type="line"]) .tab-line::after{
            left:100%;
        }
        :host([type="card"]) .tab-content-wrap,
        :host([type="line"]) .tab-content-wrap{
            transition:none;
        }
        :host([align="center"]) .tab-nav{
            justify-content:center;
        }
        :host([align="end"]) .tab-nav{
            justify-content:flex-end;
        }
        ::slotted(xy-tab-content){
            box-sizing:border-box;
            width:100%;
            height:100%;
            padding:10px;
            flex-shrink:0;
            overflow:auto;
        }
        </style>
        <style id="filter"></style>
        <div class="tab">
            <div class="tab-nav-con">
                <div class="tab-nav" id="nav"></div>
                <i class="tab-line" id="tab-line"></i>
            </div>
            <div class="tab-content">
                <div class="tab-content-wrap" id="tab-content"><slot id="slot">NEED CONTENT</slot></div>
            </div>
        </div>
        `}get align(){return this.getAttribute("align")||"start"}get type(){return this.getAttribute("type")||"flat"}get activekey(){return this.getAttribute("activekey")}set align(t){this.setAttribute("align",t),this.inittab()}set activekey(t){this.setAttribute("activekey",t)}set type(t){this.setAttribute("type",t)}inittab(){const t=this.nav.querySelectorAll(".nav-item");Array.from(t).forEach((e,i)=>{this.tabPos[e.dataset.key]={index:i,width:e.offsetWidth,left:e.offsetLeft,label:e.textContent}}),this.activekey&&(this.tabline.style=`width:${this.tabPos[this.activekey].width}px;transform:translateX(${this.tabPos[this.activekey].left}px)`)}updatalabel(t,e){const i=this.nav.querySelector(`.nav-item[data-key='${t}']`);i&&(i.innerHTML=e,this.inittab())}updatadisabled(t,e){const i=this.nav.querySelector(`.nav-item[data-key='${t}']`);i&&(i.disabled=e)}connectedCallback(){this.tabPos={},this.nav=this.shadowRoot.getElementById("nav"),this.tab=this.shadowRoot.getElementById("tab-content"),this.tabline=this.shadowRoot.getElementById("tab-line"),this.slots=this.shadowRoot.getElementById("slot"),this.filter=this.shadowRoot.getElementById("filter"),this.slots.addEventListener("slotchange",()=>{const t=this.slots.assignedElements();let e="";t.forEach((i,o)=>{i.tagName==="XY-TAB-CONTENT"&&(i.key===null&&(i.key=o),e+=`<xy-button class="nav-item ${i.key===this.activekey?"active":""}" icon=${i.icon} ${i.disabled!==null?"disabled":""} data-key=${i.key}>${i.label}</xy-button>`)}),this.nav.innerHTML=e,this.inittab(),this.activekey===null?this.activekey=t[0].key:this.activekey=this.activekey,this.init=!0}),this.nav.addEventListener("click",t=>{const e=t.target.closest("xy-button");e&&(this.activekey=e.dataset.key)}),this.nav.addEventListener("keydown",t=>{switch(t.keyCode){case 37:t.preventDefault(),this.movein(-1);break;case 39:t.preventDefault(),this.movein(1);break}})}movein(t){const e=this.nav.querySelector(".nav-item.active");t>0&&e.nextElementSibling&&(this.activekey=e.nextElementSibling.dataset.key),t<0&&e.previousElementSibling&&(this.activekey=e.previousElementSibling.dataset.key)}attributeChangedCallback(t,e,i){if(t=="activekey"&&this.tab){let o=this.tabPos[i];if(o===void 0&&(this.activekey=this.slots.assignedElements()[0].key,o=this.tabPos[this.activekey]),this.tabline.style=`width:${o.width}px;transform:translateX(${o.left}px)`,this.tab.style.transform=`translateX(${-o.index*100}%)`,this.filter.textContent=`
            ::slotted(xy-tab-content:not([key="${this.activekey}"])){
                height:0;
                overflow:visible;
            }
            `,e!==i){this.nav.parentNode.scrollLeft=o.left+o.width/2-this.nav.parentNode.offsetWidth/2;const r=this.nav.querySelector(".nav-item.active");r&&r.classList.remove("active");const a=this.nav.querySelector(`.nav-item[data-key='${i}']`);a.classList.add("active"),a.focus(),this.init&&e!==null&&this.dispatchEvent(new CustomEvent("change",{detail:{key:this.activekey,index:o.index,label:o.label}}))}}}}customElements.get("xy-tab")||customElements.define("xy-tab",Dt);class Ht extends HTMLElement{static get observedAttributes(){return["disabled","checked"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{ 
            display:inline-block; 
            -webkit-tap-highlight-color: transparent;
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #switch{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) label::after,:host(:active) ::after{ 
            background:var(--themeColor,#42b983);
        }
        :host(:focus-within) label{ 
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1); */
        }
        :host(:focus-within) #switch,:host(:active) #switch{
            z-index:2
        }
        label{
            cursor:pointer;
            display:flex;
            width:2.4em;
            height:1.2em;
            padding:.125em;
            border-radius:1.2em;
            background:#eee;
            transition:.3s width,.3s height,.3s background-color;
        }
        label::before{
            content:'';
            flex:0;
            transition:.2s cubic-bezier(.12, .4, .29, 1.46) flex;
        }
        label::after{
            content:'';
            width:.4em;
            height:.4em;
            border-radius:1.2em;
            border:.4em solid #fff;
            background:#fff;
            transition:.3s background,.3s padding,.3s width,.3s height,.3s border-radius,.3s border;
            box-shadow: 0 2px 4px 0 rgba(0,35,11,0.2);
        }
        label:active::after{
            padding:0 .3em;
        }
        #switch:checked+label{
            background:var(--themeBackground,var(--themeColor,#42b983));
        }
        #switch:checked+label::before{
            flex:1;
        }
        </style>
        <input type="checkbox" id="switch"><label for="switch"></label>
        `}get disabled(){return this.getAttribute("disabled")!==null}get checked(){return this.getAttribute("checked")!==null}get name(){return this.getAttribute("name")}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set checked(t){t===null||t===!1?this.removeAttribute("checked"):this.setAttribute("checked","")}focus(){this.switch.focus()}connectedCallback(){this.switch=this.shadowRoot.getElementById("switch"),this.disabled=this.disabled,this.checked=this.checked,this.switch.addEventListener("change",t=>{this.checked=this.switch.checked,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked}}))}),this.switch.addEventListener("keydown",t=>{switch(t.keyCode){case 13:this.checked=!this.checked;break}}),this.switch.addEventListener("focus",t=>{t.stopPropagation(),this.isfocus||this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.value}}))}),this.switch.addEventListener("blur",t=>{t.stopPropagation(),getComputedStyle(this.switch).zIndex==2?this.isfocus=!0:(this.isfocus=!1,this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.value}})))})}attributeChangedCallback(t,e,i){t=="disabled"&&this.switch&&(i!==null?this.switch.setAttribute("disabled","disabled"):this.switch.removeAttribute("disabled")),t=="checked"&&this.switch&&(i!==null?this.switch.checked=!0:this.switch.checked=!1)}}customElements.get("xy-switch")||customElements.define("xy-switch",Ht);class Pt extends HTMLElement{static get observedAttributes(){return["disabled","checked","required"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{ 
            display:inline-block;
            font-size:14px;
            color:var(--fontColor,#333);
            -webkit-tap-highlight-color: transparent;
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #checkbox{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,#42b983);
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
            z-index:1;
        }
        :host(:focus-within) #checkbox,:host(:active) #checkbox{
            z-index:2
        }
        :host([disabled]) .cheked{ 
            background:rgba(0,0,0,.1);
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
        }
        xy-tips{
            display:block;
            padding-left: 0.575em;
            margin-left: -0.575em;
        }
        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        .cheked{
            display:flex;
            justify-content: center;
            align-items: center;
            margin-right:.5em;
            position:relative;
            width: 1em;
            height: 1em;
            border: 0.0875em solid var(--borderColor,rgba(0,0,0,.2));
            border-radius: 0.15em;
            text-align: initial;
            transition:.3s;
        }
        :host(:empty) .cheked{
            margin-right:0;
        }
        .cheked::before{
            position:absolute;
            content:'';
            width:74%;
            height:0.15em;
            background:#fff;
            transform:scale(0);
            border-radius: 0.15em;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        .cheked::after{
            position:absolute;
            content:'';
            width:100%;
            height:100%;
            background:var(--themeColor,#42b983);
            border-radius:50%;
            opacity:.2;
            transform:scale(0);
            z-index:-1;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        /*
        :host(:focus-within) .cheked::after,:host(:active:not([disabled])) .cheked::after{ 
            transform:scale(2.5);
        }
        */
        .icon{
            width: 100%;
            height: 100%;
            transform: scale(0);
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        #checkbox:focus-visible+label .cheked::after{
            transform:scale(2.5);
        }
        #checkbox:checked:not(:indeterminate)+label .cheked .icon{
            transform: scale(1.5);
        }
        #checkbox:checked+label .cheked,
        #checkbox:indeterminate+label .cheked{
            border-color:transparent;
            background-color:var(--themeColor,#42b983);
        }
        #checkbox:indeterminate+label .cheked::before{
            transform:scale(1);
        }
        </style>
        <xy-tips id="tip" type="error" dir="topleft">
            <input type="checkbox" id="checkbox">
            <label for="checkbox">
                <span class="cheked"><svg class="icon" style="fill: #fff;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1408"><path d="M700.7232 331.008l73.984 70.7584-329.5744 344.7808-192.6656-190.1056 71.936-72.9088L443.0336 600.576z"></path></svg></span>
                <slot></slot>
            </label>
        </xy-tips>
        `}get disabled(){return this.getAttribute("disabled")!==null}get novalidate(){return this.getAttribute("novalidate")!==null}get required(){return this.getAttribute("required")!==null}get name(){return this.getAttribute("name")}get checked(){return this.getAttribute("checked")!==null}get indeterminate(){return this.checkbox.indeterminate}get value(){return this.getAttribute("value")||this.textContent}get invalid(){return this.getAttribute("invalid")!==null}get validity(){return this.checkbox.checkValidity()}get errortips(){return this.getAttribute("errortips")}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set checked(t){t===null||t===!1?this.removeAttribute("checked"):this.setAttribute("checked","")}set indeterminate(t){t===null||t===!1?this.checkbox.indeterminate=!1:this.checkbox.indeterminate=!0}set required(t){t===null||t===!1?this.removeAttribute("required"):this.setAttribute("required","")}set novalidate(t){t===null||t===!1?this.removeAttribute("novalidate"):this.setAttribute("novalidate","")}set invalid(t){t===null||t===!1?this.removeAttribute("invalid"):this.setAttribute("invalid","")}focus(){this.checkbox.focus()}reset(){this.checkbox.checked=!1,this.invalid=!1,this.tip.show=!1}checkValidity(){return this.novalidate||this.disabled||this.form&&this.form.novalidate?!0:this.validity?(this.invalid=!1,this.tip.show=!1,!0):(this.focus(),this.invalid=!0,this.tip.show="show",this.tip.tips=this.errortips||this.checkbox.validationMessage,!1)}connectedCallback(){this.form=this.closest("xy-form"),this.checkbox=this.shadowRoot.getElementById("checkbox"),this.tip=this.shadowRoot.getElementById("tip"),this.disabled=this.disabled,this.checked=this.checked,this.checkbox.addEventListener("change",t=>{this.checked=this.checkbox.checked,this.checkValidity(),this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked}}))}),this.checkbox.addEventListener("focus",t=>{t.stopPropagation(),this.isfocus||this.dispatchEvent(new CustomEvent("focus",{detail:{value:this.value}}))}),this.checkbox.addEventListener("blur",t=>{t.stopPropagation(),getComputedStyle(this.checkbox).zIndex==2?this.isfocus=!0:(this.isfocus=!1,this.dispatchEvent(new CustomEvent("blur",{detail:{value:this.value}})))}),this.required=this.required}attributeChangedCallback(t,e,i){t=="disabled"&&this.checkbox&&(i!==null?this.checkbox.setAttribute("disabled","disabled"):this.checkbox.removeAttribute("disabled")),t=="checked"&&this.checkbox&&(i!==null?this.checkbox.checked=!0:this.checkbox.checked=!1),t=="required"&&this.checkbox&&(i!==null?this.checkbox.setAttribute("required","required"):this.checkbox.removeAttribute("required"))}}customElements.get("xy-checkbox")||customElements.define("xy-checkbox",Pt);class qt extends HTMLElement{static get observedAttributes(){return["disabled","required"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:inline-block;
        }
        :host(:focus-within) xy-tips,:host(:hover) xy-tips{
            z-index:2;
        }
        :host([disabled]){ 
            pointer-events: none; 
        }
        :host([disabled]) xy-tips{
            pointer-events: all;
            cursor: not-allowed;
            outline: 0;
        }
        :host([disabled]) ::slotted(xy-checkbox){
            pointer-events: none;
            opacity:.6;
        }
        ::slotted(xy-checkbox){
            transition: opacity .3s;
        }
        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        </style>
        <xy-tips id="tip" ${this.disabled?"tabindex='-1'":""} type="error"><slot></slot></xy-tips>
        `}get name(){return this.getAttribute("name")}get min(){const t=this.getAttribute("min")||0;return this.required?Math.max(1,t):t}get max(){return this.getAttribute("max")||1/0}get required(){return this.getAttribute("required")!==null}get disabled(){return this.getAttribute("disabled")!==null}get defaultvalue(){const t=this.getAttribute("defaultvalue");return t?t.split(","):[]}get value(){return[...this.querySelectorAll("xy-checkbox[checked]")].map(t=>t.value)}get novalidate(){return this.getAttribute("novalidate")!==null}get validity(){return this.len=this.value.length,!this.required&&this.len==0?!0:this.len>=this.min&&this.len<=this.max}get invalid(){return this.getAttribute("invalid")!==null}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set value(t){this.elements.forEach(e=>{t.includes(e.value)?e.checked=!0:e.checked=!1})}set required(t){t===null||t===!1?this.removeAttribute("required"):this.setAttribute("required","")}set novalidate(t){t===null||t===!1?this.removeAttribute("novalidate"):this.setAttribute("novalidate","")}set invalid(t){t===null||t===!1?this.removeAttribute("invalid"):this.setAttribute("invalid","")}focus(){getComputedStyle(this.tip).zIndex!=2&&this.elements[0].focus()}reset(){this.value=this.defaultvalue,this.invalid=!1,this.tip.show=!1}checkall(){this.elements.forEach(t=>{t.checked=!0})}checkValidity(){return this.novalidate||this.disabled||this.form&&this.form.novalidate?!0:this.validity?(this.tip.show=!1,this.invalid=!1,!0):(this.focus(),this.tip.show="show",this.invalid=!0,this.len<this.min&&(this.tip.tips=`请至少选择${this.min}项`),this.len>this.max&&(this.tip.tips=`至多选择${this.max}项`),!1)}connectedCallback(){this.form=this.closest("xy-form"),this.tip=this.shadowRoot.getElementById("tip"),this.slots=this.shadowRoot.querySelector("slot"),this.slots.addEventListener("slotchange",()=>{this.elements=this.querySelectorAll("xy-checkbox"),this.value=this.defaultvalue,this.elements.forEach(t=>{t.addEventListener("change",()=>{this.checkValidity(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))})}),this.init=!0})}attributeChangedCallback(t,e,i){t=="disabled"&&this.tip&&(i!==null?this.tip.setAttribute("tabindex",-1):this.tip.removeAttribute("tabindex"))}}customElements.get("xy-checkbox-group")||customElements.define("xy-checkbox-group",qt);class Xt extends HTMLElement{static get observedAttributes(){return["disabled","checked"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{ 
            display:inline-block;
            font-size:14px;
            color:var(--fontColor,#333);
            -webkit-tap-highlight-color: transparent;
        }
        :host([disabled]){ 
            pointer-events: none; 
            opacity:.6; 
        }
        :host([disabled]) label{ 
            pointer-events: all;  
            cursor: not-allowed; 
        }
        #radio{
            position:absolute;
            clip:rect(0,0,0,0);
        }
        :host(:focus-within) .cheked,:host(:not([disabled])) label:hover .cheked{ 
            border-color:var(--themeColor,#42b983);
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
            z-index:1;
        }
        :host([disabled]) .cheked{ 
            background:rgba(0,0,0,.1);
        }
        label{
            box-sizing:border-box;
            cursor:pointer;
            display:flex;
            align-items:center;
            outline:0;
        }
        .cheked{
            position:relative;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            display: flex;
            border-radius:50%;
            border: 1px solid var(--borderColor,rgba(0,0,0,.2));
            transition:.3s;
            margin-right:.5em;
        }
        :host(:empty) .cheked{
            margin-right:0;
        }
        .cheked::before{
            content:'';
            width:8px;
            height:8px;
            margin:auto;
            border-radius:50%;
            background:var(--themeColor,#42b983);
            transform: scale(0);
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        .cheked::after{
            position:absolute;
            content:'';
            width:100%;
            height:100%;
            background:var(--themeColor,#42b983);
            border-radius:50%;
            opacity:.2;
            transform:scale(0);
            z-index:-1;
            transition: .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        }
        /*
        :host(:focus-within) .cheked::after,:host(:not([disabled]):active) .cheked::after{ 
            transform:scale(2.5);
        }
        */
        #radio:focus-visible+label .cheked::after{
            transform:scale(2.5);
        }
        #radio:checked+label .cheked::before{
            transform: scale(1);
        }
        #radio:checked+label .cheked{
            border-color:var(--themeColor,#42b983);
        }
        </style>
        <input type="checkbox" id="radio" ><label id="label" for="radio"><span class="cheked"></span><slot></slot></label>
        `}get disabled(){return this.getAttribute("disabled")!==null}get checked(){return this.getAttribute("checked")!==null}get name(){return this.getAttribute("name")}get value(){return this.getAttribute("value")||this.textContent}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set checked(t){t===null||t===!1?this.removeAttribute("checked"):this.setAttribute("checked","")}set value(t){this.setAttribute("value",t)}focus(){this.radio.focus()}tocheck(){const t=this.group?"xy-radio[checked]":`xy-radio[name="${this.name}"][checked]`,e=this.parent.querySelector(t);e&&(e.checked=!1),this.checked=!0}connectedCallback(){this.group=this.closest("xy-radio-group"),this.parent=this.group||this.getRootNode(),this.radio=this.shadowRoot.getElementById("radio"),this.disabled=this.disabled,this.checked=this.checked,this.radio.addEventListener("change",t=>{this.tocheck(),this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked}}))})}attributeChangedCallback(t,e,i){t=="disabled"&&this.radio&&(i!==null?this.radio.setAttribute("disabled","disabled"):this.radio.removeAttribute("disabled")),t=="checked"&&this.radio&&(i!==null?this.radio.checked=!0:this.radio.checked=!1)}}customElements.get("xy-radio")||customElements.define("xy-radio",Xt);class Ot extends HTMLElement{static get observedAttributes(){return["disabled","required"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:inline-block;
        }
        :host(:focus-within) xy-tips,:host(:hover) xy-tips{
            z-index:2;
        }
        :host([disabled]){ 
            pointer-events: none; 
        }
        :host([disabled]) xy-tips{
            pointer-events: all;
            cursor: not-allowed;
            outline: 0;
        }
        ::slotted(xy-radio){
            transition: opacity .3s;
        }
        :host([disabled]) ::slotted(xy-radio){
            pointer-events: none;
            opacity:.6;
        }
        xy-tips[show=show]{
            --themeColor:var(--errorColor,#f4615c);
            --borderColor:var(--errorColor,#f4615c);
        }
        </style>
        <xy-tips id="tip" type="error"><slot></slot></xy-tips>
        `}get name(){return this.getAttribute("name")}get required(){return this.getAttribute("required")!==null}get defaultvalue(){return this.getAttribute("defaultvalue")||""}get value(){const t=this.querySelector("xy-radio[checked]");return t?t.value:""}get novalidate(){return this.getAttribute("novalidate")!==null}get disabled(){return this.getAttribute("disabled")!==null}get validity(){return this.value!==""}get invalid(){return this.getAttribute("invalid")!==null}set value(t){this.elements.forEach(e=>{t==e.value?e.checked=!0:e.checked=!1})}set required(t){t===null||t===!1?this.removeAttribute("required"):this.setAttribute("required","")}set novalidate(t){t===null||t===!1?this.removeAttribute("novalidate"):this.setAttribute("novalidate","")}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set invalid(t){t===null||t===!1?this.removeAttribute("invalid"):this.setAttribute("invalid","")}focus(){getComputedStyle(this.tip).zIndex!=2&&this.elements[0].focus()}reset(){this.value=this.defaultvalue,this.invalid=!1,this.tip.show=!1}checkValidity(){return this.novalidate||this.disabled||this.form&&this.form.novalidate?!0:this.validity?(this.tip.show=!1,this.invalid=!1,!0):(this.focus(),this.invalid=!0,this.tip.show="show",this.tip.tips="请选择1项",!1)}connectedCallback(){this.form=this.closest("xy-form"),this.tip=this.shadowRoot.getElementById("tip"),this.slots=this.shadowRoot.querySelector("slot"),this.slots.addEventListener("slotchange",()=>{this.elements=this.querySelectorAll("xy-radio"),this.value=this.defaultvalue,this.elements.forEach(t=>{t.addEventListener("change",()=>{t.checked&&(this.checkValidity(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}})))})}),this.init=!0})}attributeChangedCallback(t,e,i){t=="disabled"&&this.tip&&(i!==null?this.tip.setAttribute("tabindex",-1):this.tip.removeAttribute("tabindex"))}}customElements.get("xy-radio-group")||customElements.define("xy-radio-group",Ot);class Nt extends HTMLElement{static get observedAttributes(){return["gutter"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            --gutter:${this.gutter+"px"};
            display:grid;
            grid-template-columns:repeat(24,1fr);
            grid-gap: var(--gutter,0);
        }
        </style>
        <slot></slot>
        `}get gutter(){return this.getAttribute("gutter")}set gutter(t){this.setAttribute("gutter",t)}attributeChangedCallback(t,e,i){t=="gutter"&&this.shadowRoot&&this.style.setProperty("--gutter",i+"px")}}customElements.get("xy-row")||customElements.define("xy-row",Nt);class jt extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            grid-column: span 1;
        }
        ${Array.from({length:24},(e,i)=>':host([span="'+(i+1)+'"]) {grid-column: span '+(i+1)+`}
`).join("")}
        </style>
        <slot></slot>
        `}}customElements.get("xy-col")||customElements.define("xy-col",jt);class _t extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:flex;
            flex-direction:column;
        }
        :host([row]){
            flex-direction:row;
        }
        :host([column]){
            flex-direction:column;
        }
        :host([expand]){
            flex:1;
        }
        :host([center]:not([center$=Axis])){
            justify-content: center;
            align-items: center;
        }
        :host([center="mainAxis"]){
            justify-content: center;
        }
        :host([center="crosAxis"]){
            align-items: center;
        }

        </style>
        <slot></slot>
        `}}customElements.get("xy-layout")||customElements.define("xy-layout",_t);class ct extends HTMLElement{constructor({multi:e}={}){super();k(this,"setlist",e=>{this.list&&(this.contains(e.target)||this.list.contains(e.target)?this.list.show=!0:this.list.show=!1)});this.multi=e,this.$customValidity=null;const i=this.attachShadow({mode:"open"});i.innerHTML=`
        <style>
        :host{
            box-sizing:border-box;
            display:inline-block;
            border:1px solid var(--borderColor,rgba(0,0,0,.2));
            border-radius:var(--borderRadius,.25em);
            line-height: 1.8;
            transition:border-color .3s,box-shadow .3s;
            padding: .25em .625em;
            color: var(--fontColor,#333);
            font-size: 14px;
        }
        :host(:focus-within){
            /*box-shadow: 0 0 10px rgba(0,0,0,0.1);*/
        }
        :host([block]){
            display:block
        }
        xy-tips[show=show]{
            color:var(--errorColor,#f4615c);
        }
        :host([invalid]){
            --themeColor:var(--errorColor,#f4615c);
            border-color:var(--errorColor,#f4615c);
        }
        :host([invalid]) xy-icon{
            color:var(--errorColor,#f4615c);
        }
        :host(:focus-within:not([disabled])),:host(:not([disabled]):hover){
            border-color:var(--themeColor,#42b983);
        }
        :host([disabled]){ 
            opacity:.8;
            cursor:not-allowed; 
        }
        :host([disabled]) xy-tips{
            pointer-events:none;
            background:rgba(0,0,0,.1);
        }
        :host([label]) .input::placeholder{
            color:transparent;
        }
        :host .input::placeholder{
            color:#999;
        }
        :host(xy-textarea){
            line-height:1.5;
            padding-right:.25em;
        }
        xy-tips{  
            display:flex;
            width: 100%;
            height: 100%;
            align-items:center;
            margin:-.25em -.625em;
            padding:.25em .625em;
            font-family:inherit;
            transition:.3s background-color;
        }
        :host(xy-textarea) xy-tips{
            margin-right:-.25em;
            padding-right:.25em;
            align-items:flex-start;
        }
        .input{
            padding:0;
            text-align: inherit;
            color:currentColor;
            border:0;
            outline:0;
            line-height: inherit;
            font-size:inherit;
            font-family:inherit;
            flex:1;
            min-width: 0;
            -webkit-appearance: none;
            -moz-appearance: textfield;
            background: none;
            overflow-x: hidden;
            transition: color .3s;
            animation: removeBg 0s forwards;
        }
        :host(xy-textarea) .input{
            margin:0;
        }
        input[type="number"]::-webkit-inner-spin-button{
            display:none;
        }
        ::-moz-focus-inner,::-moz-focus-outer{
            border:0;
            outline : 0;
        }
        :host([showtips]){
            pointer-events:all;
        }
        .input-label{
            pointer-events:none;
            margin-left:-0.14em;
            position:absolute;
            transition: transform .3s, color .3s, background-color .3s;
            transform-origin: left;
            padding:0 0.14em;
            color:#999;
        }
        .input:not(:placeholder-shown) ~ .input-label,
        .input:focus ~ .input-label{
            transform: translateY( calc( -50% - 0.43em ) ) scale(0.8);
            background:#fff;
        }
        .input:-moz-ui-invalid{
            box-shadow:none;
        }
        .input::-ms-reveal{
            display:none;
        }
        .icon-pre{
            display:flex;
            margin-right:0.25em;
            color:#999;
        }
        :host(xy-textarea) .icon-pre{
            height:1.5em;
        }
        .btn-right{
            width:2em;
            height:2em;
            margin:-.25em -.5em -.25em .25em;
            padding:0;
            color:#999;
            font-size:inherit;
        }
        .btn-number{
            display:flex;
            flex-direction:column;
            width:1.5em;
            visibility:hidden;
            transition:0s;
        }
        .btn-number xy-button{
            display: flex;
            color: #999;
            border-radius:0;
            width:100%;
            flex:1;
            padding:0;
            font-size:.8em;
            transition:.2s;
        }

        .btn-number xy-button:hover{
            flex:1.5;
        }

        xy-button:not([disabled]):hover,xy-button:not([disabled]):focus-within{
            color:var(--themeColor,#42b983);
        }

        :host(:focus-within:not([disabled])) .icon-pre,:host(:not([disabled]):hover) .icon-pre,:host(:not([disabled]):hover) .input-label,:host(:focus-within:not([disabled])) .input-label{
            color:var(--themeColor,#42b983);
        }

        :host(:focus-within:not([disabled])) .btn-number,:host(:not([disabled]):hover) .btn-number{
            visibility:visible;
        }
        @keyframes removeBg{
            to{
                background:transparent;
            }
        }
        </style>
        <xy-tips id="input-con" dir="${this.errordir}" type="error">
            ${this.icon?'<xy-icon class="icon-pre" name='+this.icon+"></xy-icon>":""}
            <${e?"textarea":"input"} id="input" name="${this.name}" class="input" ${this.type==="number"?'min="'+this.min+'" max="'+this.max+'" step="'+this.step+'"':""} value="${this.defaultvalue}" type="${this.typeMap(this.type)}" placeholder="${this.placeholder}" minlength="${this.minlength}" rows="${this.rows}" maxlength="${this.maxlength}">${e?"</textarea>":""}
            <slot></slot>
            ${this.label&&!this.icon?'<label class="input-label">'+this.label+"</label>":""}
            ${this.type==="password"&&!e?'<xy-button id="btn-pass" class="btn-right" icon="eye-close" type="flat" shape="circle"></xy-button>':""}
            ${this.type==="search"&&!e?'<xy-button id="btn-search" class="btn-right" icon="search" type="flat" shape="circle"></xy-button>':""}
            ${this.type==="number"&&!e?'<div class="btn-right btn-number"><xy-button id="btn-add" icon="up" type="flat"></xy-button><xy-button id="btn-sub" icon="down" type="flat"></xy-button></div>':""}
        </xy-tips>
        `,this.input=i.getElementById("input")}static get observedAttributes(){return["label","disabled","pattern","required","readonly","placeholder","rows"]}checkValidity(){return this.novalidate||this.disabled||this.form&&this.form.novalidate?!0:this.validity?(this.inputCon.show=!1,this.invalid=!1,!0):(this.input.focus(),this.inputCon.show="show",this.invalid=!0,this.input.validity.valueMissing?this.inputCon.tips=this.input.validationMessage:this.customValidity.method(this)?this.inputCon.tips=this.errortips||this.input.validationMessage:this.inputCon.tips=this.customValidity.tips,!1)}connectedCallback(){this.form=this.closest("xy-form"),this.input=this.shadowRoot.getElementById("input"),this.inputCon=this.shadowRoot.getElementById("input-con"),this.input.addEventListener("input",e=>{e.stopPropagation(),this.checkValidity(),this.debounce?(this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.dispatchEvent(new CustomEvent("input",{detail:{value:this.value}})),this.list&&(this.list.filter(this.value),this.list.show=!0)},this.debounce)):(this.dispatchEvent(new CustomEvent("input",{detail:{value:this.value}})),this.list&&(this.list.filter(this.value),this.list.show=!0))}),this.input.addEventListener("change",()=>{this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))}),this.input.addEventListener("focus",e=>{if(this.checkValidity(),this.list){const{left:i,top:o,height:r,width:a}=this.getBoundingClientRect();this.list.style=`left:${i+window.scrollX}px;top:${o+r+window.scrollY}px;min-width:${a}px`,this.list.show=!0}}),this.input.addEventListener("keydown",e=>{switch(e.key){case"ArrowUp":case"ArrowDown":this.list&&(e.preventDefault(),this.list.show=!0);break;case"Escape":case"Tab":this.list&&(this.list.show=!1);break;case"Enter":this.list?(e.preventDefault(),this.list.show=!0):this.dispatchEvent(new CustomEvent("submit",{detail:{value:this.value}}));break}}),this.multi||(this.btnPass=this.shadowRoot.getElementById("btn-pass"),this.btnAdd=this.shadowRoot.getElementById("btn-add"),this.btnSub=this.shadowRoot.getElementById("btn-sub"),this.btnSearch=this.shadowRoot.getElementById("btn-search"),this.btnSearch&&this.btnSearch.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("submit",{detail:{value:this.value}}))}),this.btnPass&&this.btnPass.addEventListener("click",()=>{this.password=!this.password,this.password?(this.input.setAttribute("type","text"),this.btnPass.icon="eye"):(this.input.setAttribute("type","password"),this.btnPass.icon="eye-close"),this.input.focus()}),this.btnAdd&&this.btnAdd.addEventListener("click",()=>{this.input.stepUp(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))}),this.btnSub&&this.btnSub.addEventListener("click",()=>{this.input.stepDown(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))}),this.pattern=this.pattern),document.addEventListener("mousedown",this.setlist),this.list&&(document.body.appendChild(this.list),this.list.addEventListener("submit",e=>{this.focus(),e.target.value&&(this.value=e.target.value,this.list.show=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}})))})),this.disabled=this.disabled,this.required=this.required,this.readonly=this.readonly}disconnectedCallback(){document.removeEventListener("mousedown",this.setlist)}typeMap(e){switch(e){case"password":case"number":case"email":case"tel":case"url":break;default:e="text";break}return e}focus(){this.input.focus()}reset(){this.input.value=this.defaultvalue,this.inputCon.show=!1,this.invalid=!1}get customValidity(){return this.$customValidity||{method:()=>!0}}get value(){return this.input.value}get debounce(){return this.getAttribute("debounce")}get novalidate(){return this.getAttribute("novalidate")!==null}get name(){return this.getAttribute("name")||""}get invalid(){return this.getAttribute("invalid")!==null}get readonly(){return this.getAttribute("readonly")!==null}get validity(){return this.input.checkValidity()&&this.customValidity.method(this)}get errordir(){return this.getAttribute("errordir")||"top"}get defaultvalue(){return this.getAttribute("defaultvalue")||""}get rows(){return this.getAttribute("rows")||3}get icon(){return this.getAttribute("icon")}get type(){return this.getAttribute("type")}get disabled(){return this.getAttribute("disabled")!==null}get label(){return this.getAttribute("label")||""}get placeholder(){return this.getAttribute("placeholder")||this.label}get min(){return this.getAttribute("min")||0}get max(){return this.getAttribute("max")||1/0}get minlength(){return this.getAttribute("minlength")||""}get maxlength(){return this.getAttribute("maxlength")||""}get step(){return this.getAttribute("step")||1}get required(){return this.getAttribute("required")!==null}get pattern(){return this.getAttribute("pattern")}get errortips(){return this.getAttribute("errortips")}get list(){const e=this.getAttribute("list");return e?this.getRootNode().getElementById(e):null}get options(){return this.list?this.list.options:[]}set disabled(e){e===null||e===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set required(e){e===null||e===!1?this.removeAttribute("required"):this.setAttribute("required","")}set readonly(e){e===null||e===!1?this.removeAttribute("readonly"):this.setAttribute("readonly","")}set invalid(e){e===null||e===!1?this.removeAttribute("invalid"):this.setAttribute("invalid","")}set pattern(e){e===null||e===!1?this.removeAttribute("pattern"):this.setAttribute("pattern",e)}set label(e){this.setAttribute("label",e)}set icon(e){this.setAttribute("icon",e)}set placeholder(e){this.setAttribute("placeholder",e)}set rows(e){this.setAttribute("rows",e)}set customValidity(e){this.$customValidity=e}set novalidate(e){e===null||e===!1?this.removeAttribute("novalidate"):this.setAttribute("novalidate","")}set value(e){this.input.value=e}attributeChangedCallback(e,i,o){e=="disabled"&&this.input&&(o!==null?this.input.parentNode.setAttribute("tabindex","-1"):this.input.parentNode.removeAttribute("tabindex")),e=="pattern"&&this.input&&(o!==null?this.input.setAttribute("pattern",o):this.input.removeAttribute("pattern")),e=="placeholder"&&this.input&&(o!==null?this.input.setAttribute("placeholder",o):this.input.removeAttribute("placeholder")),e=="required"&&this.input&&(o!==null?this.input.setAttribute("required","required"):this.input.removeAttribute("required")),e=="rows"&&this.multi&&(o!==null?this.input.setAttribute("rows",o):this.input.removeAttribute("rows")),e=="readonly"&&this.input&&(o!==null?this.input.setAttribute("readonly","readonly"):this.input.removeAttribute("readonly"))}}class Ft extends ct{constructor(){super({multi:!0})}}customElements.get("xy-input")||customElements.define("xy-input",ct);customElements.get("xy-textarea")||customElements.define("xy-textarea",Ft);class Yt extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:flex;
        }
        ::slotted(:not(:first-child):not(:last-child)){
            border-radius:0;
        }
        ::slotted(*){
            margin:0!important;
        }
        ::slotted(:not(:first-child)){
            margin-left:-1px!important;
        }
        ::slotted(:first-child){
            border-top-right-radius: 0;
            border-bottom-right-radius: 0px;
        }
        ::slotted(:last-child){
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        </style>
        <slot></slot>
        `}}customElements.get("xy-input-group")||customElements.define("xy-input-group",Yt);class ut extends HTMLElement{static get observedAttributes(){return["open"]}constructor(){super();const t=this.attachShadow({mode:"open"});this.setAttribute("tabindex",0),t.innerHTML=`
        <style>
        :host{
            position:fixed;
            display:flex;
            left:0;
            top:0;
            right:0;
            bottom:0;
            z-index:-1;
            background:rgba(0,0,0,.5);
            visibility:hidden;
            opacity:0;
            transition: .31s;
            justify-content: center;
            align-items: center;
        }
        :host([open]){
            opacity:1;
            z-index:10;
            visibility:visible;
        }
        ::slotted(img){
            position:absolute;
            max-width: 80%;
            max-height: 80%;
            width:auto!important;
            height:auto!important;
            outline: 10px solid #fff;
            transform:scale(.5);
            opacity:0;
            visibility:hidden;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            transition:.3s cubic-bezier(.645, .045, .355, 1);
        }
        :host([open]) ::slotted(img){
            
            visibility:visible;
        }
        :host([open]) ::slotted(img.current){
            z-index:2;
            opacity:1;
            transform:scale(1);
        }
        .action{
            position: absolute;
            bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            border-radius:20px;
            background:rgba(255,255,255,.8);
            color:var(--fontColor,#333);
            outline:0;
            z-index:10;
        }
        .dots{
            display: flex;
        }
        .action xy-icon{
            font-size: 20px;
            cursor:pointer;
        }
        .dots i{
            width:14px;
            height:14px;
            border-radius:50%;
            margin:0 5px;
            cursor:pointer;
            padding:2px;
            background-color: currentColor;
            background-clip: content-box;
            transition: .3s;
            opacity: .5;
        }
        .dots i:hover,.action xy-icon:hover{
            color:var(--themeColor,#42b983);
        }
        .dots i.current{
            opacity: 1;
        }
        :host(:focus) i.current{
            color:var(--themeColor,#42b983);
        }
        .action.only{
            visibility:hidden;
        }
        .btn-close{
            position:absolute;
            right:0;
            top:0;
            color:#fff;
            width:40px;
            height:40px;
            font-size:30px;
            background:none;
            border:0;
            display:flex;
            justify-content: center;
            align-items: center;
            cursor:pointer;
            outline:0;
        }
        .btn-close::after{
            content:'';
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            border-radius:0 0 0 100%;
            background:#fff;
            transform: scale(0);
            transition: .3s;
            z-index:-1;
            transform-origin: right top;
        }
        .btn-close xy-icon{
            transform: scaleY(.9);
        }
        .btn-close:hover::after,.btn-close:focus::after{
            transform: scale(1.3);
        }
        .btn-close:hover xy-icon,.btn-close:focus xy-icon{
            color:var(--errorColor,#f4615c);
        }
        </style>
        <button id="close" class="btn-close"><xy-icon name="close"></xy-icon></button>
        <slot id="slot"></slot>
        <a class="action" id="dots"><xy-icon name="caret-left" class="left"></xy-icon><div class="dots"></div><xy-icon name="caret-right" class="right"></xy-icon></a>
        `}get open(){return this.getAttribute("open")!==null}set open(t){t===null||t===!1?this.removeAttribute("open"):this.setAttribute("open","")}show(t){this.open=!0,this.change(t)}change(t){this.index=this.indexlist.indexOf(Number(t));const e=this.querySelector("img.current"),i=this.dots.querySelector("i.current");e&&i&&(e.classList.remove("current"),i.classList.remove("current")),this.querySelector(`img[data-index="${t}"]`).classList.add("current");const o=this.dots.querySelector(`i[data-index="${t}"]`);o&&o.classList.add("current")}add(t,e){this.indexlist.push(e),this.appendChild(t)}go(t){this.index+=t;const e=this.indexlist.length;this.index>e-1&&(this.index=0),this.index<0&&(this.index=e-1),this.change(this.indexlist[this.index])}remove(t){this.indexlist=this.indexlist.filter(i=>i!=t);const e=this.querySelector(`img[data-index="${t}"]`);e&&this.removeChild(e)}connectedCallback(){this.indexlist=[],this.slots=this.shadowRoot.getElementById("slot"),this.dots=this.shadowRoot.getElementById("dots"),this.close=this.shadowRoot.getElementById("close"),this.addEventListener("transitionend",t=>{t.propertyName==="transform"&&this.open&&this.focus()}),this.slots.addEventListener("slotchange",()=>{if(this.indexlist.length>1){this.dots.classList.remove("only"),this.indexlist=this.indexlist.sort((e,i)=>e-i);let t="";this.indexlist.forEach(e=>{t+="<i data-index="+e+" class="+(e==this.indexlist[this.index]?"current":"")+"></i>"}),this.dots.querySelector(".dots").innerHTML=t}else this.dots.classList.add("only")}),this.dots.addEventListener("click",t=>{t.target.tagName==="I"&&this.change(t.target.dataset.index),t.target.className==="left"&&this.go(-1),t.target.className==="right"&&this.go(1)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:this.go(-1);break;case 39:this.go(1);break;case 8:case 27:t.preventDefault(),this.open=!1;break}}),this.close.addEventListener("click",t=>{this.open=!1})}attributeChangedCallback(t,e,i){t=="open"&&this.shadowRoot&&i==null&&document.querySelector(`xy-img[index="${this.indexlist[this.index]}"]`).focus()}}customElements.get("xy-gallery")||customElements.define("xy-gallery",ut);class Ut extends HTMLElement{static get observedAttributes(){return["lazy","src","defaultsrc","ratio"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:inline-block;
            position: relative;
            vertical-align: top;
            overflow: hidden;
            background:#eee;
            font-size:14px;
            color:#666;
        }
        :host([alt]:not([default]))::before{
            content:attr(alt);
            position:absolute;
            color:#fff;
            left:0;
            right:0;
            bottom:0;
            z-index:1;
            line-height:1.5;
            font-size:14px;
            padding:5px 10px;
            background:linear-gradient(to bottom,transparent,rgba(0,0,0,.5));
            transform:translateY(100%);
            transition:.3s;
        }
        :host([alt]:hover)::before{
            transform:translateY(0);
        }
        :host([ratio*="/"]){
            width:100%;
            height:auto!important;
        }
        :host([ratio*="/"]) img{
            position:absolute;
            left: 0;
            top: 0;
            width:100%;
            height: 100%;
        }
        :host([ratio*="/"]) .placeholder{
            position: relative;
            padding-top:100%;
        }
        img {
            box-sizing: border-box;
            color:transparent;
            display: inline-block;
            width: inherit;
            height: inherit;
            vertical-align: top;
            border:0;
            opacity:0;
            background:inherit;
            transform:scale(0);
            object-fit: cover;
            transition:.3s;
        }
        img::before {
            content:'';
            left:0;
            top:0;
            position:absolute;
            width:100%;
            height:100%;
            background:inherit;
            z-index:1;
        }
        :host img[src]{
            opacity:1;
            transform:scale(1);
        }
        :host([gallery]:not([default]):not([error])){
            cursor:pointer;
        }
        :host(:not([error]):not([default]):hover) img[src],:host(:focus-within) img[src]{
            transform:scale(1.1);
        }
        :host([fit="cover"]) img{
            object-fit:cover;
        }
        :host([fit="fill"]) img{
            object-fit:fill;
        }
        :host([fit="contain"]) img{
            object-fit:contain;
        }
        .placeholder{
            position:absolute;
            width:100%;
            height:100%;
            box-sizing:border-box;
            z-index:-1;
            transition:.3s;
            background:inherit;
            visibility:hidden;
        }
        :host([error]) .placeholder{
            visibility:visible;
            z-index:2;
        }
        :host([error]) img{
            padding:0 20px;
            min-width:100px;
            min-height:100px;
            transform: none;
        }
        .loading{
            position:absolute;
            left:50%;
            top:50%;
            z-index:3;
            transform:translate(-50%,-50%);
            pointer-events:none;
            opacity:1;
            transition:.3s;
        }
        img[src]+.loading,:host([error]) .loading{
            opacity:0;
            visibility:hidden;
        }
        .placeholder xy-icon {
            font-size:1.15em;
            margin-right:.4em;
        }
        .placeholder-icon{
            position:absolute;
            display:flex;
            justify-content:center;
            align-items:center;
            left:0;
            right:0;
            top:50%;
            transform:translateY(-50%);
        }
        .view{
            position:absolute;
            z-index:3;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%) scale(2);
            opacity:0;
            color:#fff;
            display:none;
            font-size:40px;
            transition:.3s;
            pointer-events:none;
        }
        :host([gallery]:not([error]):not([default])) .view{
            display:inline-block;
        }
        :host([gallery]:not([error]):not([default]):hover) .view,:host(:focus-within) .view{
            opacity:1;
            transform:translate(-50%,-50%) scale(1);
        }
        .animation .shape {
            border-radius: 50%;
            background:var(--themeBackground,var(--themeColor,#42b983));
        }
        .animation{
            width:2em;
            height:2em;
            display:grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap:.7em;
            transform: rotate(45deg);
            animation: rotation 1s infinite;
        }
        .shape1 {
            animation: animation4shape1 0.3s ease 0s infinite alternate;
        }
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        @keyframes animation4shape1 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(5px, 5px);
            }
        }
        .shape2 {
            opacity:.8;
            animation: animation4shape2 0.3s ease 0.3s infinite alternate;
        }
        @keyframes animation4shape2 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(-5px, 5px);
            }
        }
        .shape3 {
            opacity:.6;
            animation: animation4shape3 0.3s ease 0.3s infinite alternate;
        }
          
        @keyframes animation4shape3 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(5px, -5px);
            }
        }
        .shape4 {
            opacity:.4;
            animation: animation4shape4 0.3s ease 0s infinite alternate;
        }
        @keyframes animation4shape4 {
            from {
                transform: translate(0, 0);
            }
            to {
                transform: translate(-5px, -5px);
            }
        }
        </style>
        <div class="placeholder" id="placeholder" style="${this.ratio?"padding-top:"+this.ratio:""}"><div class="placeholder-icon"><xy-icon path="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z"></xy-icon>${this.alt}</div></div>
        <xy-icon class="view" name='View'></xy-icon>
        <img>
        <div class="loading">
            <div class="animation">
                <div class="shape shape1"></div>
                <div class="shape shape2"></div>
                <div class="shape shape3"></div>
                <div class="shape shape4"></div>
            </div>
        </div>
        `}get src(){return this.getAttribute("src")}get defaultsrc(){return this.getAttribute("defaultsrc")}get ratio(){const t=this.getAttribute("ratio");if(t&&t.includes("/")){const e=t.split("/");return e[1]/e[0]*100+"%"}return 0}get lazy(){return this.getAttribute("lazy")!==null}get fit(){return this.getAttribute("fit")}get gallery(){return this.getAttribute("gallery")}get error(){return this.getAttribute("error")!==null}get default(){return this.getAttribute("default")!==null}get alt(){return this.getAttribute("alt")||"error"}set src(t){this.setAttribute("src",t)}set fit(t){this.setAttribute("fit",t)}set ratio(t){this.setAttribute("ratio",t)}set error(t){t?this.setAttribute("error",""):this.removeAttribute("error")}set default(t){t?this.setAttribute("default",""):this.removeAttribute("default")}focus(){this.img.focus()}load(t,e){const i=new Image;i.src=t,this.error=!1,i.onload=()=>{this.img.alt=this.alt,this.img.src=t,this.default||this.initgallery()},i.onerror=()=>{this.error=!0,this.img.removeAttribute("tabindex"),this.defaultsrc&&!e&&(this.default=!0,this.load(this.defaultsrc,!0))}}initgallery(){if(this.gallery!==null){window["XyGallery"+this.gallery]||(window["XyGallery"+this.gallery]=new ut,document.body.appendChild(window["XyGallery"+this.gallery])),this.img.setAttribute("tabindex",0),this.setAttribute("index",this.XyImgIndex),this.img.addEventListener("click",()=>{this.default||window["XyGallery"+this.gallery].show(this.XyImgIndex)}),this.img.addEventListener("keydown",e=>{switch(e.keyCode){case 13:this.default||window["XyGallery"+this.gallery].show(this.XyImgIndex);break}});const t=this.img.cloneNode(!0);t.removeAttribute("tabindex"),t.style.order=this.XyImgIndex,t.dataset.index=this.XyImgIndex,window["XyGallery"+this.gallery].add(t,this.XyImgIndex)}}connectedCallback(){window.XyImgIndex>-1?window.XyImgIndex++:window.XyImgIndex=0,this.XyImgIndex=window.XyImgIndex,this.placeholder=this.shadowRoot.getElementById("placeholder"),this.img=this.shadowRoot.querySelector("img"),this.lazy?(this.observer=new IntersectionObserver(t=>{t.forEach(e=>{const i=e.target,o=e.intersectionRatio;o>0&&o<=1&&(this.load(this.src),this.observer.unobserve(i))})}),this.observer.observe(this.img)):this.load(this.src)}attributeChangedCallback(t,e,i){t=="src"&&this.img&&(this.placeholder.classList.remove("show"),this.load(i)),t=="ratio"&&this.img&&(this.placeholder.style.paddingTop=this.ratio)}disconnectedCallback(){window["XyGallery"+this.gallery]&&window["XyGallery"+this.gallery].remove(this.XyImgIndex)}}customElements.get("xy-img")||customElements.define("xy-img",Ut);class Gt extends HTMLElement{static get observedAttributes(){return["color","size"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display: inline-flex;
            font-size: 20px;
            direction:rtl;
            color:#eee;
         }
         label{
            cursor: pointer;
            display: block;
            line-height: 0;
            -webkit-tap-highlight-color: transparent;
         }
         input[type="radio"]{
            position: absolute;
            clip: rect(0,0,0,0)
         }
         input[type="radio"]:checked~.star-item{
            color:var(--themeColor,#42b983);
        }
        .star-item:hover xy-icon{
            transform:scale(1.2)
        }
        :host(:not([disabled]):hover) xy-tips.star-item{
            color:inherit;
        }
        :host(:not([disabled])) xy-tips.star-item:hover,
        :host(:not([disabled])) xy-tips.star-item:hover~.star-item{
           color:var(--themeColor,#42b983);
        }
        :host([disabled]) input[type="radio"]{
            visibility:hidden;
        }
        :host([disabled]) label{
            pointer-events: none; 
        }
        </style>
        <input tabindex="5" type="radio" name="item" id="item05" value="5" />
        <xy-tips class="star-item" tips=${this.tips[4]}>
            <label for="item05">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="4" type="radio" name="item" id="item04" value="4" />
        <xy-tips class="star-item" tips=${this.tips[3]}>
            <label for="item04">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="3" type="radio" name="item" id="item03" value="3" />
        <xy-tips class="star-item" tips=${this.tips[2]}>
            <label for="item03">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="2" type="radio" name="item" id="item02" value="2" />
        <xy-tips class="star-item" tips=${this.tips[1]}>
            <label for="item02">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        <input tabindex="1" type="radio" name="item" id="item01" value="1" />
        <xy-tips class="star-item" tips=${this.tips[0]}>
            <label for="item01">
                <xy-icon name=${this.icon}></xy-icon>
            </label>
        </xy-tips>
        `}get icon(){return this.getAttribute("icon")||"star-fill"}get value(){return this.shadowRoot.value}get defaultvalue(){return this.getAttribute("defaultvalue")||0}get disabled(){return this.getAttribute("disabled")!==null}get size(){return this.getAttribute("size")||""}get color(){return this.getAttribute("color")||""}get tips(){return this.getAttribute("tips")?this.getAttribute("tips").split(","):["","","","",""]}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set size(t){this.setAttribute("size",t)}set color(t){this.setAttribute("color",t)}set tips(t){this.setAttribute("tips",t)}set value(t){t===0?this.radio[this.value-1].checked=!1:this.radio[Number(t)-1].checked=!0,this.shadowRoot.value=t}focus(){this.shadowRoot.querySelector('input[type="radio"]').focus()}connectedCallback(){this.radio=[...this.shadowRoot.querySelectorAll('input[type="radio"]')].reverse(),this.defaultvalue&&(this.shadowRoot.value=this.defaultvalue,this.radio[Number(this.defaultvalue)-1].checked=!0),this.radio.forEach(t=>{t.addEventListener("change",e=>{this.value=t.value,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}}))})})}attributeChangedCallback(t,e,i){t=="color"&&this.shadowRoot&&this.style.setProperty("--themeColor",i),t=="size"&&this.shadowRoot&&(this.style.fontSize=i+"px")}}customElements.get("xy-rate")||customElements.define("xy-rate",Gt);let _=class extends HTMLElement{static get observedAttributes(){return["type","icon"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display:flex;
            visibility:hidden;
            opacity:0;
            transition:.3s;
            z-index:10;
        }
        :host([show]){
            opacity:1;
            visibility:visible;
        }
        .message{
            margin:auto;
            display:flex;
            padding:10px 15px;
            margin-top:10px;
            align-items:center;
            font-size: 14px;
            color: #666;
            background: #fff;
            border-radius: 3px;
            transform: translateY(-100%);
            transition:.3s transform cubic-bezier(.645, .045, .355, 1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            pointer-events:all;
        }
        :host([show]) .message{
            transform: translateY(0);
        }

        .message>*{
            margin-right:5px;
        }

        xy-loading{
            display:none;
        }

        :host([show][type="loading"]) xy-loading{
            display:block;
        }
        :host([show][type="loading"]) xy-icon{
            display:none;
        }
        :host xy-icon{
            color:var(--themeColor,#42b983);
        }
        
        </style>
        <div class="message">
            <xy-icon id="message-type" class="message-type" size="16"></xy-icon>
            <xy-loading></xy-loading>
            <slot></slot>
        </div>
        `}get show(){return this.getAttribute("show")!==null}get icon(){return this.getAttribute("icon")}get type(){return this.getAttribute("type")}set type(t){this.setAttribute("type",t)}set icon(t){this.setAttribute("icon",t)}set show(t){t===null||t===!1?this.removeAttribute("show"):this.setAttribute("show","")}typeMap(t){let e="",i="";switch(t){case"info":e="info-circle-fill",i="var(--infoColor,#1890ff)";break;case"success":e="check-circle-fill",i="var(--successColor,#52c41a)";break;case"error":e="close-circle-fill",i="var(--errorColor,#f4615c)";break;case"warning":e="warning-circle-fill",i="var(--waringColor,#faad14)";break}return{name:e,color:i}}connectedCallback(){this.remove=!1,this.messageType=this.shadowRoot.getElementById("message-type"),this.shadowRoot.addEventListener("transitionend",t=>{t.propertyName==="transform"&&!this.show&&(T.removeChild(this),this.dispatchEvent(new CustomEvent("close")))}),this.type=this.type,this.clientWidth}attributeChangedCallback(t,e,i){t=="type"&&this.messageType&&i!==null&&(this.messageType.name=this.typeMap(i).name,this.messageType.color=this.typeMap(i).color),t=="icon"&&this.messageType&&i!==null&&(this.messageType.name=i)}};customElements.get("xy-message")||customElements.define("xy-message",_);let T=document.getElementById("message-content");T||(T=document.createElement("div"),T.id="message-content",T.style="position:fixed; pointer-events:none; left:0; right:0; top:10px; z-index:51;",document.body.appendChild(T));const V={info:function(s="",t,e){const i=new _;return i.timer&&clearTimeout(i.timer),T.appendChild(i),i.type="info",i.textContent=s,i.show=!0,i.onclose=e,i.timer=setTimeout(()=>{i.show=!1},t||3e3),i},success:function(s="",t,e){const i=new _;return i.timer&&clearTimeout(i.timer),T.appendChild(i),i.type="success",i.textContent=s,i.show=!0,i.onclose=e,i.timer=setTimeout(()=>{i.show=!1},t||3e3),i},error:function(s="",t,e){const i=new _;return i.timer&&clearTimeout(i.timer),T.appendChild(i),i.type="error",i.textContent=s,i.show=!0,i.onclose=e,i.timer=setTimeout(()=>{i.show=!1},t||3e3),i},warning:function(s="",t,e){const i=new _;return i.timer&&clearTimeout(i.timer),T.appendChild(i),i.type="warning",i.textContent=s,i.show=!0,i.onclose=e,i.timer=setTimeout(()=>{i.show=!1},t||3e3),i},loading:function(s="",t=0,e){const i=new _;return i.timer&&clearTimeout(i.timer),T.appendChild(i),i.type="loading",i.textContent=s,i.show=!0,i.onclose=e,t!==0&&(i.timer=setTimeout(()=>{i.show=!1},t||3e3)),i},show:function({text:s,duration:t,onclose:e,icon:i}){const o=new _;return o.timer&&clearTimeout(o.timer),T.appendChild(o),o.icon=i,o.textContent=s||"",o.show=!0,o.onclose=e,t!==0&&(o.timer=setTimeout(()=>{o.show=!1},t||3e3)),o}},{min:J,max:Wt,floor:Vt,round:Kt}=Math;function Zt(s){if(s.toLowerCase()==="black")return"#000000";const t=document.createElement("canvas").getContext("2d");return t.fillStyle=s,t.fillStyle==="#000000"?null:t.fillStyle}function ot(s,t,e){s=s/360*6,t/=100,e/=100;let i=Vt(s),o=s-i,r=e*(1-t),a=e*(1-o*t),n=e*(1-(1-o)*t),l=i%6,d=[e,a,r,r,n,e][l],p=[n,e,e,a,r,r][l],b=[r,r,n,e,e,a][l];return[d*255,p*255,b*255]}function Jt(s,t,e){return ot(s,t,e).map(i=>Kt(i).toString(16).padStart(2,"0"))}function Qt(s,t,e){const i=ot(s,t,e),o=i[0]/255,r=i[1]/255,a=i[2]/255;let n,l,d,p;return n=J(1-o,1-r,1-a),l=n===1?0:(1-o-n)/(1-n),d=n===1?0:(1-r-n)/(1-n),p=n===1?0:(1-a-n)/(1-n),[l*100,d*100,p*100,n*100]}function te(s,t,e){t/=100,e/=100;let i=(2-t)*e/2;return i!==0&&(i===1?t=0:i<.5?t=t*e/(i*2):t=t*e/(2-i*2)),[s,t*100,i*100]}function rt(s,t,e){s/=255,t/=255,e/=255;let i,o,r;const a=J(s,t,e),n=Wt(s,t,e),l=n-a;if(r=n,l===0)i=o=0;else{o=l/n;let d=((n-s)/6+l/2)/l,p=((n-t)/6+l/2)/l,b=((n-e)/6+l/2)/l;s===n?i=b-p:t===n?i=1/3+d-b:e===n&&(i=2/3+p-d),i<0?i+=1:i>1&&(i-=1)}return[i*360,o*100,r*100]}function ee(s,t,e,i){s/=100,t/=100,e/=100,i/=100;const o=(1-J(1,s*(1-i)+i))*255,r=(1-J(1,t*(1-i)+i))*255,a=(1-J(1,e*(1-i)+i))*255;return[...rt(o,r,a)]}function ie(s,t,e){t/=100,e/=100,t*=e<.5?e:1-e;let i=e+t?2*t/(e+t)*100:0,o=(e+t)*100;return[s,i,o]}function se(s){return rt(...s.match(/.{2}/g).map(t=>parseInt(t,16)))}function pt(s){s=s.match(/^[a-zA-Z]+$/)?Zt(s):s;const t={cmyk:/^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i,rgba:/^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsla:/^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hsva:/^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,hexa:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},e=o=>o.map(r=>/^(|\d+)\.\d+|\d+$/.test(r)?Number(r):void 0);let i;t:for(const o in t)if(i=t[o].exec(s))switch(o){case"cmyk":{let[,r,a,n,l]=e(i);if(r>100||a>100||n>100||l>100)break t;return{values:ee(r,a,n,l),type:o}}case"rgba":{let[,,,r,a,n,l]=e(i);if(r>255||a>255||n>255||l<0||l>1)break t;return{values:[...rt(r,a,n),l],a:l,type:o}}case"hexa":{let[,r]=i;(r.length===4||r.length===3)&&(r=r.split("").map(l=>l+l).join(""));const a=r.substring(0,6);let n=r.substring(6);return n=n?parseInt(n,16)/255:void 0,{values:[...se(a),n],a:n,type:o}}case"hsla":{let[,,,r,a,n,l]=e(i);if(r>360||a>100||n>100||l<0||l>1)break t;return{values:[...ie(r,a,n),l],a:l,type:o}}case"hsva":{let[,,,r,a,n,l]=e(i);if(r>360||a>100||n>100||l<0||l>1)break t;return{values:[r,a,n,l],a:l,type:o}}}return{values:null,type:null}}function F(s=0,t=0,e=0,i=1){const o=(a,n)=>(l=0)=>n(~l?a.map(d=>Number(d.toFixed(l))):a),r={h:s,s:t,v:e,a:i,toHSVA(){const a=[r.h,r.s,r.v,r.a];return a.toString=o(a,n=>`hsva(${n[0]}, ${n[1]}%, ${n[2]}%, ${r.a})`),a},toHSLA(){const a=[...te(r.h,r.s,r.v),r.a];return a.toString=o(a,n=>`hsla(${n[0]}, ${n[1]}%, ${n[2]}%, ${r.a})`),a},toRGBA(){const a=[...ot(r.h,r.s,r.v),r.a];return a.toString=o(a,n=>`rgba(${n[0]}, ${n[1]}, ${n[2]}, ${r.a})`),a},toCMYK(){const a=Qt(r.h,r.s,r.v);return a.toString=o(a,n=>`cmyk(${n[0]}%, ${n[1]}%, ${n[2]}%, ${n[3]}%)`),a},toHEXA(){const a=Jt(r.h,r.s,r.v),n=r.a>=1?"":Number((r.a*255).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return n&&a.push(n),a.toString=()=>`#${a.join("").toUpperCase()}`,a},clone:()=>F(r.h,r.s,r.v,r.a)};return r}const oe=["#f44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E","#607D8B","rgba(0,0,0,.65)","transparent"];class bt extends HTMLElement{constructor(){super();k(this,"mousemove",e=>{this.start&&this.choose(e)});k(this,"mouseup",()=>{getComputedStyle(this.palette).opacity!==1&&this.start&&this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,color:this.color}})),this.start=!1});const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <style>
            :host{
                display: block;
                min-width: 300px;
            }
            .color-pane{
                padding:.8em;
            }
            .color-palette{
                position:relative;
                height:150px;
                background:linear-gradient(to top, hsla(0,0%,0%,calc(var(--a))), transparent), linear-gradient(to left, hsla(calc(var(--h)),100%,50%,calc(var(--a))),hsla(0,0%,100%,calc(var(--a)))),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0, 0 0,0 0,5px 5px;
                background-size:100% 100%, 100% 100%, 10px 10px, 10px 10px;
                user-select: none;
                cursor: crosshair;
                opacity:1;
                transition:opacity .1s;
            }
            .color-palette:active{
                opacity:.99;
            }
            .color-palette::after{
                pointer-events:none;
                position:absolute;
                content:'';
                box-sizing:border-box;
                width:10px;
                height:10px;
                border-radius:50%;
                border:2px solid #fff;
                left:calc(var(--s) * 1%);
                top:calc((100 - var(--v)) * 1%);
                transform:translate(-50%,-50%);
            }
            .color-chooser{
                display:flex;
                padding:10px 0;
            }
            .color-show{
                display:flex;
                position: relative;
                width:32px;
                height:32px;
                background:var(--c);
                transition:none;
                border-radius:50%;
                overflow:hidden;
                cursor:pointer;
            }
            .color-show .icon-file{
                width:1em;
                height:1em;
                margin: auto;
                fill: hsl(0, 0%, calc( ((2 - var(--s) / 100) * var(--v) / 200 * var(--a) - 0.6 ) * -999999%  ));
                opacity: 0;
                transition: .3s;
            }
            .color-show:hover .icon-file{
                opacity:1;
            }
            .color-show input{
                position:absolute;
                clip:rect(0,0,0,0);
            }
            .color-show::after{
                content:'';
                position:absolute;
                width:32px;
                height:32px;
                background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0,5px 5px;
                background-size:10px 10px;
                z-index:-1;
            }
            .color-range{
                flex:1;
                margin-left:10px;
            }
            input[type="range"]{
                display: block;
                pointer-events:all;
                width:100%;
                -webkit-appearance: none;
                outline : 0;
                height: 10px;
                border-radius:5px;
                margin:0;
            }
            input[type="range"]::-webkit-slider-runnable-track{
                display: flex;
                align-items: center;
                position: relative;
            }
            input[type="range"]::-webkit-slider-thumb{
                -webkit-appearance: none;
                position: relative;
                width:10px;
                height:10px;
                transform:scale(1.2);
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background:#fff;
                transition:.2s cubic-bezier(.12, .4, .29, 1.46);
            }
            input[type="range"]::-moz-range-thumb{
                box-sizing:border-box;
                pointer-events:none;
                position: relative;
                width:10px;
                height:10px;
                transform:scale(1.2);
                border-radius: 50%;
                border:0;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                background:#fff;
                transition:.2s cubic-bezier(.12, .4, .29, 1.46);
            }
            input[type="range"]::-webkit-slider-thumb:active,
            input[type="range"]:focus::-webkit-slider-thumb{
                transform:scale(1.5);
            }
            input[type="range"]::-moz-range-thumb:active,
            input[type="range"]:focus::-moz-range-thumb{
                transform:scale(1.5);
            }
            input[type="range"]+input[type="range"]{
                margin-top:10px;
            }
            .color-hue{
                background:linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)
            }
            .color-opacity{
                background:linear-gradient(to right, hsla(calc(var(--h)),100%,50%,0), hsla(calc(var(--h)),100%,50%,1)),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0,0 0,5px 5px;
                background-size:100% 100%,10px 10px,10px 10px;
            }
            .color-label{
                position:absolute;
                display:flex;
                visibility:hidden;
                opacity:0;
                left:0;
                right:0;
                top:0;
                bottom:0;
                transition: .3s;
            }
            .color-label input{
                flex:1;
                margin-right:.8em;
                outline:0;
                min-width:0;
                width: 0;
                border-radius:var(--borderRadius,.25em);
                border:1px solid #ddd;
                padding:0 5px;
                line-height:28px;
                text-align:center;
                -moz-appearance: textfield;
                transition:.3s;
            }
            input[type="number"]::-webkit-inner-spin-button{
                display:none;
            }
            ::-moz-focus-inner,::-moz-focus-outer{
                border:0;
                outline : 0;
            }
            .color-label input:focus{
                border-color:var(--themeColor,#42b983);
            }
            .color-footer{
                display:flex
            }
            .btn-switch{
                position:relative;
                border-radius:var(--borderRadius,.25em);
                background:none;
                border:0;
                outline:0;
                line-height:30px;
                width: 60px;
                padding: 0;
                color:var(--themeColor,#42b983);
                overflow:hidden;
            }
            .btn-switch::before{
                content:'';
                position:absolute;
                left:0;
                top:0;
                right:0;
                bottom:0;
                background:var(--themeBackground,var(--themeColor,#42b983));
                opacity:.2;
                transition:.3s;
            }
            .btn-switch:hover::before,.btn-switch:focus::before{
                opacity:.3;
            }
            .color-input{
                position:relative;
                flex:1;
                height:30px;
                overflow:hidden;
            }
            .color-footer[data-type="HEXA"] .color-label:nth-child(1),
            .color-footer[data-type="RGBA"] .color-label:nth-child(2),
            .color-footer[data-type="HSLA"] .color-label:nth-child(3){
                opacity:1;
                visibility:inherit;
                z-index:2;
            }
            .color-sign{
                padding-top:10px;
                display:grid;
                grid-template-columns: repeat(auto-fit, minmax(15px, 1fr));
                grid-gap: 10px;
            }
            .color-sign>button{
                position:relative;
                cursor:pointer;
                width:100%;
                padding-bottom:0;
                padding-top:100%;
                border-radius:4px;
                border:0;
                outline:0;
            }
            .color-sign>button::before{
                content:'';
                position:absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:-1;
                background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
                background-position:0 0,5px 5px;
                background-size:10px 10px;
                border-radius: 4px;
            }
            .color-sign>button::after{
                content:'';
                position:absolute;
                opacity:.5;
                z-index:-2;
                left:0;
                top:0;
                width:100%;
                height:100%;
                background:inherit;
                border-radius:4px;
                transition:.3s;
            }
            .color-sign>button:hover::after,.color-sign>button:focus::after{
                transform:translate(2px,2px)
            }
        </style>
        <div class="color-pane" id="color-pane">
            <div class="color-palette" id="color-palette"></div>
            <div class="color-chooser">
                <a class="color-show" id="copy-btn"><svg class="icon-file" viewBox="0 0 1024 1024"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z"></path><path d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg><input></a>
                <div class="color-range">
                    <input class="color-hue" value="0" min="0" max="360" type="range" id="range-hue">
                    <input class="color-opacity" value="1" min="0" max="1" step="0.01" type="range" id="range-opacity">
                </div>
            </div>
            <div class="color-footer" data-type="HEXA">
                <div class="color-input">
                    <div class="color-label" id="color-hexa">
                        <input spellcheck="false" />
                    </div>
                    <div class="color-label" id="color-rgba">
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="255" spellcheck="false" />
                        <input type="number" min="0" max="1" step="0.01" spellcheck="false" />
                    </div>
                    <div class="color-label" id="color-hlsa">
                        <input type="number" min="0" max="360" spellcheck="false" />
                        <input type="number" min="0" max="100" spellcheck="false" />
                        <input type="number" min="0" max="100" spellcheck="false" />
                        <input type="number" min="0" max="1" step="0.01" spellcheck="false" />
                    </div>
                </div>
                <button class="btn-switch" id="btn-switch" type="flat">HEXA</button>
            </div>
            <div class="color-sign" id="colors">
                ${oe.map(i=>'<button style="background-color:'+i+'" data-color='+i+"></button>").join("")}
            </div>
        </div>
        `}choose(e){const{x:i,y:o,width:r,height:a}=this.palette.getBoundingClientRect(),n=[...this.$value],l=Math.min(Math.max(0,(e.clientX-i)/r*100),100),d=Math.min(Math.max(0,(e.clientY-o)/a*100),100);n[1]=l,n[2]=100-d,this.value=`hsva(${n[0]}, ${n[1]}%, ${n[2]}%, ${n[3]})`}connectedCallback(){this.type=["HEXA","RGBA","HSLA"],this.typeindex=0,this.palette=this.shadowRoot.getElementById("color-palette"),this.colors=this.shadowRoot.getElementById("colors"),this.pane=this.shadowRoot.getElementById("color-pane"),this.rangeHue=this.shadowRoot.getElementById("range-hue"),this.rangeOpacity=this.shadowRoot.getElementById("range-opacity"),this.copyBtn=this.shadowRoot.getElementById("copy-btn"),this.copyinfo=this.copyBtn.querySelector("input"),this.switch=this.shadowRoot.getElementById("btn-switch"),this.colorHexa=this.shadowRoot.getElementById("color-hexa").querySelectorAll("input"),this.colorRgba=this.shadowRoot.getElementById("color-rgba").querySelectorAll("input"),this.colorHlsa=this.shadowRoot.getElementById("color-hlsa").querySelectorAll("input"),this.value=this.defaultvalue,this.rangeHue.addEventListener("input",()=>{const e=[...this.$value];e[0]=Number(this.rangeHue.value),this.nativeclick=!0,this.value=`hsva(${e[0]}, ${e[1]}%, ${e[2]}%, ${e[3]})`}),this.palette.addEventListener("mousedown",e=>{this.start=!0,this.choose(e)}),document.addEventListener("mousemove",this.mousemove),document.addEventListener("mouseup",this.mouseup),this.rangeOpacity.addEventListener("input",()=>{const e=[...this.$value];e[3]=Number(this.rangeOpacity.value),this.nativeclick=!0,this.value=`hsva(${e[0]}, ${e[1]}%, ${e[2]}%, ${e[3]})`}),this.colors.addEventListener("click",e=>{const i=e.target.closest("button");i&&(this.nativeclick=!0,this.value=i.dataset.color)}),this.switch.addEventListener("click",()=>{this.typeindex++,this.typeindex%=3,this.switch.textContent=this.type[this.typeindex],this.nativeclick=!0,this.value=this.value,this.switch.parentNode.dataset.type=this.type[this.typeindex]}),this.copyBtn.addEventListener("click",()=>{this.copyinfo.select(),document.execCommand("copy")&&(document.execCommand("copy"),V.success(this.value))}),this.colorHexa.forEach(e=>{e.addEventListener("change",()=>{this.nativeclick=!0,this.value=e.value})}),this.colorRgba.forEach((e,i)=>{e.addEventListener("change",()=>{const o=F(...this.$value).toRGBA();o[i]=Number(e.value),this.nativeclick=!0,this.value=`rgba(${o[0]}, ${o[1]}, ${o[2]}, ${o[3]})`})}),this.colorHlsa.forEach((e,i)=>{e.addEventListener("change",()=>{const o=F(...this.$value).toHSLA();o[i]=Number(e.value),this.nativeclick=!0,this.value=`hsla(${o[0]}, ${o[1]}%, ${o[2]}%, ${o[3]})`})})}disconnectedCallback(){document.removeEventListener("mousemove",this.mousemove),document.removeEventListener("mouseup",this.mouseup)}get value(){return F(...this.$value)["to"+this.type[this.typeindex]]().toString()}get color(){return F(...this.$value)}get defaultvalue(){return this.getAttribute("defaultvalue")||"#ff0000"}set defaultvalue(e){this.setAttribute("defaultvalue",e)}set value(e){this.$value=pt(e).values;const[i,o,r,a=1]=this.$value;this.pane.style.setProperty("--h",i),this.pane.style.setProperty("--s",o),this.pane.style.setProperty("--v",r),this.pane.style.setProperty("--a",a),this.pane.style.setProperty("--c",this.value),this.copyinfo.value=this.value,this.rangeHue.value=i,this.rangeOpacity.value=a.toFixed(2);const n=F(...this.$value);this.colorHexa[0].value=n.toHEXA().toString();const l=n.toRGBA();this.colorRgba[0].value=l[0].toFixed(0),this.colorRgba[1].value=l[1].toFixed(0),this.colorRgba[2].value=l[2].toFixed(0),this.colorRgba[3].value=l[3].toFixed(2);const d=n.toHSLA();this.colorHlsa[0].value=d[0].toFixed(0),this.colorHlsa[1].value=d[1].toFixed(0),this.colorHlsa[2].value=d[2].toFixed(0),this.colorHlsa[3].value=d[3].toFixed(2),this.nativeclick&&(this.nativeclick=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,color:this.color}})))}}customElements.get("xy-color-pane")||customElements.define("xy-color-pane",bt);class re extends HTMLElement{static get observedAttributes(){return["disabled","dir"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display:inline-block;
            width:30px;
            height:30px;
            font-size:14px;
        }
        :host([block]){
            display:block;
        }

        :host([disabled]){
            pointer-events:none;
        }
        
        :host(:focus-within) xy-popover,:host(:hover) xy-popover{ 
            z-index: 2;
        }
        xy-popover{
            width:100%;
            height:100%;
        }
        .color-btn{
            width:100%;
            height:100%;
            padding:5px;
            background-clip: content-box;
            background-color:var(--themeColor,#42b983);
        }
        .color-btn:hover{
            z-index: auto;
        }
        xy-popover{
            display:block;
        }
        xy-popcon{
            min-width:100%;
        }
        .pop-footer{
            display:flex;
            justify-content:flex-end;
            padding:0 .8em .8em;
        }
        .pop-footer xy-button{
            font-size: .8em;
            margin-left: .8em;
        }
        .color-btn::before{
            content:'';
            position:absolute;
            left:5px;
            top:5px;
            right:5px;
            bottom:5px;
            z-index:-1;
            background:linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 ),linear-gradient( 45deg, #ddd 25%,transparent 0,transparent 75%,#ddd 0 );
            background-position:0 0,5px 5px;
            background-size:10px 10px;
        }
        </style>
        <xy-popover id="popover" ${this.dir?"dir='"+this.dir+"'":""}>
            <xy-button class="color-btn" id="color-btn" ${this.disabled?"disabled":""}></xy-button>
            <xy-popcon id="popcon">
                <div class="pop-footer">
                    <xy-button autoclose>取 消</xy-button>
                    <xy-button type="primary" id="btn-submit" autoclose>确 认</xy-button>
                </div>
            </xy-popcon>
        </xy-popover>
        `}focus(){this.colorBtn.focus()}connectedCallback(){this.popover=this.shadowRoot.getElementById("popover"),this.popcon=this.shadowRoot.getElementById("popcon"),this.colorBtn=this.shadowRoot.getElementById("color-btn"),this.btnSubmit=this.shadowRoot.getElementById("btn-submit"),this.colorBtn.addEventListener("click",()=>{this.colorPane||(this.colorPane=new bt,this.colorPane.defaultvalue=this.defaultvalue,this.popcon.prepend(this.colorPane))}),this.btnSubmit.addEventListener("click",()=>{this.nativeclick=!0,this.value=this.colorPane.value}),this.popcon.addEventListener("close",()=>{this.colorPane.value=this.value}),this.value=this.defaultvalue}get defaultvalue(){return this.getAttribute("defaultvalue")||"#42b983"}get value(){return this.$value}get color(){return F(...pt(this.$value).values)}get type(){return this.getAttribute("type")}get disabled(){return this.getAttribute("disabled")!==null}get dir(){return this.getAttribute("dir")}set dir(t){this.setAttribute("dir",t)}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set defaultvalue(t){this.setAttribute("defaultvalue",t)}set value(t){this.colorBtn.style.setProperty("--themeColor",t),this.$value=t,this.nativeclick?(this.nativeclick=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,color:this.color}}))):this.colorPane?this.colorPane.value=this.value:this.defaultvalue=this.value}attributeChangedCallback(t,e,i){t=="disabled"&&this.colorBtn&&(i!=null?this.colorBtn.setAttribute("disabled","disabled"):this.colorBtn.removeAttribute("disabled")),t=="dir"&&this.popover&&i!=null&&(this.popover.dir=i)}}customElements.get("xy-color-picker")||customElements.define("xy-color-picker",re);class ne extends HTMLElement{static get observedAttributes(){return["disabled"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:block;
        }
        form {
            display:grid;
            grid-template-columns:auto 1fr;
            grid-gap:.8em;
            align-items: center;
            justify-items: end;
        }
        :host([type=full]) form{
            grid-template-columns:1fr;
            justify-items: start;
        }
        :host([type=none]) form{
            display:contents;
        }
        :host(:not([type=full])) ::slotted(:not(xy-form-item)){
            justify-self: stretch;
            grid-column:span 2;
        }
        </style>
        <form id="form" method="${this.method}" action="${this.action}" ${this.novalidate?"novalidate":""}>
            <slot></slot>
        </form>
        `}checkValidity(){if(this.novalidate)return!0;const t=[...this.elements].reverse();let e=!0;return t.forEach(i=>{i.checkValidity&&!i.checkValidity()&&(e=!1)}),this.invalid=!e,e}async submit(){if(this.checkValidity()&&!this.disabled&&this.action)if(this.submitBtn&&(this.submitBtn.loading=!0),this.method=="GET"){const t=new URLSearchParams(this.formdata).toString(),e=await fetch(`${this.action}?${t}`);this.submitBtn&&(this.submitBtn.loading=!1),e.headers.get("content-type")=="application/json"&&this.dispatchEvent(new CustomEvent("submit",{detail:{data:e.json()}}))}else{const t=await fetch(this.action,{method:"POST",body:this.formdata});this.submitBtn&&(this.submitBtn.loading=!1),t.headers.get("content-type")=="application/json"&&this.dispatchEvent(new CustomEvent("submit",{detail:{data:t.json()}}))}}reset(){this.invalid=!1,this.elements.forEach(t=>{t.reset&&t.reset()})}get validity(){return this.elements.every(t=>t.validity)}get disabled(){return this.getAttribute("disabled")!==null}get novalidate(){return this.getAttribute("novalidate")!==null}get formdata(){const t=new FormData,e={};return this.disabled||this.elements.forEach(i=>{t.set(i.name,i.value),e[i.name]=i.value}),t.json=e,t}get method(){const t=(this.getAttribute("method")||"get").toUpperCase();return["GET","POST"].includes(t)?t:"GET"}get action(){return this.getAttribute("action")||""}get name(){return this.getAttribute("name")}get invalid(){return this.getAttribute("invalid")!==null}set novalidate(t){t===null||t===!1?this.removeAttribute("novalidate"):this.setAttribute("novalidate","")}set invalid(t){t===null||t===!1?this.removeAttribute("invalid"):this.setAttribute("invalid","")}set type(t){this.setAttribute("type",t)}connectedCallback(){this.form=this.shadowRoot.getElementById("form"),this.elements=[...this.querySelectorAll("[name]:not([disabled])")],this.submitBtn=this.querySelector("[htmltype=submit]"),this.resetBtn=this.querySelector("[htmltype=reset]"),this.submitBtn&&this.submitBtn.addEventListener("click",()=>{this.submit()}),this.resetBtn&&this.resetBtn.addEventListener("click",()=>{this.reset()}),this.form.addEventListener("keydown",t=>{if(t.target!=this.resetBtn)switch(t.keyCode){case 13:this.submit();break}}),this.novalidate||this.elements.forEach(t=>{t.tagName=="XY-INPUT"?t.addEventListener("input",()=>{this.invalid=!this.validity}):t.addEventListener("change",()=>{this.invalid=!this.validity})})}}customElements.get("xy-form")||customElements.define("xy-form",ne);class ae extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:contents;
        }
        label{
            color:var(--fontColor,#333);
        }
        label.required:not(:empty)::before{
            content:'*';
            color:var(--errorColor,#f4615c);
        }
        .item{
            justify-self: stretch;
        }
        </style>
        <label>${this.legend}</label>
        <div class="item"><slot></slot></slot>
        `}get legend(){return this.getAttribute("legend")||""}set legend(t){this.setAttribute("legend",t)}connectedCallback(){this.form=this.closest("xy-form"),this.labels=this.shadowRoot.querySelector("label"),this.slots=this.shadowRoot.querySelector("slot"),this.slots.addEventListener("slotchange",()=>{this.input=this.querySelector("[name]"),this.input&&this.input.required&&this.labels.classList.add("required")})}}customElements.get("xy-form-item")||customElements.define("xy-form-item",ae);class le extends HTMLElement{static get observedAttributes(){return["pagesize","total"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:flex;
            font-size:14px;
        }
        xy-button {
            margin: 0 .3em;
            width: 2.3em;
            height: 2.3em;
            padding: 1px;
            font-size: inherit;
            box-sizing: content-box;
        }
        .simple-page{
            width:auto;
            padding:0 .625em;
        }
        xy-button[tabindex]{
            justify-content: center;
            align-items: center;
            pointer-events: none;
        }
        .page-ellipsis xy-icon{
            margin:auto;
        }
        xy-button[current] {
            background: var(--themeBackground,var(--themeColor,#42b983));
            border-color: var(--themeColor,#42b983);
            color:#fff;
        }
        .page{
            display:inline-flex;
        }
        .icon{
            width:1em;
            height:1em;
            fill: currentColor;
        }
        </style>
        <xy-button type="flat" id="left" ${this.href?"href=1":""} target="_self">
            <svg class="icon" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
        </xy-button>
        <div class="page" id="page"></div>
        <xy-button type="flat" id="right" ${this.href?"href=1":""} target="_self">
            <svg class="icon" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path></svg>
        </xy-button>
        `}get defaultcurrent(){return this.getAttribute("defaultcurrent")||1}get pagesize(){return this.getAttribute("pagesize")||1}get simple(){return this.getAttribute("simple")!==null}get total(){return this.getAttribute("total")||0}get current(){return this.$current}get href(){return this.getAttribute("href")}set current(t){this.$current!==t&&(t=Math.min(Math.max(1,t),this.count),this.$current=t,this.updatePage(t),this.init&&this.dispatchEvent(new CustomEvent("change",{detail:{current:t,pagesize:this.pagesize,total:this.total}})))}set defaultvalue(t){this.setAttribute("defaultvalue",t)}set pagesize(t){this.setAttribute("pagesize",t)}set total(t){this.setAttribute("total",t)}render(t,e){this.count=Math.ceil(e/t);const i=Math.min(Math.max(1,this.current),this.count);if(this.simple){const o=`<xy-button class="simple-page" tabindex="-1" type="flat">${i} / ${this.count}</xy-button>`;this.page.innerHTML=o}else{const o=Array.from({length:this.count},(r,a)=>a).splice(0,9).map(r=>`<xy-button ${this.href?"href="+(r+1):""} target="_self" ${r+1==i?"current":""} type="flat" data-current="${r+1}">${r+1}</xy-button>`).join("");this.page.innerHTML=o}this.updatePage(i)}updatePage(t=this.current){if(this.left.disabled=t==1,this.right.disabled=t==this.count,this.href&&(this.left.href=this.href+"="+(t-1),this.right.href=this.href+"="+(t+1)),this.simple)this.page.querySelector(".simple-page").textContent=t+" / "+this.count;else if(this.count>9){let e=[];switch(t){case 1:case 2:case 3:case 4:case 5:e=[1,2,3,4,5,6,7,"next",this.count];break;case this.count:case this.count-1:case this.count-2:case this.count-3:case this.count-4:e=[1,"pre",this.count-6,this.count-5,this.count-4,this.count-3,this.count-2,this.count-1,this.count];break;default:e=[1,"pre",t-2,t-1,t,t+1,t+2,"next",this.count];break}this.page.querySelectorAll("xy-button").forEach((i,o)=>{typeof e[o]=="number"?(i.dataset.current=e[o],i.textContent=e[o],i.disabled=!1,e[o]==t?(i.setAttribute("current",""),i.focus()):i.removeAttribute("current"),i.removeAttribute("tabindex"),this.href&&(i.href=this.href+"="+e[o])):(i.textContent="...",i.removeAttribute("current"),i.setAttribute("tabindex",-1))})}else this.page.querySelectorAll("xy-button").forEach((e,i)=>{e.dataset.current==t?(e.setAttribute("current",""),e.focus()):e.removeAttribute("current"),this.href&&(e.href=this.href+"="+e.dataset.current)})}connectedCallback(){this.page=this.shadowRoot.getElementById("page"),this.left=this.shadowRoot.getElementById("left"),this.right=this.shadowRoot.getElementById("right"),this.$current=this.defaultcurrent,this.render(this.pagesize,this.total),this.page.addEventListener("click",t=>{const e=t.target.closest("xy-button");e&&(this.current=Number(e.dataset.current))}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:this.current--;break;case 39:this.current++;break}}),this.left.addEventListener("click",t=>{this.current--}),this.right.addEventListener("click",t=>{this.current++}),this.init=!0}attributeChangedCallback(t,e,i){t=="pagesize"&&this.page&&this.render(i,this.total),t=="total"&&this.page&&this.render(this.pagesize,i)}}customElements.get("xy-pagination")||customElements.define("xy-pagination",le);const D=s=>{const t=new Date(s),e=t.getFullYear(),i=t.getMonth()+1,o=t.getDate();return[e,i,o]},c=(s,t="date")=>{const[e,i,o]=D(s);let r="";switch(t){case"date":r=e+"-"+(i+"").padStart(2,0)+"-"+(o+"").padStart(2,0);break;case"month":r=e+"-"+(i+"").padStart(2,0);break;default:r=e+"";break}return r};class ft extends HTMLElement{static get observedAttributes(){return["min","max","type"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
            :host{
                display: block;
            }
            /*
            :host(:not([range])) .date-body{
                --borderRadius:50%;
            }
            */
            .date-pane{
                padding:.8em;
            }
            .date-head,.date-week{
                display:flex;
            }
            .date-switch{
                flex:1;
            }
            .date-switch[disabled]{
                opacity:1;
            }
            xy-button {
                padding: 1px;
                font-size: inherit;
                box-sizing: content-box;
            }
            .icon{
                width:1em;
                height:1em;
                fill: currentColor; 
            }
            .prev,.next{
                width: 2.3em;
                height: 2.3em;
                transition:.3s;
            }
            .prev[hidden],.next[hidden]{
                visibility: hidden;
                opacity:0;
            }
            .date-switch{
                margin: 0 .3em;
            }
            .date-week-item{
                flex:1;
                line-height: 2.4;
                text-align:center;
            }
            /*
            .date-week::before{
                content:'';
                position:absolute;
                left:0;
                right:0;
                height:2.4em;
                background: var(--themeBackground,var(--themeColor,#42b983));
                opacity:.2;
            }
            */
            .date-body{
                display:grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(6, 1fr);
                grid-gap:.5em;
            }
            .date-button{
                position:relative;
                background:none;
                border: 0;
                padding: 0;
                color: var(--fontColor,#333);
                border-radius: var(--borderRadius,.25em);
                transition:background .3s,color .3s,opacity .3s,border-color .3s,border-radius .3s;
                display:inline-flex;
                align-items:center;
                justify-content: center;
                font-size: inherit;
                outline:0;
            }
            .date-button::before{
                content:'';
                position:absolute; 
                background:var(--themeColor,#42b983);
                pointer-events:none; 
                left:0; 
                right:0; 
                top:0; 
                bottom:0; 
                opacity:0; 
                transition:.3s;
                border: 1px solid transparent;
                z-index:-1;
                border-radius:inherit;
            }
            .date-button:not([disabled]):not([current]):not([select]):not([selectstart]):not([selectend]):hover,.date-button:not([disabled]):not([current]):not([select]):not([selectstart]):not([selectend]):focus{
                color:var(--themeColor,#42b983);
            }
            .date-button:not([disabled]):hover::before{
                opacity:.1 
            }
            .date-button:not([disabled]):focus::before{
                opacity:.2
            }
            .date-day-item{
                box-sizing:content-box;
                min-width: 2.3em;
                height: 2.3em;
                justify-self: center;
            }
            .date-button[other]{
                opacity:.6;
            }
            .date-button[disabled]{
                cursor: not-allowed;
                opacity:.6;
                background: rgba(0,0,0,.1);
                /*color:var(--errorColor,#f4615c);*/
            }
            .date-button[now]{
                color:var(--themeColor,#42b983);
            }
            .date-button[current]{
                background: var(--themeBackground,var(--themeColor,#42b983));
                color:#fff;
            }
            .date-button[select]:not([other]){
                color:#fff;
                background: var(--themeBackground,var(--themeColor,#42b983));
            }
            .date-button[selectstart]:not([other]),.date-button[selectend]:not([other]){
                color: #fff;
                border-color: var(--themeColor,#42b983);
                background: var(--themeBackground,var(--themeColor,#42b983));
            }
            .date-button[selectstart]:not([other])::after,.date-button[selectend]:not([other])::after{
                content:'';
                position: absolute;
                width: 0;
                height: 0;
                top: 50%;
                overflow: hidden;
                border: .3em solid transparent;
                transform: translate(0, -50%);
            }
            .date-button[selectstart]:not([other])::after{
                border-left-color: var(--themeColor,#42b983);
                right: 100%;
            }
            .date-button[selectend]:not([other])::after{
                border-right-color: var(--themeColor,#42b983);
                left: 100%;
            }
            .date-button[selectstart][selectend]:not([other])::after{
                opacity:0;
            }
            /*
            .date-button[selectend]:not([other]){
                color: var(--themeColor,#42b983);
                border-color: var(--themeColor,#42b983);
                border-top-left-radius:0;
                border-bottom-left-radius:0;
            }
            .date-button[selectstart][selectend]:not([other]){
                border-color: var(--themeColor,#42b983);
                border-radius:var(--borderRadius,.25em);
            }
            */
            .date-button[disabled][current]{
                /*background: var(--errorColor,#f4615c);*/
                color:#fff;
            }
            .date-con{
                position:relative;
            }
            .date-month,.date-year{
                position:absolute;
                display:grid;
                left:0;
                top:.8em;
                right:0;
                bottom:0;
                grid-gap:.5em;
            }
            .date-month{
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(4, 1fr);
            }
            .date-year{
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: repeat(5, 1fr);
            }
            .date-month-item,
            .date-year-item{
                display:flex;
                margin:auto;
                width: 100%;
                height: 100%;
            }
            .date-mode{
                opacity:0;
                visibility:hidden;
                z-index:-1;
                transition:.3s opacity,.3s visibility;
            }
            :host([range]) .date-button[current]{
                background: transparent;
                color:var(--themeColor,#42b983);
                border-color:var(--themeColor,#42b983);
            }
            .date-con[data-type="date"] .date-date,
            .date-con[data-type="month"] .date-month,
            .date-con[data-type="year"] .date-year{
                opacity:1;
                visibility:inherit;
                z-index:1;
            }
        </style>
        <div class="date-pane" id="date-pane">
            <div class="date-head">
                <xy-button type="flat" class="prev">
                    <svg class="icon" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                </xy-button>
                <xy-button type="flat" class="date-switch">
                    2019-08
                </xy-button>
                <xy-button type="flat" class="next">
                    <svg class="icon" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path></svg>
                </xy-button>
            </div>
            <div class="date-con" data-type="date">
                <div class="date-mode date-date">
                    <div class="date-week">
                        <span class="date-week-item">日</span>
                        <span class="date-week-item">一</span>
                        <span class="date-week-item">二</span>
                        <span class="date-week-item">三</span>
                        <span class="date-week-item">四</span>
                        <span class="date-week-item">五</span>
                        <span class="date-week-item">六</span>
                    </div>
                    <div class="date-body">
                        ${Array.from({length:42},e=>'<button class="date-button date-day-item" type="flat"></button>').join("")}
                    </div>
                </div>
                <div class="date-mode date-month">
                    ${this.getMonths().map((e,i)=>'<button class="date-button date-month-item" type="flat" data-month="'+(i+1).toString().padStart(2,0)+'">'+e+"</button>").join("")}
                </div>
                <div class="date-mode date-year">
                    ${Array.from({length:20},e=>'<button class="date-button date-year-item" type="flat"></button>').join("")}
                </div>
            </div>
        </div>
        `}get defaultvalue(){return this.getAttribute("defaultvalue")||new Date}get range(){return this.getAttribute("range")}get min(){const t=this.getAttribute("min"),e=[0,1,1];return e.default=!0,t?D(t):e}get max(){const t=this.getAttribute("max"),e=[9999,12,31];return e.default=!0,t?D(t):e}get minormax(){return!this.min.default||!this.max.default}set defaultvalue(t){this.setAttribute("defaultvalue",t)}getDays(t,e){const i=new Date(t,e-1,0).getDate(),o=new Date(t,e,0).getDate(),r=new Date(t,e-1,1).getDay(),a=Array.from({length:r},(d,p)=>(e==1?t-1:t)+"-"+(e==1?12:e-1)+"-"+(i+p-r+1)),n=Array.from({length:o},(d,p)=>t+"-"+e+"-"+(p+1)),l=Array.from({length:42-o-r},(d,p)=>(e==12?t+1:t)+"-"+(e==12?1:e+1)+"-"+(p+1));return[...a,...n,...l]}getMonths(){return["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}getYears(t){const e=parseInt(t/20)*20;return Array.from({length:20},(i,o)=>e+o)}toDay(t,e,i){const o=new Date(t,e+1,0).getDate();return i=i>o?o:i,[t,e,i]}select(t){this.dispatchEvent(new CustomEvent("select",{detail:{value:t,date:this.date}}))}render(t=this.$value){this.$value=t;const[e,i,o]=D(t),[r,a,n]=D(new Date),l=this.range?this.previousElementSibling:null,d=this.range?this.nextElementSibling:null;switch(this.mode){case"date":const p=this.getDays(e,i);this.days.forEach((h,x)=>{const[w,R,E]=p[x].split("-");h.dataset.date=w+"-"+R.toString().padStart(2,0)+"-"+E.toString().padStart(2,0),h.dataset.year=w,h.dataset.month=R.toString().padStart(2,0),h.dataset.day=E.toString().padStart(2,0),h.textContent=E,r+"-"+a+"-"+n==p[x]?h.setAttribute("now",""):h.removeAttribute("now"),R!=i?h.setAttribute("other",""):h.removeAttribute("other"),this.minormax?h.disabled=h.dataset.date<c(this.min)||h.dataset.date>c(this.max):h.disabled=!1,this.range?(h.dataset.date>c(this.rangedate[0])&&h.dataset.date<c(this.rangedate[1])?h.setAttribute("select",""):h.removeAttribute("select"),h.dataset.date==c(this.rangedate[0])?h.setAttribute("selectstart",""):h.removeAttribute("selectstart"),h.dataset.date==c(this.rangedate[1])?h.setAttribute("selectend",""):h.removeAttribute("selectend"),(this.range==="left"&&d&&c(h.dataset.date,"month")>c(d.value,"month")||this.range==="right"&&l&&c(h.dataset.date,"month")<c(l.value,"month"))&&(h.disabled=!0)):e+"-"+i+"-"+o==p[x]?h.setAttribute("current",""):h.removeAttribute("current")}),this.switch.textContent=e+"年"+(i+"").padStart(2,0)+"月",this.switch.disabled=!1,this.minormax?(this.prev.disabled=c(this.min,"month")>=c(t,"month"),this.next.disabled=c(this.max,"month")<=c(t,"month")):(this.prev.disabled=!1,this.next.disabled=!1),this.range==="left"&&c(t,"month")>=c(d.value,"month")&&(this.next.disabled=!0),this.range==="right"&&c(t,"month")<=c(l.value,"month")&&(this.prev.disabled=!0);break;case"month":if(this.months.forEach((h,x)=>{h.dataset.date=e+"-"+h.dataset.month,h.dataset.year=e,r+"-"+a==e+"-"+Number(h.dataset.month)?h.setAttribute("now",""):h.removeAttribute("now"),this.minormax?h.disabled=h.dataset.date<c(this.min,"month")||h.dataset.date>c(this.max,"month"):h.disabled=!1,this.range?(h.dataset.date>c(this.rangedate[0],"month")&&h.dataset.date<c(this.rangedate[1],"month")?h.setAttribute("select",""):h.removeAttribute("select"),h.dataset.date==c(this.rangedate[0],"month")?h.setAttribute("selectstart",""):h.removeAttribute("selectstart"),h.dataset.date==c(this.rangedate[1],"month")?h.setAttribute("selectend",""):h.removeAttribute("selectend"),this.type=="date"&&(this.range==="left"&&c(h.dataset.date,"month")>c(d.value,"month")||this.range==="right"&&c(h.dataset.date,"month")<c(l.value,"month"))&&(h.disabled=!0)):h.dataset.month==i?h.setAttribute("current",""):h.removeAttribute("current")}),this.switch.textContent=e+"年",this.switch.disabled=!1,this.minormax?(this.prev.disabled=this.min[0]>=e,this.next.disabled=this.max[0]<=e):(this.prev.disabled=!1,this.next.disabled=!1),this.range==="left"){const h=this.nextElementSibling;e>=c(h.value,"year")&&(this.next.disabled=!0)}if(this.range==="right"){const h=this.previousElementSibling;e<=c(h.value,"year")&&(this.prev.disabled=!0)}break;case"year":const b=this.getYears(e);if(this.years.forEach((h,x)=>{h.dataset.year=b[x],h.dataset.date=b[x],h.textContent=b[x],h.dataset.year==r?h.setAttribute("now",""):h.removeAttribute("now"),this.minormax?h.disabled=h.dataset.date<this.min[0]||h.dataset.date>this.max[0]:h.disabled=!1,this.range?(h.dataset.date>c(this.rangedate[0],"year")&&h.dataset.date<c(this.rangedate[1],"year")?h.setAttribute("select",""):h.removeAttribute("select"),h.dataset.date==c(this.rangedate[0],"year")?h.setAttribute("selectstart",""):h.removeAttribute("selectstart"),h.dataset.date==c(this.rangedate[1],"year")?h.setAttribute("selectend",""):h.removeAttribute("selectend"),this.type!=="year"&&(this.range==="left"&&h.dataset.year>c(d.value,"year")||this.range==="right"&&h.dataset.year<c(l.value,"year"))&&(h.disabled=!0)):h.dataset.year==e?h.setAttribute("current",""):h.removeAttribute("current")}),this.switch.textContent=b[0]+"年 - "+(b[0]+19)+"年",this.switch.disabled=!0,this.minormax?(this.prev.disabled=this.min[0]>=this.years[0].dataset.year,this.next.disabled=this.max[0]<=this.years[19].dataset.year):(this.prev.disabled=!1,this.next.disabled=!1),this.range==="left"&&this.init){const h=this.nextElementSibling;this.years[19].dataset.year>=h.years[0].dataset.year&&(this.next.disabled=!0)}if(this.range==="right"&&this.init){const h=this.previousElementSibling;this.years[0].dataset.year<=h.years[19].dataset.year&&(this.prev.disabled=!0)}}}connectedCallback(){this.datePane=this.shadowRoot.getElementById("date-pane"),this.prev=this.datePane.querySelector(".prev"),this.next=this.datePane.querySelector(".next"),this.switch=this.datePane.querySelector(".date-switch"),this.dateBody=this.datePane.querySelector(".date-body"),this.dateCon=this.datePane.querySelector(".date-con"),this.dateMonth=this.datePane.querySelector(".date-month"),this.dateYear=this.datePane.querySelector(".date-year"),this.days=this.dateBody.querySelectorAll("button"),this.months=this.dateMonth.querySelectorAll("button"),this.years=this.dateYear.querySelectorAll("button"),this.mode=this.type,this.value=this.defaultvalue,this.prev.addEventListener("click",()=>{let[t,e,i]=D(this.$value);switch(this.nativeclick=!0,this.mode){case"date":this.value=new Date(...this.toDay(t,e-2,i));break;case"month":this.value=new Date(...this.toDay(t-1,e-1,i));break;case"year":this.value=new Date(...this.toDay(t-20,e-1,i))}}),this.next.addEventListener("click",()=>{let[t,e,i]=D(this.$value);switch(this.nativeclick=!0,this.mode){case"date":this.value=new Date(...this.toDay(t,e,i));break;case"month":this.value=new Date(...this.toDay(t+1,e-1,i));break;case"year":this.value=new Date(...this.toDay(t+20,e-1,i))}}),this.switch.addEventListener("click",()=>{switch(this.mode){case"date":this.mode="month",this.render();break;case"month":this.mode="year",this.render();break}}),this.dateBody.addEventListener("click",t=>{const e=t.target.closest("button");this.nativeclick=!0,e&&(this.select(e.dataset.date),this.value=e.dataset.date)}),this.dateMonth.addEventListener("click",t=>{const e=t.target.closest("button");let[i,o,r]=D(this.$value);if(this.nativeclick=!0,e)if(this.type=="date"){const a=new Date(i,e.dataset.month,0).getDate();this.mode="date",this.value=e.dataset.date+"-"+(r>a?a:r)}else this.select(e.dataset.date),this.value=e.dataset.date}),this.dateYear.addEventListener("click",t=>{const e=t.target.closest("button");let[i,o,r]=D(this.$value);if(this.nativeclick=!0,e)switch(this.type){case"date":const a=new Date(e.dataset.year,o,0).getDate();this.mode="month",this.value=e.dataset.date+"-"+o+"-"+(r>a?a:r);break;case"month":this.mode="month",this.value=e.dataset.date+"-"+o;break;default:this.select(e.dataset.date+""),this.value=e.dataset.date+"";break}}),this.init=!0}get value(){return c(this.$value,this.type)}get date(){return new Date(this.$value)}get type(){return this.getAttribute("type")||"date"}get rangedate(){return this.$rangedate||[new Date,new Date]}set rangedate(t){this.$rangedate=t}set min(t){this.setAttribute("min",t)}set max(t){this.setAttribute("max",t)}get mode(){return this.$mode||this.type}set type(t){this.setAttribute("type",t)}set mode(t){this.$mode=t,this.dateCon.dataset.type=t}set value(t){this.minormax&&(t=Math.max(Math.min(new Date(t),new Date(this.max)),new Date(this.min))),this.render(t),this.init&&(this.range==="left"&&this.nextElementSibling.render(),this.range==="right"&&this.previousElementSibling.render(),this.nativeclick&&(this.nativeclick=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:t,date:this.date}}))))}attributeChangedCallback(t,e,i){this.init&&(t=="min"&&this.datePane&&i!==null&&this.render(),t=="max"&&this.datePane&&i!==null&&this.render(),t=="type"&&this.datePane&&i!==null&&this.render())}}customElements.get("xy-date-pane")||customElements.define("xy-date-pane",ft);class gt extends HTMLElement{static get observedAttributes(){return["min","max","type"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display:inline-flex;
            font-size: 14px;
        }
        xy-date-pane{
            font-size: inherit;
        }
        </style>
        <xy-date-pane id="date-left" range="left"></xy-date-pane>
        <xy-date-pane id="date-right" range="right"></xy-date-pane>
        `}choose(t){this.selected?(this.$date[1]=t,this.$date[0]>this.$date[1]&&([this.$date[0],this.$date[1]]=[this.$date[1],this.$date[0]])):(this.$date[0]=t,this.$date[1]=t),this.render(this.$date,this.selected),this.selected=!this.selected}render(t=this.$value,e){this.date01.rangedate=t,this.date02.rangedate=t,e&&(this.$value=t,this.dispatchEvent(new CustomEvent("change",{detail:{value:t,date:this.date}})))}get defaultvalue(){const t=this.getAttribute("defaultvalue");return t?t.split("~"):[new Date,new Date]}get value(){return this.$value.map(t=>c(t,this.type))}get date(){return this.$value.map(t=>new Date(t))}get min(){return this.getAttribute("min")}get max(){return this.getAttribute("max")}get type(){return this.getAttribute("type")||"date"}set type(t){this.setAttribute("type",t)}set defaultvalue(t){this.setAttribute("defaultvalue",t.join("~"))}set min(t){this.setAttribute("min",t)}set max(t){this.setAttribute("max",t)}set value(t){c(t[0])>c(t[1])&&([t[0],t[1]]=[t[1],t[0]]),this.render(t),this.date02.render(t[1]),this.date01.render(t[0]),this.selected=!1}set mode(t){this.date01.mode=t,this.date02.mode=t}connectedCallback(){this.$date=["",""],this.date01=this.shadowRoot.getElementById("date-left"),this.date02=this.shadowRoot.getElementById("date-right"),this.type=this.type,this.min&&(this.min=this.min),this.max&&(this.max=this.max),this.value=this.defaultvalue,this.date01.addEventListener("select",t=>{this.choose(t.detail.value)}),this.date02.addEventListener("select",t=>{this.choose(t.detail.value)}),this.init=!0}attributeChangedCallback(t,e,i){t=="min"&&this.date01&&i!==null&&(this.date01.min=i,this.date02.min=i),t=="max"&&this.date01&&i!==null&&(this.date01.max=i,this.date02.max=i),t=="type"&&this.date01&&i!==null&&(this.date01.type=i,this.date02.type=i)}}customElements.get("xy-date-range-pane")||customElements.define("xy-date-range-pane",gt);class he extends HTMLElement{static get observedAttributes(){return["disabled","dir","min","max","type"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host{
            display:inline-block;
            font-size: 14px;
        }
        :host([block]){
            display:block;
        }
        
        :host(:focus-within) xy-popover,:host(:hover) xy-popover{ 
            z-index: 2;
        }
        :host([disabled]){
            pointer-events:none;
        }
        xy-popover{
            width:100%;
            height:100%;
        }
        #select{
            display:flex;
            width:100%;
            height:100%;
            font-size: inherit;
        }
        #select span{
            flex:1;
            text-align:left;
        }
        .icon{
            position:relative;
            margin-left:.5em;
            pointer-events:none;
            width:1em;
            height:1em;
            fill:currentColor;
        }
        xy-popover{
            display:block;
        }
        xy-popcon{
            min-width:100%;
        }
        .pop-footer{
            display:flex;
            justify-content:flex-end;
            padding:0 .8em .8em;
        }
        .pop-footer xy-button{
            font-size: .8em;
            margin-left: .8em;
        }
        </style>
        <xy-popover class="date-picker" id="popover" ${this.dir?"dir='"+this.dir+"'":""}>
            <xy-button id="select" ${this.disabled?"disabled":""}><span id="datetxt"></span><svg class="icon" viewBox="0 0 1024 1024"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z m-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" p-id="8054"></path></svg></xy-button>
            <xy-popcon id="popcon" class="date-pane">
                <div class="pop-footer">
                    <xy-button autoclose>取 消</xy-button>
                    <xy-button type="primary" id="btn-submit" autoclose>确 认</xy-button>
                </div>
            </xy-popcon>
        </xy-popover>
        `}focus(){this.select.focus()}connectedCallback(){this.popover=this.shadowRoot.getElementById("popover"),this.popcon=this.shadowRoot.getElementById("popcon"),this.select=this.shadowRoot.getElementById("select"),this.datetxt=this.shadowRoot.getElementById("datetxt"),this.btnCancel=this.shadowRoot.getElementById("btn-cancel"),this.btnSubmit=this.shadowRoot.getElementById("btn-submit"),this.select.addEventListener("click",()=>{this.datePane||(this.range?this.datePane=new gt:this.datePane=new ft,this.min&&(this.datePane.min=this.min),this.max&&(this.datePane.max=this.max),this.datePane.type=this.type,this.datePane.defaultvalue=this.defaultvalue,this.popcon.prepend(this.datePane))}),this.btnSubmit.addEventListener("click",()=>{this.nativeclick=!0,this.value=this.datePane.value}),this.popcon.addEventListener("close",()=>{this.datePane.value=this.value,this.datePane.mode=this.type}),this.value=this.defaultvalue}get min(){return this.getAttribute("min")}get max(){return this.getAttribute("max")}get range(){return this.getAttribute("range")!==null}get defaultvalue(){const t=this.getAttribute("defaultvalue");if(this.range)if(t){const e=t.split("~");return e[0]>e[1]?[e[1],e[0]]:e}else return[new Date,new Date];else return t||new Date}get value(){return this.range?this.$value.map(t=>c(t,this.type)):c(this.$value,this.type)}get date(){return this.range?this.$value.map(t=>new Date(t)):new Date(this.$value)}get type(){return this.getAttribute("type")||"date"}get disabled(){return this.getAttribute("disabled")!==null}get dir(){return this.getAttribute("dir")}set min(t){this.setAttribute("min",t)}set max(t){this.setAttribute("max",t)}set dir(t){this.setAttribute("dir",t)}set type(t){this.setAttribute("type",t)}set disabled(t){t===null||t===!1?this.removeAttribute("disabled"):this.setAttribute("disabled","")}set defaultvalue(t){this.setAttribute("defaultvalue",t)}set value(t){this.$value=t,this.datetxt.textContent=this.range?this.value.join("~"):this.value,this.nativeclick?(this.nativeclick=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,date:this.date}}))):this.datePane?this.datePane.value=this.value:this.defaultvalue=this.range?this.value.join("~"):this.value}attributeChangedCallback(t,e,i){t=="disabled"&&this.select&&(i!=null?this.select.setAttribute("disabled","disabled"):this.select.removeAttribute("disabled")),t=="dir"&&this.popover&&i!=null&&(this.popover.dir=i),t=="min"&&this.datePane&&i!==null&&(this.datePane.min=i),t=="max"&&this.datePane&&i!==null&&(this.datePane.max=i),t=="type"&&this.datePane&&i!==null&&(this.datePane.type=i)}}customElements.get("xy-date-picker")||customElements.define("xy-date-picker",he);class de extends HTMLElement{static get observedAttributes(){return["checked"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:contents;
        }
        :host(:hover) ::slotted(xy-td)::before{
            opacity:.1;
        }
        :host(:hover) .select::before{
            opacity:.1;
        }
        .select{
            display:var(--select,none);
        }
        .select xy-checkbox{
            background-color: #fff;
            border-radius: 2px;
            z-index: 5;
        }
        </style>
        <xy-td class="select"><xy-checkbox></xy-checkbox></xy-td>
        <slot></slot>
        `}get checked(){return this.getAttribute("checked")!==null}set checked(t){t===null||t===!1?this.removeAttribute("checked"):this.setAttribute("checked","")}connectedCallback(){this.checkbox=this.shadowRoot.querySelector("xy-checkbox"),this.checkbox.addEventListener("change",()=>{this.checked=this.checkbox.checked,this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked}}))})}attributeChangedCallback(t,e,i){t=="checked"&&this.checkbox&&(this.checkbox.checked=i)}}customElements.get("xy-tr")||customElements.define("xy-tr",de);class ce extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            position:relative;
            padding: .625em;
            color: var(--fontColor,#333);
            font-size: 14px;
            display: flex;
            align-items: center;
        }
        :host::before,:host::after{
            content:'';
            position:absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            transition:.3s opacity;
            pointer-events:none;
            z-index: -1;
        }
        :host::before{
            background:var(--themeColor,#42b983);
            opacity:0;
        }
        :host::after{
            background:var(--cellColor);
            opacity:0.1;
        }
        </style>
        <slot></slot>
        `}}customElements.get("xy-td")||customElements.define("xy-td",ce);class ue extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            line-height: 1.5;
            display:grid;
            grid-template-columns:${this.select?"auto":""} repeat(var(--columns),1fr);
            grid-row-gap: 1px;
            position:relative;
            --columns:${this.thead.length||1};
        }
        ::slotted(xy-tr:nth-child(even)){
            --cellColor:var(--themeColor,#42b983);
        }
        .loading{
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            background-color:rgba(255,255,255,.6);
            visibility:hidden;
            opacity:0;
            transition:.3s;
        }
        :host([loading]) .loading{
            visibility:visible;
            opacity:1;
        }
        .th{
            position:relative;
            display: flex;
            align-items: center;
            padding: .625em;
            justify-content:center;
            color: var(--themeColor,#42b983);
            font-weight: bold;
        }
        .th::before{
            content:'';
            position:absolute;
            background:var(--themeColor,#42b983);
            opacity:.2;
            left:0;
            right:0;
            top:0;
            bottom:0;
            pointer-events:none;
            z-index: -1;
        }
        :host([select]) ::slotted(xy-tr){
            --select: flex;
        }
        .th xy-checkbox{
            background-color: #fff;
            border-radius: 2px;
            z-index: 5;
        }
        </style>
        ${this.select?'<div class="th"><xy-checkbox></xy-checkbox></div>':""}
        ${this.thead.map(e=>'<div class="th">'+e+"</div>").join("")}
        <slot></slot>
        <xy-loading class="loading"></xy-loading>
        `}get thead(){const t=this.getAttribute("thead");return t?t.split(","):[]}get select(){return this.getAttribute("select")!==null}get loading(){return this.getAttribute("loading")!==null}get value(){return Array.from(this.querySelectorAll("xy-tr[checked]"),t=>t.id||t.index)}set loading(t){t===null||t===!1?this.removeAttribute("loading"):this.setAttribute("loading","")}connectedCallback(){this.select&&(this.checkbox=this.shadowRoot.querySelector("xy-checkbox"),this.slots=this.shadowRoot.querySelector("slot"),this.slots.addEventListener("slotchange",()=>{this.cell=[...this.querySelectorAll("xy-tr")],this.cell.forEach((t,e)=>{!t.id&&(t.index=e),t.onchange=()=>{let i=!0,o=!0;this.cell.forEach(r=>{r.checked?o=!1:i=!1}),this.checkbox.indeterminate=!o&&!i,this.checkbox.checked=i}})}),this.checkbox.addEventListener("change",()=>{this.cell.forEach(t=>{t.checked=this.checkbox.checked})}))}}customElements.get("xy-table")||customElements.define("xy-table",ue);class pe extends HTMLElement{static get observedAttributes(){return["rows","draggable"]}constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            font-size:14px;
            color:var(--fontColor,#333);
        }
        :host([type="warning"]){
            color:var(--waringColor,#faad14);
        }
        :host([type="error"]){
            color:var(--errorColor,#f4615c);
        }
        :host([type="success"]){
            color:var(--successColor,#52c41a);
        }
        :host([mark]){
            background:var(--waringColor,#faad14);
        }
        :host([code]){
            font-family: 'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace;
            margin: 0 .2em;
            padding: .2em .3em;
            font-size: 85%;
            border-radius: .2em;
            background-color: #f8f8f8;
            color: #e96900;
        }
        :host([rows]){
            display:block;
        }
        :host([draggable]){
            cursor:default;
        }
        :host([rows]) span{
            --rows:${this.rows};
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: var(--rows,1);
            overflow: hidden;
        }
        </style>
        <span id="txt"><slot></slot></span>
        `}get rows(){return this.getAttribute("rows")}get draggable(){return this.getAttribute("draggable")!==null}get truncated(){return this.getAttribute("truncated")!==null}set rows(t){this.setAttribute("rows",t)}set truncated(t){t===null||t===!1?this.removeAttribute("truncated"):this.setAttribute("truncated","")}set draggable(t){t===null||t===!1?this.removeAttribute("draggable"):this.setAttribute("draggable",!0)}connectedCallback(){this.txt=this.shadowRoot.getElementById("txt"),this.resizeObserver=new ResizeObserver(t=>{for(let e of t){const{height:i}=e.contentRect;this.truncated=this.txt.scrollHeight>i}}),this.draggable=this.draggable,this.draggable&&this.addEventListener("dragstart",t=>{t.dataTransfer.setData("text",this.textContent)}),this.resizeObserver.observe(this.txt)}attributeChangedCallback(t,e,i){t=="rows"&&this.txt&&this.txt.style.setProperty("--rows",i)}disconnectedCallback(){this.resizeObserver.unobserve(this.txt)}}customElements.get("xy-text")||customElements.define("xy-text",pe);class be extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
        <style>
        :host {
            display:block;
        }
        :host([dragstart]){
            pointer-events:none;
            visibility:hidden;
            opacity:0;
            transition:0s!important;
        }
        :host([fake]){
            box-sizing:border-box!important;
            pointer-events:none;
            position:static!important;
            left:0!important;
            top:0!important;
            margin:0!important;
        }
        :host([resizable]){
            position:relative;
            min-width:30px;
            min-height:30px;
        }
        .resize{
            position:absolute;
            box-sizing:border-box;
            left:0;
            top:0;
            right:0;
            bottom:0;
            border:1px solid transparent;
            transition:.2s;
            outline:0;
            pointer-events: none;
        }
        .resize>i{
            position:absolute;
            box-sizing:border-box;
            width:9px;
            height:9px;
            background:#fff;
            border:1px solid var(--themeColor,#42b983);
            visibility:hidden;
            opacity:0;
            transition:.2s;
            pointer-events: all;
            margin:auto;
        }
        .resize>i::before{
            position:absolute;
            content:'';
            left:-5px;
            top:-5px;
            right:-5px;
            bottom:-5px;
        }
        :host([resizable]:focus-within) .resize,
        /*:host([resizable]:hover) .resize,*/
        .resize:active{
            border-color: var(--themeColor,#42b983);
        }
        :host([resizable]:focus-within) .resize>i,
        /*:host([resizable]:hover) .resize>i,*/
        .resize:active>i{
            visibility:visible;
            opacity:1;
        }
        :host([resizable]:hover) .resize>i{
            visibility:visible;
        }
        .tl{
            top:-5px;
            left:-5px;
            cursor:nw-resize;
        }
        .t{
            top:-5px;
            left:0;
            right:0;
            cursor:n-resize;
        }
        .tr{
            top:-5px;
            right:-5px;
            cursor:sw-resize;
        }
        .l{
            left:-5px;
            top:0;
            bottom:0;
            cursor:w-resize;
        }
        .r{
            right:-5px;
            top:0;
            bottom:0;
            cursor:e-resize;
        }
        .bl{
            left:-5px;
            bottom:-5px;
            cursor:sw-resize;
        }
        .b{
            bottom:-5px;
            left:0;
            right:0;
            cursor:s-resize;
        }
        .br{
            bottom:-5px;
            right:-5px;
            cursor:se-resize;
        }
        </style>
        ${this.resizable?'<div class="resize" tabindex="-1"><i class="tl"></i><i class="t"></i><i class="tr"></i><i class="l"></i><i class="r"></i><i class="bl"></i><i class="b"></i><i class="br"></i></div>':""}
        <slot id="con"></slot>
        `}get coord(){return this.getAttribute("coord")!==null}get draggable(){return this.getAttribute("draggable")!==null}get dragstart(){return this.getAttribute("dragstart")!==null}get resizable(){return this.getAttribute("resizable")!==null}get dragaxis(){return this.getAttribute("dragaxis")}get resizing(){return this.getAttribute("resizing")!==null}get allowdrop(){return this.getAttribute("allowdrop")!==null}get allowhover(){return this.getAttribute("allowhover")!==null}set dragstart(t){t===null||t===!1?this.removeAttribute("dragstart"):this.setAttribute("dragstart","")}set resizing(t){t===null||t===!1?this.removeAttribute("resizing"):this.setAttribute("resizing","")}connectedCallback(){const t=this.shadowRoot.getElementById("con");if(this.coord&&this.addEventListener("mousemove",e=>{const{left:i,top:o,width:r,height:a}=this.getBoundingClientRect();t.style.setProperty("--x",(e.clientX-i)/r),t.style.setProperty("--y",(e.clientY-o)/a)}),this.draggable){this.setAttribute("draggable",!0);const e=new Image;e.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";let i=0,o=0,r=0,a=0,n=this.dragaxis;this.addEventListener("dragstart",l=>{if(this.resizing)return l.preventDefault(),!1;this.dragData={},l.dataTransfer.setDragImage(e,0,0),l.dataTransfer.effectAllowed="all";const{left:d,top:p}=this.getBoundingClientRect();i=l.clientX,o=l.clientY,r=i-d,a=o-p,l.dataTransfer.setData("dragData",JSON.stringify({id:this.id,offsetX:i,offsetY:o})),this.cloneObj=document.createElement("DIV");const b=this.cloneNode(!0);b.setAttribute("fake",""),b.setAttribute("dragging",""),b.style.width=this.offsetWidth+"px",b.style.height=this.offsetHeight+"px",b.style.transform="translate3d(0,0,0)",this.cloneObj.appendChild(b),this.cloneObj.style=`position:fixed;left:0;top:0;z-index:999;pointer-events:none;transform:translate3d( ${d}px ,${p}px,0)`,document.body.appendChild(this.cloneObj)}),document.addEventListener("dragover",l=>{if(this.cloneObj){this.dragstart=!0;let d=~~(l.clientX-r),p=~~(l.clientY-a);l.shiftKey||this.dragaxis?n==="X"?p=~~(o-a):n==="Y"?d=~~(i-r):n=~~Math.abs(l.clientX-i)>~~Math.abs(l.clientY-o)&&"X"||~~Math.abs(l.clientX-i)<~~Math.abs(l.clientY-o)&&"Y"||"":n="",i=d+r,o=p+a,this.dragData.left=d,this.dragData.top=p,this.cloneObj.style.transform=`translate3d( ${d}px ,${parseInt(p)}px,0)`}}),this.addEventListener("dragend",l=>{if(this.cloneObj){const{left:d,top:p}=this.getBoundingClientRect(),b=this.cloneObj.animate([{transform:this.cloneObj.style.transform},{transform:`translate3d( ${d}px ,${p}px,0)`}],{duration:200,easing:"ease-in-out"});b.onfinish=()=>{document.body.removeChild(this.cloneObj),this.cloneObj=null,this.dragData=null,this.dragstart=!1}}})}if(this.allowdrop){let e=null;this.addEventListener("dragover",i=>{i.preventDefault()}),this.addEventListener("drop",i=>{i.preventDefault(),i.stopPropagation(),this.removeAttribute("over")}),this.addEventListener("dragleave",i=>{i.stopPropagation(),e===i.target&&this.removeAttribute("over")}),this.addEventListener("dragenter",i=>{i.stopPropagation(),e=i.target,this.setAttribute("over","")})}if(this.allowhover&&(this.addEventListener("mouseover",e=>{this.setAttribute("hover","")}),this.addEventListener("mouseout",e=>{e.stopPropagation(),this.removeAttribute("hover")})),this.resizable){const e=this.shadowRoot.querySelector(".resize");let i=0,o=0,r="",a=0,n=0,l=0,d=0,p=[0,0];this.addEventListener("click",()=>{e.focus()}),e.addEventListener("mousedown",b=>{b.stopPropagation();const h=b.path||b.composedPath&&b.composedPath(),x=getComputedStyle(this).transform;if(p=x==="none"?[0,0]:x.match(/[\d]+/g).slice(4),h[0].tagName==="I"){this.resizing=!0,i=b.pageX,o=b.pageY,r=h[0].className;const w=this.getBoundingClientRect();a=w.width,n=w.height,this.dispatchEvent(new CustomEvent("resizestart",{detail:{offsetX:0,offsetY:0,width:a,height:n}}))}}),document.addEventListener("mousemove",b=>{if(this.resizing){switch(b.stopPropagation(),window.getSelection().removeAllRanges(),l=b.pageX-i,d=b.pageY-o,r){case"tl":this.style.width=a-l+"px",this.style.height=n-d+"px";break;case"t":this.style.height=n-d+"px";break;case"tr":this.style.width=a+l+"px",this.style.height=n-d+"px";break;case"l":this.style.width=a-l+"px";break;case"r":this.style.width=a+l+"px";break;case"bl":this.style.width=a-l+"px",this.style.height=n+d+"px";break;case"b":this.style.height=n+d+"px";break;case"br":this.style.width=a+l+"px",this.style.height=n+d+"px";break}l=r.includes("l")?l:0,d=r.includes("t")?d:0,this.style.transform=`translate3d(${Number(p[0])+l}px,${Number(p[1])+d}px,0)`,this.dispatchEvent(new CustomEvent("resize",{detail:{offsetX:l,offsetY:d,width:this.offsetWidth,height:this.offsetHeight}}))}}),document.addEventListener("mouseup",b=>{this.resizing&&(this.resizing=!1,this.dispatchEvent(new CustomEvent("resizend",{detail:{offsetX:l,offsetY:d,width:this.offsetWidth,height:this.offsetHeight}})))})}}}customElements.get("xy-view")||customElements.define("xy-view",be);class fe extends HTMLElement{constructor(){super();k(this,"setlist",e=>{if(this.visible)switch(e.key){case"ArrowUp":this.selectedIndex-=1;break;case"ArrowDown":this.selectedIndex+=1;break;case"Enter":this.dispatchEvent(new InputEvent("submit"));break}});const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <style>
            :host {
                position:absolute;
                display:flex;
                box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
                box-sizing: border-box;
                transform:scale(0);
                opacity:0.5;
                border-radius: 3px;
                z-index:10;
                transition:.3s cubic-bezier(.645, .045, .355, 1);
                transform-origin:left top;
                flex-direction:column;
                background:#fff;
                font-size: 14px;
                margin-top: 10px;
                visibility:hidden;
            }
            :host([show]:not(:empty)){
                opacity: 1;
                transform: scale(1);
                visibility: visible;
            }
        </style>
        <slot></slot>
        `}get show(){return this.getAttribute("show")!==null}get selectedIndex(){return this.index>=0?this.index:-1}get value(){return this.options[this.selectedIndex]?this.options[this.selectedIndex].textContent:""}get options(){return[...this.querySelectorAll("xy-option:not([hidden]):not([disabled])")]}set show(e){e?this.setAttribute("show",""):this.removeAttribute("show")}set selectedIndex(e){e<=-1&&(e=this.options.length-1),e>=this.options.length&&(e=0),this.index=e,this.options.forEach((i,o)=>{i.focusin=o===e})}clear(){this.index=-1,this.options.forEach((e,i)=>{e.focusin=!1})}filter(e){this.querySelectorAll("xy-option").forEach(i=>{if(i.value.includes("${value}")){const a=i.value.split("${value}").filter(Boolean)[0]||"";i.textContent=i.value.replace(/\${value}/g,e.split(a[0])[0]||"")}const o=new RegExp(`(${e})`,"gi"),r=o.test(i.value)||o.test(i.textContent);i.hidden=!r}),e!==""?this.selectedIndex=0:this.clear()}connectedCallback(){document.addEventListener("keydown",this.setlist),this.addEventListener("transitionend",e=>{e.target===this&&e.propertyName==="transform"&&(this.visible=this.show)}),this.addEventListener("click",e=>{const i=e.target.closest("xy-option");i.disabled||(this.selectedIndex=this.options.findIndex(o=>o==i),this.dispatchEvent(new InputEvent("submit")))})}disconnectedCallback(){document.removeEventListener("keydown",this.setlist)}}customElements.get("xy-datalist")||customElements.define("xy-datalist",fe);class X extends HTMLElement{static get observedAttributes(){return["open","title","oktext","canceltext","loading","type"]}constructor({type:t}={}){super();const e=this.attachShadow({mode:"open"});e.innerHTML=`
        <style>
        :host{
            position:fixed;
            display:flex;
            left:0;
            top:0;
            right:0;
            bottom:0;
            z-index:-1;
            background:rgba(0,0,0,.3);
            visibility:hidden;
            opacity:0;
            /*backdrop-filter: blur(3px);*/
            transition:.3s;
        }
        :host([open]){
            opacity:1;
            z-index:50;
            visibility:visible;
        }
        .dialog {
            display:flex;
            position:relative;
            min-width: 360px;
            margin:auto;
            box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
            max-width: calc(100vw - 20px);
            max-height: calc(100vh - 20px);
            border-radius: 3px;
            background-color: #fff;
            opacity:0;
            transform:scale(0.5);
            transition:.3s cubic-bezier(.645, .045, .355, 1);
        }
        .dialog-content{
            box-sizing: border-box;
            display:flex;
            width: 100%;
            padding:0 20px;
            flex:1;
            flex-direction:column;
        }
        :host([open]) .dialog{
            opacity:1;
            transform:scale(1);
        }
        .dialog-title {
            line-height: 30px;
            padding: 15px 30px 0 0;
            font-weight: 700;
            font-size: 14px;
            color: #4c5161;
            user-select: none;
            cursor: default;
        }
        .dialog-body {
            flex: 1;
            overflow: auto;
            min-height: 50px;
            padding: 10px 0;
        }
        .dialog-footer {
            padding: 3px 0 20px 0;
            margin-top: -3px;
            text-align: right;
        }
        .btn-close{
            position:absolute;
            right:10px;
            top:10px;
            border:0;
        }
        .dialog-footer xy-button {
            margin-left:10px;
        }
        .dialog-type{
            display:none;
            margin: 15px -10px 0 20px;
            width:30px;
            height:30px;
            font-size:24px;
        }
        .dialog-type[name]{
            display:flex;
        }
        #btn-cancel{
            visibility:hidden;
        }
        :host(:not([type])) .dialog-type,
        :host([type="prompt"]) .dialog-type{
            display:none;
        }
        :host([type="confirm"]) #btn-cancel,
        :host([type="prompt"]) #btn-cancel{
            visibility:visible;
        }
        xy-input{
            width:100%;
        }
        :host(:not(:empty)) xy-input{
            margin-top:10px;
        }
        :host(:empty) .dialog-body{
            min-height:0;
        }
        </style>
        <div class="dialog">
            <xy-icon id="dialog-type" class="dialog-type"></xy-icon>
            <div class="dialog-content">
                <div class="dialog-title" id="title">${this.title}</div>
                <xy-button class="btn-close" id="btn-close" icon="close"></xy-button>
                <div class="dialog-body">
                    <slot></slot>
                    ${(t||this.type)==="prompt"?"<xy-input></xy-input>":""}
                </div>
                <div class="dialog-footer">
                    <xy-button id="btn-cancel">${this.canceltext}</xy-button>
                    <xy-button id="btn-submit" type="primary">${this.oktext}</xy-button>
                </div>
            </div>
        </div>
        `}get open(){return this.getAttribute("open")!==null}get title(){return this.getAttribute("title")||"dialog"}get type(){return this.getAttribute("type")}get oktext(){return this.getAttribute("oktext")||"ok"}get portal(){const t=this.getAttribute("portal");return t?document.querySelector(t):null}get canceltext(){return this.getAttribute("canceltext")||"cancel"}get loading(){return this.getAttribute("loading")!==null}set color(t){this.setAttribute("color",t)}set title(t){this.setAttribute("title",t)}set type(t){this.setAttribute("type",t)}set oktext(t){this.setAttribute("oktext",t)}set canceltext(t){this.setAttribute("canceltext",t)}set open(t){t===null||t===!1?this.removeAttribute("open"):(this.setAttribute("open",""),this.loading&&(this.loading=!1))}set loading(t){t===null||t===!1?this.removeAttribute("loading"):this.setAttribute("loading","")}typeMap(t){let e="",i="";switch(t){case"info":e="info-circle",i="var(--infoColor,#1890ff)";break;case"success":e="check-circle",i="var(--successColor,#52c41a)";break;case"error":e="close-circle",i="var(--errorColor,#f4615c)";break;case"warning":e="warning-circle",i="var(--waringColor,#faad14)";break;case"confirm":e="question-circle",i="var(--waringColor,#faad14)";break}return{name:e,color:i}}connectedCallback(){this.remove=!1,this.autoclose=!0,this.titles=this.shadowRoot.getElementById("title"),this.btnClose=this.shadowRoot.getElementById("btn-close"),this.btnCancel=this.shadowRoot.getElementById("btn-cancel"),this.btnSubmit=this.shadowRoot.getElementById("btn-submit"),this.dialogType=this.shadowRoot.getElementById("dialog-type"),this.input=this.shadowRoot.querySelector("xy-input"),this.clientWidth,this.shadowRoot.addEventListener("transitionend",t=>{t.propertyName==="transform"&&this.open&&(this.input?this.input.focus():this.btnSubmit.focus())}),this.shadowRoot.addEventListener("transitionend",t=>{t.propertyName==="transform"&&!this.open&&(this.remove&&document.body.removeChild(this),this.dispatchEvent(new CustomEvent("close")),this.btnActive&&this.btnActive.focus())}),this.addEventListener("wheel",t=>{t.preventDefault()}),this.btnClose.addEventListener("click",()=>{this.open=!1}),this.btnCancel.addEventListener("click",async()=>{this.dispatchEvent(new CustomEvent("cancel")),this.open=!1}),this.btnSubmit.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("submit")),!this.loading&&this.autoclose&&(this.open=!1)}),this.portal&&this.portal!==this.parentNode&&this.portal.appendChild(this)}attributeChangedCallback(t,e,i){t=="open"&&this.shadowRoot&&i!==null&&(this.btnActive=document.activeElement),t=="loading"&&this.shadowRoot&&(i!==null?this.btnSubmit.loading=!0:this.btnSubmit.loading=!1),t=="title"&&this.titles&&i!==null&&(this.titles.textContent=i),t=="oktext"&&this.btnSubmit&&i!==null&&(this.btnSubmit.textContent=i),t=="canceltext"&&this.btnCancel&&i!==null&&(this.btnCancel.textContent=i),t=="type"&&this.dialogType&&i!==null&&(this.dialogType.name=this.typeMap(i).name,this.dialogType.color=this.typeMap(i).color)}}customElements.get("xy-dialog")||customElements.define("xy-dialog",X);const ge={alert:function(){const s=new X;if(document.body.appendChild(s),s.remove=!0,typeof arguments[0]=="object"){const{title:t,oktext:e,content:i,ok:o}=arguments[0];s.title=t||"Alert",s.oktext=e||"确 定",s.onsubmit=o||null,s.innerHTML=i||""}else s.title="Alert",s.oktext="确 定",s.innerHTML=arguments[0]||"",s.onsubmit=arguments[1]||null;return s.open=!0,s},info:function(){const s=new X;if(document.body.appendChild(s),s.type="info",s.remove=!0,typeof arguments[0]=="object"){const{title:t,oktext:e,content:i,ok:o}=arguments[0];s.title=t||"Info",s.oktext=e||"知道了",s.onsubmit=o||null,s.innerHTML=i||""}else s.title="Info",s.oktext="知道了",s.innerHTML=arguments[0]||"",s.onsubmit=arguments[1]||null;return s.open=!0,s},success:function(){const s=new X;if(document.body.appendChild(s),s.type="success",s.remove=!0,typeof arguments[0]=="object"){const{title:t,oktext:e,content:i,ok:o}=arguments[0];s.title=t||"Success",s.oktext=e||"知道了",s.onsubmit=o||null,s.innerHTML=i||""}else s.title="Success",s.oktext="知道了",s.innerHTML=arguments[0]||"",s.onsubmit=arguments[1]||null;return s.open=!0,s},error:function(){const s=new X;if(document.body.appendChild(s),s.type="error",s.remove=!0,typeof arguments[0]=="object"){const{title:t,oktext:e,content:i,ok:o}=arguments[0];s.title=t||"Error",s.oktext=e||"知道了",s.onsubmit=o||null,s.innerHTML=i||""}else s.title="Error",s.oktext="知道了",s.innerHTML=arguments[0]||"",s.onsubmit=arguments[1]||null;return s.open=!0,s},warning:function(){const s=new X;if(document.body.appendChild(s),s.type="warning",s.remove=!0,typeof arguments[0]=="object"){const{title:t,oktext:e,content:i,ok:o}=arguments[0];s.title=t||"Warning",s.oktext=e||"知道了",s.onsubmit=o||null,s.innerHTML=i||""}else s.title="Warning",s.oktext="知道了",s.innerHTML=arguments[0]||"",s.onsubmit=arguments[1]||null;return s.open=!0,s},confirm:function(){const s=new X;if(document.body.appendChild(s),s.remove=!0,s.btnCancel.style.visibility="visible",typeof arguments[0]=="object"){const{type:t,title:e,content:i,oktext:o,canceltext:r,ok:a,cancel:n}=arguments[0];s.type=t||"confirm",s.title=e||"Confirm",s.oktext=o||"确 定",s.canceltext=r||"取 消",s.innerHTML=i||"",s.onsubmit=a||null,s.oncancel=n||null}else s.type="confirm",s.title="Confirm",s.oktext="确 定",s.canceltext="取 消",s.innerHTML=arguments[0]||"",s.onsubmit=arguments[1]||null,s.oncancel=arguments[2]||null;return s.open=!0,s},prompt:function(){const s=new X({type:"prompt"});if(document.body.appendChild(s),s.type="prompt",s.remove=!0,s.autoclose=!1,typeof arguments[0]=="object"){const{title:t,content:e,oktext:i,canceltext:o,ok:r,cancel:a}=arguments[0];s.title=t||"Prompt",s.oktext=i||"确 定",s.canceltext=o||"取 消",s.innerHTML=e||"",s.input.onsubmit=s.onsubmit=()=>{const n=s.input.value;n?(r&&r(n),s.open=!1):(XyMessage.error("内容不能为空"),s.input.focus())},s.oncancel=a||null}else s.title="Prompt",s.oktext="确 定",s.canceltext="取 消",s.innerHTML=arguments[0]||"",s.input.onsubmit=s.onsubmit=()=>{const t=s.input.value;t?(arguments[1]&&arguments[1](t),s.open=!1):(XyMessage.error("内容不能为空"),s.input.focus())},s.oncancel=arguments[2]||null;return s.open=!0,s}};window.XyDialog=ge;window.XyMessage=V;var g;(function(s){s.LOAD="LOAD",s.EXEC="EXEC",s.FFPROBE="FFPROBE",s.WRITE_FILE="WRITE_FILE",s.READ_FILE="READ_FILE",s.DELETE_FILE="DELETE_FILE",s.RENAME="RENAME",s.CREATE_DIR="CREATE_DIR",s.LIST_DIR="LIST_DIR",s.DELETE_DIR="DELETE_DIR",s.ERROR="ERROR",s.DOWNLOAD="DOWNLOAD",s.PROGRESS="PROGRESS",s.LOG="LOG",s.MOUNT="MOUNT",s.UNMOUNT="UNMOUNT"})(g||(g={}));const me=(()=>{let s=0;return()=>s++})(),ye=new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"),ve=new Error("called FFmpeg.terminate()");var $,O,H,Y,U,et,L;class xe{constructor(){q(this,$,null);q(this,O,{});q(this,H,{});q(this,Y,[]);q(this,U,[]);k(this,"loaded",!1);q(this,et,()=>{u(this,$)&&(u(this,$).onmessage=({data:{id:t,type:e,data:i}})=>{switch(e){case g.LOAD:this.loaded=!0,u(this,O)[t](i);break;case g.MOUNT:case g.UNMOUNT:case g.EXEC:case g.FFPROBE:case g.WRITE_FILE:case g.READ_FILE:case g.DELETE_FILE:case g.RENAME:case g.CREATE_DIR:case g.LIST_DIR:case g.DELETE_DIR:u(this,O)[t](i);break;case g.LOG:u(this,Y).forEach(o=>o(i));break;case g.PROGRESS:u(this,U).forEach(o=>o(i));break;case g.ERROR:u(this,H)[t](i);break}delete u(this,O)[t],delete u(this,H)[t]})});q(this,L,({type:t,data:e},i=[],o)=>u(this,$)?new Promise((r,a)=>{const n=me();u(this,$)&&u(this,$).postMessage({id:n,type:t,data:e},i),u(this,O)[n]=r,u(this,H)[n]=a,o==null||o.addEventListener("abort",()=>{a(new DOMException(`Message # ${n} was aborted`,"AbortError"))},{once:!0})}):Promise.reject(ye));k(this,"load",({classWorkerURL:t,...e}={},{signal:i}={})=>(u(this,$)||(Z(this,$,t?new Worker(new URL(t,import.meta.url),{type:"module"}):new Worker(new URL("/assets/worker-DYSz7Krg.js",import.meta.url),{type:"module"})),u(this,et).call(this)),u(this,L).call(this,{type:g.LOAD,data:e},void 0,i)));k(this,"exec",(t,e=-1,{signal:i}={})=>u(this,L).call(this,{type:g.EXEC,data:{args:t,timeout:e}},void 0,i));k(this,"ffprobe",(t,e=-1,{signal:i}={})=>u(this,L).call(this,{type:g.FFPROBE,data:{args:t,timeout:e}},void 0,i));k(this,"terminate",()=>{const t=Object.keys(u(this,H));for(const e of t)u(this,H)[e](ve),delete u(this,H)[e],delete u(this,O)[e];u(this,$)&&(u(this,$).terminate(),Z(this,$,null),this.loaded=!1)});k(this,"writeFile",(t,e,{signal:i}={})=>{const o=[];return e instanceof Uint8Array&&o.push(e.buffer),u(this,L).call(this,{type:g.WRITE_FILE,data:{path:t,data:e}},o,i)});k(this,"mount",(t,e,i)=>{const o=[];return u(this,L).call(this,{type:g.MOUNT,data:{fsType:t,options:e,mountPoint:i}},o)});k(this,"unmount",t=>{const e=[];return u(this,L).call(this,{type:g.UNMOUNT,data:{mountPoint:t}},e)});k(this,"readFile",(t,e="binary",{signal:i}={})=>u(this,L).call(this,{type:g.READ_FILE,data:{path:t,encoding:e}},void 0,i));k(this,"deleteFile",(t,{signal:e}={})=>u(this,L).call(this,{type:g.DELETE_FILE,data:{path:t}},void 0,e));k(this,"rename",(t,e,{signal:i}={})=>u(this,L).call(this,{type:g.RENAME,data:{oldPath:t,newPath:e}},void 0,i));k(this,"createDir",(t,{signal:e}={})=>u(this,L).call(this,{type:g.CREATE_DIR,data:{path:t}},void 0,e));k(this,"listDir",(t,{signal:e}={})=>u(this,L).call(this,{type:g.LIST_DIR,data:{path:t}},void 0,e));k(this,"deleteDir",(t,{signal:e}={})=>u(this,L).call(this,{type:g.DELETE_DIR,data:{path:t}},void 0,e))}on(t,e){t==="log"?u(this,Y).push(e):t==="progress"&&u(this,U).push(e)}off(t,e){t==="log"?Z(this,Y,u(this,Y).filter(i=>i!==e)):t==="progress"&&Z(this,U,u(this,U).filter(i=>i!==e))}}$=new WeakMap,O=new WeakMap,H=new WeakMap,Y=new WeakMap,U=new WeakMap,et=new WeakMap,L=new WeakMap;var lt;(function(s){s.MEMFS="MEMFS",s.NODEFS="NODEFS",s.NODERAWFS="NODERAWFS",s.IDBFS="IDBFS",s.WORKERFS="WORKERFS",s.PROXYFS="PROXYFS"})(lt||(lt={}));const we=["█","▓","▒","░","■","□","▢","▣","▤","▥","▦","▧","▨","▩","▪","▫","◼","◻","◾","◽","◦","●","○","◌","◍","◎","◯","⚬","∙","·","⋅"," "],ht=["@","#","8","B","&","W","M","b","d","p","q","Q","D","O","a","e","o","P","g","9","0","C","J","L","7","T","c","v","n","r","."," "],ke=["✸","✷","✶","✵","✴","✳","✲","✱","✰","✯","✮","✭","✬","✫","✪","✩","✧","✦","★","☆","✿","❀","❁","❂","❃","❇","❈","❉","❊","❋","·"," "],Ae=["█","▓","▒","░","▇","▆","▅","▄","▃","▂","▁","◘","◙","◚","◛","◕","◔","◓","◒","◑","◐","☗","☖","☕","♨","♦","♠","♣","♥","♡","•"," "],Ee=["█","▓","▒","░","▞","▚","▙","▟","▜","▛","▌","▐","▄","▀","◘","◙","◚","◛","◕","◔","◑","◒","⦿","◉","◎","○","∘","∙","·","⋅","˙"," "],M={getTimeFormat:function(s){const t=l=>l<10?"0"+l:l,e=s.getFullYear(),i=t(s.getMonth()+1),o=t(s.getDate()),r=t(s.getHours()),a=t(s.getMinutes()),n=t(s.getSeconds());return`${e}-${i}-${o} ${r}:${a}:${n}`},appendLogRecord:function(s){const t=document.querySelector(".log-content"),e=document.querySelector(".log-lines"),i=document.getElementById("logView");let o=t.innerHTML.split("<br"),r=o.length,a=!1;r>=200&&(t.innerHTML=o.slice(100).join(`<br />
`),r=t.innerHTML.split("<br"),a=!0),t.innerHTML+=`[${M.getTimeFormat(new Date)}]:${s}<br />`;const n=t.innerHTML.split("<br").length-1;e.innerHTML=Array(n).fill(0).map((l,d)=>d+1).join("<br />"),i.scrollTop=i.scrollHeight,a&&M.appendLogRecord("日志超过200条，自动清除前100条")},hiddenLog:function(){const s=document.getElementById("displayLog"),t=document.getElementById("logView"),e=document.getElementById("clearLog");t.style.display="none",e.style.display="none",s.innerText="显示日志"},showLog:function(){const s=document.getElementById("displayLog"),t=document.getElementById("logView"),e=document.getElementById("clearLog");t.style.display="block",e.style.display="inline",s.innerText="隐藏日志"},clearLog:function(){const s=document.querySelector(".log-content");s.innerHTML="";const t=document.querySelector(".log-lines");t.innerHTML="1<br />"},invertColor:function(s){s=s.replace("#","");let t=parseInt(s.substr(0,2),16),e=parseInt(s.substr(2,2),16),i=parseInt(s.substr(4,2),16);return t=255-t,e=255-e,i=255-i,"#"+((1<<24)+(t<<16)+(e<<8)+i).toString(16).slice(1)},imageToASCIICode:function(s,t,e,i){const o=new Blob([s.buffer],{type:"image/jpeg"}),r=new Image,a=URL.createObjectURL(o);return r.src=a,new Promise(n=>{r.onload=()=>{let l=ht;switch(e){case"几何形状":l=we;break;case"字母数字":l=ht;break;case"特殊字符":l=ke;break;case"混合符号":l=Ae;break;case"渐变符号":l=Ee;break;default:l=i;break}const d=document.createElement("canvas"),p=d.getContext("2d");d.width=r.width,d.height=r.height,p.drawImage(r,0,0);const h=p.getImageData(0,0,d.width,d.height).data;let x=0;const w=Array(d.height).fill().map(()=>Array(d.width).fill(0)),R=Array(d.height).fill().map(()=>Array(d.width).fill(0));for(let v=0;v<d.height;v++)for(let f=0;f<d.width;f++){const B=(v*d.width+f)*4,N=h[B],j=h[B+1],G=h[B+2],W=.299*N+.587*j+.114*G,K=Math.floor(W/l.length);x+=W,w[v][f]=Math.min(K,l.length-1),R[v][f]="#"+((1<<24)+(N<<16)+(j<<8)+G).toString(16).slice(1)}const E=x/(d.width*d.height),S=document.createElement("canvas"),z=S.getContext("2d");S.width=d.width*10,S.height=d.height*10,z.font="10px monospace",z.textBaseline="center",z.textBaseline="middle";let y="white",I="black";E>255*.58&&(y="black",I="white");for(let v=0;v<w.length;v++)for(let f=0;f<w[v].length;f++){const B=w[v][f],N=l[B];t||(E>255*.58?y=M.invertColor(R[f][v]):y=R[v][f]),z.fillStyle=I,z.fillRect(f*10,v*10,10,10),z.fillStyle=y,z.fillText(N,f*10+5,v*10+5)}const C=document.getElementById("progress"),Q=C.getContext("2d");C.width=S.width,C.height=S.height,Q.drawImage(S,0,0),URL.revokeObjectURL(a),S.toBlob(v=>{v.arrayBuffer().then(f=>{const B=new Uint8Array(f);n(B)})},"image/jpeg")}}).finally(()=>{URL.revokeObjectURL(a)})}},Ce="/assets/ffmpeg-core-CI9Irx9p.js",Le="/assets/ffmpeg-core-CgUfceKH.wasm",Re=s=>new Promise((t,e)=>{const i=new FileReader;i.onload=()=>{const{result:o}=i;o instanceof ArrayBuffer?t(new Uint8Array(o)):t(new Uint8Array)},i.onerror=o=>{var r,a;e(Error(`File could not be read! Code=${((a=(r=o==null?void 0:o.target)==null?void 0:r.error)==null?void 0:a.code)||-1}`))},i.readAsArrayBuffer(s)}),ze=async s=>{let t;if(typeof s=="string")/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(s)?t=atob(s.split(",")[1]).split("").map(e=>e.charCodeAt(0)):t=await(await fetch(s)).arrayBuffer();else if(s instanceof URL)t=await(await fetch(s)).arrayBuffer();else if(s instanceof File||s instanceof Blob)t=await Re(s);else return new Uint8Array;return new Uint8Array(t)},{appendLogRecord:m}=M;document.addEventListener("DOMContentLoaded",()=>{const s=document.getElementById("chooseVideo"),t=document.getElementById("convertBtn"),e=document.getElementById("displayLog");document.getElementById("logView");const i=document.getElementById("clearLog"),o=document.getElementById("fps"),r=document.getElementById("style"),a=document.getElementById("fpsDefaultSwitch"),n=document.getElementById("styleDefaultSwitch"),l=document.getElementById("progress"),d=document.getElementById("player"),p=document.getElementById("colorfulSwitch"),b=document.getElementById("customView"),h=document.getElementById("customSymbols"),x=document.getElementById("inputCount");let w=null,R=!1,E=0,S="",z="";h.onchange=I=>{x.innerText=I.currentTarget.value.length},r.onchange=I=>{I.detail.value=="自定义符号"?b.style.display="block":b.style.display="none"},n.checked=!0,a.checked=!0;const y=new xe;y.on("log",({message:I})=>{if(m(`${z}:ffmpeg:${I}`),I.includes("/")){let C=I.split("/");if(C.length!=2||!parseInt(C[0])||!parseInt(C[1]))return;E=parseInt(parseInt(C[0])/parseInt(C[1]))}}),i.addEventListener("click",()=>{M.clearLog()}),e.addEventListener("click",()=>{R=!R,R?M.showLog():M.hiddenLog()}),s.addEventListener("click",async I=>{try{const[C]=await window.showOpenFilePicker({types:[{description:"请选择视频文件",accept:{"video/*":[".mp4",".avi",".mov",".wmv",".flv",".mkv"]}}],multipe:!1});w=await C.getFile(),w&&(t.disabled=!1),m(`选择视频文件:${w.name}`)}catch(C){m(`选择视频文件失败:${C}`)}finally{R=!0,M.showLog()}}),t.addEventListener("click",async I=>{const C=p.checked,Q=r.value;let v=[];if(Q=="自定义符号"&&(v=h.value.split(""),v.length<4||v.length>256||!(256%v.length))){V.error("自定义符号不合法"),m("自定义符号不合法");return}if(!w){V.error("请选择视频文件"),m("请选择视频文件");return}t.disabled=!0,d.style.display="none",R=!0,d.pause();try{URL.revokeObjectURL(S)}catch{}M.showLog();try{const f="/source",B=`${f}/${w.name}`,N=`${f}/audio.mp3`,j=`${f}/tempImg`,G=`${f}/asciiImg`;y.terminate(),y.loaded||(m("初始化ffmpeg库"),await y.load({coreURL:Ce,wasmURL:Le})),m("删除临时文件夹");try{await y.deleteDir(f)}catch{}m("创建临时文件夹"),await y.createDir(f),m("创建图片文件夹"),await y.createDir(j),m(`加载文件:${w.name},到ffmpeg`),await y.writeFile(B,await ze(w)),m("提取视频帧率信息"),z="获取视频帧信息",await y.ffprobe(["-v","error","-select_streams","v:0","-show_entries","stream=r_frame_rate","-of","default=noprint_wrappers=1:nokey=1",B]),m(`视频fps:${E}`);let W=0,K=0,it=0;for(let A=3;A<=E;A++)if(!W)E%A==0&&(W=A,A=parseInt(E/4)-1);else if(!K)E%A==0&&(K=A,A=parseInt(E/2)-1);else if(!it)E%A==0&&(it=A);else break;for(;!E;);let P="10";switch(o.value){case"低":P=String(W);break;case"高":P=String(it);break;case"中":default:P=String(K);break}m(`按${P}帧提取视频每帧图片`),z="提取视频帧图片",await y.exec(["-i",B,"-r",P,"-vf","scale=100:-1","-v","info",j+"/img_%05d.jpg"]),m("提取视频帧完成"),m("提取视频音频文件"),z="提取视频音频文件",await y.exec(["-i",B,"-vn","-acodec","libmp3lame",N]),m("提取视频音频文件完成"),l.style.display="block",m("开始处理图片数据"),m("图片处理进度0.01%");const tt=await y.listDir(j),mt=tt.length-2;await y.createDir(G);for(let A=2;A<tt.length;A++){A%parseInt(P)*5||m(`图片处理进度${(A/mt*100).toFixed(2)}%`);const xt=await y.readFile(`${j}/${tt[A].name}`),wt=await M.imageToASCIICode(xt,!C,Q,v);await y.writeFile(`${G}/${tt[A].name}`,wt)}m("图片处理进度100%"),l.style.display="none",m("重新合成视频"),z="重新合成视频",await y.exec(["-framerate",P,"-i",`${G}/img_%05d.jpg`,"-i",N,"-c:v","libx264","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-shortest","-r",P.toString(),`${f}/output.mp4`]),m("视频合成完成");const yt=await y.readFile(`${f}/output.mp4`),vt=new Blob([yt.buffer],{type:"video/mp4"});for(S=window.URL.createObjectURL(vt),m("开始播放视频"),R=!1,M.hiddenLog(),d.style.display="block";d.firstChild;)d.removeChild(d.firstChild);const st=document.createElement("source");st.src=S,st.type="video/mp4",d.appendChild(st),d.load(),d.play()}catch(f){String(f).indexOf("RuntimeError: memory access out of bounds")>-1?(m("转换异常:换一个小一点的视频或者切换帧率再试"),V.error("转换异常:换一个小一点的视频或者切换帧率再试")):(m("转换异常:"+f),V.error("转换异常")),console.error(f.stack)}finally{t.disabled=!1,m("转换结束"),l.style.display="none"}})});
