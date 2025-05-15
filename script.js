//choose a position
const dropdown = document.querySelector(".dropdown")
const showToggle = document.querySelector(".toggle")

dropdown.addEventListener("click", () => {
    showToggle.classList.toggle("hidden")
})

showToggle.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", () => {
        dropdown.textContent = item.textContent;  
        showToggle.classList.add("hidden");  
    })
})

document.addEventListener("click", e => {
    if(!dropdown.contains(e.target) && !showToggle.contains(e.target)){
        showToggle.classList.add("hidden");
    }
})


//select job type
const toggleit = document.getElementById("toggleit")
const drop = document.getElementById("drop")

toggleit.addEventListener("click", () => {
    drop.classList.toggle("hidden")
})

drop.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    toggleit.textContent = item.textContent;
    drop.classList.add("hidden");
  })
})

document.addEventListener("click", e => {
    if(!toggleit.contains(e.target) && !drop.contains(e.target)){
        drop.classList.add("hidden")
    }
})


//Choose file for CV
const inputfile = document.getElementById('inputfile')
const filename = document.getElementById('filename')

inputfile.addEventListener("change", () => {
    if(inputfile.files.length > 0){
        filename.textContent = inputfile.files[0].name;
    }else{
        filename.textContent = "No file choosen"
    }

})



//validation 

const form = document.getElementById("nameForm");

function showError(input, message) {
  let errorDiv = input.parentElement.querySelector(".error");
  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    input.parentElement.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.875rem";
}

function clearError(input) {
  const errorDiv = input.parentElement.querySelector(".error");
  if (errorDiv) {
    errorDiv.textContent = "";
  }
}

function isValidName(name) {
  return /^[A-Za-z\s]{2,}$/.test(name.trim());
}

function isValidPhone(phone) {
  return /^[0-9]{7,15}$/.test(phone.trim());
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  const fields = [
    { el: document.getElementById("first"), validator: isValidName, message: "Enter a valid first name." },
    { el: document.getElementById("last"), validator: isValidName, message: "Enter a valid last name." },
    { el: document.getElementById("phone"), validator: isValidPhone, message: "Enter a valid phone number." },
    { el: document.getElementById("email"), validator: isValidEmail, message: "Enter a valid email." },
    { el: document.getElementById("province"), validator: null, message: "Province is required." },
    { el: document.getElementById("city"), validator: null, message: "City is required." },
    { el: document.getElementById("academic"), validator: null, message: "Academic degree is required." },
    {
      el: document.getElementById("portfolio"),
      validator: (url) => /^(https?:\/\/)/.test(url),
      message: "Portfolio link must start with http:// or https://"
    }
    
  ];

  fields.forEach(({ el, validator, message }) => {
    const value = el.value.trim();
    if (value === "") {
      showError(el, `${el.placeholder || el.name} is required.`);
      valid = false;
    } else if (validator && !validator(value)) {
      showError(el, message);
      valid = false;
    } else {
      clearError(el);
    }
  });

  // Validate Job Type (from dropdown)
  const jobType = document.getElementById("toggleit");
  if (jobType.textContent.trim() === "Select job type") {
    showError(jobType, "Job type is required.");
    valid = false;
  } else {
    clearError(jobType);
  }

  // Validate Position (dropdown)
  const position = document.querySelector(".dropdown");
  if (position.textContent.trim() === "Choose a position") {
    showError(position, "Position is required.");
    valid = false;
  } else {
    clearError(position);
  }

  // Validate File Upload
  const fileInput = document.getElementById("inputfile");
  if (!fileInput.files || fileInput.files.length === 0) {
    showError(fileInput, "Please upload your CV.");
    valid = false;
  } else {
    clearError(fileInput);
  }

  // Validate Cover Letter
  const coverLetter = document.querySelector("textarea");
  if (coverLetter.value.trim() === "") {
    showError(coverLetter, "Cover letter is required.");
    valid = false;
  } else {
    clearError(coverLetter);
  }
  if (!valid) {
    e.preventDefault();
  } else {
    window.location.href = "successful.html"; 
  }
});


//form animation
  document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("applyTitle");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            target.classList.add("slide-in-active");
          }
        });
      },
      {
        threshold: 0.6, // 40% of the element visible
      }
    );

    observer.observe(target);
  });


  //Register
// Disable scrolling initially
document.body.classList.add("loading");

window.addEventListener("load", () => {
  gsap.to("#loader-bar", {
    width: "100%",
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      gsap.to("#loader-bar-container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          document.getElementById("loader-bar-container").style.display = "none";

          // ✅ Re-enable scrolling
          document.body.classList.remove("loading");

          // ✅ Fade in the main content after loader is hidden
          gsap.to("#main-content", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  });
});



















