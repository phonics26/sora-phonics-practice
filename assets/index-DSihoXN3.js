(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const S of o.addedNodes)S.tagName==="LINK"&&S.rel==="modulepreload"&&s(S)}).observe(document,{childList:!0,subtree:!0});function c(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=c(n);fetch(n.href,o)}})();const q={};function f(e,t){if(typeof t!="function"){console.error(`Cannot register "${e}". The page must be a function.`);return}q[e]=t}function a(e){const t=q[e];if(typeof t!="function"){console.error(`Page not found: ${e}`);return}window.scrollTo(0,0),t()}const m=10,k=[{target:"A",goals:["A","C","D"]},{target:"B",goals:["E","B","C"]},{target:"C",goals:["D","A","C"]},{target:"D",goals:["B","D","E"]},{target:"E",goals:["E","C","A"]},{target:"A",goals:["D","A","B"]},{target:"C",goals:["C","E","B"]},{target:"B",goals:["A","D","B"]},{target:"E",goals:["C","E","D"]},{target:"D",goals:["B","A","D"]}];let i=0,d=0,b=!0;const L="/sora-phonics-practice/mascot/cloud_smile_clean.png";function A(){i=0,d=0,b=!0,D(),C()}function D(){document.querySelector("#app").innerHTML=`
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
            <strong id="soccer-score">0 / ${m}</strong>
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
            src="${L}"
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
            of ${m}
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
  `,document.querySelector("#soccer-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),a("home")}),document.querySelector("#soccer-listen-button").addEventListener("click",E)}function C(){b=!0;const e=k[i];document.querySelector("#soccer-kick-number").textContent=i+1,document.querySelector("#soccer-score").textContent=`${d} / ${m}`,document.querySelector("#soccer-progress-bar").style.width=`${i/m*100}%`,document.querySelector("#soccer-coach-message").textContent=`Kick the ball into the ${e.target} goal!`,document.querySelector("#soccer-feedback").textContent="Tap the correct goal!",document.querySelector("#soccer-feedback").className="soccer-feedback";const t=document.querySelector("#soccer-goals");t.innerHTML=e.goals.map((c,s)=>`
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
      `).join(""),document.querySelectorAll(".soccer-goal").forEach(c=>{c.addEventListener("click",()=>{_(c)})}),G(),setTimeout(E,450)}function E(){const e=k[i];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#soccer-feedback").textContent=`Kick the ball into the ${e.target} goal.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Kick the ball into the letter ${e.target} goal`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function _(e){if(!b)return;const t=k[i];e.dataset.letter===t.target?(b=!1,d+=1,B(e),e.classList.add("soccer-correct-goal"),document.querySelector("#soccer-score").textContent=`${d} / ${m}`,document.querySelector("#soccer-feedback").textContent="GOAL! Fantastic! +1 ⭐",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-correct-feedback",document.querySelector("#soccer-coach-message").textContent="Amazing goal!",setTimeout(()=>{i+=1,i>=m?Y():C()},1100)):(e.classList.add("soccer-wrong-goal"),document.querySelector("#soccer-feedback").textContent="Almost! Listen and try again.",document.querySelector("#soccer-feedback").className="soccer-feedback soccer-wrong-feedback",document.querySelector("#soccer-coach-message").textContent="You can do it!",setTimeout(()=>{e.classList.remove("soccer-wrong-goal")},500))}function B(e){const t=document.querySelector("#soccer-ball"),c=Number(e.dataset.position);t.classList.remove("ball-to-left","ball-to-centre","ball-to-right"),t.offsetWidth,c===0?t.classList.add("ball-to-left"):c===1?t.classList.add("ball-to-centre"):t.classList.add("ball-to-right")}function G(){const e=document.querySelector("#soccer-ball");e.className="soccer-ball"}function Y(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity1Score",String(d)),sessionStorage.setItem("activity1Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="soccer-game-page">
      <section class="soccer-results-window">
        <div class="soccer-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="soccer-results-mascot"
          src="${L}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 1 COMPLETE</p>

        <h1>Fantastic Goals!</h1>

        <div class="soccer-final-score">
          <strong>${d}</strong>
          <span>out of ${m}</span>
        </div>

        <p>
          You earned ${d} stars toward your
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
  `,document.querySelector("#soccer-return-home").addEventListener("click",()=>{a("home")}),document.querySelector("#soccer-play-again").addEventListener("click",A)}const p=10,$=[{target:"cat",choices:[{name:"cat",icon:"🐱"},{name:"dog",icon:"🐶"},{name:"fish",icon:"🐟"}]},{target:"dog",choices:[{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"},{name:"pig",icon:"🐷"}]},{target:"fish",choices:[{name:"fish",icon:"🐟"},{name:"duck",icon:"🦆"},{name:"cat",icon:"🐱"}]},{target:"bird",choices:[{name:"frog",icon:"🐸"},{name:"bird",icon:"🐦"},{name:"dog",icon:"🐶"}]},{target:"pig",choices:[{name:"pig",icon:"🐷"},{name:"rabbit",icon:"🐰"},{name:"duck",icon:"🦆"}]},{target:"duck",choices:[{name:"cat",icon:"🐱"},{name:"duck",icon:"🦆"},{name:"frog",icon:"🐸"}]},{target:"frog",choices:[{name:"fish",icon:"🐟"},{name:"rabbit",icon:"🐰"},{name:"frog",icon:"🐸"}]},{target:"rabbit",choices:[{name:"rabbit",icon:"🐰"},{name:"pig",icon:"🐷"},{name:"bird",icon:"🐦"}]},{target:"hen",choices:[{name:"dog",icon:"🐶"},{name:"hen",icon:"🐔"},{name:"cat",icon:"🐱"}]},{target:"fox",choices:[{name:"frog",icon:"🐸"},{name:"fox",icon:"🦊"},{name:"rabbit",icon:"🐰"}]}];let r=0,u=0,v=!0;const T="/sora-phonics-practice/mascot/cloud_smile_clean.png";function x(){r=0,u=0,v=!0,K(),O()}function K(){document.querySelector("#app").innerHTML=`
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
            <strong id="animal-score">0 / ${p}</strong>
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
            src="${T}"
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
            of ${p}
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
  `,document.querySelector("#animal-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),a("home")}),document.querySelector("#animal-listen-button").addEventListener("click",R)}function O(){v=!0;const e=$[r];document.querySelector("#animal-round-number").textContent=r+1,document.querySelector("#animal-score").textContent=`${u} / ${p}`,document.querySelector("#animal-progress-bar").style.width=`${r/p*100}%`,document.querySelector("#animal-coach-message").textContent=`Point to the ${e.target}!`,document.querySelector("#animal-feedback").textContent="Choose one animal.",document.querySelector("#animal-feedback").className="animal-feedback";const t=document.querySelector("#animal-choices");t.innerHTML=e.choices.map(c=>`
        <button
          class="animal-choice"
          type="button"
          data-animal="${c.name}"
          aria-label="${c.name}"
        >
          <span class="animal-icon">${c.icon}</span>
          <strong>${c.name}</strong>
        </button>
      `).join(""),document.querySelectorAll(".animal-choice").forEach(c=>{c.addEventListener("click",()=>{U(c)})}),setTimeout(R,450)}function R(){const e=$[r];if(!e)return;if(!("speechSynthesis"in window)){document.querySelector("#animal-feedback").textContent=`Point to the ${e.target}.`;return}window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(`Point to the ${e.target}`);t.rate=.82,t.pitch=1.05,t.volume=1,window.speechSynthesis.speak(t)}function U(e){if(!v)return;const t=$[r],c=e.dataset.animal,s=document.querySelector("#animal-feedback"),n=document.querySelector("#animal-coach-message"),o=document.querySelector("#animal-mascot");c===t.target?(v=!1,u+=1,e.classList.add("animal-correct"),o.classList.add("animal-celebrate"),s.textContent="Great job! +1 ⭐",s.className="animal-feedback animal-correct-feedback",n.textContent="Fantastic! You found it!",document.querySelector("#animal-score").textContent=`${u} / ${p}`,setTimeout(()=>{o.classList.remove("animal-celebrate"),r+=1,r>=p?V():O()},900)):(e.classList.add("animal-wrong"),s.textContent="Almost! Listen and try again.",s.className="animal-feedback animal-wrong-feedback",n.textContent="You can do it!",setTimeout(()=>{e.classList.remove("animal-wrong")},500))}function V(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity2Score",String(u)),sessionStorage.setItem("activity2Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="animal-game-page">
      <section class="animal-results-window">
        <div class="animal-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="animal-results-mascot"
          src="${T}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 2 COMPLETE</p>

        <h1>Amazing Animal Match!</h1>

        <div class="animal-final-score">
          <strong>${u}</strong>
          <span>out of ${p}</span>
        </div>

        <p>
          You earned ${u} more stars toward your
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
  `,document.querySelector("#animal-return-home").addEventListener("click",()=>{a("home")}),document.querySelector("#animal-play-again").addEventListener("click",x)}const h=10,w=[{sentenceStart:"The",sentenceEnd:"is on the mat.",target:"cat",choices:["cat","dog","pig"],picture:"🐱"},{sentenceStart:"I see a",sentenceEnd:".",target:"dog",choices:["fox","dog","hen"],picture:"🐶"},{sentenceStart:"The",sentenceEnd:"is hot.",target:"sun",choices:["sun","bus","cup"],picture:"☀️"},{sentenceStart:"The",sentenceEnd:"can hop.",target:"fox",choices:["pig","hen","fox"],picture:"🦊"},{sentenceStart:"The",sentenceEnd:"is pink.",target:"pig",choices:["dog","pig","cat"],picture:"🐷"},{sentenceStart:"The",sentenceEnd:"has a lid.",target:"pot",choices:["pot","bed","map"],picture:"🍲"},{sentenceStart:"I sit on the",sentenceEnd:".",target:"bed",choices:["bus","bed","cup"],picture:"🛏️"},{sentenceStart:"The",sentenceEnd:"is red.",target:"bus",choices:["hat","bus","sun"],picture:"🚌"},{sentenceStart:"The",sentenceEnd:"is in the box.",target:"hen",choices:["hen","fox","pig"],picture:"🐔"},{sentenceStart:"I have a",sentenceEnd:".",target:"hat",choices:["map","hat","cup"],picture:"🧢"}];let l=0,g=0,y=!0;const I="/sora-phonics-practice/mascot/cloud_smile_clean.png";function P(){l=0,g=0,y=!0,W(),H()}function W(){document.querySelector("#app").innerHTML=`
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
            <h1>Sentence Builder</h1>
          </div>

          <div class="cvc-score-box">
            <span>Score</span>
            <strong id="cvc-score">0 / ${h}</strong>
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
            src="${I}"
            alt="SORA cloud mascot"
          />

          <div class="cvc-speech-bubble">
            <p id="cvc-coach-message">
              Choose the missing word!
            </p>
          </div>
        </section>

        <section class="cvc-instruction">
          <p>
            Round <span id="cvc-round-number">1</span>
            of ${h}
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

            <span class="cvc-blank">___</span>

            <span id="cvc-sentence-end"></span>
          </p>
        </section>

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
          Choose one word.
        </p>
      </section>
    </main>
  `,document.querySelector("#cvc-home-button").addEventListener("click",()=>{window.speechSynthesis?.cancel(),a("home")}),document.querySelector("#cvc-listen-button").addEventListener("click",M)}function H(){y=!0;const e=w[l];document.querySelector("#cvc-round-number").textContent=l+1,document.querySelector("#cvc-score").textContent=`${g} / ${h}`,document.querySelector("#cvc-progress-bar").style.width=`${l/h*100}%`,document.querySelector("#cvc-picture").textContent=e.picture,document.querySelector("#cvc-sentence-start").textContent=`${e.sentenceStart} `,document.querySelector("#cvc-sentence-end").textContent=e.sentenceEnd,document.querySelector("#cvc-coach-message").textContent="Which word completes the sentence?",document.querySelector("#cvc-feedback").textContent="Choose one word.",document.querySelector("#cvc-feedback").className="cvc-feedback";const t=document.querySelector("#cvc-choices");t.innerHTML=e.choices.map(c=>`
        <button
          class="cvc-choice"
          type="button"
          data-word="${c}"
        >
          ${c}
        </button>
      `).join(""),document.querySelectorAll(".cvc-choice").forEach(c=>{c.addEventListener("click",()=>{j(c)})}),setTimeout(M,450)}function M(){const e=w[l];if(!e)return;const t=`${e.sentenceStart} ${e.target} ${e.sentenceEnd}`;if(!("speechSynthesis"in window)){document.querySelector("#cvc-feedback").textContent=t;return}window.speechSynthesis.cancel();const c=new SpeechSynthesisUtterance(t);c.rate=.78,c.pitch=1.03,c.volume=1,window.speechSynthesis.speak(c)}function j(e){if(!y)return;const t=w[l],c=e.dataset.word,s=document.querySelector("#cvc-feedback"),n=document.querySelector("#cvc-coach-message"),o=document.querySelector("#cvc-mascot");c===t.target?(y=!1,g+=1,e.classList.add("cvc-correct"),o.classList.add("cvc-celebrate"),s.textContent="Excellent! +1 ⭐",s.className="cvc-feedback cvc-correct-feedback",n.textContent=`${t.sentenceStart} ${t.target} ${t.sentenceEnd}`,document.querySelector("#cvc-score").textContent=`${g} / ${h}`,setTimeout(()=>{o.classList.remove("cvc-celebrate"),l+=1,l>=h?F():H()},1e3)):(e.classList.add("cvc-wrong"),s.textContent="Almost! Listen and try again.",s.className="cvc-feedback cvc-wrong-feedback",n.textContent="You can do it!",setTimeout(()=>{e.classList.remove("cvc-wrong")},500))}function F(){window.speechSynthesis?.cancel(),sessionStorage.setItem("activity3Score",String(g)),sessionStorage.setItem("activity3Complete","true"),document.querySelector("#app").innerHTML=`
    <main class="cvc-game-page">
      <section class="cvc-results-window">
        <div class="cvc-results-stars">
          ⭐ ⭐ ⭐
        </div>

        <img
          class="cvc-results-mascot"
          src="${I}"
          alt="Happy SORA cloud mascot"
        />

        <p>ACTIVITY 3 COMPLETE</p>

        <h1>Fantastic Sentence Building!</h1>

        <div class="cvc-final-score">
          <strong>${g}</strong>
          <span>out of ${h}</span>
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
  `,document.querySelector("#cvc-results-button").addEventListener("click",()=>{a("results")}),document.querySelector("#cvc-play-again").addEventListener("click",P)}const N=document.querySelector("#app");if(!N)throw new Error("The #app element was not found. Check index.html.");function z(){N.innerHTML=`
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
  `,document.querySelector("#open-activity-one").addEventListener("click",()=>{a("activity1")}),document.querySelector("#open-activity-two").addEventListener("click",()=>{a("activity2")}),document.querySelector("#open-activity-three").addEventListener("click",()=>{a("activity3")})}f("home",z);f("activity1",A);f("activity2",x);f("activity3",P);a("home");
