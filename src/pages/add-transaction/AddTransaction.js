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

import "moment/locale/es";
import { traductionType } from "../../locales/traduction";

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
      alert("Por favor, selecione una categoria.");
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
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.headerTransaction}>
        <Link to="/home" className={styles.leftHome}>
          <i className="fas fa-arrow-left " />
          <h2 className={styles.title}>
            Añadir <span>{traductionType[type]}</span>
          </h2>
        </Link>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <p className={styles.nota}>
          <strong>Nota: </strong>
          Selecione la categoría, la fecha y la cantidad. Si su categoría no se
          encuentra disponible pulse el botón + para añadir una nueva.
        </p>

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
        <div className={styles.formContent}>
          <label>
            Seleccione una fecha
            <input
              required
              className={styles.date}
              type="date"
              max={now}
              onChange={(event) => setSelectedDate(event.target.value)}
              value={selectedDate}
            />
          </label>
          <div className={styles.labelAmount}>
            <label>
              Ingrese una cantidad
              <input
                className={styles.amount}
                required
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.0 €"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </label>
          </div>
          <div className={styles.buttonContainer}>
            <Button label="Enviar" type="submit" />
            <Link to="/home">
              <Button
                label="Cancelar"
                type="reset"
                className={styles.buttonCancel}
              />
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
export default AddTransaction;
