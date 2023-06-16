import {  Mosaic } from '../movie';
import { ArrowLabel } from '../inputs';
import { LabelBar } from '../header';

export default ({movie}) => (
    <>
      <LabelBar label='Preview' hero={false} hyperlink={  <ArrowLabel label='see the shots' link={`/movie/${movie.id}`} /> }/>
      <div>
        <span style={{pointerEvents:'none'}}>
          <Mosaic movie={movie} random={true} limit={9} />
        </span>
      </div>
    </>
  )