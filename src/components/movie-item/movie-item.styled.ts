import styled from 'styled-components';

export const MovieItemWrapper = styled.div`
  .item {
    & > img {
      width: 100%;
      object-fit: contain;
      max-height: 275px;
    }

    &-actions {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      height: 50px;
      overflow: hidden;
      padding: 10px;

      .lottie-container {
        position: relative;
        top: -40px;
        transform: translate(-33%, 50%) scale(1.6);
        //transform: translateY(41%) scale(1.6);
      }
    }
  }
`;
