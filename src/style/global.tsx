import styled, { createGlobalStyle } from "styled-components"

interface GlobalProps {
	themeDark: boolean
}

export default createGlobalStyle`
    
    :root{
        --black: #0c090b;
        --gray-100: #f3f4f6;
        --gray-500:#374151;
		--gray-300:#485262;
		--gray-200:#e5e7eb;
        --slate-200: #cbd5e1;
        --slate-400: #64748b;
        --zinc-700:#27272a;
        --indigo-700: #4338ca;
        --blue-400:#1677ff;
        --blue-800:#1E40AF;
        --blue-900:#272F51;
        --orange-600:#ea580c;
        --emerald-400: #34d399;
        --green-500: #22c55e;
        --red-500: #ef4444;
        --teal-100:#ccfbf1;
        --font-standard: "Poppins", sans-serif;
        --font-secondary: 'Mulish', sans-serif;
		;
    }
	

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, main, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        scroll-behavior: smooth;
		font-family: "Poppins", sans-serif;
   }

   body {
      background: ${(props: GlobalProps) =>
				props.themeDark ? "var(--gray-500)" : "var(--gray-100)"};
      font-family: var(--font-standard);
      /* padding-top: 56px; */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #27272a 14%, #64748b 64%);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(13deg, #64748b 14%, #374151 64%);
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 8.2px 10px 12px 0px #f0f0f0;
  }
    }    
  
    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 600;
    }
  
    button {
      cursor: pointer;
    }
    
    a, li {
      list-style: none;
      text-decoration: none;
    }

    // @media screen and (min-width: 920px) {
    //   body {
    //     padding-top: 70px;
    //   }

    // }
`

export const spacing = {
	nano: "2px",
	micro: "4px",
	xxxs: "8px",
	xxs: "16px",
	xs: "24px",
	sm: "32px",
	md: "40px",
	lg: "48px",
	xl: "56px",
	xxl: "64px",
	xxxl: "72px",
	giant: "80px",
	huge: "160px",
} as const

export const BREAKPOINTS = {
	MD: "768px",
} as const

export const PageContainer = styled.div`
    margin-left: 1rem;
    margin-top: 2rem;
    @media screen and (min-width: 768px) {
        margin-left: 12rem;
    }
    > button {
        width: fit-content;
        margin-bottom: 2rem;
        align-items: center;
        display: flex;
        justify-content: space-between;
        gap: 0 1rem;
        font-weight: 300;
        padding: 6px 16px;
        font-family: var(--font-standard), sans-serif;
        @media screen and (min-width: 768px) {
            font-size: 1.25rem;
        }
    }
`

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${spacing.xxxs};

    > span {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        padding: 0.5rem;
    }

`
