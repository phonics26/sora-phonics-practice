(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))i(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerPolicy&&(s.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?s.credentials="include":c.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(c){if(c.ep)return;c.ep=!0;const s=o(c);fetch(c.href,s)}})();const p={};function g(t,e){if(typeof e!="function"){console.error(`Cannot register "${t}". The page must be a function.`);return}p[t]=e}function u(t){const e=p[t];if(typeof e!="function"){console.error(`Page not found: ${t}`);return}window.scrollTo(0,0),e()}const a=10,m=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let r=0,n=0,l=!0;const h="/sora-phonics-practice/mascot/cloud_smile_clean.png";function f(){r=0,n=0,l=!0,v(),b()}function v(){document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-game-window">
        <header class="soccer-game-header">
          <button
            id="soccer-home-button"
            class="soccer-back-button"
            type="button"
            aria-label="Return home"
          >
            ←
          </button>

          <div>
            <p>SORA KIDS</p>
            <h1>Letter Goal</h1>
          </div>

          <div class="soccer-score-box">
            <span>Score</span>
            <strong id="soccer-score">0 / ${a}</strong>
          </div>
        </header>

        <div class="soccer-progress-track">
          <div
            id="soccer-progress-bar"
            class="soccer-progress-bar"
          ></div>
        </div>

        <section class="soccer-coach">
          <img
            id="soccer-mascot"
            class="soccer-mascot"
            src="${h}"
            alt="SORA cloud mascot"
          />

          <div class="soccer-speech-bubble">
            <p id="soccer-coach-message">
              Listen carefully!
            </p>
          </div>
        </section>

        <section class="soccer-instruction">
          <p>
            Kick <span id="soccer-kick-number">1</span>
            of ${a}
          </p>

          <h2 id="soccer-question">
            Which letter did you hear?
          </h2>

          <button
            id="soccer-listen-button"
            class="soccer-listen-button"
            type="button"
          >
            🔊 Hear it again
          </button>
        </section>

        <section
          id="soccer-goals"
          class="soccer-goals"
          aria-label="Choose a letter goal"
        ></section>

        <div class="soccer-ball-area">
          <div id="soccer-ball" class="soccer-ball">⚽</div>
        </div>

        <p
          id="soccer-feedback"
          class="soccer-feedback"
          aria-live="polite"
        >
          Tap the correct goal!
        </p>
      </section>
    </main>
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),u("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",y)}function b(){l=!0;const t=m[r];document.querySelector("#soccer-kick-number").textContent=r+1,document.querySelector("#soccer-score").textContent=`${n} / ${a}`,document.querySelector("#soccer-progress-bar").style.width=`${r/a*100}%`,document.querySelector("#soccer-coach-message").textContent=`Kick the ball into the ${t.target} goal!`,document.querySelector("#soccer-feedback").textContent="Tap the correct goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const e=document.querySelector("#soccer-goals");e.innerHTML=t.goals.map((o,i)=>`
        <button
          class="soccer-goal soccer-goal-${i+1}"
          type="button"
          data-letter="${o}"
          data-position="${i}"
          aria-label="Goal ${o}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${o}</strong>
        </button>
      `).join(""),document.querySelectorAll(".soccer-goal").forEach(o=>{o.addEventListener("click",()=>{L(o)})}),q(),setTimeout(y,450)}function y(){const t=m[r];if(!t)return;if(!("speechSynthesis"in window)){document.querySelector("#soccer-feedback").textContent=`Kick the ball into the ${t.target} goal.`;return}window.speechSynthesis.cancel();const e=new SpeechSynthesisUtterance(`Kick the ball into the letter ${t.target} goal`);e.rate=.82,e.pitch=1.05,e.volume=1,window.speechSynthesis.speak(e)}function L(t){if(!l)return;const e=m[r];t.dataset.letter===e.target?(l=!1,n+=1,k(t),t.classList.add("soccer-correct-goal"),document.querySelector("#soccer-score").textContent=`${n} / ${a}`,document.querySelector("#soccer-feedback").textContent="GOAL! Fantastic! +1 ⭐",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-correct-feedback",document.querySelector("#soccer-coach-message").textContent="Amazing goal!",setTimeout(()=>{r+=1,r>=a?w():b()},1100)):(t.classList.add("soccer-wrong-goal"),document.querySelector("#soccer-feedback").textContent="Almost! Listen and try again.",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-wrong-feedback",document.querySelector("#soccer-coach-message").textContent="You can do it!",setTimeout(()=>{t.classList.remove("soccer-wrong-goal")},500))}function k(t){const e=document.querySelector("#soccer-ball"),o=Number(t.dataset.position);e.classList.remove("ball-to-left","ball-to-centre","ball-to-right"),e.offsetWidth,o===0?e.classList.add("ball-to-left"):o===1?e.classList.add("ball-to-centre"):e.classList.add("ball-to-right")}function q(){const t=document.querySelector("#soccer-ball");t.className="soccer-ball"}function w(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity1Score",String(n)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${h}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${n}</strong>
          <span>out of ${a}</span>
        </div>

        <p>
          You earned ${n} stars toward your
          SORA English reward!
        </p>

        <button
          id="soccer-return-home"
          type="button"
        >
          Return to Home
        </button>

        <button
          id="soccer-play-again"
          type="button"
        >
          Play Again
        </button>
      </section>
    </main>
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{u("home")}),document.querySelector("#soccer-play-again").addEventListener("click",f)}const S=document.querySelector("#app");if(!S)throw new Error("The #app element was not found. Check index.html.");function A(){S.innerHTML=`
    <main class="setup-test-page">
      <section class="setup-test-card">
        <img
          class="setup-test-mascot"
          src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
          alt="SORA mascot"
        />

        <p class="setup-test-brand">SORA KIDS</p>

        <h1>Activity 1 Test</h1>

        <p>
          Press the button to test the soccer game.
        </p>

        <button
          id="open-activity-button"
          type="button"
        >
          Open Letter Goal
        </button>
      </section>
    </main>
  `,document.querySelector("#open-activity-button").addEventListener("click",()=>{u("activity1")})}g("home",A);g("activity1",f);u("home");
