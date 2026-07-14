(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();function d(){const s=document.querySelector("#app"),i=Number(sessionStorage.getItem("activity1Score")||0),o=sessionStorage.getItem("activity1Complete")==="true",a=i,t=Math.min(a/30*100,100);s.innerHTML=`
    <main class="home-page">
      <section class="home-window">
        <header class="home-header">
          <div>
            <p class="home-brand">SORA KIDS</p>
            <h1>English Adventure</h1>
          </div>

          <button
            id="home-menu-button"
            class="home-menu-button"
            type="button"
            aria-label="Open menu"
          >
            ☰
          </button>
        </header>

        <section class="home-coach">
          <div class="home-mascot-glow"></div>

          <img
            class="home-mascot"
            src="/sora-phonics-practice/mascot/cloud_smile_clean.png"
            alt="SORA cloud mascot"
          />

          <div class="home-speech">
            <strong>Welcome!</strong>
            <p>
              Complete three games to unlock your SORA English reward!
            </p>
          </div>
        </section>

        <section class="progress-card">
          <div class="progress-heading">
            <div>
              <p>Your progress</p>
              <strong id="star-total">
                ${a} / 30 Stars
              </strong>
            </div>

            <span class="progress-star">⭐</span>
          </div>

          <div class="home-progress-track">
            <div
              id="home-progress-bar"
              class="home-progress-bar"
              style="width: ${t}%"
            ></div>
          </div>
        </section>

        <section class="activity-section">
          <div class="section-heading">
            <div>
              <p class="section-label">TODAY'S ADVENTURE</p>
              <h2>Choose a game</h2>
            </div>

            <span>
              ${o?"2":"1"} of 3 unlocked
            </span>
          </div>

          <div class="activity-list">
            <article class="activity-card activity-unlocked">
              <div class="activity-number">
                ${o?"✓":"1"}
              </div>

              <div class="activity-icon letter-icon">
                ABC
              </div>

              <div class="activity-information">
                <p>ACTIVITY 1</p>
                <h3>Letter Smash</h3>
                <span>
                  ${o?`Completed — ${i} stars earned.`:"Listen and tap the correct letter."}
                </span>
              </div>

              <button
                id="activity-one-button"
                class="play-button"
                type="button"
              >
                ${o?"Play Again":"Play"}
              </button>
            </article>

            <article
              class="activity-card ${o?"activity-unlocked":"activity-locked"}"
            >
              <div class="activity-number">2</div>

              <div class="activity-icon goal-icon">
                ⚽
              </div>

              <div class="activity-information">
                <p>ACTIVITY 2</p>
                <h3>Sound Goal</h3>
                <span>
                  ${o?"Ready to play.":"Complete Activity 1 to unlock."}
                </span>
              </div>

              ${o?`
                    <button
                      id="activity-two-button"
                      class="play-button"
                      type="button"
                    >
                      Play
                    </button>
                  `:`
                    <div class="lock-badge" aria-label="Locked">
                      🔒
                    </div>
                  `}
            </article>

            <article class="activity-card activity-locked">
              <div class="activity-number">3</div>

              <div class="activity-icon match-icon">
                🧩
              </div>

              <div class="activity-information">
                <p>ACTIVITY 3</p>
                <h3>Memory Match</h3>
                <span>
                  Complete Activity 2 to unlock.
                </span>
              </div>

              <div class="lock-badge" aria-label="Locked">
                🔒
              </div>
            </article>
          </div>
        </section>

        <section class="reward-card">
          <div class="reward-symbol">🎁</div>

          <div class="reward-information">
            <p>YOUR SORA REWARD</p>
            <h2>Complete all three games</h2>
            <span>
              Unlock an eligible ASEP lesson, Coffee Hours session,
              or FUNdation offer.
            </span>
          </div>

          <div class="reward-stars">
            <strong>${a}</strong>
            <span>/ 30 ⭐</span>
          </div>
        </section>

        <p
          id="home-message"
          class="home-message"
          aria-live="polite"
        ></p>
      </section>
    </main>
  `,document.querySelector("#activity-one-button").addEventListener("click",()=>{n("activity1")});const c=document.querySelector("#activity-two-button");c&&c.addEventListener("click",()=>{n("activity2")});const r=document.querySelector("#home-menu-button"),l=document.querySelector("#home-message");r.addEventListener("click",()=>{l.textContent="The menu will be added later."})}function p(){const s=document.querySelector("#app");s.innerHTML=`
    <main style="
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 20px;
      background: linear-gradient(145deg, #6d55df, #ef72b9);
      font-family: Arial, sans-serif;
    ">
      <section style="
        width: min(92vw, 520px);
        padding: 35px 24px;
        border-radius: 28px;
        text-align: center;
        color: white;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(18px);
      ">
        <img
          src="/mascot/cloud_smile_clean.png"
          alt="SORA mascot"
          style="
            width: 150px;
            max-height: 120px;
            object-fit: contain;
          "
        />

        <p style="font-weight: 900; letter-spacing: 3px;">
          ACTIVITY 1
        </p>

        <h1>Letter Smash</h1>

        <p>The Play button is working correctly.</p>

        <button
          id="activity-home-button"
          type="button"
          style="
            width: 100%;
            min-height: 55px;
            margin-top: 20px;
            border: 0;
            border-radius: 17px;
            color: #5d43c5;
            background: white;
            font-weight: 900;
            cursor: pointer;
          "
        >
          Return Home
        </button>
      </section>
    </main>
  `,document.querySelector("#activity-home-button").addEventListener("click",()=>{n("home")})}const u={home:d,activity1:p};function n(s){const i=u[s];if(typeof i!="function"){console.error(`Page not found: ${s}`);return}window.scrollTo(0,0),i()}n("home");
