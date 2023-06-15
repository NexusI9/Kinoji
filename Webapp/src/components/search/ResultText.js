export default ({ query, total}) => (
    <div className="result">
      <p>Results for </p> {query}
      <p> ({total} results)</p>
    </div>
  );