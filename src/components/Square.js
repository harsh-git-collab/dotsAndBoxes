import React from 'react';
import InnerSquare from './InnerSquare';

class Square extends React.Component {
    // decide_class fuction returns the class of the bars and dots using props
    decide_class(bar_name) {
        var i = this.props.index;
        var connection_map = this.props.connections[i];
        var class_name = '';
        if(bar_name == 'top' && connection_map.get('top') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'left' && connection_map.get('left') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'bottom' && connection_map.get('bottom') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'right' && connection_map.get('right') !== -1) {
            class_name += ' active';
        }

        if(bar_name == 'dot') {
            if(connection_map.get('highlight') ) {
                class_name += ' dot_active';
            }
        }
        
        return class_name;
    }

    render() {
    
        // index of the dots 
        

        return (
            <div className="square">
                <div className={'bar top ' + this.decide_class('top')}></div>
                <div className={'bar left' + this.decide_class('left')}></div>
                <div className={'bar bottom ' + this.decide_class('bottom')}></div>
                <div className={'bar right' + this.decide_class('right')}></div>
                <div className={'dot ' + this.decide_class('dot')} onClick={this.props.onClick}></div>
                <InnerSquare index={this.props.index} position="1" property_map={this.props.connections[this.props.index]}  player={this.props.player}/>
                <InnerSquare index={this.props.index} position="2" property_map={this.props.connections[this.props.index]} player={this.props.player}/>
                <InnerSquare index={this.props.index} position="3" property_map={this.props.connections[this.props.index]} player={this.props.player}/>
                <InnerSquare index={this.props.index} position="4" property_map={this.props.connections[this.props.index]} player={this.props.player}/>
            </div>
        );
    }
}

export default Square;