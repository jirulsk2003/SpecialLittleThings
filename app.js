// Initialize EmailJS with your Public Key
(function() {
  emailjs.init({
    publicKey: "G2rfMfAsiZqEFMA5Z"
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const SECRET_PASS = "20102026";
  const SERVICE_ID = "service_4rm3gmv";
  const TEMPLATE_ID = "template_jc237wo";

  // Haptic Vibration Helper
  function triggerVibration(pattern = 40) {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // 1. Time-of-Day Adaptive Greeting
  const dynamicGreeting = document.getElementById("dynamicGreeting");
  if (dynamicGreeting) {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      dynamicGreeting.textContent = "Subho sokal, pretty girl… 🌸";
    } else if (currentHour >= 12 && currentHour < 17) {
      dynamicGreeting.textContent = "Hey, pretty girl… 🌷";
    } else if (currentHour >= 17 && currentHour < 22) {
      dynamicGreeting.textContent = "Good evening, pretty girl… 🌇✨";
    } else {
      dynamicGreeting.textContent = "Tumi ki ekhono jege? Pretty girl… 🌙✨";
    }
  }

  // 2. Days Since First Talk Counter
  const daysCounterBadge = document.getElementById("daysCounterBadge");
  if (daysCounterBadge) {
    const firstDate = new Date(2026, 9, 20); // 20 Oct 2026
    const today = new Date();
    const diffTime = Math.abs(today - firstDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysCounterBadge.textContent = `✨ It's been ${diffDays} special days since our first talk... ⏳💫`;
  }

  // Romantic Typewriter Letter Text
  const fullLetterText = 
`Ekta kotha bolbo? Please hasbe na, okay? Ektu nervous lagchhe, but ajke bhablam moner kothata bolei feli.

Jani na kibhabe bolbo, but tomar moddhe emon kichhu ache ja tomake amar kache ektu beshi-i special kore tole. 🌷

Ar tomar smile-ta… 🥹❤️ Tomar smile-ta ekta serious problem, Nasrin—ekbar mone porle amar mukheo emni emni smile chole ashe. Ebar bolo, amar mon churi korar permission ke dilo tomake? 🙈💕

Honestly, tomar sathe kotha bolar ekta chhoto excuse peleo amar din-ta ektu better hoye jay. Hoyto tomar kache eta simple ekta kotha, but amar kache feelings-gulo genuine.

Teri muskurahat mein chhipi hai meri har khushi,
Tu jo paas ho to lagti hai mukammal zindagi.
Chaha nahi tha kisi ko is qadar toot kar,
Par tujhe dekh kar dil ne baghawat kar di. ✨

Nasrin, tomar shathe thaka maane shudhu bhalobasha noy—tomar protita icche, protita shopno ar tomar shiddhanto-ke shorbochho shonman deoa. Ami hoyto shob kichhu shohoj kore dite parbo na, kintu eituku bhorsha dite pari—jibon-er jekono poristhiti-tei tomar mukher hashi-ta bachiye rakhar cheshta amar shob shomoy thakbe. ❤️

Kono pressure nei, Nasrin. Tomar feelings ar decision amar kache important, and tomar answer ja-i hok, ami seta shonmaner shathe accept korbo. 🌸

Tai ektu courage niye ekta chhoto question korte chai…
Amake ki tomar life-e ekta chance debe? 🥹💗

P.S. Tomar shanti ar bhalo thaka amar kache shobcheye age. Take your time, Nasrin. 🙈`;

  // Elements
  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const visualizer = document.getElementById("visualizer");
  const tapOverlay = document.getElementById("tapToStartOverlay");
  const passInput = document.getElementById("passInput");
  const togglePassBtn = document.getElementById("togglePassBtn");
  const unlockBtn = document.getElementById("unlockBtn");
  const hintBtn = document.getElementById("hintBtn");
  const hintBox = document.getElementById("hintBox");
  const errorMsg = document.getElementById("errorMsg");
  const typewriterBody = document.getElementById("typewriterBody");
  const showFullLetterBtn = document.getElementById("showFullLetterBtn");
  const countdownNum = document.getElementById("countdownNum");
  const skipCountdownBtn = document.getElementById("skipCountdownBtn");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const sendingStatus = document.getElementById("sendingStatus");
  const openHandwrittenBtn = document.getElementById("openHandwrittenBtn");
  const saveLetterBtn = document.getElementById("saveLetterBtn");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const waxSealBtn = document.getElementById("waxSealBtn");

  let musicPlaying = false;
  let typewriterInterval = null;
  let countdownTimer = null;
  let fadeInterval = null;

  // 3. Audio Engine with Cinematic Fade-In / Fade-Out
  function fadeAudioIn(targetVolume = 0.85, duration = 1500) {
    if (!bgMusic) return;
    clearInterval(fadeInterval);
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggleBtn.textContent = "⏸";
      visualizer.classList.add("playing");
      const step = targetVolume / (duration / 50);
      fadeInterval = setInterval(() => {
        if (bgMusic.volume + step < targetVolume) {
          bgMusic.volume += step;
        } else {
          bgMusic.volume = targetVolume;
          clearInterval(fadeInterval);
        }
      }, 50);
    }).catch(() => console.log("Waiting for user tap for sound."));
  }

  function fadeAudioOut(duration = 1000) {
    if (!bgMusic || bgMusic.paused) return;
    clearInterval(fadeInterval);
    const step = bgMusic.volume / (duration / 50);
    fadeInterval = setInterval(() => {
      if (bgMusic.volume - step > 0) {
        bgMusic.volume -= step;
      } else {
        bgMusic.volume = 0;
        bgMusic.pause();
        musicPlaying = false;
        musicToggleBtn.textContent = "▶";
        visualizer.classList.remove("playing");
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  function playAudio() {
    if (!musicPlaying && bgMusic) {
      fadeAudioIn();
      if (tapOverlay) {
        tapOverlay.style.opacity = "0";
        setTimeout(() => tapOverlay.remove(), 400);
      }
    }
  }

  window.addEventListener("click", playAudio, { once: true });
  window.addEventListener("touchstart", playAudio, { once: true });

  musicToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerVibration(30);
    if (bgMusic.paused) {
      fadeAudioIn();
    } else {
      fadeAudioOut();
    }
  });

  // 4. Screen Navigation
  function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);
    if (fromScreen && toScreen) {
      fromScreen.classList.remove("active");
      setTimeout(() => {
        toScreen.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (toId === "screen-letter") startTypewriter();
        if (toId === "screen-take-time") startCountdown();
      }, 300);
    }
  }

  document.querySelectorAll(".next-screen-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerVibration(40);
      const from = btn.closest(".screen").id;
      const to = btn.getAttribute("data-next");
      switchScreen(from, to);
    });
  });

  // 5. Password Verification
  unlockBtn.addEventListener("click", checkPassword);
  passInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
  });

  function checkPassword() {
    playAudio();
    if (passInput.value.trim() === SECRET_PASS) {
      triggerVibration([50, 40, 60]);
      errorMsg.textContent = "";
      switchScreen("screen-password", "screen-envelope");
    } else {
      triggerVibration([100, 50, 100]);
      errorMsg.textContent = "Oops! Vul date mone porchhe... hint dekho! 🙈";
    }
  }

  togglePassBtn.addEventListener("click", () => {
    triggerVibration(25);
    const isPass = passInput.type === "password";
    passInput.type = isPass ? "text" : "password";
    togglePassBtn.textContent = isPass ? "🙈" : "👁️";
  });

  hintBtn.addEventListener("click", () => {
    triggerVibration(35);
    hintBox.classList.toggle("hidden");
  });

  // 6. Wax Seal Break Animation, Physical Vibration & Open Envelope
  let isEnvelopeOpening = false;
  function triggerEnvelopeOpen() {
    if (isEnvelopeOpening) return;
    isEnvelopeOpening = true;

    // Dual pulse physical vibration (stamp break feel)
    triggerVibration([60, 40, 80]);

    if (waxSealBtn) waxSealBtn.classList.add("seal-breaking");

    setTimeout(() => {
      if (envelopeWrapper) envelopeWrapper.classList.add("open");
      triggerVibration(35);
    }, 280);

    setTimeout(() => {
      switchScreen("screen-envelope", "screen-constellation");
    }, 700);
  }

  if (waxSealBtn) waxSealBtn.addEventListener("click", triggerEnvelopeOpen);
  document.getElementById("openEnvBtn").addEventListener("click", triggerEnvelopeOpen);

  // 7. Constellation Stars
  document.querySelectorAll(".star-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerVibration(30);
      document.getElementById("starRevealedMsg").textContent = btn.getAttribute("data-msg");
    });
  });

  // 8. Playful Quiz
  document.querySelectorAll(".quiz-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      triggerVibration(45);
      const res = document.getElementById("quizScoreText");
      res.textContent = "Result: 100% Genuine Heartbeat Rate detected! 🙈❤️";
      res.classList.remove("hidden");
      setTimeout(() => switchScreen("screen-quiz", "screen-letter"), 1200);
    });
  });

  document.getElementById("skipQuizBtn").addEventListener("click", () => {
    triggerVibration(30);
    switchScreen("screen-quiz", "screen-letter");
  });

  // 9. Typewriter Effect
  function startTypewriter() {
    typewriterBody.textContent = "";
    let i = 0;
    if (typewriterInterval) clearInterval(typewriterInterval);
    typewriterInterval = setInterval(() => {
      if (i < fullLetterText.length) {
        typewriterBody.textContent += fullLetterText.charAt(i);
        i++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 28);
  }

  showFullLetterBtn.addEventListener("click", () => {
    triggerVibration(30);
    if (typewriterInterval) clearInterval(typewriterInterval);
    typewriterBody.textContent = fullLetterText;
  });

  // 10. Interactive "Hold to Reveal" Secret Thought
  const holdRevealBox = document.getElementById("holdRevealBox");
  const holdProgressBar = document.getElementById("holdProgressBar");
  const secretThoughtText = document.getElementById("secretThoughtText");
  const holdInstruction = document.getElementById("holdInstruction");
  let holdTimer = null;
  let holdProgress = 0;
  let progressInterval = null;

  function startHold(e) {
    if (secretThoughtText.classList.contains("unlocked")) return;
    holdProgress = 0;
    holdProgressBar.style.width = "0%";
    progressInterval = setInterval(() => {
      holdProgress += 10;
      holdProgressBar.style.width = holdProgress + "%";
      if (holdProgress >= 100) {
        clearInterval(progressInterval);
        secretThoughtText.classList.remove("blurred");
        secretThoughtText.classList.add("unlocked");
        holdInstruction.textContent = "✨ Secret thought revealed:";
        triggerVibration([60, 40, 100]);
      }
    }, 120);
  }

  function stopHold(e) {
    if (secretThoughtText.classList.contains("unlocked")) return;
    clearInterval(progressInterval);
    holdProgress = 0;
    holdProgressBar.style.width = "0%";
  }

  if (holdRevealBox) {
    holdRevealBox.addEventListener("mousedown", startHold);
    holdRevealBox.addEventListener("mouseup", stopHold);
    holdRevealBox.addEventListener("mouseleave", stopHold);
    holdRevealBox.addEventListener("touchstart", startHold, { passive: true });
    holdRevealBox.addEventListener("touchend", stopHold);
  }

  // 11. Countdown
  function startCountdown() {
    let count = 3;
    countdownNum.textContent = count;
    if (countdownTimer) clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      count--;
      if (count > 0) {
        countdownNum.textContent = count;
        triggerVibration(30);
      } else {
        clearInterval(countdownTimer);
        triggerVibration(60);
        switchScreen("screen-take-time", "screen-proposal");
      }
    }, 1000);
  }

  skipCountdownBtn.addEventListener("click", () => {
    triggerVibration(30);
    if (countdownTimer) clearInterval(countdownTimer);
    switchScreen("screen-take-time", "screen-proposal");
  });

  // 12. Proposal Choice with EmailJS Dispatch
  async function handleProposalChoice(choice) {
    btnYes.disabled = true;
    btnNo.disabled = true;
    sendingStatus.classList.remove("hidden");
    sendingStatus.textContent = "Saving your answer with love... 🌷";

    if (choice === "YES") {
      triggerVibration([80, 50, 100, 50, 120]);
    } else {
      triggerVibration(50);
    }

    const templateParams = {
      recipient: "Nasrin Sultana",
      choice: choice,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );
      console.log("Email dispatched successfully to rana742184@gmail.com!");
    } catch (error) {
      console.error("EmailJS dispatch error:", error);
    } finally {
      if (choice === "YES") {
        triggerFireworks();
        switchScreen("screen-proposal", "screen-ending-yes");
      } else {
        switchScreen("screen-proposal", "screen-ending-no");
      }
    }
  }

  btnYes.addEventListener("click", () => handleProposalChoice("YES"));
  btnNo.addEventListener("click", () => handleProposalChoice("NO"));

  // 13. Open Handwritten Letter Screen (Only for YES)
  if (openHandwrittenBtn) {
    openHandwrittenBtn.addEventListener("click", () => {
      triggerVibration(50);
      switchScreen("screen-ending-yes", "screen-handwritten-letter");
    });
  }

  // 14. Save Letter (Trigger Browser Print / Save PDF)
  if (saveLetterBtn) {
    saveLetterBtn.addEventListener("click", () => {
      triggerVibration(50);
      window.print();
    });
  }

  // 15. Secret Vault Notes
  document.querySelectorAll(".vault-btn").forEach(vBtn => {
    vBtn.addEventListener("click", () => {
      triggerVibration(30);
      document.getElementById("vaultReveal").textContent = vBtn.getAttribute("data-vault");
    });
  });

  // 16. Replay Button
  document.querySelectorAll(".restart-btn").forEach(rBtn => {
    rBtn.addEventListener("click", () => {
      triggerVibration(40);
      location.reload();
    });
  });

  // 17. Fireworks on YES
  function triggerFireworks() {
    if (typeof confetti === "function") {
      const end = Date.now() + 3.5 * 1000;
      const colors = ["#ff4081", "#d81b60", "#ffe082", "#ffffff"];
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }

  // 18. Falling Petals, Music-Pulse Heart, & Interactive Sparkles Canvas
  initCanvas();
  function initCanvas() {
    const canvas = document.getElementById("effectsCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 8 + 8,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.6 - 0.3,
      char: Math.random() > 0.4 ? "🌸" : "✨"
    }));

    const burstParticles = [];

    function addBurst(x, y) {
      for (let j = 0; j < 8; j++) {
        burstParticles.push({
          x: x,
          y: y,
          size: Math.random() * 10 + 10,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3 - 1,
          opacity: 1,
          char: Math.random() > 0.5 ? "✨" : "💖"
        });
      }
    }

    window.addEventListener("click", (e) => addBurst(e.clientX, e.clientY));
    window.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        addBurst(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    let pulseAngle = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Music-Sync Floating Heart Pulse in Canvas background
      pulseAngle += 0.04;
      const pulseScale = 1 + Math.sin(pulseAngle) * 0.12;
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.font = `${Math.floor(80 * pulseScale)}px serif`;
      ctx.fillText("💖", w * 0.1, h * 0.25);
      ctx.restore();

      // Ambient falling petals
      particles.forEach(p => {
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        }
      });

      // Interactive sparkles
      for (let k = burstParticles.length - 1; k >= 0; k--) {
        const bp = burstParticles[k];
        ctx.save();
        ctx.globalAlpha = bp.opacity;
        ctx.font = `${bp.size}px serif`;
        ctx.fillText(bp.char, bp.x, bp.y);
        ctx.restore();

        bp.x += bp.speedX;
        bp.y += bp.speedY;
        bp.opacity -= 0.025;

        if (bp.opacity <= 0) {
          burstParticles.splice(k, 1);
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  }
});