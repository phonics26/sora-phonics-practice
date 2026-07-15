(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function c(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=c(n);fetch(n.href,s)}})();const x={};function k(e,t){if(typeof t!="function"){console.error(`Cannot register "${e}". The page must be a function.`);return}x[e]=t}function l(e){const t=x[e];if(typeof t!="function"){console.error(`Page not found: ${e}`);return}window.scrollTo(0,0),t()}const g=10,E=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let d=0,p=0,w=!0;const R="/sora-phonics-practice/mascot/cloud_smile_clean.png";function O(){d=0,p=0,w=!0,Z(),D()}function Z(){document.querySelector("#app").innerHTML=`
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
            <strong id="soccer-score">0 / ${g}</strong>
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
            src="${R}"
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
            of ${g}
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
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),l("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",P)}function D(){w=!0;const e=E[d];document.querySelector("#soccer-kick-number").textContent=d+1,document.querySelector("#soccer-score").textContent=`${p} / ${g}`,document.querySelector("#soccer-progress-bar").style.width=`${d/g*100}%`,document.querySelector("#soccer-coach-message").textContent=`Kick the ball into the ${e.target} goal!`,document.querySelector("#soccer-feedback").textContent="Tap the correct goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const t=document.querySelector("#soccer-goals");t.innerHTML=e.goals.map((c,o)=>`
        <button
          class="soccer-goal soccer-goal-${o+1}"
          type="button"
          data-letter="${c}"
          data-position="${o}"
          aria-label="Goal ${c}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${c}</strong>
        </button>
      `).join(""),document.querySelectorAll(".soccer-goal").forEach(c=>{c.addEventListener("click",()=>{J(c)})}),ee(),setTimeout(P,450)}function P(){const e=E[d];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#soccer-feedback").textContent=`Kick the ball into the ${e.target} goal.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Kick the ball into the letter ${e.target} goal`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function J(e){if(!w)return;const t=E[d];e.dataset.letter===t.target?(w=!1,p+=1,Q(e),e.classList.add("soccer-correct-goal"),document.querySelector("#soccer-score").textContent=`${p} / ${g}`,document.querySelector("#soccer-feedback").textContent="GOAL! Fantastic! +1 ⭐",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-correct-feedback",document.querySelector("#soccer-coach-message").textContent="Amazing goal!",setTimeout(()=>{d+=1,d>=g?te():D()},1100)):(e.classList.add("soccer-wrong-goal"),document.querySelector("#soccer-feedback").textContent="Almost! Listen and try again.",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-wrong-feedback",document.querySelector("#soccer-coach-message").textContent="You can do it!",setTimeout(()=>{e.classList.remove("soccer-wrong-goal")},500))}function Q(e){const t=document.querySelector("#soccer-ball"),c=Number(e.dataset.position);t.classList.remove("ball-to-left","ball-to-centre","ball-to-right"),t.offsetWidth,c===0?t.classList.add("ball-to-left"):c===1?t.classList.add("ball-to-centre"):t.classList.add("ball-to-right")}function ee(){const e=document.querySelector("#soccer-ball");e.className="soccer-ball"}function te(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity1Score",String(p)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${R}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${p}</strong>
          <span>out of ${g}</span>
        </div>

        <p>
          You earned ${p} stars toward your
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
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{l("home")}),document.querySelector("#soccer-play-again").addEventListener("click",O)}const v=10,A=[{target:"cat",choices:[{name:"cat",icon:"🐱"},{name:"dog",icon:"🐶"},{name:"fish",icon:"🐟"}]},{target:"dog",choices:[{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"},{name:"pig",icon:"🐷"}]},{target:"fish",choices:[{name:"fish",icon:"🐟"},{name:"duck",icon:"🦆"},{name:"cat",icon:"🐱"}]},{target:"bird",choices:[{name:"frog",icon:"🐸"},{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"}]},{target:"pig",choices:[{name:"pig",icon:"🐷"},{name:"rabbit",icon:"🐰"},{name:"duck",icon:"🦆"}]},{target:"duck",choices:[{name:"cat",icon:"🐱"},{name:"duck",icon:"🦆"},{name:"frog",icon:"🐸"}]},{target:"frog",choices:[{name:"fish",icon:"🐟"},{name:"rabbit",icon:"🐰"},{name:"frog",icon:"🐸"}]},{target:"rabbit",choices:[{name:"rabbit",icon:"🐰"},{name:"pig",icon:"🐷"},{name:"bird",icon:"🐦"}]},{target:"hen",choices:[{name:"dog",icon:"🐶"},{name:"hen",icon:"🐔"},{name:"cat",icon:"🐱"}]},{target:"fox",choices:[{name:"frog",icon:"🐸"},{name:"fox",icon:"🦊"},{name:"rabbit",icon:"🐰"}]}];let u=0,h=0,$=!0;const I="/sora-phonics-practice/mascot/cloud_smile_clean.png";function H(){u=0,h=0,$=!0,ce(),M()}function ce(){document.querySelector("#app").innerHTML=`
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
            <strong id="animal-score">0 / ${v}</strong>
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
            src="${I}"
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
            of ${v}
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
  `,document.querySelector("#animal-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),l("home")}),document.querySelector("#animal-listen-button").addEventListener("click",N)}function M(){$=!0;const e=A[u];document.querySelector("#animal-round-number").textContent=u+1,document.querySelector("#animal-score").textContent=`${h} / ${v}`,document.querySelector("#animal-progress-bar").style.width=`${u/v*100}%`,document.querySelector("#animal-coach-message").textContent=`Point to the ${e.target}!`,document.querySelector("#animal-feedback").textContent="Choose one animal.",document.querySelector("#animal-feedback").className="animal-feedback";const t=document.querySelector("#animal-choices");t.innerHTML=e.choices.map(c=>`
        <button
          class="animal-choice"
          type="button"
          data-animal="${c.name}"
          aria-label="${c.name}"
        >
          <span class="animal-icon">${c.icon}</span>
          <strong>${c.name}</strong>
        </button>
      `).join(""),document.querySelectorAll(".animal-choice").forEach(c=>{c.addEventListener("click",()=>{ne(c)})}),setTimeout(N,450)}function N(){const e=A[u];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#animal-feedback").textContent=`Point to the ${e.target}.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Point to the ${e.target}`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function ne(e){if(!$)return;const t=A[u],c=e.dataset.animal,o=document.querySelector("#animal-feedback"),n=document.querySelector("#animal-coach-message"),s=document.querySelector("#animal-mascot");c===t.target?($=!1,h+=1,e.classList.add("animal-correct"),s.classList.add("animal-celebrate"),o.textContent="Great job! +1 ⭐",o.className="animal-feedback animal-correct-feedback",n.textContent="Fantastic! You found it!",document.querySelector("#animal-score").textContent=`${h} / ${v}`,setTimeout(()=>{s.classList.remove("animal-celebrate"),u+=1,u>=v?oe():M()},900)):(e.classList.add("animal-wrong"),o.textContent="Almost! Listen and try again.",o.className="animal-feedback animal-wrong-feedback",n.textContent="You can do it!",setTimeout(()=>{e.classList.remove("animal-wrong")},500))}function oe(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity2Score",String(h)),sessionStorage.setItem("activity2Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${I}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${h}</strong>
          <span>out of ${v}</span>
        </div>

        <p>
          You earned ${h} more stars toward your
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
  `,document.querySelector("#animal-return-home").addEventListener("click",()=>{l("home")}),document.querySelector("#animal-play-again").addEventListener("click",H)}const b=10,T=[{sentenceStart:"The",sentenceEnd:"is on the mat.",target:"cat",choices:["cat","dog","pig"],picture:"🐱"},{sentenceStart:"I see a",sentenceEnd:".",target:"dog",choices:["fox","dog","hen"],picture:"🐶"},{sentenceStart:"The",sentenceEnd:"is hot.",target:"sun",choices:["sun","bus","cup"],picture:"☀️"},{sentenceStart:"The",sentenceEnd:"can run.",target:"fox",choices:["pig","hen","fox"],picture:"🦊"},{sentenceStart:"The",sentenceEnd:"is pink.",target:"pig",choices:["dog","pig","cat"],picture:"🐷"},{sentenceStart:"The",sentenceEnd:"has a lid.",target:"pot",choices:["pot","bed","map"],picture:"🍲"},{sentenceStart:"I sit on the",sentenceEnd:".",target:"bed",choices:["bus","bed","cup"],picture:"🛏️"},{sentenceStart:"The",sentenceEnd:"is red.",target:"bus",choices:["hat","bus","sun"],picture:"🚌"},{sentenceStart:"The",sentenceEnd:"is in the box.",target:"hen",choices:["hen","fox","pig"],picture:"🐔"},{sentenceStart:"I have a",sentenceEnd:".",target:"hat",choices:["map","hat","cup"],picture:"🧢"}];let m=0,y=0,L=!0,r=null,a=null,i=null,z=0,B=0;const Y="/sora-phonics-practice/mascot/cloud_smile_clean.png";function G(){m=0,y=0,L=!0,se(),_()}function se(){const e=document.querySelector("#app");e.innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-game-window">
        <header class="cvc-header">
          <button
            id="cvc-home-button"
            class="cvc-back-button"
            type="button"
            aria-label="Return home"
          >
            ←
          </button>

          <div class="cvc-title">
            <p>SORA ADVENTURE</p>
            <h1>Word Builder</h1>
          </div>

          <div class="cvc-score-box">
            <span>Score</span>
            <strong id="cvc-score">0 / ${b}</strong>
          </div>
        </header>

        <div class="cvc-progress-track">
          <div
            id="cvc-progress-bar"
            class="cvc-progress-bar"
          ></div>
        </div>

        <section class="cvc-coach">
          <img
            id="cvc-mascot"
            class="cvc-mascot"
            src="${Y}"
            alt="SORA cloud mascot"
          />

          <div class="cvc-speech-bubble">
            <p id="cvc-coach-message">
              Drag the correct word into the blank!
            </p>
          </div>
        </section>

        <section class="cvc-instruction">
          <p>
            Round
            <span id="cvc-round-number">1</span>
            of ${b}
          </p>

          <h2>Complete the sentence</h2>

          <button
            id="cvc-listen-button"
            class="cvc-listen-button"
            type="button"
          >
            🔊 Hear the sentence
          </button>
        </section>

        <section class="cvc-question-card">
          <div
            id="cvc-picture"
            class="cvc-picture"
            aria-hidden="true"
          ></div>

          <p class="cvc-sentence">
            <span id="cvc-sentence-start"></span>

            <span
              id="cvc-drop-zone"
              class="cvc-drop-zone"
            >
              Drop here
            </span>

            <span id="cvc-sentence-end"></span>
          </p>
        </section>

        <p class="cvc-drag-instruction">
          Touch and drag one word into the blank.
        </p>

        <section
          id="cvc-choices"
          class="cvc-choices"
          aria-label="Word choices"
        ></section>

        <p
          id="cvc-feedback"
          class="cvc-feedback"
          aria-live="polite"
        >
          Drag one word into the blank.
        </p>
      </section>
    </main>
  `,document.querySelector("#cvc-home-button").addEventListener("click",()=>{j(),S(),l("home")}),document.querySelector("#cvc-listen-button").addEventListener("click",V)}function _(){S(),L=!0;const e=T[m];document.querySelector("#cvc-round-number").textContent=m+1,document.querySelector("#cvc-score").textContent=`${y} / ${b}`,document.querySelector("#cvc-progress-bar").style.width=`${m/b*100}%`,document.querySelector("#cvc-picture").textContent=e.picture,document.querySelector("#cvc-sentence-start").textContent=`${e.sentenceStart} `,document.querySelector("#cvc-sentence-end").textContent=` ${e.sentenceEnd}`,document.querySelector("#cvc-coach-message").textContent="Drag the correct word into the blank!";const t=document.querySelector("#cvc-feedback");t.textContent="Drag one word into the blank.",t.className="cvc-feedback";const c=document.querySelector("#cvc-drop-zone");c.textContent="Drop here",c.className="cvc-drop-zone";const o=document.querySelector("#cvc-choices");o.innerHTML=e.choices.map(n=>`
        <button
          class="cvc-choice"
          type="button"
          data-word="${n}"
          aria-label="Drag the word ${n}"
        >
          ${n}
        </button>
      `).join(""),document.querySelectorAll(".cvc-choice").forEach(n=>{n.addEventListener("pointerdown",ae)}),window.setTimeout(V,450)}function ae(e){!L||r||(e.preventDefault(),r=e.currentTarget,i=r.getBoundingClientRect(),z=e.clientX-i.left,B=e.clientY-i.top,a=r.cloneNode(!0),a.classList.add("cvc-drag-clone"),a.style.width=`${i.width}px`,a.style.height=`${i.height}px`,document.body.appendChild(a),r.classList.add("cvc-choice-placeholder"),U(e.clientX,e.clientY),window.addEventListener("pointermove",q),window.addEventListener("pointerup",re,{once:!0}),window.addEventListener("pointercancel",ie,{once:!0}))}function q(e){if(!a)return;e.preventDefault(),U(e.clientX,e.clientY);const t=document.querySelector("#cvc-drop-zone");W(e.clientX,e.clientY,t)?t.classList.add("cvc-drop-zone-active"):t.classList.remove("cvc-drop-zone-active")}function re(e){window.removeEventListener("pointermove",q);const t=document.querySelector("#cvc-drop-zone");t.classList.remove("cvc-drop-zone-active"),W(e.clientX,e.clientY,t)&&r?le(r):K()}function ie(){window.removeEventListener("pointermove",q),K()}function U(e,t){a&&(a.style.left=`${e-z}px`,a.style.top=`${t-B}px`)}function W(e,t,c){const o=c.getBoundingClientRect();return e>=o.left&&e<=o.right&&t>=o.top&&t<=o.bottom}function le(e){const t=T[m],c=e.dataset.word,o=document.querySelector("#cvc-drop-zone"),n=document.querySelector("#cvc-feedback"),s=document.querySelector("#cvc-coach-message"),f=document.querySelector("#cvc-mascot");c===t.target?(L=!1,y+=1,C(),e.classList.remove("cvc-choice-placeholder"),e.classList.add("cvc-correct"),o.textContent=t.target,o.classList.add("cvc-drop-zone-correct"),n.textContent="Excellent! +1 ⭐",n.className="cvc-feedback cvc-correct-feedback",s.textContent=`${t.sentenceStart} ${t.target} ${t.sentenceEnd}`,f.classList.add("cvc-celebrate"),document.querySelector("#cvc-score").textContent=`${y} / ${b}`,de(t),r=null,i=null,window.setTimeout(()=>{f.classList.remove("cvc-celebrate"),m+=1,m>=b?ue():_()},1300)):(C(),e.classList.remove("cvc-choice-placeholder"),e.classList.add("cvc-wrong"),o.classList.add("cvc-drop-zone-wrong"),n.textContent="Almost! Try another word.",n.className="cvc-feedback cvc-wrong-feedback",s.textContent="Try again!",r=null,i=null,window.setTimeout(()=>{e.classList.remove("cvc-wrong"),o.classList.remove("cvc-drop-zone-wrong")},550))}function K(){if(!r||!a){S();return}a.classList.add("cvc-drag-returning"),a.style.left=`${i.left}px`,a.style.top=`${i.top}px`,window.setTimeout(()=>{r&&r.classList.remove("cvc-choice-placeholder"),S()},220)}function C(){a&&(a.remove(),a=null)}function S(){window.removeEventListener("pointermove",q),C(),r&&r.classList.remove("cvc-choice-placeholder"),r=null,i=null}function V(){const e=T[m];if(!e)return;const t=`${e.sentenceStart}, blank, ${e.sentenceEnd}`;X(t)}function de(e){const t=`${e.sentenceStart} ${e.target} ${e.sentenceEnd}`;X(t)}function X(e){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=.78,t.pitch=1.03,t.volume=1,window.speechSynthesis.speak(t)}function j(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}function ue(){j(),S(),sessionStorage.setItem("activity3Score",String(y)),sessionStorage.setItem("activity3Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-results-window">
        <div class="cvc-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="cvc-results-mascot"
          src="${Y}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 3 COMPLETE</p>

        <h1>Fantastic Word Building!</h1>

        <div class="cvc-final-score">
          <strong>${y}</strong>
          <span>out of ${b}</span>
        </div>

        <p>
          You completed all three SORA Adventure activities!
        </p>

        <button
          id="cvc-results-button"
          class="cvc-primary-button"
          type="button"
        >
          View Results
        </button>

        <button
          id="cvc-play-again"
          class="cvc-secondary-button"
          type="button"
        >
          Play Again
        </button>
      </section>
    </main>
  `,document.querySelector("#cvc-results-button").addEventListener("click",()=>{l("results")}),document.querySelector("#cvc-play-again").addEventListener("click",G)}const F=document.querySelector("#app");if(!F)throw new Error("The #app element was not found. Check index.html.");function me(){F.innerHTML=`
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
          Test all three activities.
        </p>

        <button id="open-activity-one" type="button">
          Open Letter Goal
        </button>

        <button id="open-activity-two" type="button">
          Open Animal Match
        </button>

        <button id="open-activity-three" type="button">
          Open Sentence Builder
        </button>
      </section>
    </main>
  `,document.querySelector("#open-activity-one").addEventListener("click",()=>{l("activity1")}),document.querySelector("#open-activity-two").addEventListener("click",()=>{l("activity2")}),document.querySelector("#open-activity-three").addEventListener("click",()=>{l("activity3")})}k("home",me);k("activity1",O);k("activity2",H);k("activity3",G);l("home");
