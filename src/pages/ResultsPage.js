import '../styles/resultsPage.css'
import { navigate } from '../router.js'
import { supabase } from '../services/supabase.js'

const mascotPath =
  `${import.meta.env.BASE_URL}mascot/cloud_smile_clean.png`

export function renderResultsPage() {
  const activity1Score = Number(
    sessionStorage.getItem('activity1Score') || 0
  )

  const activity2Score = Number(
    sessionStorage.getItem('activity2Score') || 0
  )

  const activity3Score = Number(
    sessionStorage.getItem('activity3Score') || 0
  )

  const totalScore =
    activity1Score +
    activity2Score +
    activity3Score

  const playerMode =
    sessionStorage.getItem('soraPlayerMode') || 'guest'

  const savedEmail =
    sessionStorage.getItem('soraParentEmail') || ''

  const marketingConsent =
    sessionStorage.getItem('soraMarketingConsent') === 'true'

  const reward = getReward(totalScore)

  document.querySelector('#app').innerHTML = `
    <main class="results-page">
      <section class="results-window">
        <div class="results-confetti" aria-hidden="true">
          <span>⭐</span>
          <span>✨</span>
          <span>🎉</span>
          <span>⭐</span>
          <span>✨</span>
        </div>

        <img
          class="results-mascot"
          src="${mascotPath}"
          alt="Happy SORA cloud mascot"
        />

        <p class="results-brand">
          SORA ADVENTURE COMPLETE
        </p>

        <h1>Congratulations!</h1>

        <p class="results-introduction">
          You completed all three English challenges.
        </p>

        <section class="results-score-card">
          <span>Your total score</span>

          <div>
            <strong>${totalScore}</strong>
            <small>/ 30 stars</small>
          </div>

          <p>
            Achievement Level ${reward.level}:
            <strong>${reward.title}</strong>
          </p>
        </section>

        <section class="results-breakdown">
          <article>
            <span>⚽</span>
            <p>Letter Goal</p>
            <strong>${activity1Score}/10</strong>
          </article>

          <article>
            <span>🐶</span>
            <p>Animal Match</p>
            <strong>${activity2Score}/10</strong>
          </article>

          <article>
            <span>📚</span>
            <p>Word Builder</p>
            <strong>${activity3Score}/10</strong>
          </article>
        </section>

        <section
          id="mystery-reward"
          class="mystery-reward"
        >
          <p class="mystery-label">
            YOUR SURPRISE REWARD
          </p>

          <button
            id="open-reward-button"
            class="reward-present-button"
            type="button"
            aria-label="Open your surprise reward"
          >
            <span class="reward-present">🎁</span>
            <strong>Tap to Open</strong>
          </button>

          <p class="mystery-hint">
            You earned this reward by completing the adventure!
          </p>
        </section>

        <section
          id="reward-reveal"
          class="reward-reveal reward-hidden"
        >
          <div class="reward-celebration">
            🎉 ⭐ 🎉
          </div>

          <p>
            LEVEL ${reward.level} REWARD
          </p>

          <h2>${reward.title}</h2>

          <strong class="reward-prize">
            ${reward.rewardName}
          </strong>

          <span>
            ${reward.message}
          </span>

          <div class="reward-code-card">
            <small>Your reward reference</small>
            <strong id="reward-code">
              ${reward.couponCode}
            </strong>
          </div>
        </section>

        <div
          id="reward-claim-area"
          class="reward-claim-area reward-hidden"
        >
          ${
            playerMode === 'guest'
              ? renderGuestEmailForm()
              : renderSavedEmailConfirmation(savedEmail)
          }
        </div>

        <p
          id="results-message"
          class="results-message"
          aria-live="polite"
        ></p>

        <button
          id="results-home-button"
          class="results-home-button"
          type="button"
        >
          Return to Home
        </button>

        <button
          id="results-restart-button"
          class="results-restart-button"
          type="button"
        >
          Start a New Adventure
        </button>
      </section>
    </main>
  `

  const openRewardButton =
    document.querySelector('#open-reward-button')

  openRewardButton.addEventListener('click', async () => {
    revealReward()

    if (playerMode === 'email' && savedEmail) {
      await saveCompletedResult({
        email: savedEmail,
        playerMode: 'email',
        marketingConsent,
        activity1Score,
        activity2Score,
        activity3Score,
        totalScore,
        reward,
      })
    }
  })

  if (playerMode === 'guest') {
    const guestForm =
      document.querySelector('#reward-email-form')

    guestForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault()

        await saveGuestReward({
          activity1Score,
          activity2Score,
          activity3Score,
          totalScore,
          reward,
        })
      }
    )
  }

  document
    .querySelector('#results-home-button')
    .addEventListener('click', () => {
      navigate('home')
    })

  document
    .querySelector('#results-restart-button')
    .addEventListener('click', () => {
      clearAdventureSession()
      navigate('login')
    })
}

