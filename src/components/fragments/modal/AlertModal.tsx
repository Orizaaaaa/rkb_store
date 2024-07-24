
import ModalDefault from './Modal'
import ButtonPrimary from '../../elemets/buttonPrimary'

type Props = {
    isOpen?: any
    onClose?: any
}

const AlertModal = ({ isOpen, onClose }: Props) => {
    return (
        <ModalDefault isOpen={isOpen} onClose={onClose} >
            <h1 className='text-lg font-medium' >Peringatan</h1>
            <p>Apakah anda yakin ingin menghapus produk ini ?</p>
            <div className="flex justify-end">
                <ButtonPrimary className='bg-red-900 rounded-md ' >YA</ButtonPrimary>
            </div>

        </ModalDefault>
    )
}

export default AlertModal