import * as React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

interface CustomAlertDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onDismiss: () => void;
    navigateTo: string;
  }

  const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({ isOpen, title, message, onDismiss,navigateTo  }) => {
    const navigate = useNavigate();
    

    const handleDismissAndNavigate = () => {
        onDismiss(); // Dismiss the dialog
        navigate(navigateTo);
      };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: title,
        subText: message,
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 450 } },
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={handleDismissAndNavigate} text="OK" />
      </DialogFooter>
    </Dialog>
  );
};

export default CustomAlertDialog;