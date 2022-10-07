export default function TxList({ txs }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item) => (
        <div key={item} className="alert alertInfo mt-2">
          <div className="flex-1">
            <label>{item.hash}</label>
          </div>
        </div>
      ))}
    </>
  );
}
