import { FaRegClipboard } from 'react-icons/fa';
import styled from 'styled-components';
import { textToClipboard } from '../../../utils/text-to-clipboard';
import { uniformBranchNameGenerator } from '../../../utils/uniform-branch-name-generator';

const SequenceIdDiv = styled.div({
  cursor: 'pointer',
  small: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: 5,
    svg: {
      transition: 'transform 0.25s ease',
    },
  },
  '.copied svg': {
    transform: 'scale(1.25)',
  },
});

export const SequneceId = (props: { sequenceId: string; title: string }) => {
  const { sequenceId, title } = props;
  return (
    <SequenceIdDiv>
      <small
        onClick={async (e) => {
          const icon = e.currentTarget;
          e.stopPropagation();
          const text = uniformBranchNameGenerator({ sequenceId, title });
          await textToClipboard(text);
          icon.classList.add('copied');
          setTimeout(() => {
            icon.classList.remove('copied');
          }, 250);
        }}
      >
        <FaRegClipboard />
        {sequenceId}
      </small>
    </SequenceIdDiv>
  );
};
