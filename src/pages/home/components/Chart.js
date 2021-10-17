import { ResponsivePie } from "@nivo/pie";
import * as PropTypes from "prop-types";
import styles from "./Chart.module.scss";

export default function Chart({ data }) {
  const isDataEmpty = data.length === 0;
  const noData = [{ id: null, label: "", value: true }];
  return (
    <>
      <div className={styles.chart} id="chart">
        <ResponsivePie
          data={isDataEmpty ? noData : data}
          colors={{ scheme: "paired" }}
          margin={{ left: 50, right: 50 }}
          innerRadius={0.3}
          padAngle={0.7}
          startAngle={-70}
          endAngle={296}
          cornerRadius={2}
          activeInnerRadiusOffset={22}
          activeOuterRadiusOffset={8}
          borderWidth={10}
          borderColor={{ theme: "background" }}
          enableArcLinkLabels={!isDataEmpty}
          arcLinkLabelsDiagonalLength={7}
          arcLinkLabelsStraightLength={8}
          arcLinkLabelsTextOffset={3}
          arcLinkLabelsThickness={2}
          arcLinkLabelsSkipAngle={4}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="black"
          isInteractive={!isDataEmpty}
          theme={{
            labels: {
              text: {
                fontSize: 9,
                fontWeight: " bold ",
                fontFamily: "Montserrat",
              },
            },
          }}
        />
      </div>
      {isDataEmpty && (
        <div className={styles.dataEmpty}>
          There are not transactions for this month.
        </div>
      )}
    </>
  );
}

Chart.propTypes = { data: PropTypes.arrayOf(PropTypes.any) };
