import MyForm from '../form';
import { Modal } from 'antd';
import type { FormProps } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import type { ModalProps } from 'antd/es/modal';

interface FilteredModalProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {}

interface MyModalProps<FormValues> extends FilteredModalProps {
  form?: FormValues;
  formProps?: FormProps<FormValues>;
  children?: React.ReactNode;
  onClose?: (formData?: FormValues) => any;
}

const BaseModal = <FormValues extends object>(props: MyModalProps<FormValues>) => {
  const { form, formProps, children, onClose, ...rest } = props;
  const [formInstance] = useForm<FormValues>();

  const onOk = async () => {
    if (form) {
      const data = await formInstance.validateFields();

      onClose && onClose(data);
    } else {
      onClose && onClose();
    }
  };

  return (
    <Modal {...rest} onCancel={() => onClose?.()} onOk={onOk}>
      {form ? (
        <MyForm {...formProps} form={formInstance}>
          {children}
        </MyForm>
      ) : (
        children
      )}
    </Modal>
  );
};

BaseModal.defaultProps = {
  width: '1000px',
};

const MyModal = Object.assign(BaseModal, Modal);

export default MyModal;
