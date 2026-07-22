export function getQuestReward(completedQuests) {
  const count = Number(completedQuests || 0)

  if (count >= 3) {
    return {
      label: '🎉 ASEP英語クラス1か月無料！',
      tier: 3,
      completedQuests: count,
    }
  }

  if (count === 2) {
    return {
      label: '🎉 ASEP英語クラス2週間無料！',
      tier: 2,
      completedQuests: count,
    }
  }

  if (count === 1) {
    return {
      label: '🎉 ASEP英語クラス1週間無料！',
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
