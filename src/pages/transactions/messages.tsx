import { FEATURES } from '@safe-global/safe-gateway-typescript-sdk'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import PaginatedMsgs from '@/components/safe-messages/PaginatedMsgs'
import SignedMessagesHelpLink from '@/components/transactions/SignedMessagesHelpLink'
import TxHeader from '@/components/transactions/TxHeader'
import { AppRoutes } from '@/config/routes'
import { useCurrentChain } from '@/hooks/useChains'
import { hasFeature } from '@/utils/chains'

const Messages: NextPage<{ setRoute: any }> = ({ setRoute }) => {
  const chain = useCurrentChain()
  const router = useRouter()

  useEffect(() => {
    if (!chain || hasFeature(chain, FEATURES.EIP1271)) {
      return
    }

    router.replace({ ...router, pathname: AppRoutes.transactions.history })
  }, [router, chain])

  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Messages'}</title>
      </Head>

      <TxHeader setRoute={setRoute}>
        <SignedMessagesHelpLink />
      </TxHeader>

      <main>
        <PaginatedMsgs />
      </main>
    </>
  )
}

export default Messages
