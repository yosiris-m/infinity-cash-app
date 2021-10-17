import { useParams } from "react-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories";
import CategoryList from "./components/CategoryList";
import Button from "../../components/Button";
import { createTransaction } from "../../services/transactions";
import { useHistory } from "react-router-dom";
import styles from "./AddTransaction.module.scss";

function AddTransaction() {
  const now = moment().format("YYYY-MM-DD");
  const history = useHistory();
  const { type } = useParams();

  const [selectedDate, setSelectedDate] = useState(now);
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    createTransaction(amount, selectedDate, selectedCategory, type)
      .then(() => {
        setAmount("");
        setSelectedDate(now);
        setSelectedCategory("");
        history.push("/home");
      })
      .catch((error) => {
        console.error(error); // TODO print error
      });
  };

  return (
    <div className={styles.wrapper}>
      <h1>Add {type}</h1>
      <input
        type="date"
        max={now}
        onChange={(event) => setSelectedDate(event.target.value)}
        value={selectedDate}
      />
      <div>
        <input
          type="number"
          min="1"
          placeholder="0.0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <CategoryList
        selectedCategory={selectedCategory}
        categories={filteredCategories}
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <Button label="Add" onClick={handleSubmit} />
    </div>
  );
}
export default AddTransaction;
