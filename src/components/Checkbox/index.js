import * as S from "./styled";
import {useState} from "react";
import {CheckSvg} from "../svg/CheckSvg";
import {SvgIcon} from "../svg/SvgIcon";


export const Checkbox = ({children, initialChecked}) => {
    const [checked, setChecked] = useState(initialChecked);


    return (
            <S.LabelCheck>
                <S.Checkbox type="checkbox"  name="happy" onChange={(e)=>{
                    setChecked(e.target.checked)
                }} />

                <S.LabelCheckbox>

                    {(checked) && (
                        <SvgIcon width={"17px"} height={"12px"}>
                            <CheckSvg/>
                        </SvgIcon>
                    )}

                </S.LabelCheckbox>


                    <S.Text>
                        {children}
                    </S.Text>

            </S.LabelCheck>

    )
}