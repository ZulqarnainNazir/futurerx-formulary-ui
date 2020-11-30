import { JSXElement } from "@babel/types";

export declare type SortOrder = "descend" | "ascend" | null;
export declare type PagintionPosition =
  | "topRight"
  // | "topCenter"
  // | "topLeft"
  // | "bottomCenter"
  | "bottomRight";
// | "bottomLeft";

//RecordType is the type of data being passed which is generic
export declare type RowClassName<RecordType> = (
  record: RecordType,
  index: number,
  indent: number
) => string;

export interface ColumnFilterItem {
  text: React.ReactNode;
  value: string | number | boolean;
}

export interface Grid<RecordType = unknown> {
  gridName: string;

  className?: string;
  rowClassName?: string | RowClassName<any>;

  ellipsesMenuComponent?: React.ReactNode; // Deprecated
  enableSettings?: boolean;
  showSettingsMenu?: boolean;
  onSettingsClick?: "grid-menu";
  isRowSelectionEnabled?: boolean;
  isRowSelectorCheckbox?: boolean;
  rowSelection?: any;
  columns: Column<RecordType>[];
  data: RecordType[];
  fixedColumnKeys: string[];
  pinnedColumns?: string[]; // TODO: need to support pinning feature if required

  pagintionPosition: PagintionPosition;
  enableColumnDrag?: boolean;
  enableResizingOfColumns?: boolean;
  summary?: (data: RecordType[]) => React.ReactNode; // to add a summary row in grid
  settingsTriDotMenuClick?: (item: GridMenu) => void;
  rowSelectionChange?: (data: any, isMultiple?: boolean) => void;
  settingsTriDotClick?: (data: RecordType) => void;
  onColumnCellClick?: (record, key) => void;

  hideResults?: boolean;
  hideItemsPerPage?: boolean;
  hidePageJumper?: boolean;
  hideClearFilter?: boolean;
  hideMultiSort?: boolean;
  hidePagination?: boolean;

  expandable?: ExpandableConfig<RecordType>;
  bordered?: boolean;
  loading?: {
    spinning: boolean;
    indicator: JSX.Element;
  };
  //used when pinning is enabled
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
  preferences?: { columnKey: string; hidden: boolean }[];
  settingsWidth?: number;
  searchOptions?: any;
  isPinningEnabled?: any;
}

export interface ExpandableConfig<RecordType> {
  isExpandable?: boolean;
  expandedRowRender?: (props) => JSX.Element;

  expandCloseIcon?: JSX.Element;
  expandOpenIcon?: JSX.Element;

  // onExpand?: (expanded: boolean, record: RecordType) => void;
  // expandedRowKeys?: number[];

  expandIconColumnIndex?: number;

  expandedRowClassName?: RowClassName<RecordType>;
}

export interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: () => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
}
export interface Column<RecordType> {
  displayTitle: string;
  textCase?: "upper" | "lower" | "sentence";
  className?: string;
  showToolTip?: boolean;
  formatter?: JSX.Element;
  cellWrapper?: (props: any) => JSX.Element;
  toolTip?: (props) => JSX.Element;
  customContent?: (props) => JSX.Element;
  isFilterable?: boolean;
  key: string;
  fixed?: "left" | "right";
  dataType?: "string" | "number" | "date";
  enableIntellisense?: boolean;
  complexObject?: string; //eg if lob is an object and value is name property => complexObject:"name" else null/undefined
  render?: (record: RecordType) => JSX.Element;
  width?: number;
  minWidth?: number;
  pixelWidth?: number;
  position: number;
  hidden: boolean;
  title?: React.ReactNode; //HTML for th
  isClickable?: boolean;

  //DEPRECATED
  onCellClick?: (record, key) => void;

  componentToOpenOnClickingCell?: (props) => JSX.Element;
  isFilterble?: boolean;

  sorter?: {
    multiple?: number;
  };
  sortDirections?: SortOrder[];
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  showSorterTooltip?: boolean;
  filters?: ColumnFilterItem[];
  filteredValue?: any;
  filterDropdown?:
    | React.ReactNode
    | ((props: FilterDropdownProps) => React.ReactNode);
  filterMultiple?: boolean;

  filterIcon?: (filtered: any) => JSX.Element;
  // onFilter?: (value: string | number | boolean, record: RecordType) => boolean;

  filterDropdownVisible?: boolean;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
}

export interface GridMenu {
  id: number;
  key: number;
  title: string;
}
