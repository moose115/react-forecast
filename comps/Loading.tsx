import React from 'react';
import { LoaderAlt } from '@styled-icons/boxicons-regular/LoaderAlt';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingAnim = styled(LoaderAlt)`
  animation: ${rotate} 1s ease-in-out infinite;
`;

type Props = {};

const Loading = (props: Props) => {
  return (
    <LoadingContainer>
      <LoadingAnim color="#454545" size="3em" />
    </LoadingContainer>
  );
};

export default Loading;
