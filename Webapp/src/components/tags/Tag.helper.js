export function encodeQueries({ colours = [], lights = [], subjects = [] }) {
    return {
        colours: colours.length ? colours.join(' ') : undefined,
        lights: lights.length ? lights.map(item => item.replace(' ', '_')).join(' ') : undefined,
        subjects: subjects.length ? subjects.join(' ') : undefined
    };
}