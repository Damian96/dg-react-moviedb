import styled from 'styled-components';


export const LayoutWrapper = styled.div`

  #backdrop {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: ${({theme}) => theme.zFixed - 1};
    display: none;

    &.show {
      display: block;
    }
  }

  *, ::before, ::after {
    box-sizing: border-box;
  }

  #body {
    position: relative;
    margin: ${({theme}) => theme.headerHeight} 0 0 0;
    //padding: 0 1rem;
    font-size: ${({theme}) => theme.normalFontSize};
    transition: .5s;
  }

  a {
    text-decoration: none;
  }

  .header {
    width: 100%;
    height: ${({theme}) => theme.headerHeight};
    position: fixed;
    top: 0;
    left: 3.33vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background-color: ${({theme}) => theme.whiteColor};
    z-index: ${({theme}) => theme.zFixed};
    transition: .5s;
  }

  .header_toggle {
    color: ${({theme}) => theme.firstColor};
    font-size: 1.5rem;
    cursor: pointer;
  }

  .header_img {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 40px;
    }
  }

  .l-navbar {
    position: fixed;
    top: 0;
    left: -6.66%;
    width: ${({theme}) => theme.navWidth};
    height: 100vh;
    background-color: ${({theme}) => theme.firstColor};
    padding: .5rem 0 0 0;
    transition: .5s;
    z-index: ${({theme}) => theme.zFixed};

    .nav-link {
      &-text {
        display: none;
      }

      &-icon {
        margin-left: auto;
      }
    }

    &.show {
      left: 0;
      padding-right: 1rem;

      .nav-link {
        &-text {
          display: block;
        }

        &-icon {
          margin-left: unset;
        }
      }
    }
  }

  .nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .nav_logo, .nav_link {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    column-gap: 1rem;
    padding: .5rem 0 .5rem 1.5rem;
  }

  .nav_logo {
    margin-bottom: 2rem;

    &-icon {
      font-size: 1.25rem;
      color: $white-color;
    }

    &-name {
      color: ${({theme}) => theme.whiteColor};
      font-weight: 700;
    }
  }

  .nav-link {
    position: relative;
    font-size: 18px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.firstColorLight};
    margin-bottom: 1.5rem;
    transition: .3s;

    &:hover {
      color: ${({theme}) => theme.whiteColor};
    }

    &.active {
      color: ${({theme}) => theme.whiteColor};

      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 32px;
        background-color: ${({theme}) => theme.whiteColor};
      }
    }

    &-icon {
      margin-right: .5rem;
    }
  }

  .body-pd {
    padding-left: calc(${({theme}) => theme.navWidth} * .7) !important;

    // @media screen and (min-width: 768px) {
      //   padding-left: calc(${({theme}) => theme.navWidth} * .7) !important;
    // }
  }

  #main {
    &.body-pd {
      padding: 3vw 2vw 3vw calc(${({theme}) => theme.navWidth} * .5);
    }

    .search-btn {
      bottom: 2rem;
      right: 2rem;
    }
  }
`;
