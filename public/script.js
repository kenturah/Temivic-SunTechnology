const menu=document.querySelector(".menu-btn");
const links=document.querySelector(".nav-links");
menu?.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

const form=document.getElementById("serviceForm"), status=document.getElementById("formStatus");
form?.addEventListener("submit",async e=>{
  e.preventDefault(); status.textContent="Sending your request...";
  const payload=Object.fromEntries(new FormData(form).entries());
  try{
    const r=await fetch("/api/service-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const data=await r.json(); if(!r.ok) throw new Error(data.message||"Request failed");
    status.textContent="Thank you. Your service request has been received."; status.style.color="#16834a"; form.reset();
  }catch(err){
    status.textContent="Demo mode: the request is ready, but the backend email service is not configured yet.";
    status.style.color="#9a6a12"; console.log(payload,err);
  }
});
