import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { MyForms } from '../../../helpers/translate/translate.scema';
import { EActionTypes } from '../../../types/enums/common.enum';

const FormActionDiv = styled.div({
  display: 'flex',
  gap: 30,
  justifyContent: 'space-between',
});

interface IFormActions {
  loading: boolean;
  form: keyof MyForms;
  actionType: EActionTypes;
  success: boolean;
  onCancel: () => void;
  setActionType: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormActions: FC<IFormActions> = ({
  form,
  loading,
  success,
  actionType,
  onCancel,
  setAlertMessage,
  setActionType,
}) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const SubmitButton = () => {
    return (
      <Button
        type='submit'
        variant={
          actionType === EActionTypes.CREATE
            ? 'primary'
            : actionType === EActionTypes.UPDATE
            ? 'warning'
            : actionType === EActionTypes.DELETE
            ? 'danger'
            : 'secondary'
        }
        className='w-100'
        disabled={loading}
      >
        {translate(TEXT.forms[form][actionType].buttons.submitBtn)}
      </Button>
    );
  };

  const DeleteButton = () => {
    return (
      <>
        {!confirmDelete ? (
          <Button
            type='button'
            variant='danger'
            className='w-100'
            disabled={loading}
            onClick={() => {
              setConfirmDelete(true);
              setActionType(EActionTypes.DELETE);
              setAlertMessage(translate(TEXT.general.confirmDelete));
            }}
          >
            {translate(TEXT.forms[form].DELETE.buttons.submitBtn)}
          </Button>
        ) : (
          <Button
            type='button'
            variant='secondary'
            className='w-100'
            disabled={loading}
            onClick={() => {
              setAlertMessage('');
              setConfirmDelete(false);
              setActionType(EActionTypes.UPDATE);
            }}
            color='white'
          >
            {translate(TEXT.buttons.backBtn)}
          </Button>
        )}
      </>
    );
  };

  return (
    <FormActionDiv>
      {(!confirmDelete || (confirmDelete && success)) && (
        <Button
          type='button'
          variant={'secondary'}
          className='w-100'
          disabled={loading}
          onClick={onCancel}
        >
          {translate(TEXT.buttons.cancelBtn)}
        </Button>
      )}

      {!success && (
        <>
          {(confirmDelete || actionType === EActionTypes.UPDATE) && (
            <DeleteButton />
          )}
          <SubmitButton />
        </>
      )}
    </FormActionDiv>
  );
};
