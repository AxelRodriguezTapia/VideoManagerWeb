(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[622],{4661:(e,t,a)=>{Promise.resolve().then(a.bind(a,4949))},8055:(e,t,a)=>{"use strict";a.d(t,{db:()=>s,j:()=>d});var r=a(9904),l=a(399),i=a(7058);let o=(0,r.Wp)({apiKey:"AIzaSyC4VYGXFbVPPVRgAZeIJKMeEn9XTMsS8I4",authDomain:"videolistapp-ddf29.firebaseapp.com",projectId:"videolistapp-ddf29",storageBucket:"videolistapp-ddf29.firebasestorage.app",messagingSenderId:"182081917708",appId:"1:182081917708:web:56ed93e99e732f256eaf29"}),d=(0,l.xI)(o),s=(0,i.aU)(o)},4949:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});var r=a(5155),l=a(2115),i=a(8055),o=a(7058),d=a(6046);function s(){let[e,t]=(0,l.useState)(""),[a,s]=(0,l.useState)(""),[n,c]=(0,l.useState)(""),[p,u]=(0,l.useState)(""),[h,x]=(0,l.useState)(""),[g,b]=(0,l.useState)([]),[v,y]=(0,l.useState)(!1),[j,f]=(0,l.useState)(!1),m=(0,d.useRouter)(),w=i.j.currentUser;(0,l.useEffect)(()=>{(async()=>{try{if(w){let e=(0,o.rJ)(i.db,"userSaves",w.uid,"lists"),t=await (0,o.GG)(e);if(t.empty)b([]);else{let e=t.docs.map(e=>e.id);b(e)}}}catch(e){console.error("Error al obtener las listas: ",e)}})()},[w]);let k=async()=>{if(!h){alert("Por favor ingresa un nombre para la lista.");return}try{let e=(0,o.H9)(i.db,"userSaves",w.uid,"lists",h);await (0,o.BN)(e,{videos:[]}),b(e=>[...e,h]),u(h),x(""),alert("\xa1Lista creada correctamente!")}catch(e){console.error("Error al crear la lista: ",e),alert("Hubo un error al crear la lista.")}},S=async()=>{if(!e||!a||!n||!p){alert("Por favor complete todos los campos y seleccione una lista.");return}f(!0);try{let t={url:e,title:a,description:n,createdAt:new Date().toISOString()},r=(0,o.H9)(i.db,"userSaves",w.uid,"lists",p);await (0,o.mZ)(r,{videos:(0,o.hq)(t)}),alert("\xa1Video guardado correctamente!"),m.push("/dashboard")}catch(e){console.error("Error al guardar el video: ",e),alert("Hubo un error al guardar el video.")}finally{f(!1)}};return(0,r.jsxs)("div",{style:{padding:"0px"},children:[(0,r.jsxs)("nav",{style:{backgroundColor:"#3498db",padding:"10px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,r.jsx)("div",{style:{color:"white",fontSize:"20px",fontWeight:"bold"},children:"VideoListApp"}),(0,r.jsxs)("div",{className:"menu",children:[(0,r.jsx)("button",{onClick:()=>y(!v),style:{padding:"10px",background:"none",border:"1px solid white",color:"white",cursor:"pointer"},children:"☰"}),v&&(0,r.jsxs)("div",{style:{position:"absolute",top:"50px",right:"20px",backgroundColor:"#3498db",border:"1px solid white",borderRadius:"5px",zIndex:100},children:[(0,r.jsx)("button",{onClick:()=>{m.push("/dashboard"),y(!1)},style:{display:"block",padding:"10px",color:"white",background:"none",border:"none",cursor:"pointer",textAlign:"left",width:"100%"},children:"Inicio"}),(0,r.jsx)("button",{onClick:()=>{m.push("/perfil"),y(!1)},style:{display:"block",padding:"10px",color:"white",background:"none",border:"none",cursor:"pointer",textAlign:"left",width:"100%"},children:"Perfil"})]})]})]}),(0,r.jsxs)("div",{style:{background:"linear-gradient(to right, #3498db, #2980b9, #1abc9c)",padding:"20px",textAlign:"center",color:"white",marginBottom:"20px"},children:[(0,r.jsx)("h1",{children:"Guardar un Nuevo Video"}),(0,r.jsx)("h2",{style:{fontSize:"20px",color:"#fff"},children:"Agrega un video a tu lista"})]}),(0,r.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,r.jsx)("label",{children:"URL del video:"}),(0,r.jsx)("input",{type:"text",placeholder:"URL del video",value:e,onChange:e=>t(e.target.value),style:{padding:"10px",width:"100%"}})]}),(0,r.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,r.jsx)("label",{children:"T\xedtulo del video:"}),(0,r.jsx)("input",{type:"text",placeholder:"T\xedtulo del video",value:a,onChange:e=>s(e.target.value),style:{padding:"10px",width:"100%"}})]}),(0,r.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,r.jsx)("label",{children:"Descripci\xf3n del video:"}),(0,r.jsx)("input",{type:"text",placeholder:"Descripci\xf3n",value:n,onChange:e=>c(e.target.value),style:{padding:"10px",width:"100%"}})]}),(0,r.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,r.jsx)("label",{children:"Selecciona una lista:"}),g.length>0?(0,r.jsxs)("select",{value:p,onChange:e=>u(e.target.value),style:{padding:"10px",width:"100%"},children:[(0,r.jsx)("option",{value:"",disabled:!0,children:"Selecciona una lista"}),g.map((e,t)=>(0,r.jsx)("option",{value:e,children:e},t))]}):(0,r.jsx)("p",{children:"No tienes listas creadas."})]}),(0,r.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,r.jsx)("label",{children:"O crea una nueva lista:"}),(0,r.jsx)("input",{type:"text",placeholder:"Nombre de la nueva lista",value:h,onChange:e=>x(e.target.value),style:{padding:"10px",width:"100%"}}),(0,r.jsx)("button",{onClick:k,style:{padding:"10px",backgroundColor:"#3498db",color:"white",border:"none",marginTop:"10px"},children:"Crear nueva lista"})]}),(0,r.jsx)("button",{onClick:S,disabled:j,style:{padding:"10px",backgroundColor:"#3498db",color:"white",border:"none",width:"100%"},children:j?"Guardando...":"Guardar Video"})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[992,523,984,441,517,358],()=>t(4661)),_N_E=e.O()}]);