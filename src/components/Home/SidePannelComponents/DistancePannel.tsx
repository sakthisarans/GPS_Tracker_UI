import { MenuItem } from "react-pro-sidebar";
import { Fragment } from "react/jsx-runtime";
import './SpeedPannel.css'
import { useEffect, useState } from "react";
import { NumberInput } from '@patternfly/react-core';

function SpeedPannel() {

    const [isDistanceEnabled, setIsDistanceEnabled] = useState<boolean>(false)
    const [maxDistance, setMaxDistance] = useState<number>(0)

    function setMaxSpeedMethod(e: any) {
        if (e.target.value < 1) {
            setMaxDistance(1)
        } else {
            setMaxDistance(e.target.value)
        }
    }

    function setIncrementValue() {
        setMaxDistance(maxDistance + 1)
    }
    function setDecrementValue() {
        if (maxDistance > 0) {
            setMaxDistance(maxDistance - 1)
        }
    }
    useEffect(() => {
        if (!isDistanceEnabled) {
            setMaxDistance(0)
        }
    }, [isDistanceEnabled])
    return (
        <Fragment>
            <MenuItem>
                <div className="toggle-button-cover">
                    <div id="button-3" className="button r">
                        <input className="checkbox" type="checkbox" onClick={() => { setIsDistanceEnabled(!isDistanceEnabled) }} />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                </div>
            </MenuItem>
            {
                isDistanceEnabled ? (
                    <div className="NumberInput">
                        <NumberInput
                            value={maxDistance}
                            onMinus={setDecrementValue}
                            onChange={setMaxSpeedMethod}
                            onPlus={setIncrementValue}
                            inputName="input"
                            inputAriaLabel="number input"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                        />
                    </div>
                ) : (<></>)
            }
        </Fragment>
    )

}

export default SpeedPannel;