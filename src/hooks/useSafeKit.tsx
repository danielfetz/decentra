import SafeApiKit from '@safe-global/api-kit'
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { createWeb3 } from '@/hooks/wallets/web3'
import useWallet from './wallets/useWallet'
import { useEffect, useState } from 'react'


export const useSafeKit = (): any => {
  const wallet = useWallet()
  const [kit, setKit] = useState<any>()

  useEffect(() => {
    const createService = async () => {
      let safesOfOwner: any[] = []
      const provider = await createWeb3(wallet?.provider!)
      const safeOwner = provider.getSigner(0)

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: safeOwner
      })

      console.log('ethadapter', ethAdapter)

    const safeServiceOptimism = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-optimism.safe.global/',
      //@ts-ignore
      ethAdapter
    })
    const safeServiceMainnet = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-mainnet.safe.global/',
      //@ts-ignore
      ethAdapter
    })
    const safeServicePolygon = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-polygon.safe.global/',
      //@ts-ignore
      ethAdapter
    })
    const safeServiceGnosis = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-gnosis-chain.safe.global/',
      //@ts-ignore
      ethAdapter
    })
    const safeServiceArbitrum = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-arbitrum.safe.global/',
      //@ts-ignore
      ethAdapter
    })
    const safeServiceBinance = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-bsc.safe.global/',
      //@ts-ignore
      ethAdapter
    })

    const serviceArray = [
      {
        prefix: 'oeth:',
        service: safeServiceOptimism,
      },
      {
        prefix: 'matic:',
        service: safeServicePolygon,
      },
      {
        prefix: 'eth:',
        service: safeServiceMainnet,
      },
      {
        prefix: 'gno:',
        service: safeServiceGnosis,
      },
      {
        prefix: 'bnb:',
        service: safeServiceBinance,
      },
      {
        prefix: 'arb:',
        service: safeServiceArbitrum,
      },
    ]

    for (const item of serviceArray) {
      const safes = await item.service.getSafesByOwner(wallet?.address!);
      safesOfOwner.push({ 
        prefix: item.prefix,
        safes: safes,
      })
    }
    return safesOfOwner
  }
    createService().then((res) => {
      console.log(res, 'test 1')
      setKit(res)
    })

  }, [])
  
  return kit
}
