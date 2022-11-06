import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);
  const onsubmit = useCallback(() => {
    Alert.alert('알림', '완료');
  }, []);

  const canGoNext = email && password;
  return (
    <View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요"
          onChangeText={onChangeEmail}
        />
      </View>
      <View>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호을 입력해주세요"
          onChangeText={onChangePassword}
        />
      </View>
      <View style={styles.ButtonZone}>
        <Pressable
          onPress={onsubmit}
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
        <Pressable onPress={onsubmit} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>회원가입</Text>
        </Pressable>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 10,
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
