import Modal from 'react-modal';
import { Button } from "@mui/material";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const customStyles = {
  content: {
    width: '400px',
    height: '200px',
    margin: 'auto',
    borderRadius: '10px', // Adiciona bordas arredondadas
    backgroundColor: '#d9d9d9', // Altera a cor de fundo do modal
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adiciona um fundo preto semi-transparente
  }
};

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      style={customStyles}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <Button onClick={onConfirm}>Confirmar</Button>
      <Button onClick={onCancel}>Cancelar</Button>
    </Modal>
  );
};

export default ConfirmationModal;
