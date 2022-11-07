import { useEffect } from 'react'
import type { CreateSafeInfoItem } from '../../CreateSafeInfos'

export const useSafeSetupHints = (
  threshold: number,
  noOwners: number,
  setHint: (hint: CreateSafeInfoItem | undefined) => void,
) => {
  useEffect(() => {
    const safeSetupWarningSteps: { title: string; text: string }[] = []

    // 1/n warning
    if (threshold === 1) {
      safeSetupWarningSteps.push({
        title: `1/${noOwners}`,
        text: 'We recommend to use a threshold higher than one to prevent losing access to your safe in case one owner key gets compromised or lost',
      })
    }

    // n/n warning
    if (threshold === noOwners && noOwners > 1) {
      safeSetupWarningSteps.push({
        title: `${noOwners}/${noOwners}`,
        text: 'We recommend to use a threshold which is lower than the total number of owners of your Safe in case an owner loses access to their account and needs to be replaced.',
      })
    }

    setHint({ title: 'Safe Setup', variant: 'warning', steps: safeSetupWarningSteps })

    // Clear dynamic hints when the step / hook unmounts
    return () => {
      setHint(undefined)
    }
  }, [threshold, noOwners, setHint])
}