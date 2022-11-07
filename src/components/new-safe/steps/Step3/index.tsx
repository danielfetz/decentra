import { useMemo, type ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Grid, Typography, Divider, Box } from '@mui/material'
import ChainIndicator from '@/components/common/ChainIndicator'
import EthHashInfo from '@/components/common/EthHashInfo'
import type { NamedAddress } from '@/components/create-safe/types'
import { useCurrentChain } from '@/hooks/useChains'
import useGasPrice from '@/hooks/useGasPrice'
import { useEstimateSafeCreationGas } from '@/components/create-safe/useEstimateSafeCreationGas'
import { formatVisualAmount } from '@/utils/formatters'
import type { StepRenderProps } from '@/components/new-safe/CardStepper/useCardStepper'
import type { NewSafeFormData } from '@/components/new-safe/CreateSafe'
import css from './styles.module.css'
import { getFallbackHandlerContractInstance } from '@/services/contracts/safeContracts'
import { computeNewSafeAddress } from '@/components/create-safe/logic'
import useWallet from '@/hooks/wallets/useWallet'
import { useWeb3 } from '@/hooks/wallets/web3'
import useLocalStorage from '@/services/local-storage/useLocalStorage'
import { type PendingSafeData, SAFE_PENDING_CREATION_STORAGE_KEY } from '@/components/new-safe/steps/Step4'
import useIsConnected from '@/hooks/useIsConnected'
import useSetCreationStep from '@/components/new-safe/CreateSafe/useSetCreationStep'

enum CreateSafeStep3Fields {
  name = 'name',
  owners = 'owners',
  threshold = 'threshold',
}

type CreateSafeStep3Form = {
  name: string
  owners: NamedAddress[]
  threshold: number
  networkFee: string
}

const ReviewRow = ({ name, value }: { name: string; value: ReactElement }) => {
  return (
    <>
      <Grid item xs={3}>
        <Typography variant="body2">{name}</Typography>
      </Grid>
      <Grid item xs={9}>
        {value}
      </Grid>
    </>
  )
}

const CreateSafeStep3 = ({ data, onSubmit, onBack, setStep }: StepRenderProps<NewSafeFormData>) => {
  const isConnected = useIsConnected()
  useSetCreationStep(setStep, isConnected)
  const chain = useCurrentChain()
  const wallet = useWallet()
  const provider = useWeb3()
  const { maxFeePerGas, maxPriorityFeePerGas } = useGasPrice()
  const saltNonce = useMemo(() => Date.now(), [])
  const [_, setPendingSafe] = useLocalStorage<PendingSafeData | undefined>(SAFE_PENDING_CREATION_STORAGE_KEY)

  const safeParams = useMemo(() => {
    return {
      owners: data.owners.map((owner) => owner.address),
      threshold: data.threshold,
      saltNonce,
    }
  }, [data.owners, data.threshold, saltNonce])

  const { gasLimit } = useEstimateSafeCreationGas(safeParams)

  const totalFee =
    gasLimit && maxFeePerGas && maxPriorityFeePerGas
      ? formatVisualAmount(maxFeePerGas.add(maxPriorityFeePerGas).mul(gasLimit), chain?.nativeCurrency.decimals)
      : '> 0.001'

  const formMethods = useForm<CreateSafeStep3Form>({
    mode: 'all',
    defaultValues: {
      [CreateSafeStep3Fields.name]: data.name,
      [CreateSafeStep3Fields.owners]: data.owners,
      [CreateSafeStep3Fields.threshold]: data.threshold,
    },
  })

  const { getValues } = formMethods

  const handleBack = () => {
    const allFormData = getValues()
    onBack(allFormData)
  }

  const createSafe = async () => {
    if (!wallet || !provider || !chain) return

    const fallbackHandler = getFallbackHandlerContractInstance(chain.chainId)

    const props = {
      safeAccountConfig: {
        threshold: data.threshold,
        owners: data.owners.map((owner) => owner.address),
        fallbackHandler: fallbackHandler.address,
      },
      safeDeploymentConfig: {
        saltNonce: saltNonce.toString(),
      },
    }

    const safeAddress = await computeNewSafeAddress(provider, props)

    setPendingSafe({ ...data, saltNonce, safeAddress })
    onSubmit({ ...data, saltNonce, safeAddress })
  }

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Grid container spacing={3}>
          <ReviewRow name="Network" value={<ChainIndicator chainId={chain?.chainId} inline />} />
          <ReviewRow name="Name" value={<Typography>{data.name}</Typography>} />
          <ReviewRow
            name="Owners"
            value={
              <Box className={css.ownersArray}>
                {data.owners.map((owner, index) => (
                  <EthHashInfo
                    address={owner.address}
                    name={owner.name || owner.ens}
                    shortAddress={false}
                    showPrefix={false}
                    showName
                    key={index}
                  />
                ))}
              </Box>
            }
          />
          <ReviewRow
            name="Threshold"
            value={
              <Typography>
                {data.threshold} out of {data.owners.length} owner(s)
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ ml: '-52px', mr: '-52px', mb: 4, mt: 3 }} />
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <ReviewRow
              name="Est. network fee"
              value={
                <Box p={1} sx={{ backgroundColor: 'secondary.background', width: 'fit-content' }}>
                  <Typography variant="body1">
                    <b>
                      &asymp; {totalFee} {chain?.nativeCurrency.symbol}
                    </b>
                  </Typography>
                </Box>
              }
            />
            <Grid xs={3} />
            <Grid xs={9} pt={1} pl={3}>
              <Typography color="text.secondary">
                You will have to confirm a transaction with your currently connected wallet.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ ml: '-52px', mr: '-52px', mb: 4, mt: 3, alignSelf: 'normal' }} />
        <Box display="flex" flexDirection="row" gap={3}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={createSafe} disabled={!isConnected}>
            Continue
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CreateSafeStep3