import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import styles from './Login.css'

const Label = styled.div`
    width: 100%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placeholder {
    color: ${oc.gray[3]};
    }
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({label, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest}/>
    </Wrapper>
);

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

const AuthContent = ({title}) => (
    <div>
        <Title>{title}</Title>
    </div>
);

const AuthButton = ({onClick}) => (
    <Wrapper onClick={onClick}>
    </Wrapper>
);

const Wrapper = styled('div') ( ({ }) => ({
    marginTop: '1rem',
    paddingTop: '0.6rem',
    paddingBottom: '0.5rem',
    background: oc.blue[6],
    color: 'white',


}));
class Login extends Component {


    render() {
        

        return (
            <>
            <div className={styles.background}>
                <AuthButton></AuthButton>
            <AuthContent title="로그인">
                <InputWithLabel 
                    label="이메일" 
                    name="email" 
                    placeholder="이메일" 
                    
                />
                <InputWithLabel 
                    label="비밀번호" 
                    name="password" 
                    placeholder="비밀번호" 
                    type="password" 
                    
                />
                <AuthButton>로그인</AuthButton>
                {/* 아이디/비밀번호를 잊어버렸어요.
                회원가입 */}
            </AuthContent>
            </div>
            </>
        );
    }
}

export default Login;