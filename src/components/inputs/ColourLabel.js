import Link from 'next/link';



const ColourLabel = ({label, discrete=false}) => (
    <Link href={'/search?colours='+label} >
      <span className={discrete ? 'label tagLabel colours grey' : 'label tagLabel colours'}>
        <span name={label.toLowerCase()} className={'ico small colours'}></span>
        <p><small>{label}</small></p>
      </span>
    </Link>
  )

  export default ColourLabel;
  