import { useCurrentChain } from '@/hooks/useChains'
import useOwnedSafes from '@/hooks/useOwnedSafes'
import { List, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import SafeListItem from '../SafeListItem'

const OwnedSafes = (): ReactElement | null => {
  const chain = useCurrentChain()
  const allOwnedSafes = useOwnedSafes()

  return (
    <>
      <List sx={{ py: 0 }}>
        {allOwnedSafes?.map((address) => (
          <SafeListItem
            key={address}
            address={address}
            chainId={chain.chainId}
            closeDrawer={() => void null}
            shouldScrollToSafe={false}
            noActions
          />
        ))}
      </List>
    </>
  )
}

export default OwnedSafes
