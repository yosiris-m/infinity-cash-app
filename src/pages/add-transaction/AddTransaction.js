import { useParams } from "react-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories";
import CategoryList from "./components/CategoryList";
import Button from "../../components/Button";
import { createTransaction } from "../../services/transactions";
import { Link, useHistory } from "react-router-dom";
import styles from "./AddTransaction.module.scss";
import Loading from "../../components/Loading";

function AddTransaction() {
  const now = moment().format("YYYY-MM-DD");
  const history = useHistory();
  const { type } = useParams();

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(now);
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);

    getCategories().then((categories) => {
      setCategories(categories);
      setLoading(false);
    });
  }, []);

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (selectedCategory === "") {
      alert("Please, select a category");
      return;
    }

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
    <>
      <div className={styles.headerTransaction}>
        <Link to="/home">
          <i className="fas fa-arrow-left" />
        </Link>
        <h2 className={styles.title}>Add {type}</h2>
      </div>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <input
          required
          className={styles.date}
          type="date"
          max={now}
          onChange={(event) => setSelectedDate(event.target.value)}
          value={selectedDate}
        />
        <div className={styles.labelAmount}>
          <label>
            <input
              className={styles.amount}
              required
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            €
          </label>
        </div>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <CategoryList
            selectedCategory={selectedCategory}
            categories={filteredCategories}
            onSelectCategory={(category) => setSelectedCategory(category)}
            type={type}
          />
        )}

        <Button label="Add" type="submit" />
      </form>
    </>
  );
}
export default AddTransaction;
