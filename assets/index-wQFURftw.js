(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function r(){const a=document.querySelector("#app");a.innerHTML=`
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
            src="/mascot/cloud_smile_clean.png"
            alt="SORA cloud mascot"
          />

          <div class="home-speech">
            <strong>Welcome!</strong>
            <p>Complete three games to unlock your SORA English reward!</p>
          </div>
        </section>

        <section class="progress-card">
          <div class="progress-heading">
            <div>
              <p>Your progress</p>
              <strong id="star-total">0 / 30 Stars</strong>
            </div>

            <span class="progress-star">⭐</span>
          </div>

          <div class="home-progress-track">
            <div
              id="home-progress-bar"
              class="home-progress-bar"
              style="width: 0%"
            ></div>
          </div>
        </section>

        <section class="activity-section">
          <div class="section-heading">
            <div>
              <p class="section-label">TODAY'S ADVENTURE</p>
              <h2>Choose a game</h2>
            </div>

            <span>1 of 3 unlocked</span>
          </div>

          <div class="activity-list">
            <article class="activity-card activity-unlocked">
              <div class="activity-number">1</div>

              <div class="activity-icon letter-icon">
                ABC
              </div>

              <div class="activity-information">
                <p>ACTIVITY 1</p>
                <h3>Letter Smash</h3>
                <span>Listen and tap the correct letter.</span>
              </div>

              <button
                id="activity-one-button"
                class="play-button"
                type="button"
              >
                Play
              </button>
            </article>

            <article class="activity-card activity-locked">
              <div class="activity-number">2</div>

              <div class="activity-icon goal-icon">
                ⚽
              </div>

              <div class="activity-information">
                <p>ACTIVITY 2</p>
                <h3>Sound Goal</h3>
                <span>Complete Activity 1 to unlock.</span>
              </div>

              <div class="lock-badge" aria-label="Locked">
                🔒
              </div>
            </article>

            <article class="activity-card activity-locked">
              <div class="activity-number">3</div>

              <div class="activity-icon match-icon">
                🧩
              </div>

              <div class="activity-information">
                <p>ACTIVITY 3</p>
                <h3>Memory Match</h3>
                <span>Complete Activity 2 to unlock.</span>
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
            <strong>0</strong>
            <span>/ 30 ⭐</span>
          </div>
        </section>

        <p id="home-message" class="home-message" aria-live="polite"></p>
      </section>
    </main>
  `;const s=document.querySelector("#activity-one-button"),i=document.querySelector("#home-message");s.addEventListener("click",()=>{i.textContent="Activity 1 selected. Letter Smash will open next."})}r();
