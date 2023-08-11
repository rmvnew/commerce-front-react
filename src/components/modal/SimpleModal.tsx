import { Modal } from "antd";


interface RemoveItemModalProps {
    visible: boolean;
    item: any;
    onClose: () => void;
    onConfirm: (item: any) => void;
}

export const RemoveItemModal: React.FC<RemoveItemModalProps> = ({ visible, item, onClose, onConfirm }) => {
    return (
        <Modal
            title="Remover Item"
            visible={visible}
            onOk={() => onConfirm(item)}
            onCancel={onClose}
        >
            <p>Tem certeza de que deseja remover {item?.productName}? </p>
        </Modal>
    );
};
