import type { ReactElement, ReactNode } from 'react'

import PageHeader from '@/components/common/PageHeader'
import css from '@/components/common/PageHeader/styles.module.css'
import TxNavigation from '@/components/transactions/TxNavigation'

const TxHeader = ({ children, setRoute }: { children?: ReactNode, setRoute: any }): ReactElement => {
  return (
    <PageHeader
      title="Transactions"
      action={
        <div className={css.pageHeader}>
          <div className={css.navWrapper}>
            <TxNavigation setRoute={setRoute} />
          </div>
          {children && <div className={css.actionsWrapper}>{children}</div>}
        </div>
      }
    />
  )
}

export default TxHeader
