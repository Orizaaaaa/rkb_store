
import ModalDefault from './Modal'
import ButtonPrimary from '../../elemets/buttonPrimary'

type Props = {
    isOpen?: any
    onClose?: any
    onClick?: any
    children?: React.ReactNode
}

const AlertModal = ({ isOpen, onClose, onClick, children }: Props) => {
    return (
        <ModalDefault isOpen={isOpen} onClose={onClose} >
            <h1 className='text-lg font-medium' >Peringatan</h1>
            {children}
            <div className="flex justify-end">
                <ButtonPrimary className='bg-red-900 rounded-md ' onClick={onClick}>YA</ButtonPrimary>
            </div>

        </ModalDefault>
    )
}

export default AlertModal