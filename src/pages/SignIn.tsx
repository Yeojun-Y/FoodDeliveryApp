import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SingInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SingInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null); //generic
  const passwordRef = useRef<TextInput | null>(null);
  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      //trim =Removes the leading and trailing white space
      //and line terminator characters from a string.
      return Alert.alert('알림', '이메일을 다시 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 다시 입력해주세요');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;
  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요"
          value={email}
          onChangeText={onChangeEmail}
          importantForAutofill="yes" //정보 자동채우기
          autoComplete="email"
          keyboardType="email-address" //@보이는자판으로변경
          returnKeyType="next" //이메일 입력 후 다음으로 버튼
          onSubmitEditing={() => {
            passwordRef.current?.focus(); //이메일로 focus 이동
          }}
          blurOnSubmit={false} //키보드 내려가기 방지
          ref={emailRef}
        />
      </View>
      <View>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호을 입력해주세요"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry //비밀번호 *로 표시
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit} //엔터치면 로그인될수있도록
        />
      </View>
      <View style={styles.ButtonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(
                  styles.loginButton,
                  styles.loginButtionActive,
                )
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>회원가입</Text>
        </Pressable>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    padding: 5,
    // borderBottomWidth: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },

  loginButtionActive: {
    backgroundColor: 'skyblue',
  },

  ButtonZone: {
    alignItems: 'center',
  },
});
export default SignIn;
