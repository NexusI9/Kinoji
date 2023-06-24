import kinojilogo from '../../assets/logo.svg';
import Link from 'next/link';
import { SearchBar } from '../inputs';

export default ({title, toolbar = false}) => {
    const tools = [
      {
        label:'glossary',
        ico: () => <svg className='ico' width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.28 3.8C5.28 3.44196 5.41907 3.09858 5.66662 2.84541C5.91417 2.59223 6.24992 2.45 6.6 2.45H20.68C21.0301 2.45 21.3658 2.59223 21.6134 2.84541C21.8609 3.09858 22 3.44196 22 3.8C22 4.15804 21.8609 4.50142 21.6134 4.75459C21.3658 5.00777 21.0301 5.15 20.68 5.15H6.6C6.24992 5.15 5.91417 5.00777 5.66662 4.75459C5.41907 4.50142 5.28 4.15804 5.28 3.8ZM20.68 9.65H6.60066C6.25057 9.65 5.91483 9.79223 5.66728 10.0454C5.41973 10.2986 5.28066 10.642 5.28066 11C5.28066 11.358 5.41973 11.7014 5.66728 11.9546C5.91483 12.2078 6.25057 12.35 6.60066 12.35H20.68C21.0301 12.35 21.3658 12.2078 21.6134 11.9546C21.8609 11.7014 22 11.358 22 11C22 10.642 21.8609 10.2986 21.6134 10.0454C21.3658 9.79223 21.0301 9.65 20.68 9.65ZM20.68 16.85H6.60066C6.25057 16.85 5.91483 16.9922 5.66728 17.2454C5.41973 17.4986 5.28066 17.842 5.28066 18.2C5.28066 18.558 5.41973 18.9014 5.66728 19.1546C5.91483 19.4078 6.25057 19.55 6.60066 19.55H20.68C21.0301 19.55 21.3658 19.4078 21.6134 19.1546C21.8609 18.9014 22 18.558 22 18.2C22 17.842 21.8609 17.4986 21.6134 17.2454C21.3658 16.9922 21.0301 16.85 20.68 16.85ZM1.76 9.2C1.41191 9.2 1.07163 9.30557 0.782197 9.50335C0.492767 9.70114 0.267183 9.98226 0.133973 10.3112C0.000762575 10.6401 -0.0340913 11.002 0.0338187 11.3512C0.101729 11.7003 0.269352 12.0211 0.515493 12.2728C0.761633 12.5245 1.07524 12.696 1.41664 12.7654C1.75805 12.8349 2.11193 12.7992 2.43352 12.663C2.75512 12.5267 3.03 12.296 3.22339 12C3.41678 11.704 3.52 11.356 3.52 11C3.52 10.5226 3.33457 10.0648 3.00451 9.72721C2.67444 9.38964 2.22678 9.2 1.76 9.2ZM1.76 2C1.41191 2 1.07163 2.10557 0.782197 2.30335C0.492767 2.50114 0.267183 2.78226 0.133973 3.11117C0.000762575 3.44008 -0.0340913 3.802 0.0338187 4.15116C0.101729 4.50033 0.269352 4.82106 0.515493 5.07279C0.761633 5.32453 1.07524 5.49596 1.41664 5.56541C1.75805 5.63487 2.11193 5.59922 2.43352 5.46298C2.75512 5.32675 3.03 5.09603 3.22339 4.80003C3.41678 4.50402 3.52 4.15601 3.52 3.8C3.52 3.32261 3.33457 2.86477 3.00451 2.52721C2.67444 2.18964 2.22678 2 1.76 2ZM1.76 16.4C1.41191 16.4 1.07163 16.5056 0.782197 16.7034C0.492767 16.9011 0.267183 17.1823 0.133973 17.5112C0.000762575 17.8401 -0.0340913 18.202 0.0338187 18.5512C0.101729 18.9003 0.269352 19.2211 0.515493 19.4728C0.761633 19.7245 1.07524 19.896 1.41664 19.9654C1.75805 20.0349 2.11193 19.9992 2.43352 19.863C2.75512 19.7267 3.03 19.496 3.22339 19.2C3.41678 18.904 3.52 18.556 3.52 18.2C3.52 17.7226 3.33457 17.2648 3.00451 16.9272C2.67444 16.5896 2.22678 16.4 1.76 16.4Z"/>
        </svg>,
        link:'glossary'
      },
      {
        label:'worldmap',
        ico: () => <svg  className='ico' width="24" height="26" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.71774 8.125C8.41936 3.59023 10.0742 0.40625 12 0.40625C13.9258 0.40625 15.5806 3.59023 16.2823 8.125H7.71774ZM16.6452 13C16.6452 14.1273 16.5871 15.209 16.4855 16.25H7.51936C7.41774 15.209 7.35968 14.1273 7.35968 13C7.35968 11.8727 7.41774 10.791 7.51936 9.75H16.4855C16.5871 10.791 16.6452 11.8727 16.6452 13ZM0.93387 8.125C2.31774 4.67695 5.11935 2.01094 8.57903 0.934375C7.39839 2.65078 6.58548 5.23555 6.15968 8.125H0.93387ZM15.4258 0.934375C18.8806 2.01094 21.6871 4.67695 23.0661 8.125H17.8403C17.4194 5.23555 16.6065 2.65078 15.4258 0.934375ZM0.41613 9.75H5.96613C5.86452 10.8164 5.80645 11.9082 5.80645 13C5.80645 14.0918 5.86452 15.1836 5.96613 16.25H0.420969C0.15484 15.209 0.00483894 14.1273 0.00483894 13C0.00483894 11.8727 0.15484 10.791 0.41613 9.75ZM18.1935 13C18.1935 11.9082 18.1355 10.8164 18.0339 9.75H23.5839C23.8452 10.791 24 11.8727 24 13C24 14.1273 23.8452 15.209 23.5839 16.25H18.0387C18.1355 15.1836 18.1935 14.0918 18.1935 13ZM16.2823 17.875C15.5806 22.4098 13.9258 25.5938 12 25.5938C10.0742 25.5938 8.41936 22.4098 7.71774 17.875H16.2823ZM8.57419 25.0656C5.11936 23.9891 2.3129 21.323 0.929033 17.875H6.15484C6.58065 20.7645 7.39355 23.3492 8.57419 25.0656ZM23.0661 17.875C21.6823 21.323 18.8806 23.9891 15.421 25.0656C16.6016 23.3492 17.4145 20.7645 17.8403 17.875H23.0661Z" />
        </svg>
        ,
        link:'worldmap'
      },
      /*{
        label:'tags',
        ico: () => 
        <svg className='ico' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.375 4.25C3.07663 4.25 2.79048 4.13147 2.5795 3.9205C2.36853 3.70952 2.25 3.42337 2.25 3.125C2.25 2.82663 2.36853 2.54048 2.5795 2.32951C2.79048 2.11853 3.07663 2 3.375 2C3.67337 2 3.95952 2.11853 4.1705 2.32951C4.38147 2.54048 4.5 2.82663 4.5 3.125C4.5 3.42337 4.38147 3.70952 4.1705 3.9205C3.95952 4.13147 3.67337 4.25 3.375 4.25ZM15.3075 7.685L8.5575 0.935001C8.2875 0.665001 7.9125 0.500001 7.5 0.500001H2.25C1.4175 0.500001 0.75 1.1675 0.75 2V7.25C0.75 7.6625 0.915 8.0375 1.1925 8.3075L7.935 15.0575C8.2125 15.3275 8.5875 15.5 9 15.5C9.4125 15.5 9.7875 15.3275 10.0575 15.0575L15.3075 9.8075C15.585 9.5375 15.75 9.1625 15.75 8.75C15.75 8.33 15.5775 7.955 15.3075 7.685Z" />
        </svg>,
        link:'tags'
      },*/
    ];
  
    return(
      <div id='banner_logo_search'>
        
          <img alt='kinojiLogo' src={kinojilogo.src} />
          {title && <h1>{title}</h1> }
          <SearchBar theme='light' />
          <div id='tools_search_bar'>
            { toolbar && tools.map( ({link, ico, label}) => <Link key={link+'tools_search'} href={'/'+link} >{ico()}{label}</Link> )}
          </div>
      </div>
    );
  }
