(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const N={};function k(e,t){if(typeof t!="function"){console.error(`Cannot register "${e}". The page must be a function.`);return}N[e]=t}function l(e){const t=N[e];if(typeof t!="function"){console.error(`Page not found: ${e}`);return}window.scrollTo(0,0),t()}const me="/sora-phonics-practice/mascot/cloud_smile_clean.png";function pe(){const e=document.querySelector("#app");e.innerHTML=`
    <main class="login-page">
      <section class="login-window">
        <div class="login-sparkle sparkle-one">⭐</div>
        <div class="login-sparkle sparkle-two">✨</div>
        <div class="login-sparkle sparkle-three">⭐</div>

        <section class="login-hero">
          <div class="login-mascot-glow"></div>

          <img
            class="login-mascot"
            src="${me}"
            alt="SORA cloud mascot"
          />

          <p class="login-brand">SORA ADVENTURE</p>

          <h1>Play, Learn and Win!</h1>

          <p class="login-introduction">
            Complete three fun English games, collect up to
            30 stars and unlock a surprise SORA reward.
          </p>
        </section>

        <section class="achievement-preview">
          <article class="achievement-level">
            <div class="achievement-icon">🌱</div>

            <div>
              <p>LEVEL 1</p>
              <strong>Explorer</strong>
              <span>10–17 stars</span>
            </div>
          </article>

          <article class="achievement-level">
            <div class="achievement-icon">🏆</div>

            <div>
              <p>LEVEL 2</p>
              <strong>Champion</strong>
              <span>18–25 stars</span>
            </div>
          </article>

          <article class="achievement-level">
            <div class="achievement-icon">🌟</div>

            <div>
              <p>LEVEL 3</p>
              <strong>SORA Star</strong>
              <span>26–30 stars</span>
            </div>
          </article>
        </section>

        <section class="surprise-card">
          <div class="surprise-gift">🎁</div>

          <div>
            <p>SURPRISE REWARD</p>
            <strong>Complete the adventure to reveal it!</strong>
            <span>
              Eligible rewards may include an ASEP lesson,
              Coffee Hours session or FUNdation offer.
            </span>
          </div>
        </section>

        <form id="parent-login-form" class="parent-login-form">
          <div class="form-heading">
            <p>PARENT OR GUARDIAN</p>
            <h2>Send me the result and reward</h2>
          </div>

          <label for="parent-email">
            Parent or guardian email
          </label>

          <input
            id="parent-email"
            name="email"
            type="email"
            placeholder="parent@example.com"
            autocomplete="email"
          />

          <label class="login-checkbox">
            <input
              id="result-consent"
              type="checkbox"
            />

            <span>
              Email me the child's result and available reward.
            </span>
          </label>

          <label class="login-checkbox optional-consent">
            <input
              id="marketing-consent"
              type="checkbox"
            />

            <span>
              Send me future SORA news and special offers.
              <small>Optional</small>
            </span>
          </label>

          <button
            class="parent-start-button"
            type="submit"
          >
            <span>Start with Parent Email</span>
            <span aria-hidden="true">▶</span>
          </button>
        </form>

        <div class="login-divider">
          <span>or</span>
        </div>

        <button
          id="guest-start-button"
          class="guest-start-button"
          type="button"
        >
          Play Without Email
        </button>

        <p class="guest-explanation">
          Guest players can complete all three games.
          We will ask for a parent email at the end only
          if they want to receive the reward.
        </p>

        <p
          id="login-message"
          class="login-message"
          aria-live="polite"
        ></p>
      </section>
    </main>
  `;const t=document.querySelector("#parent-login-form"),o=document.querySelector("#guest-start-button"),c=document.querySelector("#login-message");t.addEventListener("submit",n=>{n.preventDefault();const s=document.querySelector("#parent-email").value.trim(),p=document.querySelector("#result-consent").checked,ue=document.querySelector("#marketing-consent").checked;if(!s){B(c,"Please enter a parent or guardian email.");return}if(!p){B(c,"Please agree to receive the result and reward email.");return}sessionStorage.setItem("soraPlayerMode","email"),sessionStorage.setItem("soraParentEmail",s),sessionStorage.setItem("soraResultConsent","true"),sessionStorage.setItem("soraMarketingConsent",String(ue)),M(),l("home")}),o.addEventListener("click",()=>{sessionStorage.setItem("soraPlayerMode","guest"),sessionStorage.removeItem("soraParentEmail"),sessionStorage.setItem("soraResultConsent","false"),sessionStorage.setItem("soraMarketingConsent","false"),M(),l("home")})}function B(e,t){e.textContent=t,e.className="login-message login-message-error"}function M(){["activity1Score","activity2Score","activity3Score","activity1Complete","activity2Complete","activity3Complete"].forEach(t=>{sessionStorage.removeItem(t)})}const y=10,P=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let g=0,f=0,q=!0,m=null,a=null,d=null,H=0,Y=0;const U="/sora-phonics-practice/mascot/cloud_smile_clean.png";function z(){g=0,f=0,q=!0,ge(),G()}function ge(){document.querySelector("#app").innerHTML=`
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
            <strong id="soccer-score">0 / ${y}</strong>
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
            src="${U}"
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
            of ${y}
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
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{K(),$(),l("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",X),document.querySelector("#soccer-ball").addEventListener("pointerdown",he)}function G(){$(),q=!0;const e=P[g];document.querySelector("#soccer-kick-number").textContent=g+1,document.querySelector("#soccer-score").textContent=`${f} / ${y}`,document.querySelector("#soccer-progress-bar").style.width=`${g/y*100}%`,document.querySelector("#soccer-coach-message").textContent=`Drag the ball into the ${e.target} goal!`,document.querySelector("#soccer-feedback").textContent="Drag the ball into a goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const t=document.querySelector("#soccer-goals");t.innerHTML=e.goals.map((o,c)=>`
        <div
          class="soccer-goal soccer-goal-${c+1}"
          data-letter="${o}"
          data-position="${c}"
          aria-label="Goal ${o}"
        >
          <span class="soccer-goal-net">🥅</span>
          <strong>${o}</strong>
        </div>
      `).join(""),Se(),window.setTimeout(X,450)}function he(e){!q||a||(e.preventDefault(),m=e.currentTarget,d=m.getBoundingClientRect(),H=e.clientX-d.left,Y=e.clientY-d.top,a=m.cloneNode(!0),a.classList.add("soccer-ball-clone"),a.style.width=`${d.width}px`,a.style.height=`${d.height}px`,document.body.appendChild(a),m.classList.add("soccer-ball-placeholder"),W(e.clientX,e.clientY),window.addEventListener("pointermove",A),window.addEventListener("pointerup",ve,{once:!0}),window.addEventListener("pointercancel",fe,{once:!0}))}function A(e){a&&(e.preventDefault(),W(e.clientX,e.clientY),document.querySelectorAll(".soccer-goal").forEach(t=>{_(e.clientX,e.clientY,t)?t.classList.add("soccer-goal-active"):t.classList.remove("soccer-goal-active")}))}function ve(e){window.removeEventListener("pointermove",A);const t=[...document.querySelectorAll(".soccer-goal")];t.forEach(c=>{c.classList.remove("soccer-goal-active")});const o=t.find(c=>_(e.clientX,e.clientY,c));o?be(o):D()}function fe(){window.removeEventListener("pointermove",A),D()}function be(e){const t=P[g],o=e.dataset.letter,c=document.querySelector("#soccer-feedback"),n=document.querySelector("#soccer-coach-message"),s=document.querySelector("#soccer-mascot");o===t.target?(q=!1,f+=1,ye(e),e.classList.add("soccer-correct-goal"),s.classList.add("soccer-mascot-celebrate"),c.textContent="GOAL! Fantastic! +1 ⭐",c.className="soccer-feedback soccer-correct-feedback",n.textContent="Amazing goal!",document.querySelector("#soccer-score").textContent=`${f} / ${y}`,window.setTimeout(()=>{s.classList.remove("soccer-mascot-celebrate"),g+=1,g>=y?Le():G()},1100)):(e.classList.add("soccer-wrong-goal"),c.textContent="Almost! Try another goal.",c.className="soccer-feedback soccer-wrong-feedback",n.textContent="Try again!",D(),window.setTimeout(()=>{e.classList.remove("soccer-wrong-goal")},500))}function ye(e){if(!a)return;const t=e.getBoundingClientRect();a.classList.add("soccer-ball-scored"),a.style.left=`${t.left+t.width/2-d.width/2}px`,a.style.top=`${t.top+t.height/2-d.height/2}px`,window.setTimeout(()=>{V(),m&&m.classList.remove("soccer-ball-placeholder"),m=null,d=null},650)}function D(){if(!a||!d){$();return}a.classList.add("soccer-ball-returning"),a.style.left=`${d.left}px`,a.style.top=`${d.top}px`,window.setTimeout(()=>{$()},220)}function W(e,t){a&&(a.style.left=`${e-H}px`,a.style.top=`${t-Y}px`)}function _(e,t,o){const c=o.getBoundingClientRect();return e>=c.left&&e<=c.right&&t>=c.top&&t<=c.bottom}function V(){a&&(a.remove(),a=null)}function $(){window.removeEventListener("pointermove",A),V(),m&&m.classList.remove("soccer-ball-placeholder"),document.querySelectorAll(".soccer-goal").forEach(e=>{e.classList.remove("soccer-goal-active")}),m=null,d=null}function Se(){const e=document.querySelector("#soccer-ball");e&&(e.className="soccer-ball")}function X(){const e=P[g];e&&we(`Drag the ball into the letter ${e.target} goal`)}function we(e){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function K(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}function Le(){K(),$(),sessionStorage.setItem("activity1Score",String(f)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${U}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${f}</strong>
          <span>out of ${y}</span>
        </div>

        <p>
          You earned ${f} stars toward your
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
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{l("home")}),document.querySelector("#soccer-play-again").addEventListener("click",z)}const S=10,O=[{target:"cat",choices:[{name:"cat",icon:"🐱"},{name:"dog",icon:"🐶"},{name:"fish",icon:"🐟"}]},{target:"dog",choices:[{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"},{name:"pig",icon:"🐷"}]},{target:"fish",choices:[{name:"fish",icon:"🐟"},{name:"duck",icon:"🦆"},{name:"cat",icon:"🐱"}]},{target:"bird",choices:[{name:"frog",icon:"🐸"},{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"}]},{target:"pig",choices:[{name:"pig",icon:"🐷"},{name:"rabbit",icon:"🐰"},{name:"duck",icon:"🦆"}]},{target:"duck",choices:[{name:"cat",icon:"🐱"},{name:"duck",icon:"🦆"},{name:"frog",icon:"🐸"}]},{target:"frog",choices:[{name:"fish",icon:"🐟"},{name:"rabbit",icon:"🐰"},{name:"frog",icon:"🐸"}]},{target:"rabbit",choices:[{name:"rabbit",icon:"🐰"},{name:"pig",icon:"🐷"},{name:"bird",icon:"🐦"}]},{target:"hen",choices:[{name:"dog",icon:"🐶"},{name:"hen",icon:"🐔"},{name:"cat",icon:"🐱"}]},{target:"fox",choices:[{name:"frog",icon:"🐸"},{name:"fox",icon:"🦊"},{name:"rabbit",icon:"🐰"}]}];let h=0,b=0,C=!0;const F="/sora-phonics-practice/mascot/cloud_smile_clean.png";function j(){h=0,b=0,C=!0,$e(),Z()}function $e(){document.querySelector("#app").innerHTML=`
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
            <strong id="animal-score">0 / ${S}</strong>
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
            src="${F}"
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
            of ${S}
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
  `,document.querySelector("#animal-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),l("home")}),document.querySelector("#animal-listen-button").addEventListener("click",J)}function Z(){C=!0;const e=O[h];document.querySelector("#animal-round-number").textContent=h+1,document.querySelector("#animal-score").textContent=`${b} / ${S}`,document.querySelector("#animal-progress-bar").style.width=`${h/S*100}%`,document.querySelector("#animal-coach-message").textContent=`Point to the ${e.target}!`,document.querySelector("#animal-feedback").textContent="Choose one animal.",document.querySelector("#animal-feedback").className="animal-feedback";const t=document.querySelector("#animal-choices");t.innerHTML=e.choices.map(o=>`
        <button
          class="animal-choice"
          type="button"
          data-animal="${o.name}"
          aria-label="${o.name}"
        >
          <span class="animal-icon">${o.icon}</span>
          <strong>${o.name}</strong>
        </button>
      `).join(""),document.querySelectorAll(".animal-choice").forEach(o=>{o.addEventListener("click",()=>{Ee(o)})}),setTimeout(J,450)}function J(){const e=O[h];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#animal-feedback").textContent=`Point to the ${e.target}.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Point to the ${e.target}`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function Ee(e){if(!C)return;const t=O[h],o=e.dataset.animal,c=document.querySelector("#animal-feedback"),n=document.querySelector("#animal-coach-message"),s=document.querySelector("#animal-mascot");o===t.target?(C=!1,b+=1,e.classList.add("animal-correct"),s.classList.add("animal-celebrate"),c.textContent="Great job! +1 ⭐",c.className="animal-feedback animal-correct-feedback",n.textContent="Fantastic! You found it!",document.querySelector("#animal-score").textContent=`${b} / ${S}`,setTimeout(()=>{s.classList.remove("animal-celebrate"),h+=1,h>=S?ke():Z()},900)):(e.classList.add("animal-wrong"),c.textContent="Almost! Listen and try again.",c.className="animal-feedback animal-wrong-feedback",n.textContent="You can do it!",setTimeout(()=>{e.classList.remove("animal-wrong")},500))}function ke(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity2Score",String(b)),sessionStorage.setItem("activity2Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${F}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${b}</strong>
          <span>out of ${S}</span>
        </div>

        <p>
          You earned ${b} more stars toward your
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
  `,document.querySelector("#animal-return-home").addEventListener("click",()=>{l("home")}),document.querySelector("#animal-play-again").addEventListener("click",j)}const w=10,I=[{sentenceStart:"The",sentenceEnd:"is on the mat.",target:"cat",choices:["cat","dog","pig"],picture:"🐱"},{sentenceStart:"I see a",sentenceEnd:".",target:"dog",choices:["fox","dog","hen"],picture:"🐶"},{sentenceStart:"The",sentenceEnd:"is hot.",target:"sun",choices:["sun","bus","cup"],picture:"☀️"},{sentenceStart:"The",sentenceEnd:"can run.",target:"fox",choices:["pig","hen","fox"],picture:"🦊"},{sentenceStart:"The",sentenceEnd:"is pink.",target:"pig",choices:["dog","pig","cat"],picture:"🐷"},{sentenceStart:"The",sentenceEnd:"has a lid.",target:"pot",choices:["pot","bed","map"],picture:"🍲"},{sentenceStart:"I sit on the",sentenceEnd:".",target:"bed",choices:["bus","bed","cup"],picture:"🛏️"},{sentenceStart:"The",sentenceEnd:"is red.",target:"bus",choices:["hat","bus","sun"],picture:"🚌"},{sentenceStart:"The",sentenceEnd:"is in the box.",target:"hen",choices:["hen","fox","pig"],picture:"🐔"},{sentenceStart:"I have a",sentenceEnd:".",target:"hat",choices:["map","hat","cup"],picture:"🧢"}];let v=0,L=0,x=!0,i=null,r=null,u=null,Q=0,ee=0;const te="/sora-phonics-practice/mascot/cloud_smile_clean.png";function ce(){v=0,L=0,x=!0,Ce(),ne()}function Ce(){const e=document.querySelector("#app");e.innerHTML=`
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
            <strong id="cvc-score">0 / ${w}</strong>
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
            src="${te}"
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
            of ${w}
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
  `,document.querySelector("#cvc-home-button").addEventListener("click",()=>{le(),E(),l("home")}),document.querySelector("#cvc-listen-button").addEventListener("click",re)}function ne(){E(),x=!0;const e=I[v];document.querySelector("#cvc-round-number").textContent=v+1,document.querySelector("#cvc-score").textContent=`${L} / ${w}`,document.querySelector("#cvc-progress-bar").style.width=`${v/w*100}%`,document.querySelector("#cvc-picture").textContent=e.picture,document.querySelector("#cvc-sentence-start").textContent=`${e.sentenceStart} `,document.querySelector("#cvc-sentence-end").textContent=` ${e.sentenceEnd}`,document.querySelector("#cvc-coach-message").textContent="Drag the correct word into the blank!";const t=document.querySelector("#cvc-feedback");t.textContent="Drag one word into the blank.",t.className="cvc-feedback";const o=document.querySelector("#cvc-drop-zone");o.textContent="Drop here",o.className="cvc-drop-zone";const c=document.querySelector("#cvc-choices");c.innerHTML=e.choices.map(n=>`
        <button
          class="cvc-choice"
          type="button"
          data-word="${n}"
          aria-label="Drag the word ${n}"
        >
          ${n}
        </button>
      `).join(""),document.querySelectorAll(".cvc-choice").forEach(n=>{n.addEventListener("pointerdown",qe)}),window.setTimeout(re,450)}function qe(e){!x||i||(e.preventDefault(),i=e.currentTarget,u=i.getBoundingClientRect(),Q=e.clientX-u.left,ee=e.clientY-u.top,r=i.cloneNode(!0),r.classList.add("cvc-drag-clone"),r.style.width=`${u.width}px`,r.style.height=`${u.height}px`,document.body.appendChild(r),i.classList.add("cvc-choice-placeholder"),oe(e.clientX,e.clientY),window.addEventListener("pointermove",T),window.addEventListener("pointerup",Ae,{once:!0}),window.addEventListener("pointercancel",xe,{once:!0}))}function T(e){if(!r)return;e.preventDefault(),oe(e.clientX,e.clientY);const t=document.querySelector("#cvc-drop-zone");se(e.clientX,e.clientY,t)?t.classList.add("cvc-drop-zone-active"):t.classList.remove("cvc-drop-zone-active")}function Ae(e){window.removeEventListener("pointermove",T);const t=document.querySelector("#cvc-drop-zone");t.classList.remove("cvc-drop-zone-active"),se(e.clientX,e.clientY,t)&&i?Te(i):ae()}function xe(){window.removeEventListener("pointermove",T),ae()}function oe(e,t){r&&(r.style.left=`${e-Q}px`,r.style.top=`${t-ee}px`)}function se(e,t,o){const c=o.getBoundingClientRect();return e>=c.left&&e<=c.right&&t>=c.top&&t<=c.bottom}function Te(e){const t=I[v],o=e.dataset.word,c=document.querySelector("#cvc-drop-zone"),n=document.querySelector("#cvc-feedback"),s=document.querySelector("#cvc-coach-message"),p=document.querySelector("#cvc-mascot");o===t.target?(x=!1,L+=1,R(),e.classList.remove("cvc-choice-placeholder"),e.classList.add("cvc-correct"),c.textContent=t.target,c.classList.add("cvc-drop-zone-correct"),n.textContent="Excellent! +1 ⭐",n.className="cvc-feedback cvc-correct-feedback",s.textContent=`${t.sentenceStart} ${t.target} ${t.sentenceEnd}`,p.classList.add("cvc-celebrate"),document.querySelector("#cvc-score").textContent=`${L} / ${w}`,Re(t),i=null,u=null,window.setTimeout(()=>{p.classList.remove("cvc-celebrate"),v+=1,v>=w?Pe():ne()},1300)):(R(),e.classList.remove("cvc-choice-placeholder"),e.classList.add("cvc-wrong"),c.classList.add("cvc-drop-zone-wrong"),n.textContent="Almost! Try another word.",n.className="cvc-feedback cvc-wrong-feedback",s.textContent="Try again!",i=null,u=null,window.setTimeout(()=>{e.classList.remove("cvc-wrong"),c.classList.remove("cvc-drop-zone-wrong")},550))}function ae(){if(!i||!r){E();return}r.classList.add("cvc-drag-returning"),r.style.left=`${u.left}px`,r.style.top=`${u.top}px`,window.setTimeout(()=>{i&&i.classList.remove("cvc-choice-placeholder"),E()},220)}function R(){r&&(r.remove(),r=null)}function E(){window.removeEventListener("pointermove",T),R(),i&&i.classList.remove("cvc-choice-placeholder"),i=null,u=null}function re(){const e=I[v];if(!e)return;const t=`${e.sentenceStart}, blank, ${e.sentenceEnd}`;ie(t)}function Re(e){const t=`${e.sentenceStart} ${e.target} ${e.sentenceEnd}`;ie(t)}function ie(e){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.rate=.78,t.pitch=1.03,t.volume=1,window.speechSynthesis.speak(t)}function le(){"speechSynthesis"in window&&window.speechSynthesis.cancel()}function Pe(){le(),E(),sessionStorage.setItem("activity3Score",String(L)),sessionStorage.setItem("activity3Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-results-window">
        <div class="cvc-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="cvc-results-mascot"
          src="${te}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 3 COMPLETE</p>

        <h1>Fantastic Word Building!</h1>

        <div class="cvc-final-score">
          <strong>${L}</strong>
          <span>out of ${w}</span>
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
  `,document.querySelector("#cvc-results-button").addEventListener("click",()=>{l("results")}),document.querySelector("#cvc-play-again").addEventListener("click",ce)}const de=document.querySelector("#app");if(!de)throw new Error("The #app element was not found. Check index.html.");function De(){const e=sessionStorage.getItem("soraPlayerMode"),t=sessionStorage.getItem("soraParentEmail");de.innerHTML=`
    <main class="setup-test-page">
      <section class="setup-test-card">
        <img
          class="setup-test-mascot"
          src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
          alt="SORA mascot"
        />

        <p class="setup-test-brand">
          SORA ADVENTURE
        </p>

        <h1>Choose an Activity</h1>

        <p>
          ${e==="email"?`Parent email saved: ${t}`:"Playing as a guest"}
        </p>

        <button id="open-activity-one" type="button">
          1. Letter Goal
        </button>

        <button id="open-activity-two" type="button">
          2. Animal Match
        </button>

        <button id="open-activity-three" type="button">
          3. Word Builder
        </button>

        <button id="return-to-login" type="button">
          Return to Parent Entry
        </button>
      </section>
    </main>
  `,document.querySelector("#open-activity-one").addEventListener("click",()=>{l("activity1")}),document.querySelector("#open-activity-two").addEventListener("click",()=>{l("activity2")}),document.querySelector("#open-activity-three").addEventListener("click",()=>{l("activity3")}),document.querySelector("#return-to-login").addEventListener("click",()=>{l("login")})}k("login",pe);k("home",De);k("activity1",z);k("activity2",j);k("activity3",ce);l("login");
