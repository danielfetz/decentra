import type { NextPage } from 'next'
import Head from 'next/head'
import NewSafe from '@/components/welcome/NewSafe'
import { useAuthRequestChallengeEvm } from '@moralisweb3/next'
import { Box, Button, Typography } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import useLastSafe from '@/hooks/useLastSafe'

const Welcome: NextPage = () => {
  const { connectAsync } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { requestChallengeAsync } = useAuthRequestChallengeEvm()
  const { push } = useRouter()
  const [auth, setAuth] = useState<any>()
  const lastSafe = useLastSafe()

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync()
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    })
    //TO-DO: fix this type pls
    //@ts-ignore
    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    })

    const signature = await signMessageAsync({ message })
    // redirect user after success authentication to '/user' page
    //@ts-ignore
    const { url } = await signIn('moralis-auth', {
      message,
      signature,
      redirect: false,
      callbackUrl: lastSafe ? `/chat?safe=${lastSafe}` : '/',
    })

    setAuth(url)
    //push(url)
  }

  if (!auth) {
    return (
      <Box
        sx={{
          height: '90vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant='h3' pb={3}>Web3 Authentication</Typography>
        <Button variant="contained" onClick={handleAuth}>Authenticate</Button>
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Welcome'}</title>
      </Head>

      <NewSafe />
    </>
  )
}

export default Welcome
