import { Card } from "antd";
import _ from "lodash";
import React from "react";
import "./index.css";

interface CardField {
  label: string,
  value: any
}

interface TMCardProps {
  dataSource?: { [key: string]: CardField },
  style?: any,
  title?: any,
  onCardClick?: (key: any) => void,
  type: "simple" | "animated" | "splitted",
  contentLimit?: number
  renderContent?: (key: any) => void,
  extra?: any
}

export const InfoCardProcessStatus: React.FC<TMCardProps> = (props) => {

  const renderCardContent = (dataSource: any) => {

    const entries = Object.entries(dataSource);
    const informationRows = new Array();

    for (let i = 0; i < entries.length; i++) {

      let entry: any[] = entries[i];
      let cardField: CardField = entry[1];
      let label = cardField.label;
      let value = cardField.value;

      let template = <Card.Grid key={label + i} style={gridStyle} hoverable={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><b>{_.startCase(label)}</b>
          </div>
          <div style={{ textTransform: "uppercase", textAlign: "end" }}>{value}
          </div>
        </div>
      </Card.Grid>

      informationRows.push(template);
    }
    return informationRows
  }
  const renderSplittedCardContent = (dataSource: any) => {

    let entries: any[] = Object.entries(dataSource);
    let informationRows = new Array();

    for (let i = 0; i < entries.length; i++) {

      let entry: any[] = entries[i];
      let cardField: CardField = entry[1];
      let label = cardField.label;
      let value = cardField.value;
      let currentGridStyle = i % 2 === 0 ? gridStyleSplittedLeft : gridStyleSplittedRight

      let template =
        <Card.Grid key={label} style={currentGridStyle} hoverable={false}>
          <div><b>{label && label.length > 0 ? _.startCase(label) + " : " : ""} </b> </div>
          <div style={{ textTransform: "uppercase" }}>{value}</div>
        </Card.Grid>
      informationRows.push(template);
    }

    return informationRows;
  }

  const renderCard = (props: any) => {

    if (props.renderContent) {
      return props.renderContent(props.dataSource)
    } else if (props.type === "splitted") {
      return renderSplittedCardContent(props.dataSource);
    } else {
      return renderCardContent(props.dataSource)
    }

  }

  const gridStyle: any = {
    width: '100%',
    textAlign: 'left',
  };

  const gridStyleSplittedRight: any = {
    width: '50%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    boxShadow: 'none'
  };

  const gridStyleSplittedLeft: any = {
    width: '50%',
    textAlign: 'center',
    display: 'flex',
    boxShadow: 'none',
  };

  let onCardClickHandler = (a: any) => { };
  let classes = props.type === "animated" ? "information-card-animated" : "information-card-simple"

  if (props.onCardClick) {
    classes += " clickable";
    onCardClickHandler = props.onCardClick;
  }

  return (
    <div >
      {props.type === "splitted" ?
        <Card onClick={onCardClickHandler} className="information-card-simple"
          extra={props.extra}
          style={props.style}
          title={props.title}>
          {renderCard(props)}
        </Card>
        :
        <Card onClick={onCardClickHandler} className={classes}
          extra={props.extra}
          style={props.style}
          title={props.title}>
          {renderCard(props)}
        </Card>
      }
    </div>
  );
};

export default InfoCardProcessStatus;
