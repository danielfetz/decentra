import { AppRoutes } from '@/config/routes'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import History from './history'
import Messages from './messages'
import Queue from './queue'

const HistoryPage: NextPage = () => {
	const [route, setRoute] = useState(AppRoutes.transactions.history)

	useEffect(() => {
		console.log({ route })
	}, [route])

	return (
		<main>
			{route === AppRoutes.transactions.history &&
				<History setRoute={setRoute} />
			}
			{route === AppRoutes.transactions.messages &&
				<Messages setRoute={setRoute} />
			}
			{route === AppRoutes.transactions.queue &&
				<Queue setRoute={setRoute} />
			}
		</main>

	)
}

export default HistoryPage
