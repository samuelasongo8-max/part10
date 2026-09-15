import { useFormik } from 'formik';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 12,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 14,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignIn;
