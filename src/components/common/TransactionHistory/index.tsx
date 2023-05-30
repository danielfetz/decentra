import ViewTransactionsModal from '@/components/chat/modals/ViewTransactionsModal'
import css from '@/components/chat/styles.module.css'
import useTxHistory from '@/hooks/useTxHistory'
import { Box, Button, Chip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const TransactionHistory = () => {
  const txHistory = useTxHistory()
  const [txs, setTxs] = useState<any[]>([])
  const [transactionsOpen, toggleTransactionsOpen] = useState<boolean>(false)

  useEffect(() => {
    const ts = txHistory.page?.results.filter((tx) => tx.type === 'TRANSACTION') || []
    setTxs(ts)
  }, [txHistory?.page?.results])

  return (
    <>
      {transactionsOpen && (
        <ViewTransactionsModal open={transactionsOpen} onClose={() => toggleTransactionsOpen(!transactionsOpen)} />
      )}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: '5px', pb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Transaction History</Typography>
          <Chip label={`${txs?.length}`} size="small" />
        </Box>
        <Button
          variant="outlined"
          className={css.buttonstyled}
          onClick={() => toggleTransactionsOpen(!transactionsOpen)}
          size="small"
        >
          View Transactions
        </Button>
      </Box>
    </>
  )
}

export default TransactionHistory
