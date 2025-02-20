import { useState } from 'react'
import Modal from '@/components/react/Modal/Modal'
import ModalContent from '@/components/react/Modal/ModalContent'
import ModalHeader from '@/components/react/Modal/ModalHeader'
import ModalBody from '@/components/react/Modal/ModalBody'
import ModalFooter from '@/components/react/Modal/ModalFooter'
import Button from '@/components/react/Button'

const CustomModal = ({
  isDismissable,
  effect,
  color,
  rounded,
  size,
  text = 'Open Modal'
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='p-4'>
      <Button onClick={openModal} color={color || 'primary'}>
        {text}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        isDismissable={isDismissable}
        effect={effect}
        color={color}
        rounded={rounded}
        size={size}
      >
        <ModalContent>
          <ModalHeader onClose={closeModal}>Modal Title</ModalHeader>
          <ModalBody>
            <p>This is the modal body content.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal} variant='bordered' color='danger'>
              Close
            </Button>
            <Button variant='light' color='primary'>
              Save changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CustomModal