function revealReward() {
  const mysteryReward =
    document.querySelector('#mystery-reward')

  const rewardReveal =
    document.querySelector('#reward-reveal')

  const rewardClaimArea =
    document.querySelector('#reward-claim-area')

  mysteryReward.classList.add('reward-opening')

  window.setTimeout(() => {
    mysteryReward.classList.add('reward-hidden')
    rewardReveal.classList.remove('reward-hidden')
    rewardClaimArea.classList.remove('reward-hidden')
  }, 550)
}

function renderGuestEmailForm() {
  return `
    <form
      id="reward-email-form"
      class="reward-email-form"
    >
      <div class="reward-email-heading">
        <span>📧</span>

        <div>
          <p>CLAIM YOUR REWARD</p>
          <h2>Ask a parent or guardian</h2>
        </div>
      </div>

      <p class="reward-email-description">
        Enter a parent or guardian email so SORA can
        contact you about your result and reward.
      </p>

      <label for="reward-parent-email">
        Parent or guardian email
      </label>

      <input
        id="reward-parent-email"
        type="email"
        placeholder="parent@example.com"
        autocomplete="email"
        required
      />

      <label class="reward-checkbox">
        <input
          id="reward-marketing-consent"
          type="checkbox"
        />

        <span>
          Send me future SORA news and special offers.
          <small>Optional</small>
        </span>
      </label>

      <button
        id="claim-reward-button"
        type="submit"
      >
        Save My Result and Reward
      </button>
    </form>
  `
}

function renderSavedEmailConfirmation(email) {
  return `
    <section class="results-email-confirmation">
      <span>📧</span>

      <div>
        <p>
          Your result and reward have been connected to:
        </p>

        <strong>${escapeHtml(email)}</strong>

        <small>
          SORA can contact this address with the reward details.
        </small>
      </div>
    </section>
  `
}

async function saveGuestReward({
  activity1Score,
  activity2Score,
  activity3Score,
  totalScore,
  reward,
}) {
  const message =
    document.querySelector('#results-message')

  const submitButton =
    document.querySelector('#claim-reward-button')

  const email = document
    .querySelector('#reward-parent-email')
    .value
    .trim()

  const marketingConsent = document
    .querySelector('#reward-marketing-consent')
    .checked

  if (!email) {
    showResultsError(
      message,
      'Please enter a parent or guardian email.'
    )
    return
  }

  submitButton.disabled = true
  submitButton.textContent = 'Saving...'

  message.textContent =
    'Saving your result and reward...'

  message.className = 'results-message'

  const { error } = await supabase
    .from('sora_adventure_results')
    .insert({
      email,
      player_mode: 'guest',
      marketing_consent: marketingConsent,
      activity1_score: activity1Score,
      activity2_score: activity2Score,
      activity3_score: activity3Score,
      total_score: totalScore,
      achievement_level: reward.level,
      coupon_percentage: 0,
      coupon_code: reward.couponCode,
      coupon_earned: true,
      coupon_sent: false,
      reward_name: reward.rewardName,
    })

  if (error) {
    console.error(
      'Guest reward save error:',
      error
    )

    submitButton.disabled = false
    submitButton.textContent =
      'Save My Result and Reward'

    showResultsError(
      message,
      'We could not save the reward. Please try again.'
    )
    return
  }

  sessionStorage.setItem('soraParentEmail', email)
  sessionStorage.setItem('soraPlayerMode', 'email')

  message.textContent =
    'Your result and reward were saved successfully! 🎉'

  message.className =
    'results-message results-message-success'

  document
    .querySelector('#reward-email-form')
    .innerHTML = `
      <div class="reward-claimed-message">
        <span>✅</span>

        <div>
          <strong>Reward claimed!</strong>
          <p>
            SORA can contact
            ${escapeHtml(email)}
            about this reward.
          </p>
        </div>
      </div>
    `
}

