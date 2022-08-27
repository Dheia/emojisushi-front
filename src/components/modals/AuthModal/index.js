import {Modal} from "../Modal";
import * as S from "./styled";
import {cloneElement, useState} from "react";
import {Input} from "../../Input";
import {Button} from "../../buttons/Button";
import {Checkbox} from "../../Checkbox";
import {PasswordInput} from "../../PasswordInput";
import {useBreakpoint} from "../../../common/hooks/useBreakpoint";
import {FlexBox} from "../../FlexBox";


export const AuthModal = ( { children}) => {

    const [ showPasswordRecovery, setShowPasswordRecovery] = useState();
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';

    const [ showSignUp,  setShowSignUp]  = useState(false);

    return <Modal width={isMobile ? "350px" : "675px"}  render={({close}) => (

        <S.Wrapper>
            {(!showPasswordRecovery && !showSignUp) && (
                <S.LoginForm>
                    <S.Title>
                        Войти в аккаунт
                    </S.Title>
                    <S.InputWrapper>
                        <S.InputLabel>
                            E-mail
                        </S.InputLabel>
                        <Input light={true}/>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.InputLabel>
                            Пароль
                        </S.InputLabel>
                        <PasswordInput/>

                    </S.InputWrapper>
                    <FlexBox justifyContent={"flex-end"}>
                        <S.NavigateButton style={{paddingTop: "10px"}} onClick={ (e) => {
                            setShowPasswordRecovery(true)
                        }}>Забыли пароль?</S.NavigateButton>
                    </FlexBox>
                    <Button style={{marginTop: "20px", display: "inline-block"}}>Войти</Button>

                    {isMobile &&

                        <S.NavigateButton style={{paddingTop: "10px"}} onClick={ (e) => {
                            e.preventDefault();
                            setShowSignUp(true)
                        }}>Регистрация</S.NavigateButton>

                    }


                </S.LoginForm>
            )}

            {showPasswordRecovery && (
                <S.LoginForm>
                    <S.Title>
                        Восстановление пароля
                    </S.Title>
                    <S.InputWrapper>
                        <S.InputLabel>
                            E-mail
                        </S.InputLabel>
                        <Input light={true}/>
                    </S.InputWrapper>
                    <S.ForgotPassText>
                        Введите Ваш E-mail адрес для которого необходимо скинуть пароль
                    </S.ForgotPassText>

                <S.BtnGroup>
                    <S.NavigateButton onClick={ (e) => {
                        setShowPasswordRecovery(false)
                    }} >Назад</S.NavigateButton>
                    <Button>Войти</Button>
                </S.BtnGroup>

                </S.LoginForm>
            )}

            {!isMobile &&
                <S.VerticalBar/>
            }


            {(!isMobile || showSignUp) &&

                <S.SignUpForm>
                    <S.Title>
                        Регистрация
                    </S.Title>
                    <S.InputWrapper>
                        <S.InputLabel>
                            E-mail
                        </S.InputLabel>
                        <Input light={true}/>
                        <S.Error>
                            Неверно введен логин
                        </S.Error>
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.InputLabel>
                            Пароль
                        </S.InputLabel>
                        <PasswordInput/>
                    </S.InputWrapper>
                    <S.CheckboxWrapper>
                        <Checkbox initialChecked={false}>
                            Я согласен с условиями использования и обработки моих персональных данных
                        </Checkbox>
                    </S.CheckboxWrapper>


                    <FlexBox>
                        <FlexBox flexDirection={"column"} alignItems={"center"}>

                            <Button>Регистрация</Button>
                            {isMobile &&
                                <S.NavigateButton style={{paddingTop:"10px"}} onClick={ (e)=>{
                                    e.preventDefault();
                                    setShowSignUp(false)
                                }
                                }>
                                    Вход
                                </S.NavigateButton>
                            }
                        </FlexBox>
                    </FlexBox>
                </S.SignUpForm>

            }

        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>;
}
