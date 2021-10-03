import React from "react"

export default function (props) {
  return <div className="lds-roller"  style={{height: props.height ? props.height : "80px", lineHeight: props.height ? props.height : "80px"}}>
    <div></div>
    <div/>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
}
