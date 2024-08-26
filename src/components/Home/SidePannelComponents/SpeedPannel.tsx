import { MenuItem } from "react-pro-sidebar";
import { Fragment } from "react/jsx-runtime";
import './SpeedPannel.css'
import { useEffect, useState } from "react";
import { NumberInput } from "@patternfly/react-core";

function SpeedPannel() {

    const [isSpeedEnabled, setIsSpeedEnabled] = useState<boolean>(false)
    const [maxSpeed, setMaxSpeed] = useState<number>(0)

    function setMaxSpeedMethod(e: any) {
        if (e.target.value < 1) {
            setMaxSpeed(1)
        } else {
            setMaxSpeed(e.target.value)
        }
    }
    function setIncrementValue() {
        setMaxSpeed(maxSpeed + 1)
    }
    function setDecrementValue() {
        if (maxSpeed > 0) {
            setMaxSpeed(maxSpeed - 1)
        }
    }
    useEffect(() => {
        if (!isSpeedEnabled) {
            setMaxSpeed(0)
        }
    }, [isSpeedEnabled])
    return (
        <Fragment>
            <MenuItem>
                <div className="toggle-button-cover">
                    <div id="button-3" className="button r">
                        <input className="checkbox" type="checkbox" onClick={() => {setIsSpeedEnabled(!isSpeedEnabled)}} />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                </div>
            </MenuItem>
            {
                isSpeedEnabled ? (
                    <div className="NumberInput">
                        <NumberInput
                            value={maxSpeed}
                            onMinus={setDecrementValue}
                            onChange={setMaxSpeedMethod}
                            onPlus={setIncrementValue}
                            inputName="input"
                            inputAriaLabel="number input"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                        />
                    </div>
                ) : (<> </>)
            }
        </Fragment>
    )

}

export default SpeedPannel;