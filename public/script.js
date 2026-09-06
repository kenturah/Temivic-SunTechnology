const menu=document.querySelector(".menu-btn");
const links=document.querySelector(".nav-links");
menu?.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

// const form=document.getElementById("serviceForm"), status=document.getElementById("formStatus");
// form?.addEventListener("submit",async e=>{
//   e.preventDefault(); status.textContent="Sending your request...";
//   const payload=Object.fromEntries(new FormData(form).entries());
//   try{
//     const r=await fetch("/api/service-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
//     const data=await r.json(); if(!r.ok) throw new Error(data.message||"Request failed");
//     status.textContent="Thank you. Your service request has been received."; status.style.color="#16834a"; form.reset();
//   }catch(err){
//     status.textContent="Demo mode: the request is ready, but the backend email service is not configured yet.";
//     status.style.color="#9a6a12"; console.log(payload,err);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const statusEl = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusEl.textContent = "Sending your request...";
      statusEl.style.color = "#333";

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/api/service-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
          statusEl.textContent = result.message;
          statusEl.style.color = "green";
          form.reset();
        } else {
          statusEl.textContent = result.message || "Failed to send request.";
          statusEl.style.color = "red";
        }
      } catch (err) {
        console.error("Submission error:", err);
        statusEl.textContent = "An error occurred. Please try again later.";
        statusEl.style.color = "red";
      }
    });
  }
});

// document.addEventListener('DOMContentLoaded', () => {
//   const reviewsSwiper = new Swiper('.reviews-slider', {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     loop: true,
//     autoplay: {
//       delay: 4000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     breakpoints: {
//       640: {
//         slidesPerView: 2,
//         spaceBetween: 20,
//       },
//       1024: {
//         slidesPerView: 3,
//         spaceBetween: 30,
//       },
//     },
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.reviews-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Existing reviews slider initialization...

  // Initialize Client Services Background Sliders
  new Swiper('.project-slider', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true // Prevents underlying slides from showing white/transparent background during transitions
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      waitForTransition: false
    },
    speed: 1000,
  });
});

// Initialize About Section Image Slider
const aboutSwiper = new Swiper('.aboutSwiper', {
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  effect: 'fade', // Use 'slide' if you prefer side-sliding over cross-fading
  fadeEffect: {
    crossFade: true
  },
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
});