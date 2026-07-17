export async function saveResultToSupabase({
  score,
  totalScore = 30,
  completedQuests = 0,
  rewardLabel,
  rewardTier,
}) {
  const payload = {
    score,
    total_score: totalScore,
    completed_quests: Number(completedQuests || 0),
    reward_label: rewardLabel,
    reward_tier: rewardTier,
  };

  // Replace with your existing Supabase insert/update call.
  // Example:
  // return supabase.from('results').insert(payload);
  return payload;
}