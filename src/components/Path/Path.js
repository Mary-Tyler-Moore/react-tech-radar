import React, {useContext} from 'react';
import * as d3 from "d3";
import {ThemeContext} from "../theme-context";
import PropTypes from "prop-types";

function Path(props) {

    //context variables
    const {fontSize, fontFamily, colorScale} = useContext(ThemeContext);

    const rgb = d3.rgb(colorScale(props.quadIndex));
    const fill = rgb.brighter(props.ringIndex / props.ringsLength * 0.9);
    const uniquePathId = props.quadIndex + "-" + props.ringIndex;

    const archFunction = () => {
        return d3.arc()
            .outerRadius(() => {
                return props.outerRadius * props.ringWidth;
            })
            .innerRadius(() => {
                return props.innerRadius * props.ringWidth;
            })
            .startAngle(() => {
                return Math.PI / 2;
            })
            .endAngle(() => {
                return props.quad_angle + Math.PI / 2;
            });
    };

    return (
        <g>
            <path id={uniquePathId} className={"quadrant"}
                  d={archFunction()()}
                  fill={fill}
            >
            </path>

            {props.title &&
            <text
                dx={props.ringWidth / 2}
                fontSize={fontSize}
                fontFamily={fontFamily}
            >
                <textPath href={'#' + uniquePathId}>
                    {props.title}
                </textPath>
            </text>
            }
        </g>
    )
}

Path.propTypes = {
    quadIndex: PropTypes.number.isRequired,
    ringIndex: PropTypes.number.isRequired,
    ringWidth: PropTypes.number.isRequired,
    ringsLength: PropTypes.number.isRequired,
    quad_angle: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export default Path;
