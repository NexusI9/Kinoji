import useAPI from '@/lib/api';
import { paramsToArray } from '@/lib/utilities';

export async function loadShots({ colours, tags, start=0, stop=10 }) {

    const { post } = useAPI();
    const promiseArray = [];

    if (tags) {
        promiseArray.push(
            post({ type: 'GET_MOVIES_FROM_TAGS', tags: paramsToArray(tags), stop:stop })
            .then(({ data }) => ({ tags: data || [] }))
        );
    }
    if (colours) {
        promiseArray.push(
            post({ type: 'GET_SHOTS_WITH_COLORS', colours: paramsToArray(colours), stop:stop  })
            .then(({ data }) => ({ colours: data || []}))
        );
    }

    return Promise.all(promiseArray).then(result => {
        result = { ...result[0], ...result[1] };
        const { tags, colours } = result;

        if (tags?.length && colours?.length) {
            //get union of two arrays and replace shots of colours
            const filteredArray = [];
            tags.forEach(tagMovie => {
                colours.forEach(colourMovie => {
                    if (colourMovie.id === tagMovie.id) {
                        tagMovie.shot = colourMovie.shot; //replace with filtered shots from colours
                        filteredArray.push(tagMovie); //push to filtered array
                    }
                });
            });
            return filteredArray;
        }
        else if (tags?.length) { return tags; }
        else if (colours?.length) { return colours; }
    });
}