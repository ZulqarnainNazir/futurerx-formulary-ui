import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { ReactComponent as TiltCrossIcon } from "../../../../../assets/icons/TiltCrossIcon.svg";

const DragBox = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: `${props.nodeId}`, type: "div" },
    end: (item: { id: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        props.onCriteriaSelect(props.criteria.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { criteria, onCriteriaSelect, isReadOnly } = props;
  return (
    <div
      ref={drag}
      key={criteria.id}
      id={criteria.id}
      className={
        isReadOnly
          ? "__root-additional-criteria-read-only-child-accordion-section-content-left-inner-spacing-flex"
          : "__root-additional-criteria-child-accordion-section-content-left-inner-spacing-flex"
      }
      onClick={() => onCriteriaSelect(criteria.id)}
    >
      <TiltCrossIcon />
      <label htmlFor={criteria.id} className="font-styling">
        {criteria.criteria}
      </label>
    </div>
  );
};

export default DragBox;
