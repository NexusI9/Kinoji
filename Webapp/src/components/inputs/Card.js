import Link from 'next/link';


export default ({ visual, label, subtext, summary, link}) => (

    <div className='dirPopup_box'>
      <Link href={link}>
        {visual}
        <section>
          <p className='bold'>{label}</p>
          <p className='label'>{subtext}</p>
          <p className='label'>{summary}</p>
        </section>
      </Link>
    </div>

);