import styled from 'styled-components';

export const SearchModalWrapper = styled.div`
  #searchModal {
    .modal-content {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .movie-grid {
        grid-template-columns: repeat(6, 175px);
    }
  }
`;
