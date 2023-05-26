import PaginatedTxns from '@/components/common/PaginatedTxns'
import TxFilterForm from '@/components/transactions/TxFilterForm'
import TxHeader from '@/components/transactions/TxHeader'
import useTxHistory from '@/hooks/useTxHistory'
import { useTxFilter } from '@/utils/tx-history-filter'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const History: NextPage<{ showTabs: boolean }> = ({ showTabs = true }) => {
  const [filter] = useTxFilter()
  const [showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => {
    setShowFilter((prev) => !prev)
  }

  const ExpandIcon = showFilter ? ExpandLessIcon : ExpandMoreIcon
  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Transaction history'}</title>
      </Head>
      {showTabs &&
        <TxHeader>
          <Button variant="outlined" onClick={toggleFilter} size="small" endIcon={<ExpandIcon />}>
            {filter?.type ?? 'Filter'}
          </Button>
        </TxHeader>
      }

      <main>
        {showFilter && <TxFilterForm toggleFilter={toggleFilter} />}

        <Box mb={4}>
          <PaginatedTxns useTxns={useTxHistory} />
        </Box>
      </main>
    </>
  )
}

export default History
