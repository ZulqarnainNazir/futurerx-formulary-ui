/**
 * Component for header cell of settings column in grid
 * @author Santosh_JS
 * @version 1.0.0
 */
import * as React from "react";
import { Checkbox } from "antd";

//style imports
import "../FrxGridSettingsHeaderCell/FrxGridSettingsHederCell.scss";

interface FrxGridCheckboxHeaderCellProps {
  onSelectAll: (e) => void;
  isIndeterminate?: boolean;
  isChecked?: boolean;
}

export default function FrxGridCheckboxHeaderCell(
  props: FrxGridCheckboxHeaderCellProps
) {
  const { onSelectAll, isIndeterminate, isChecked } = props;
  return (
    <span className="frx-grid-settings-header-cell">
      <Checkbox
        indeterminate={isIndeterminate}
        onChange={(e) => onSelectAll(e)}
        checked={isChecked}
      ></Checkbox>
    </span>
  );
}
// class FrxGridCheckboxHeaderCell extends Component<FrxGridCheckboxHeaderCellProps> {
//   render() {
//     const { onSelectAll, isIndeterminate, isChecked } = this.props;
//     return (
//       <span className="frx-grid-settings-header-cell">
//         <Checkbox
//           indeterminate={isIndeterminate}
//           onChange={(e) => onSelectAll(e)}
//           checked={isChecked}
//         ></Checkbox>
//       </span>
//     );
//   }
// }

// export default FrxGridCheckboxHeaderCell;
