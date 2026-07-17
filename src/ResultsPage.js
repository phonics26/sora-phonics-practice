import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getQuestReward } from './utils/questRewards';
// import { saveResultToSupabase } from './supabase'; // adjust to your existing Supabase helper

export default function ResultsPage() {
  const location = useLocation();
  const state = location.state || {};

  // Keep existing score tracking
  const score = Number(state.score ?? 0);
  const totalPossibleScore = 30;

  // New quest-based reward logic
  const completedQuests = Number(
    state.completedQuests ??
    state.completed_quests ??
    sessionStorage.getItem('completedQuests') ??
    localStorage.getItem('completedQuests') ??
    0
  );
  const reward = useMemo(() => getQuestReward(completedQuests), [completedQuests]);

  useEffect(() => {
    // If you already save results from this page, extend the payload here.
    // If you have a dedicated Supabase helper, call it from there.
    const saveResult = async () => {
      // Example payload; adapt the table/column names to your project
      const payload = {
        score,
        total_score: totalPossibleScore,
        completed_quests: completedQuests,
        reward_label: reward.label,
        reward_tier: reward.tier,
      };

      // Example placeholder:
      // await saveResultToSupabase(payload);

      // If your current code already does an insert/update, add these fields:
      // completed_quests: completedQuests,
      // reward_label: reward.label,
      // reward_tier: reward.tier,
    };

    saveResult();
  }, [score, completedQuests, reward.label, reward.tier]);

  return (
    <div className="results-page">
      <h1>Results</h1>

      {/* Keep showing the score out of 30 */}
      <p>
        Score: {score} / {totalPossibleScore}
      </p>

      {/* Reward is based on completed quests now */}
      <p>Reward: {reward.label}</p>

      <p>Completed quests: {completedQuests}</p>
    </div>
  );
}