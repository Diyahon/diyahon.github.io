import React from 'react'

const ArrowIcon = rotation => rotation ?
  <i className="ri-subtract-line"></i>: <i className="ri-add-line"></i>;

const CheckboxTree = ({
  id,
  label,
  depth,
  checked,
  expanded,
  onCheck,
  onExpand,
  hasChildren,
  indeterminate,
  classNameNodeContainer = null,
  classNameLabel = null,
  classNameParentLabel = null,
  classNameCheckbox = null,
  classNameCheckboxIcon = null,
  styleNodeContainer = null,
  styleLabel = null,
  styleParentLabel = null,
  styleCheckbox = null,
  styleCheckboxIcon = null,
  isChildren = false,
  selectCategory = null,
}) => {
  const styles = {
    CheckboxNodeContainer: {
      margin: 10,
      fontSize: 18,
      display: 'flex',
      marginLeft: depth * 18,
    },
    ExpandIcon: {
      cursor: 'pointer',
    },
    DefaultMarginLeft: {
      marginLeft: 14,
    },
    CheckboxNode: {
      width: 16,
      height: 16,
    },
    Label: {
      fontStyle: 'none',
    },
    ParentLabel: {
      fontStyle: 'none',
    },
  }
  return (
    <div
      style={styleNodeContainer || styles.CheckboxNodeContainer}
      className={classNameNodeContainer}
    >
      <input
        id={id}
        type="checkbox"
        className={classNameCheckbox}
        checked={checked}
        style={styleCheckbox || styles.CheckboxNode}
        onChange={() => onCheck()}
        ref={el => el && (el.indeterminate = indeterminate())}
      />
      <label
        htmlFor={id}
        style={
          hasChildren
            ? styleParentLabel || styles.ParentLabel
            : styleLabel || styles.Label
        }
        className={!isChildren ? classNameParentLabel : classNameLabel}
      >
        {label}
      </label>
      <span>
        {isChildren && selectCategory !== null ?
          <span onClick={() => selectCategory !== null ? selectCategory(id): null}>
            <i className="ri-arrow-right-s-line"></i>
          </span>  : null}
        {!isChildren ? (
          <React.Fragment>
            {expanded ? (
              <span
                style={styleCheckboxIcon || styles.ExpandIcon}
                className={classNameCheckboxIcon}
                onClick={() => onExpand()}
              >
                {ArrowIcon(90)}
              </span>
            ) : (
              <span
                style={styleCheckboxIcon || styles.ExpandIcon}
                className={classNameCheckboxIcon}
                onClick={() => onExpand()}
              >
                {ArrowIcon(0)}
              </span>
            )}
          </React.Fragment>
        ) : (
          <div style={styles.DefaultMarginLeft} />
        )}
      </span>
    </div>
  )
}

export default CheckboxTree
