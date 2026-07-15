(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const v of a.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&s(v)}).observe(document,{childList:!0,subtree:!0});function c(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=c(n);fetch(n.href,a)}})();const E={};function $(e,t){if(typeof t!="function"){console.error(`Cannot register "${e}". The page must be a function.`);return}E[e]=t}function r(e){const t=E[e];if(typeof t!="function"){console.error(`Page not found: ${e}`);return}window.scrollTo(0,0),t()}const p=10,L=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let i=0,u=0,y=!0;const A="/sora-phonics-practice/mascot/cloud_smile_clean.png";function T(){i=0,u=0,y=!0,K(),x()}function K(){document.querySelector("#app").innerHTML=`
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
            <strong id="soccer-score">0 / ${p}</strong>
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
            src="${A}"
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
            of ${p}
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
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),r("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",O)}function x(){y=!0;const e=L[i];document.querySelector("#soccer-kick-number").textContent=i+1,document.querySelector("#soccer-score").textContent=`${u} / ${p}`,document.querySelector("#soccer-progress-bar").style.width=`${i/p*100}%`,document.querySelector("#soccer-coach-message").textContent=`Kick the ball into the ${e.target} goal!`,document.querySelector("#soccer-feedback").textContent="Tap the correct goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const t=document.querySelector("#soccer-goals");t.innerHTML=e.goals.map((c,s)=>`
        <button
          class="soccer-goal soccer-goal-${s+1}"
          type="button"
          data-letter="${c}"
          data-position="${s}"
          aria-label="Goal ${c}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${c}</strong>
        </button>
      `).join(""),document.querySelectorAll(".soccer-goal").forEach(c=>{c.addEventListener("click",()=>{U(c)})}),X(),setTimeout(O,450)}function O(){const e=L[i];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#soccer-feedback").textContent=`Kick the ball into the ${e.target} goal.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Kick the ball into the letter ${e.target} goal`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function U(e){if(!y)return;const t=L[i];e.dataset.letter===t.target?(y=!1,u+=1,V(e),e.classList.add("soccer-correct-goal"),document.querySelector("#soccer-score").textContent=`${u} / ${p}`,document.querySelector("#soccer-feedback").textContent="GOAL! Fantastic! +1 ⭐",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-correct-feedback",document.querySelector("#soccer-coach-message").textContent="Amazing goal!",setTimeout(()=>{i+=1,i>=p?j():x()},1100)):(e.classList.add("soccer-wrong-goal"),document.querySelector("#soccer-feedback").textContent="Almost! Listen and try again.",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-wrong-feedback",document.querySelector("#soccer-coach-message").textContent="You can do it!",setTimeout(()=>{e.classList.remove("soccer-wrong-goal")},500))}function V(e){const t=document.querySelector("#soccer-ball"),c=Number(e.dataset.position);t.classList.remove("ball-to-left","ball-to-centre","ball-to-right"),t.offsetWidth,c===0?t.classList.add("ball-to-left"):c===1?t.classList.add("ball-to-centre"):t.classList.add("ball-to-right")}function X(){const e=document.querySelector("#soccer-ball");e.className="soccer-ball"}function j(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity1Score",String(u)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${A}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${u}</strong>
          <span>out of ${p}</span>
        </div>

        <p>
          You earned ${u} stars toward your
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
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{r("home")}),document.querySelector("#soccer-play-again").addEventListener("click",T)}const h=10,q=[{target:"cat",choices:[{name:"cat",icon:"🐱"},{name:"dog",icon:"🐶"},{name:"fish",icon:"🐟"}]},{target:"dog",choices:[{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"},{name:"pig",icon:"🐷"}]},{target:"fish",choices:[{name:"fish",icon:"🐟"},{name:"duck",icon:"🦆"},{name:"cat",icon:"🐱"}]},{target:"bird",choices:[{name:"frog",icon:"🐸"},{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"}]},{target:"pig",choices:[{name:"pig",icon:"🐷"},{name:"rabbit",icon:"🐰"},{name:"duck",icon:"🦆"}]},{target:"duck",choices:[{name:"cat",icon:"🐱"},{name:"duck",icon:"🦆"},{name:"frog",icon:"🐸"}]},{target:"frog",choices:[{name:"fish",icon:"🐟"},{name:"rabbit",icon:"🐰"},{name:"frog",icon:"🐸"}]},{target:"rabbit",choices:[{name:"rabbit",icon:"🐰"},{name:"pig",icon:"🐷"},{name:"bird",icon:"🐦"}]},{target:"hen",choices:[{name:"dog",icon:"🐶"},{name:"hen",icon:"🐔"},{name:"cat",icon:"🐱"}]},{target:"fox",choices:[{name:"frog",icon:"🐸"},{name:"fox",icon:"🦊"},{name:"rabbit",icon:"🐰"}]}];let l=0,m=0,f=!0;const R="/sora-phonics-practice/mascot/cloud_smile_clean.png";function D(){l=0,m=0,f=!0,F(),P()}function F(){document.querySelector("#app").innerHTML=`
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
            <strong id="animal-score">0 / ${h}</strong>
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
            src="${R}"
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
            of ${h}
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
  `,document.querySelector("#animal-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),r("home")}),document.querySelector("#animal-listen-button").addEventListener("click",I)}function P(){f=!0;const e=q[l];document.querySelector("#animal-round-number").textContent=l+1,document.querySelector("#animal-score").textContent=`${m} / ${h}`,document.querySelector("#animal-progress-bar").style.width=`${l/h*100}%`,document.querySelector("#animal-coach-message").textContent=`Point to the ${e.target}!`,document.querySelector("#animal-feedback").textContent="Choose one animal.",document.querySelector("#animal-feedback").className="animal-feedback";const t=document.querySelector("#animal-choices");t.innerHTML=e.choices.map(c=>`
        <button
          class="animal-choice"
          type="button"
          data-animal="${c.name}"
          aria-label="${c.name}"
        >
          <span class="animal-icon">${c.icon}</span>
          <strong>${c.name}</strong>
        </button>
      `).join(""),document.querySelectorAll(".animal-choice").forEach(c=>{c.addEventListener("click",()=>{Z(c)})}),setTimeout(I,450)}function I(){const e=q[l];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#animal-feedback").textContent=`Point to the ${e.target}.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Point to the ${e.target}`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function Z(e){if(!f)return;const t=q[l],c=e.dataset.animal,s=document.querySelector("#animal-feedback"),n=document.querySelector("#animal-coach-message"),a=document.querySelector("#animal-mascot");c===t.target?(f=!1,m+=1,e.classList.add("animal-correct"),a.classList.add("animal-celebrate"),s.textContent="Great job! +1 ⭐",s.className="animal-feedback animal-correct-feedback",n.textContent="Fantastic! You found it!",document.querySelector("#animal-score").textContent=`${m} / ${h}`,setTimeout(()=>{a.classList.remove("animal-celebrate"),l+=1,l>=h?J():P()},900)):(e.classList.add("animal-wrong"),s.textContent="Almost! Listen and try again.",s.className="animal-feedback animal-wrong-feedback",n.textContent="You can do it!",setTimeout(()=>{e.classList.remove("animal-wrong")},500))}function J(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity2Score",String(m)),sessionStorage.setItem("activity2Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${R}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${m}</strong>
          <span>out of ${h}</span>
        </div>

        <p>
          You earned ${m} more stars toward your
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
  `,document.querySelector("#animal-return-home").addEventListener("click",()=>{r("home")}),document.querySelector("#animal-play-again").addEventListener("click",D)}const g=10,C=[{sentenceStart:"The",sentenceEnd:"is on the mat.",target:"cat",choices:["cat","dog","pig"],picture:"🐱"},{sentenceStart:"I see a",sentenceEnd:".",target:"dog",choices:["fox","dog","hen"],picture:"🐶"},{sentenceStart:"The",sentenceEnd:"is hot.",target:"sun",choices:["sun","bus","cup"],picture:"☀️"},{sentenceStart:"The",sentenceEnd:"can run.",target:"fox",choices:["pig","hen","fox"],picture:"🦊"},{sentenceStart:"The",sentenceEnd:"is pink.",target:"pig",choices:["dog","pig","cat"],picture:"🐷"},{sentenceStart:"The",sentenceEnd:"has a lid.",target:"pot",choices:["pot","bed","map"],picture:"🍲"},{sentenceStart:"I sit on the",sentenceEnd:".",target:"bed",choices:["bus","bed","cup"],picture:"🛏️"},{sentenceStart:"The",sentenceEnd:"is red.",target:"bus",choices:["hat","bus","sun"],picture:"🚌"},{sentenceStart:"The",sentenceEnd:"is in the box.",target:"hen",choices:["hen","fox","pig"],picture:"🐔"},{sentenceStart:"I have a",sentenceEnd:".",target:"hat",choices:["map","hat","cup"],picture:"🧢"}];let d=0,b=0,k=!0,o=null,H=0,N=0;const M="/sora-phonics-practice/mascot/cloud_smile_clean.png";function B(){d=0,b=0,k=!0,Q(),z()}function Q(){document.querySelector("#app").innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-game-window">
        <header class="cvc-header">
          <button
            id="cvc-home-button"
            class="cvc-back-button"
            type="button"
          >
            ←
          </button>

          <div class="cvc-title">
            <p>SORA ADVENTURE</p>
            <h1>Word Builder</h1>
          </div>

          <div class="cvc-score-box">
            <span>Score</span>
            <strong id="cvc-score">0 / ${g}</strong>
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
            src="${M}"
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
            Round <span id="cvc-round-number">1</span>
            of ${g}
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
  `,document.querySelector("#cvc-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),r("home")}),document.querySelector("#cvc-listen-button").addEventListener("click",G)}function z(){k=!0;const e=C[d],t=document.querySelector("#cvc-drop-zone");document.querySelector("#cvc-round-number").textContent=d+1,document.querySelector("#cvc-score").textContent=`${b} / ${g}`,document.querySelector("#cvc-progress-bar").style.width=`${d/g*100}%`,document.querySelector("#cvc-picture").textContent=e.picture,document.querySelector("#cvc-sentence-start").textContent=`${e.sentenceStart} `,document.querySelector("#cvc-sentence-end").textContent=` ${e.sentenceEnd}`,document.querySelector("#cvc-coach-message").textContent="Drag the correct word into the blank!",document.querySelector("#cvc-feedback").textContent="Drag one word into the blank.",document.querySelector("#cvc-feedback").className="cvc-feedback",t.textContent="Drop here",t.className="cvc-drop-zone";const c=document.querySelector("#cvc-choices");c.innerHTML=e.choices.map(s=>`
        <button
          class="cvc-choice"
          type="button"
          data-word="${s}"
        >
          ${s}
        </button>
      `).join(""),document.querySelectorAll(".cvc-choice").forEach(ee),setTimeout(G,450)}function ee(e){e.addEventListener("pointerdown",te)}function te(e){if(!k)return;e.preventDefault(),o=e.currentTarget;const t=o.getBoundingClientRect();H=e.clientX-t.left,N=e.clientY-t.top,o.setPointerCapture(e.pointerId),o.classList.add("cvc-dragging"),o.style.width=`${t.width}px`,o.style.height=`${t.height}px`,o.style.left=`${t.left}px`,o.style.top=`${t.top}px`,w(e),o.addEventListener("pointermove",w),o.addEventListener("pointerup",ce,{once:!0}),o.addEventListener("pointercancel",ne,{once:!0})}function w(e){if(!o)return;o.style.left=`${e.clientX-H}px`,o.style.top=`${e.clientY-N}px`;const t=document.querySelector("#cvc-drop-zone");Y(e,t)?t.classList.add("cvc-drop-zone-active"):t.classList.remove("cvc-drop-zone-active")}function ce(e){if(!o)return;const t=o,c=document.querySelector("#cvc-drop-zone");t.removeEventListener("pointermove",w),c.classList.remove("cvc-drop-zone-active"),Y(e,c)?oe(t):S(t),o=null}function ne(){o&&S(o),o=null}function Y(e,t){const c=t.getBoundingClientRect();return e.clientX>=c.left&&e.clientX<=c.right&&e.clientY>=c.top&&e.clientY<=c.bottom}function S(e){e.classList.remove("cvc-dragging"),e.style.removeProperty("width"),e.style.removeProperty("height"),e.style.removeProperty("left"),e.style.removeProperty("top")}function oe(e){const t=C[d],c=e.dataset.word,s=document.querySelector("#cvc-drop-zone"),n=document.querySelector("#cvc-feedback"),a=document.querySelector("#cvc-coach-message"),v=document.querySelector("#cvc-mascot");c===t.target?(k=!1,b+=1,S(e),e.classList.add("cvc-correct"),s.textContent=t.target,s.classList.add("cvc-drop-zone-correct"),n.textContent="Excellent! +1 ⭐",n.className="cvc-feedback cvc-correct-feedback",a.textContent=`${t.sentenceStart} ${t.target} ${t.sentenceEnd}`,v.classList.add("cvc-celebrate"),document.querySelector("#cvc-score").textContent=`${b} / ${g}`,se(t),setTimeout(()=>{v.classList.remove("cvc-celebrate"),d+=1,d>=g?ae():z()},1300)):(S(e),e.classList.add("cvc-wrong"),s.classList.add("cvc-drop-zone-wrong"),n.textContent="Almost! Try another word.",n.className="cvc-feedback cvc-wrong-feedback",a.textContent="Try again!",setTimeout(()=>{e.classList.remove("cvc-wrong"),s.classList.remove("cvc-drop-zone-wrong")},550))}function G(){const e=C[d];if(!e)return;const t=`${e.sentenceStart}, blank, ${e.sentenceEnd}`;_(t)}function se(e){const t=`${e.sentenceStart} ${e.target} ${e.sentenceEnd}`;_(t)}function _(e){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=.78,t.pitch=1.03,t.volume=1,window.speechSynthesis.speak(t)}function ae(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity3Score",String(b)),sessionStorage.setItem("activity3Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-results-window">
        <div class="cvc-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="cvc-results-mascot"
          src="${M}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 3 COMPLETE</p>

        <h1>Fantastic Word Building!</h1>

        <div class="cvc-final-score">
          <strong>${b}</strong>
          <span>out of ${g}</span>
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
  `,document.querySelector("#cvc-results-button").addEventListener("click",()=>{r("results")}),document.querySelector("#cvc-play-again").addEventListener("click",B)}const W=document.querySelector("#app");if(!W)throw new Error("The #app element was not found. Check index.html.");function re(){W.innerHTML=`
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
  `,document.querySelector("#open-activity-one").addEventListener("click",()=>{r("activity1")}),document.querySelector("#open-activity-two").addEventListener("click",()=>{r("activity2")}),document.querySelector("#open-activity-three").addEventListener("click",()=>{r("activity3")})}$("home",re);$("activity1",T);$("activity2",D);$("activity3",B);r("home");
