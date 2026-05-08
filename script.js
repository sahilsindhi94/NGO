
/* =========================
   SOUND EFFECT
========================= */
function playSound(type) {
  let audio;

  if (type === "success") {
    audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
  } else {
    audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3");
  }

  audio.volume = 0.4;
  audio.play();
}


/* =========================
   LOADING SCREEN
========================= */
function showLoader() {
  document.getElementById("loader").classList.add("active");
}

function hideLoader() {
  document.getElementById("loader").classList.remove("active");
}


/* =========================
   VISITOR TOAST
========================= */
function showVisitorToast(message) {
  let toast = document.getElementById("visitorToast");

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================
   PATIENT POPUP
========================= */
function showPatientPopup(message) {
  let popup = document.getElementById("patientPopup");
  let text = document.getElementById("patientMessage");

  text.innerText = message;
  popup.classList.add("active");

  setTimeout(() => {
    popup.classList.remove("active");
  }, 3000);
}


/* =========================
   VISITOR FORM
========================= */
function submitVisitor(event) {
  event.preventDefault();

  let name = document.getElementById("vname").value;

  if (name) {
    playSound("success");
    showLoader();

    setTimeout(() => {
      hideLoader();
      showVisitorToast("Welcome " + name + " 👋");

      setTimeout(() => {
        window.location.href = "about.html";
      }, 1200);

    }, 1500);
  } else {
    playSound("error");
    showVisitorToast("Please fill your details");
  }
}


/* =========================
   DEPARTMENT FORM
========================= */
function openForm(department) {
  document.getElementById("formModal").style.display = "block";
  document.getElementById("deptTitle").innerText = department;
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}


/* =========================
   PATIENT FORM
========================= */
function submitForm(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let disease = document.getElementById("disease").value;
  let number = document.getElementById("number").value;

  if (name && disease && number) {
    playSound("success");
    showLoader();

    setTimeout(() => {
      hideLoader();
      showPatientPopup("Patient Registered Successfully 🏥");
      closeForm();
    }, 1500);

  } else {
    playSound("error");
    showPatientPopup("Please fill all patient details");
  }
}


/* =========================
   CLOSE MODAL CLICK OUTSIDE
========================= */
window.onclick = function(event) {
  let modal = document.getElementById("formModal");
  if (modal && event.target == modal) {
    modal.style.display = "none";
  }
}

// CURSOR GLOW FOLLOW
document.addEventListener("mousemove", (e) => {
  let glow = document.querySelector(".cursor-glow");
  if (glow) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});


// 3D TILT EFFECT
let card = document.getElementById("tilt-card");

if (card) {
  card.addEventListener("mousemove", (e) => {
    let rect = card.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let rotateX = -(y - rect.height / 2) / 20;
    let rotateY = (x - rect.width / 2) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
}