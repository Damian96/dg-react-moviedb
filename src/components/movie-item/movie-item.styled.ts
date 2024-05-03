import styled from 'styled-components';

export const MovieItemWrapper = styled.div`
  .item {
    & > img {
      width: 100%;
      object-fit: contain;
      max-height: 275px;
    }
  }
`;
