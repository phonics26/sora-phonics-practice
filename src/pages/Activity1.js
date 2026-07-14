import { navigate } from '../router.js'

export function renderActivity1() {
  const app = document.querySelector('#app')

  app.innerHTML = `
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
  `

  document
    .querySelector('#activity-home-button')
    .addEventListener('click', () => {
      navigate('home')
    })
}