(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function c(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=c(o);fetch(o.href,a)}})();const S={};function b(e,t){if(typeof t!="function"){console.error(`Cannot register "${e}". The page must be a function.`);return}S[e]=t}function d(e){const t=S[e];if(typeof t!="function"){console.error(`Page not found: ${e}`);return}window.scrollTo(0,0),t()}const u=10,f=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let s=0,r=0,p=!0;const v="/sora-phonics-practice/mascot/cloud_smile_clean.png";function k(){s=0,r=0,p=!0,E(),w()}function E(){document.querySelector("#app").innerHTML=`
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
            <strong id="soccer-score">0 / ${u}</strong>
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
            src="${v}"
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
            of ${u}
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
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),d("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",$)}function w(){p=!0;const e=f[s];document.querySelector("#soccer-kick-number").textContent=s+1,document.querySelector("#soccer-score").textContent=`${r} / ${u}`,document.querySelector("#soccer-progress-bar").style.width=`${s/u*100}%`,document.querySelector("#soccer-coach-message").textContent=`Kick the ball into the ${e.target} goal!`,document.querySelector("#soccer-feedback").textContent="Tap the correct goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const t=document.querySelector("#soccer-goals");t.innerHTML=e.goals.map((c,n)=>`
        <button
          class="soccer-goal soccer-goal-${n+1}"
          type="button"
          data-letter="${c}"
          data-position="${n}"
          aria-label="Goal ${c}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${c}</strong>
        </button>
      `).join(""),document.querySelectorAll(".soccer-goal").forEach(c=>{c.addEventListener("click",()=>{x(c)})}),R(),setTimeout($,450)}function $(){const e=f[s];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#soccer-feedback").textContent=`Kick the ball into the ${e.target} goal.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Kick the ball into the letter ${e.target} goal`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function x(e){if(!p)return;const t=f[s];e.dataset.letter===t.target?(p=!1,r+=1,O(e),e.classList.add("soccer-correct-goal"),document.querySelector("#soccer-score").textContent=`${r} / ${u}`,document.querySelector("#soccer-feedback").textContent="GOAL! Fantastic! +1 ⭐",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-correct-feedback",document.querySelector("#soccer-coach-message").textContent="Amazing goal!",setTimeout(()=>{s+=1,s>=u?P():w()},1100)):(e.classList.add("soccer-wrong-goal"),document.querySelector("#soccer-feedback").textContent="Almost! Listen and try again.",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-wrong-feedback",document.querySelector("#soccer-coach-message").textContent="You can do it!",setTimeout(()=>{e.classList.remove("soccer-wrong-goal")},500))}function O(e){const t=document.querySelector("#soccer-ball"),c=Number(e.dataset.position);t.classList.remove("ball-to-left","ball-to-centre","ball-to-right"),t.offsetWidth,c===0?t.classList.add("ball-to-left"):c===1?t.classList.add("ball-to-centre"):t.classList.add("ball-to-right")}function R(){const e=document.querySelector("#soccer-ball");e.className="soccer-ball"}function P(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity1Score",String(r)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${v}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${r}</strong>
          <span>out of ${u}</span>
        </div>

        <p>
          You earned ${r} stars toward your
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
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{d("home")}),document.querySelector("#soccer-play-again").addEventListener("click",k)}const m=10,y=[{target:"cat",choices:[{name:"cat",icon:"🐱"},{name:"dog",icon:"🐶"},{name:"fish",icon:"🐟"}]},{target:"dog",choices:[{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"},{name:"pig",icon:"🐷"}]},{target:"fish",choices:[{name:"fish",icon:"🐟"},{name:"duck",icon:"🦆"},{name:"cat",icon:"🐱"}]},{target:"bird",choices:[{name:"frog",icon:"🐸"},{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"}]},{target:"pig",choices:[{name:"pig",icon:"🐷"},{name:"rabbit",icon:"🐰"},{name:"duck",icon:"🦆"}]},{target:"duck",choices:[{name:"cat",icon:"🐱"},{name:"duck",icon:"🦆"},{name:"frog",icon:"🐸"}]},{target:"frog",choices:[{name:"fish",icon:"🐟"},{name:"rabbit",icon:"🐰"},{name:"frog",icon:"🐸"}]},{target:"rabbit",choices:[{name:"rabbit",icon:"🐰"},{name:"pig",icon:"🐷"},{name:"bird",icon:"🐦"}]},{target:"hen",choices:[{name:"dog",icon:"🐶"},{name:"hen",icon:"🐔"},{name:"cat",icon:"🐱"}]},{target:"fox",choices:[{name:"frog",icon:"🐸"},{name:"fox",icon:"🦊"},{name:"rabbit",icon:"🐰"}]}];let i=0,l=0,g=!0;const L="/sora-phonics-practice/mascot/cloud_smile_clean.png";function q(){i=0,l=0,g=!0,H(),A()}function H(){document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-game-window">
        <header class="animal-header">
          <button
            id="animal-home-button"
            class="animal-back-button"
            type="button"
            aria-label="Return home"
          >
            ←
          </button>

          <div class="animal-title">
            <p>SORA ADVENTURE</p>
            <h1>Animal Match</h1>
          </div>

          <div class="animal-score-box">
            <span>Score</span>
            <strong id="animal-score">0 / ${m}</strong>
          </div>
        </header>

        <div class="animal-progress-track">
          <div
            id="animal-progress-bar"
            class="animal-progress-bar"
          ></div>
        </div>

        <section class="animal-coach">
          <img
            id="animal-mascot"
            class="animal-mascot"
            src="${L}"
            alt="SORA cloud mascot"
          />

          <div class="animal-speech-bubble">
            <p id="animal-coach-message">
              Listen and point to the correct animal!
            </p>
          </div>
        </section>

        <section class="animal-instruction">
          <p>
            Round <span id="animal-round-number">1</span>
            of ${m}
          </p>

          <h2>Which animal did you hear?</h2>

          <button
            id="animal-listen-button"
            class="animal-listen-button"
            type="button"
          >
            🔊 Hear it again
          </button>
        </section>

        <section
          id="animal-choices"
          class="animal-choices"
          aria-label="Animal choices"
        ></section>

        <p
          id="animal-feedback"
          class="animal-feedback"
          aria-live="polite"
        >
          Choose one animal.
        </p>
      </section>
    </main>
  `,document.querySelector("#animal-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),d("home")}),document.querySelector("#animal-listen-button").addEventListener("click",C)}function A(){g=!0;const e=y[i];document.querySelector("#animal-round-number").textContent=i+1,document.querySelector("#animal-score").textContent=`${l} / ${m}`,document.querySelector("#animal-progress-bar").style.width=`${i/m*100}%`,document.querySelector("#animal-coach-message").textContent=`Point to the ${e.target}!`,document.querySelector("#animal-feedback").textContent="Choose one animal.",document.querySelector("#animal-feedback").className="animal-feedback";const t=document.querySelector("#animal-choices");t.innerHTML=e.choices.map(c=>`
        <button
          class="animal-choice"
          type="button"
          data-animal="${c.name}"
          aria-label="${c.name}"
        >
          <span class="animal-icon">${c.icon}</span>
          <strong>${c.name}</strong>
        </button>
      `).join(""),document.querySelectorAll(".animal-choice").forEach(c=>{c.addEventListener("click",()=>{D(c)})}),setTimeout(C,450)}function C(){const e=y[i];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#animal-feedback").textContent=`Point to the ${e.target}.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Point to the ${e.target}`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function D(e){if(!g)return;const t=y[i],c=e.dataset.animal,n=document.querySelector("#animal-feedback"),o=document.querySelector("#animal-coach-message"),a=document.querySelector("#animal-mascot");c===t.target?(g=!1,l+=1,e.classList.add("animal-correct"),a.classList.add("animal-celebrate"),n.textContent="Great job! +1 ⭐",n.className="animal-feedback animal-correct-feedback",o.textContent="Fantastic! You found it!",document.querySelector("#animal-score").textContent=`${l} / ${m}`,setTimeout(()=>{a.classList.remove("animal-celebrate"),i+=1,i>=m?I():A()},900)):(e.classList.add("animal-wrong"),n.textContent="Almost! Listen and try again.",n.className="animal-feedback animal-wrong-feedback",o.textContent="You can do it!",setTimeout(()=>{e.classList.remove("animal-wrong")},500))}function I(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity2Score",String(l)),sessionStorage.setItem("activity2Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${L}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${l}</strong>
          <span>out of ${m}</span>
        </div>

        <p>
          You earned ${l} more stars toward your
          SORA English reward!
        </p>

        <button
          id="animal-return-home"
          class="animal-primary-button"
          type="button"
        >
          Return to Home
        </button>

        <button
          id="animal-play-again"
          class="animal-secondary-button"
          type="button"
        >
          Play Again
        </button>
      </section>
    </main>
  `,document.querySelector("#animal-return-home").addEventListener("click",()=>{d("home")}),document.querySelector("#animal-play-again").addEventListener("click",q)}const T=document.querySelector("#app");if(!T)throw new Error("The #app element was not found. Check index.html.");function M(){T.innerHTML=`
    <main class="setup-test-page">
      <section class="setup-test-card">
        <img
          class="setup-test-mascot"
          src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
          alt="SORA mascot"
        />

        <p class="setup-test-brand">SORA ADVENTURE</p>

        <h1>Activity Test Page</h1>

        <p>
          Test both activities before we create Activity 3.
        </p>

        <button
          id="open-activity-one"
          type="button"
        >
          Open Letter Goal
        </button>

        <button
          id="open-activity-two"
          type="button"
        >
          Open Animal Match
        </button>
      </section>
    </main>
  `,document.querySelector("#open-activity-one").addEventListener("click",()=>{d("activity1")}),document.querySelector("#open-activity-two").addEventListener("click",()=>{d("activity2")})}b("home",M);b("activity1",k);b("activity2",q);d("home");
