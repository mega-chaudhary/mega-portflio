import{r as o,j as l,H as k}from"./index-OP9LJ48s.js";import{M as d,S as P,U as H,u as x,a as w,T as E,b as R,R as C,_ as p,e as D,V as j,C as L,c as V,d as U}from"./extends-jTl6xHp7.js";function W(e,t,s,r){const i=class extends P{constructor(a={}){const u=Object.entries(e);super({uniforms:u.reduce((c,[m,f])=>{const g=H.clone({[m]:{value:f}});return{...c,...g}},{}),vertexShader:t,fragmentShader:s}),this.key="",u.forEach(([c])=>Object.defineProperty(this,c,{get:()=>this.uniforms[c].value,set:m=>this.uniforms[c].value=m})),Object.assign(this,a)}};return i.key=d.generateUUID(),i}const h=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!="function";function M(e,t){const s=x(n=>n.gl),r=w(E,h(e)?Object.values(e):e);return o.useLayoutEffect(()=>{t==null||t(r)},[t]),o.useEffect(()=>{if("initTexture"in s){let n=[];Array.isArray(r)?n=r:r instanceof R?n=[r]:h(r)&&(n=Object.values(r)),n.forEach(a=>{a instanceof R&&s.initTexture(a)})}},[s,r]),o.useMemo(()=>{if(h(e)){const n={};let a=0;for(const u in e)n[u]=r[a++];return n}else return r},[e,r])}M.preload=e=>w.preload(E,e);M.clear=e=>w.clear(E,e);const G=()=>parseInt(C.replace(/\D+/g,"")),N=G(),z=W({color:new L("white"),scale:new j(1,1),imageBounds:new j(1,1),resolution:1024,map:null,zoom:1,radius:0,grayscale:0,opacity:1},`
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,`
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${N>=154?"colorspace_fragment":"encodings_fragment"}>
  }
`),T=o.forwardRef(({children:e,color:t,segments:s=1,scale:r=1,zoom:i=1,grayscale:n=0,opacity:a=1,radius:u=0,texture:c,toneMapped:m,transparent:f,side:g,...O},A)=>{D({ImageMaterial:z});const v=o.useRef(null),b=x(_=>_.size),y=Array.isArray(r)?[r[0],r[1]]:[r,r],B=[c.image.width,c.image.height],S=Math.max(b.width,b.height);return o.useImperativeHandle(A,()=>v.current,[]),o.useLayoutEffect(()=>{v.current.geometry.parameters&&v.current.material.scale.set(y[0]*v.current.geometry.parameters.width,y[1]*v.current.geometry.parameters.height)},[]),o.createElement("mesh",p({ref:v,scale:Array.isArray(r)?[...r,1]:r},O),o.createElement("planeGeometry",{args:[1,1,s,s]}),o.createElement("imageMaterial",{color:t,map:c,zoom:i,grayscale:n,opacity:a,scale:y,imageBounds:B,resolution:S,radius:u,toneMapped:m,transparent:f,side:g,key:z.key}),e)}),q=o.forwardRef(({url:e,...t},s)=>{const r=M(e);return o.createElement(T,p({},t,{texture:r,ref:s}))}),F=o.forwardRef(({url:e,...t},s)=>o.createElement(T,p({},t,{ref:s}))),Y=o.forwardRef((e,t)=>{if(e.url)return o.createElement(q,p({},e,{ref:t}));if(e.texture)return o.createElement(F,p({},e,{ref:t}));throw new Error("<Image /> requires a url or texture")}),I=[[3,1.55,-1],[5.5,-.35,-2.4],[2.1,-1.95,-2.8],[6.9,2.5,-4.2],[.4,3.05,-5.2],[4.3,-2.9,-1.6],[-3.6,3.1,-6.4],[7.6,-2.3,-5.6],[-1.4,-3.3,-6.2],[-6.4,-.9,-7.4],[1.2,.3,-8.4],[-5.6,2.2,-8.8]];function X({s:e,i:t}){const s=o.useRef(),[r,i,n]=I[t%I.length],a=e.w>1?1.62:2.25,u=a*(e.w/e.h),c=o.useMemo(()=>Math.random()*10,[]);return U(m=>{const f=m.clock.elapsedTime;s.current.position.y=i+Math.sin(f*.5+c)*.12,s.current.rotation.z=Math.sin(f*.3+c)*.02}),l.jsx("group",{ref:s,position:[r,i,n],rotation:[0,-r*.045,0],children:l.jsx(Y,{url:e.src,scale:[u,a],radius:e.w>1?.06:.14,toneMapped:!1,transparent:!0})})}function $({children:e}){const t=o.useRef(),{size:s}=x(),r=o.useRef([0,0]);return o.useEffect(()=>{const i=n=>{r.current=[n.clientX/window.innerWidth*2-1,n.clientY/window.innerHeight*2-1]};return window.addEventListener("pointermove",i,{passive:!0}),()=>window.removeEventListener("pointermove",i)},[]),U((i,n)=>{const a=Math.min(1.2,window.scrollY/Math.max(1,window.innerHeight)),u=s.width<960;t.current.rotation.y=d.damp(t.current.rotation.y,r.current[0]*.12,3,n),t.current.rotation.x=d.damp(t.current.rotation.x,r.current[1]*.06,3,n),t.current.position.y=d.damp(t.current.position.y,a*3.2,6,n),t.current.position.x=u?3.2:0,t.current.position.z=d.damp(t.current.position.z,a*2.5+(u?-2:0),6,n)}),l.jsx("group",{ref:t,children:e})}function Z({active:e}){return l.jsx("div",{className:"hero-scene","aria-hidden":"true",children:l.jsx(V,{frameloop:e?"always":"never",dpr:[1,1.75],camera:{position:[0,0,10],fov:35},gl:{antialias:!0,alpha:!0},children:l.jsx(o.Suspense,{fallback:null,children:l.jsx($,{children:k.map((t,s)=>l.jsx(X,{s:t,i:s},s))})})})})}export{Z as default};
