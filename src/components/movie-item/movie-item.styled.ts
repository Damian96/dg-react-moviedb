import styled from 'styled-components';

export const MovieItemWrapper = styled.div`
  .item {
    & > img {
      width: 100%;
      object-fit: contain;
      height: 275px;
    }

    &-actions {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      height: 50px;
      overflow: hidden;
      padding: 10px;

      .favorite-action {
        transform: translateY(-10px) scale(2);
      }
    }
  }
`;
