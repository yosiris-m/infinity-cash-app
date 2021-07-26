function TotalTransaction({ transactions }) {
  let income = 0;
  let expenses = 0;

  for (const transaction of transactions) {
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }
  }

  return (
    <div>
      <p>Income: {income} </p>
      <p>expenses: {expenses}</p>
    </div>
  );
}

export default TotalTransaction;
