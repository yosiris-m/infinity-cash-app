function TotalTransaction({ transactions }) {
  console.log(transactions);
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
      Income: {income} expenses: {expenses}
    </div>
  );
}

export default TotalTransaction;