async function saveCompletedResult({
  email,
  playerMode,
  marketingConsent,
  activity1Score,
  activity2Score,
  activity3Score,
  totalScore,
  reward,
}) {
  const alreadySaved =
    sessionStorage.getItem('soraFinalResultSaved') === 'true'

  if (alreadySaved) {
    return
  }

  const message =
    document.querySelector('#results-message')

  message.textContent =
    'Saving your completed result...'

  message.className = 'results-message'

  const { error } = await supabase
    .from('sora_adventure_results')
    .insert({
      email,
      player_mode: playerMode,
      marketing_consent: marketingConsent,
      activity1_score: activity1Score,
      activity2_score: activity2Score,
      activity3_score: activity3Score,
      total_score: totalScore,
      achievement_level: reward.level,
      coupon_percentage: 0,
      coupon_code: reward.couponCode,
      coupon_earned: true,
      coupon_sent: false,
      reward_name: reward.rewardName,
    })

  if (error) {
    console.error(
      'Completed result save error:',
      error
    )

    showResultsError(
      message,
      'Your score is displayed, but it could not be saved.'
    )
    return
  }

  sessionStorage.setItem(
    'soraFinalResultSaved',
    'true'
  )

  message.textContent =
    'Your result and reward were saved successfully! 🎉'

  message.className =
    'results-message results-message-success'
}

function getReward(totalScore) {
  if (totalScore >= 26) {
    return {
      level: 3,
      title: 'SORA Star',
      rewardName: 'First Month of ASEP Free',
      message:
        'Incredible work! You reached the highest SORA Adventure level.',
      couponCode: createRewardCode(3),
    }
  }

  if (totalScore >= 18) {
    return {
      level: 2,
      title: 'Champion',
      rewardName: 'Two Weeks of ASEP Free',
      message:
        'Fantastic work! You unlocked the Level 2 SORA reward.',
      couponCode: createRewardCode(2),
    }
  }

  return {
    level: 1,
    title: 'Explorer',
    rewardName: 'One Week of ASEP Free',
    message:
      'Great work! You completed the adventure and unlocked your first reward.',
    couponCode: createRewardCode(1),
  }
}

function createRewardCode(level) {
  const savedCode =
    sessionStorage.getItem('soraRewardCode')

  if (savedCode) {
    return savedCode
  }

  const randomPart = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()

  const code = `SORA-L${level}-${randomPart}`

  sessionStorage.setItem('soraRewardCode', code)

  return code
}

function showResultsError(element, text) {
  element.textContent = text
  element.className =
    'results-message results-message-error'
}

function clearAdventureSession() {
  const keys = [
    'soraPlayerMode',
    'soraParentEmail',
    'soraResultConsent',
    'soraMarketingConsent',
    'soraFinalResultSaved',
    'soraRewardCode',
    'activity1Score',
    'activity2Score',
    'activity3Score',
    'activity1Complete',
    'activity2Complete',
    'activity3Complete',
  ]

  keys.forEach((key) => {
    sessionStorage.removeItem(key)
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}