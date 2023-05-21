import {  Mosaic } from '../movieobject';
import { ArrowLabel } from '../inputs';
import { LabelBar } from '../header';

const SubPreview = ({movie}) => (
    <>
      <LabelBar label='Preview' hero={false} hyperlink={  <ArrowLabel label='see the shots' link={`/movie/${movie.id}`} /> }/>
      <div>
        <span style={{pointerEvents:'none'}}>
          <Mosaic movie={movie} random={true} limit={9} />
        </span>
      </div>
    </>
  )

  export default SubPreview;