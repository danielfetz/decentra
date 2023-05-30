import SignIn from "@/components/auth-sign-in/auth"
import ModalDialog from "@/components/common/ModalDialog"
import { DialogContent } from "@mui/material"

export const AuthModal: React.FC<{
	open: boolean
	onClose: () => void
}> = ({ open, onClose }) => {
	return (
		<ModalDialog open={open} dialogTitle="Sign in with Ethereum" onClose={onClose}>
			<DialogContent>
				<SignIn />
			</DialogContent>
		</ModalDialog>
	)
}