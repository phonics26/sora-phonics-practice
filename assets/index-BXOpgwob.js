(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const w of a.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&c(w)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const I={};function C(e,t){if(typeof t!="function"){console.error(`Cannot register "${e}". The page must be a function.`);return}I[e]=t}function m(e){const t=I[e];if(typeof t!="function"){console.error(`Page not found: ${e}`);return}window.scrollTo(0,0),t()}const b=10,D=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let p=0,v=0,q=!0,u=null,s=null,l=null,M=0,N=0;const H="/sora-phonics-practice/mascot/cloud_smile_clean.png";function Y(){p=0,v=0,q=!0,le(),z()}function le(){document.querySelector("#app").innerHTML=`
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
            <p>SORA ADVENTURE</p>
            <h1>Letter Goal</h1>
          </div>

          <div class="soccer-score-box">
            <span>Score</span>
            <strong id="soccer-score">0 / ${b}</strong>
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
            src="${H}"
            alt="SORA cloud mascot"
          />

          <div class="soccer-speech-bubble">
            <p id="soccer-coach-message">
              Drag the ball into the correct goal!
            </p>
          </div>
        </section>

        <section class="soccer-instruction">
          <p>
            Kick <span id="soccer-kick-number">1</span>
            of ${b}
          </p>

          <h2>Which letter did you hear?</h2>

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
          aria-label="Letter goals"
        ></section>

        <p class="soccer-drag-instruction">
          Touch and drag the ball into the correct goal.
        </p>

        <div class="soccer-ball-area">
          <button
            id="soccer-ball"
            class="soccer-ball"
            type="button"
            aria-label="Drag the soccer ball"
          >
            ⚽
          </button>
        </div>

        <p
          id="soccer-feedback"
          class="soccer-feedback"
          aria-live="polite"
        >
          Drag the ball into a goal!
        </p>
      </section>
    </main>
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{W(),L(),m("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",X),document.querySelector("#soccer-ball").addEventListener("pointerdown",de)}function z(){L(),q=!0;const e=D[p];document.querySelector("#soccer-kick-number").textContent=p+1,document.querySelector("#soccer-score").textContent=`${v} / ${b}`,document.querySelector("#soccer-progress-bar").style.width=`${p/b*100}%`,document.querySelector("#soccer-coach-message").textContent=`Drag the ball into the ${e.target} goal!`,document.querySelector("#soccer-feedback").textContent="Drag the ball into a goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const t=document.querySelector("#soccer-goals");t.innerHTML=e.goals.map((o,c)=>`
        <div
          class="soccer-goal soccer-goal-${c+1}"
          data-letter="${o}"
          data-position="${c}"
          aria-label="Goal ${o}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${o}</strong>
        </div>
      `).join(""),ge(),window.setTimeout(X,450)}function de(e){!q||s||(e.preventDefault(),u=e.currentTarget,l=u.getBoundingClientRect(),M=e.clientX-l.left,N=e.clientY-l.top,s=u.cloneNode(!0),s.classList.add("soccer-ball-clone"),s.style.width=`${l.width}px`,s.style.height=`${l.height}px`,document.body.appendChild(s),u.classList.add("soccer-ball-placeholder"),G(e.clientX,e.clientY),window.addEventListener("pointermove",A),window.addEventListener("pointerup",ue,{once:!0}),window.addEventListener("pointercancel",me,{once:!0}))}function A(e){s&&(e.preventDefault(),G(e.clientX,e.clientY),document.querySelectorAll(".soccer-goal").forEach(t=>{U(e.clientX,e.clientY,t)?t.classList.add("soccer-goal-active"):t.classList.remove("soccer-goal-active")}))}function ue(e){window.removeEventListener("pointermove",A);const t=[...document.querySelectorAll(".soccer-goal")];t.forEach(c=>{c.classList.remove("soccer-goal-active")});const o=t.find(c=>U(e.clientX,e.clientY,c));o?pe(o):O()}function me(){window.removeEventListener("pointermove",A),O()}function pe(e){const t=D[p],o=e.dataset.letter,c=document.querySelector("#soccer-feedback"),n=document.querySelector("#soccer-coach-message"),a=document.querySelector("#soccer-mascot");o===t.target?(q=!1,v+=1,he(e),e.classList.add("soccer-correct-goal"),a.classList.add("soccer-mascot-celebrate"),c.textContent="GOAL! Fantastic! +1 ⭐",c.className="soccer-feedback soccer-correct-feedback",n.textContent="Amazing goal!",document.querySelector("#soccer-score").textContent=`${v} / ${b}`,window.setTimeout(()=>{a.classList.remove("soccer-mascot-celebrate"),p+=1,p>=b?fe():z()},1100)):(e.classList.add("soccer-wrong-goal"),c.textContent="Almost! Try another goal.",c.className="soccer-feedback soccer-wrong-feedback",n.textContent="Try again!",O(),window.setTimeout(()=>{e.classList.remove("soccer-wrong-goal")},500))}function he(e){if(!s)return;const t=e.getBoundingClientRect();s.classList.add("soccer-ball-scored"),s.style.left=`${t.left+t.width/2-l.width/2}px`,s.style.top=`${t.top+t.height/2-l.height/2}px`,window.setTimeout(()=>{_(),u&&u.classList.remove("soccer-ball-placeholder"),u=null,l=null},650)}function O(){if(!s||!l){L();return}s.classList.add("soccer-ball-returning"),s.style.left=`${l.left}px`,s.style.top=`${l.top}px`,window.setTimeout(()=>{L()},220)}function G(e,t){s&&(s.style.left=`${e-M}px`,s.style.top=`${t-N}px`)}function U(e,t,o){const c=o.getBoundingClientRect();return e>=c.left&&e<=c.right&&t>=c.top&&t<=c.bottom}function _(){s&&(s.remove(),s=null)}function L(){window.removeEventListener("pointermove",A),_(),u&&u.classList.remove("soccer-ball-placeholder"),document.querySelectorAll(".soccer-goal").forEach(e=>{e.classList.remove("soccer-goal-active")}),u=null,l=null}function ge(){const e=document.querySelector("#soccer-ball");e&&(e.className="soccer-ball")}function X(){const e=D[p];e&&ve(`Drag the ball into the letter ${e.target} goal`)}function ve(e){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function W(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}function fe(){W(),L(),sessionStorage.setItem("activity1Score",String(v)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${H}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${v}</strong>
          <span>out of ${b}</span>
        </div>

        <p>
          You earned ${v} stars toward your
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
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{m("home")}),document.querySelector("#soccer-play-again").addEventListener("click",Y)}const y=10,B=[{target:"cat",choices:[{name:"cat",icon:"🐱"},{name:"dog",icon:"🐶"},{name:"fish",icon:"🐟"}]},{target:"dog",choices:[{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"},{name:"pig",icon:"🐷"}]},{target:"fish",choices:[{name:"fish",icon:"🐟"},{name:"duck",icon:"🦆"},{name:"cat",icon:"🐱"}]},{target:"bird",choices:[{name:"frog",icon:"🐸"},{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"}]},{target:"pig",choices:[{name:"pig",icon:"🐷"},{name:"rabbit",icon:"🐰"},{name:"duck",icon:"🦆"}]},{target:"duck",choices:[{name:"cat",icon:"🐱"},{name:"duck",icon:"🦆"},{name:"frog",icon:"🐸"}]},{target:"frog",choices:[{name:"fish",icon:"🐟"},{name:"rabbit",icon:"🐰"},{name:"frog",icon:"🐸"}]},{target:"rabbit",choices:[{name:"rabbit",icon:"🐰"},{name:"pig",icon:"🐷"},{name:"bird",icon:"🐦"}]},{target:"hen",choices:[{name:"dog",icon:"🐶"},{name:"hen",icon:"🐔"},{name:"cat",icon:"🐱"}]},{target:"fox",choices:[{name:"frog",icon:"🐸"},{name:"fox",icon:"🦊"},{name:"rabbit",icon:"🐰"}]}];let h=0,f=0,E=!0;const V="/sora-phonics-practice/mascot/cloud_smile_clean.png";function K(){h=0,f=0,E=!0,be(),j()}function be(){document.querySelector("#app").innerHTML=`
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
            <strong id="animal-score">0 / ${y}</strong>
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
            src="${V}"
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
            of ${y}
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
  `,document.querySelector("#animal-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),m("home")}),document.querySelector("#animal-listen-button").addEventListener("click",F)}function j(){E=!0;const e=B[h];document.querySelector("#animal-round-number").textContent=h+1,document.querySelector("#animal-score").textContent=`${f} / ${y}`,document.querySelector("#animal-progress-bar").style.width=`${h/y*100}%`,document.querySelector("#animal-coach-message").textContent=`Point to the ${e.target}!`,document.querySelector("#animal-feedback").textContent="Choose one animal.",document.querySelector("#animal-feedback").className="animal-feedback";const t=document.querySelector("#animal-choices");t.innerHTML=e.choices.map(o=>`
        <button
          class="animal-choice"
          type="button"
          data-animal="${o.name}"
          aria-label="${o.name}"
        >
          <span class="animal-icon">${o.icon}</span>
          <strong>${o.name}</strong>
        </button>
      `).join(""),document.querySelectorAll(".animal-choice").forEach(o=>{o.addEventListener("click",()=>{ye(o)})}),setTimeout(F,450)}function F(){const e=B[h];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#animal-feedback").textContent=`Point to the ${e.target}.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Point to the ${e.target}`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function ye(e){if(!E)return;const t=B[h],o=e.dataset.animal,c=document.querySelector("#animal-feedback"),n=document.querySelector("#animal-coach-message"),a=document.querySelector("#animal-mascot");o===t.target?(E=!1,f+=1,e.classList.add("animal-correct"),a.classList.add("animal-celebrate"),c.textContent="Great job! +1 ⭐",c.className="animal-feedback animal-correct-feedback",n.textContent="Fantastic! You found it!",document.querySelector("#animal-score").textContent=`${f} / ${y}`,setTimeout(()=>{a.classList.remove("animal-celebrate"),h+=1,h>=y?Se():j()},900)):(e.classList.add("animal-wrong"),c.textContent="Almost! Listen and try again.",c.className="animal-feedback animal-wrong-feedback",n.textContent="You can do it!",setTimeout(()=>{e.classList.remove("animal-wrong")},500))}function Se(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity2Score",String(f)),sessionStorage.setItem("activity2Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${V}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${f}</strong>
          <span>out of ${y}</span>
        </div>

        <p>
          You earned ${f} more stars toward your
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
  `,document.querySelector("#animal-return-home").addEventListener("click",()=>{m("home")}),document.querySelector("#animal-play-again").addEventListener("click",K)}const S=10,P=[{sentenceStart:"The",sentenceEnd:"is on the mat.",target:"cat",choices:["cat","dog","pig"],picture:"🐱"},{sentenceStart:"I see a",sentenceEnd:".",target:"dog",choices:["fox","dog","hen"],picture:"🐶"},{sentenceStart:"The",sentenceEnd:"is hot.",target:"sun",choices:["sun","bus","cup"],picture:"☀️"},{sentenceStart:"The",sentenceEnd:"can run.",target:"fox",choices:["pig","hen","fox"],picture:"🦊"},{sentenceStart:"The",sentenceEnd:"is pink.",target:"pig",choices:["dog","pig","cat"],picture:"🐷"},{sentenceStart:"The",sentenceEnd:"has a lid.",target:"pot",choices:["pot","bed","map"],picture:"🍲"},{sentenceStart:"I sit on the",sentenceEnd:".",target:"bed",choices:["bus","bed","cup"],picture:"🛏️"},{sentenceStart:"The",sentenceEnd:"is red.",target:"bus",choices:["hat","bus","sun"],picture:"🚌"},{sentenceStart:"The",sentenceEnd:"is in the box.",target:"hen",choices:["hen","fox","pig"],picture:"🐔"},{sentenceStart:"I have a",sentenceEnd:".",target:"hat",choices:["map","hat","cup"],picture:"🧢"}];let g=0,$=0,T=!0,i=null,r=null,d=null,Z=0,J=0;const Q="/sora-phonics-practice/mascot/cloud_smile_clean.png";function ee(){g=0,$=0,T=!0,we(),te()}function we(){const e=document.querySelector("#app");e.innerHTML=`
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
            <strong id="cvc-score">0 / ${S}</strong>
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
            src="${Q}"
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
            of ${S}
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
  `,document.querySelector("#cvc-home-button").addEventListener("click",()=>{re(),k(),m("home")}),document.querySelector("#cvc-listen-button").addEventListener("click",se)}function te(){k(),T=!0;const e=P[g];document.querySelector("#cvc-round-number").textContent=g+1,document.querySelector("#cvc-score").textContent=`${$} / ${S}`,document.querySelector("#cvc-progress-bar").style.width=`${g/S*100}%`,document.querySelector("#cvc-picture").textContent=e.picture,document.querySelector("#cvc-sentence-start").textContent=`${e.sentenceStart} `,document.querySelector("#cvc-sentence-end").textContent=` ${e.sentenceEnd}`,document.querySelector("#cvc-coach-message").textContent="Drag the correct word into the blank!";const t=document.querySelector("#cvc-feedback");t.textContent="Drag one word into the blank.",t.className="cvc-feedback";const o=document.querySelector("#cvc-drop-zone");o.textContent="Drop here",o.className="cvc-drop-zone";const c=document.querySelector("#cvc-choices");c.innerHTML=e.choices.map(n=>`
        <button
          class="cvc-choice"
          type="button"
          data-word="${n}"
          aria-label="Drag the word ${n}"
        >
          ${n}
        </button>
      `).join(""),document.querySelectorAll(".cvc-choice").forEach(n=>{n.addEventListener("pointerdown",$e)}),window.setTimeout(se,450)}function $e(e){!T||i||(e.preventDefault(),i=e.currentTarget,d=i.getBoundingClientRect(),Z=e.clientX-d.left,J=e.clientY-d.top,r=i.cloneNode(!0),r.classList.add("cvc-drag-clone"),r.style.width=`${d.width}px`,r.style.height=`${d.height}px`,document.body.appendChild(r),i.classList.add("cvc-choice-placeholder"),ce(e.clientX,e.clientY),window.addEventListener("pointermove",x),window.addEventListener("pointerup",Le,{once:!0}),window.addEventListener("pointercancel",ke,{once:!0}))}function x(e){if(!r)return;e.preventDefault(),ce(e.clientX,e.clientY);const t=document.querySelector("#cvc-drop-zone");ne(e.clientX,e.clientY,t)?t.classList.add("cvc-drop-zone-active"):t.classList.remove("cvc-drop-zone-active")}function Le(e){window.removeEventListener("pointermove",x);const t=document.querySelector("#cvc-drop-zone");t.classList.remove("cvc-drop-zone-active"),ne(e.clientX,e.clientY,t)&&i?Ee(i):oe()}function ke(){window.removeEventListener("pointermove",x),oe()}function ce(e,t){r&&(r.style.left=`${e-Z}px`,r.style.top=`${t-J}px`)}function ne(e,t,o){const c=o.getBoundingClientRect();return e>=c.left&&e<=c.right&&t>=c.top&&t<=c.bottom}function Ee(e){const t=P[g],o=e.dataset.word,c=document.querySelector("#cvc-drop-zone"),n=document.querySelector("#cvc-feedback"),a=document.querySelector("#cvc-coach-message"),w=document.querySelector("#cvc-mascot");o===t.target?(T=!1,$+=1,R(),e.classList.remove("cvc-choice-placeholder"),e.classList.add("cvc-correct"),c.textContent=t.target,c.classList.add("cvc-drop-zone-correct"),n.textContent="Excellent! +1 ⭐",n.className="cvc-feedback cvc-correct-feedback",a.textContent=`${t.sentenceStart} ${t.target} ${t.sentenceEnd}`,w.classList.add("cvc-celebrate"),document.querySelector("#cvc-score").textContent=`${$} / ${S}`,Ce(t),i=null,d=null,window.setTimeout(()=>{w.classList.remove("cvc-celebrate"),g+=1,g>=S?qe():te()},1300)):(R(),e.classList.remove("cvc-choice-placeholder"),e.classList.add("cvc-wrong"),c.classList.add("cvc-drop-zone-wrong"),n.textContent="Almost! Try another word.",n.className="cvc-feedback cvc-wrong-feedback",a.textContent="Try again!",i=null,d=null,window.setTimeout(()=>{e.classList.remove("cvc-wrong"),c.classList.remove("cvc-drop-zone-wrong")},550))}function oe(){if(!i||!r){k();return}r.classList.add("cvc-drag-returning"),r.style.left=`${d.left}px`,r.style.top=`${d.top}px`,window.setTimeout(()=>{i&&i.classList.remove("cvc-choice-placeholder"),k()},220)}function R(){r&&(r.remove(),r=null)}function k(){window.removeEventListener("pointermove",x),R(),i&&i.classList.remove("cvc-choice-placeholder"),i=null,d=null}function se(){const e=P[g];if(!e)return;const t=`${e.sentenceStart}, blank, ${e.sentenceEnd}`;ae(t)}function Ce(e){const t=`${e.sentenceStart} ${e.target} ${e.sentenceEnd}`;ae(t)}function ae(e){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=.78,t.pitch=1.03,t.volume=1,window.speechSynthesis.speak(t)}function re(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}function qe(){re(),k(),sessionStorage.setItem("activity3Score",String($)),sessionStorage.setItem("activity3Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-results-window">
        <div class="cvc-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="cvc-results-mascot"
          src="${Q}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 3 COMPLETE</p>

        <h1>Fantastic Word Building!</h1>

        <div class="cvc-final-score">
          <strong>${$}</strong>
          <span>out of ${S}</span>
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
  `,document.querySelector("#cvc-results-button").addEventListener("click",()=>{m("results")}),document.querySelector("#cvc-play-again").addEventListener("click",ee)}const ie=document.querySelector("#app");if(!ie)throw new Error("The #app element was not found. Check index.html.");function Ae(){ie.innerHTML=`
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
  `,document.querySelector("#open-activity-one").addEventListener("click",()=>{m("activity1")}),document.querySelector("#open-activity-two").addEventListener("click",()=>{m("activity2")}),document.querySelector("#open-activity-three").addEventListener("click",()=>{m("activity3")})}C("home",Ae);C("activity1",Y);C("activity2",K);C("activity3",ee);m("home");
