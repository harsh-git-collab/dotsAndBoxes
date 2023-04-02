import React from 'react';

class InnerSquare extends React.Component {
    constructor(props) {
        super(props);

        this.decideClass = this.decideClass.bind(this);
    }

    decideClass() {

        let class_name = "";
        let property_map = this.props.property_map;
        // console.log(property_map)

        if(this.props.position ===  "1") {
            class_name += " one";
            if(property_map.get('sqr_1') !== -1) {
                // -1 means no one conquered
                class_name += " playerOne";
            }
        }else if(this.props.position === "2") {
            class_name += " two";
            if(property_map.get('sqr_2') !== -1) {
                // -1 means no one conquered
                class_name += " playerOne";
            }
        }else if(this.props.position === "3"){
            class_name += " three";
            if(property_map.get('sqr_3') !== -1) {
                // -1 means no one conquered
                class_name += " playerOne";
            }
        }else if(this.props.position === "4") {
            class_name += " four";
            if(property_map.get('sqr_4') !== -1) {
                // -1 means no one conquered
                class_name += " playerOne";
            }
        }

        return class_name;
    }

    render() {
        return (
            <div className={"inner_square" +  this.decideClass()}></div>
        )
    }
}

export default InnerSquare;
