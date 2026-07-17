export function getQuestReward(completedQuests) {
  const count = Number(completedQuests || 0)

  if (count >= 3) {
    return {
      label: '🎉 1 month of ASEP English Class',
      tier: 3,
      completedQuests: count,
    }
  }

  if (count === 2) {
    return {
      label: '🎉 2 weeks of ASEP English Class',
      tier: 2,
      completedQuests: count,
    }
  }

  if (count === 1) {
    return {
      label: '🎉 1 week of ASEP English Class',
      tier: 1,
      completedQuests: count,
    }
  }

  return {
    label: 'No reward yet',
    tier: 0,
    completedQuests: count,
  }
}
