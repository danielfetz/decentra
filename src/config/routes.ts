export const AppRoutes = {
  '404': '/404',
  welcome: '/welcome',
  open: '/open',
  load: '/load',
  index: '/',
  import: '/import',
  home: '/home',
  apps: '/apps',
  txbuilder: '/apps?appUrl=https%3A%2F%2Fapps.gnosis-safe.io%2Ftx-builder',
  addressBook: '/address-book',
  balances: {
    nfts: '/balances/nfts',
    index: '/balances',
  },
  settings: {
    spendingLimits: '/settings/spending-limits',
    setup: '/settings/setup',
    modules: '/settings/modules',
    index: '/settings',
    data: '/settings/data',
    appearance: '/settings/appearance',
    safeApps: {
      index: '/settings/safe-apps',
    },
  },
  share: {
    safeApp: '/share/safe-app',
  },
  transactions: {
    tx: '/transactions/tx',
    queue: '/transactions/queue',
    index: '/transactions',
    history: '/transactions/history',
  },
}
